using AutoMapper;
using Web2_projekat.Data;
using Web2_projekat.Interfaces;
using Web2_projekat.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using EntityFramework.Exceptions.Common;
using Microsoft.CodeAnalysis.Scripting;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using Web2_projekat.Models.Enumerations;
using Web2_projekat.Repositories.Interfaces;
using Web2_projekat.DTOs;

namespace Web2_projekat.Services
{
    public class UserService : IUser
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;

        public UserService(IMapper mapper, IUnitOfWork unitOfWork, IConfiguration configuration)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _configuration = configuration;
        }
        public async Task<User> CreateUser(RegisterUser incomingUser)
        {
            incomingUser.UserType = string.Concat(incomingUser.UserType[0].ToString().ToUpper(), incomingUser.UserType.Substring(1));
            var user = _mapper.Map<User>(incomingUser);
            user.Id = Guid.NewGuid();
            user.Password = BCrypt.Net.BCrypt.HashPassword(incomingUser.Password);
            user.ProfilePicture = await ParseProfilePictureToBytes(incomingUser.ProfilePicture);

            var existingId = await _unitOfWork.Users.GetById(user.Id);
            var existingUsername = await _unitOfWork.Users.FindAsync(u => u.Username.Equals(user.Username));
            if (existingId == null && existingUsername == null)
            {
                await _unitOfWork.Users.Add(user);
                await _unitOfWork.SaveChanges();
                return user;
            }
            else
            {
                throw new Exception("User with this username(or Id) already exists.");
            }
        }

        public async Task<LogedInUser> Login(string username, string password)
        {
            var user = await _unitOfWork.Users.FindAsync(u => u.Username.Equals(username));
            if (user != null && BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                List<Claim> claims = new List<Claim>();
                claims.Add(new Claim(ClaimTypes.Role, user.UserType.ToString()));
                claims.Add(new Claim("UserId", user.Id.ToString()));
                var token = GetNewJwtToken(claims, user.Id.ToString());
                var logedInUser = _mapper.Map<LogedInUser>(user);
                logedInUser.ProfilePicture = await ParseProfilePictureToString(user.ProfilePicture);
                logedInUser.Token = token;
                return logedInUser;
            }
            throw new Exception("There is no user with this username and password.");
        }

        public async Task<LogedInUser> FacebookLogin(FacebookLoginUser facebookUser)
        {
            var userId = await GetUserIdForFacebookUser(facebookUser.Id);

            var guid = new Guid(userId);

            var existingUser = await _unitOfWork.Users.FindAsync(u => u.Id.Equals(new Guid(userId)));
            if (existingUser != null)
            {
                var userr = await GetExistingFacebookUser(existingUser); // DELETE AFTER CHECK 
                return await GetExistingFacebookUser(existingUser);
            }
            else
            {
                var userr = await RegisterNewFacebookUser(facebookUser);
                return userr;
            }
        }

        public async Task<LogedInUser> UpdateUser(UpdateUser user)
        {
            var userCurrentValues = await _unitOfWork.Users.FindAsync(u => u.Username == user.Username);
            var userUpdatedValues = _mapper.Map<User>(user);
            userUpdatedValues.Id = userCurrentValues.Id;
            userUpdatedValues.Username = userCurrentValues.Username;
            userUpdatedValues.Password = userCurrentValues.Password;
            userUpdatedValues.UserType = userCurrentValues.UserType;
            userUpdatedValues.Verified = userCurrentValues.Verified;

            if (user.ProfilePicture != null)
                userUpdatedValues.ProfilePicture = await ParseProfilePictureToBytes(user.ProfilePicture);
            else
                userUpdatedValues.ProfilePicture = userCurrentValues.ProfilePicture;

            await _unitOfWork.Users.Update(userUpdatedValues, userUpdatedValues.Id);
            await _unitOfWork.SaveChanges();

            var updatedUser = _mapper.Map<LogedInUser>(userUpdatedValues);
            if (userCurrentValues.Id.ToString().Contains("0000"))
                updatedUser.ProfilePicture = Encoding.ASCII.GetString(userUpdatedValues.ProfilePicture);
            else
                updatedUser.ProfilePicture = await ParseProfilePictureToString(userUpdatedValues.ProfilePicture);

            return updatedUser;
        }

        public async Task<string> Verify(VerifyUserModel user)
        {
            var existingUser = await _unitOfWork.Users.FindAsync(u => u.Username.Equals(user.Username));
            if (existingUser == null)
                throw new Exception("There is no user with the given username.");
            existingUser.Verified = user.Value;

            await _unitOfWork.Users.Update(existingUser, existingUser.Id);
            await _unitOfWork.SaveChanges();

            SendVerificationEmail(existingUser.Email);

            return existingUser.Username;
        }

        public async Task<List<SellerView>> GetSellers()
        {
            var sellersInDatabase = _unitOfWork.Users.GetAll().Result.Where(u => u.UserType == UserType.Seller).OrderBy(u => u.Verified).ToList();
            var sellersAdapted = _mapper.Map<List<SellerView>>(sellersInDatabase);
            List<SellerView> sellersSorted = new List<SellerView>();
            sellersSorted.AddRange(sellersAdapted);
            foreach (var seller in sellersSorted)
            {
                if (seller.Verified == null)        //stavljanje odbijenih zahteva za verifikaciju na kraj liste
                {
                    var tempSeller = seller;
                    sellersAdapted.Remove(seller);
                    sellersAdapted.Add(tempSeller);
                }
            }

            return sellersAdapted;
        }



        private async Task<LogedInUser> GetExistingFacebookUser(User existingUser)
        {
            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Role, existingUser.UserType.ToString()));
            claims.Add(new Claim("UserId", existingUser.Id.ToString()));
            var token = GetNewJwtToken(claims, existingUser.Id.ToString());
            var logedInUser = _mapper.Map<LogedInUser>(existingUser);
            logedInUser.ProfilePicture = existingUser.ProfilePicture == null ? null : Encoding.ASCII.GetString(existingUser.ProfilePicture);
            logedInUser.Token = token;
            return logedInUser;
        }

        private async Task<LogedInUser> RegisterNewFacebookUser(FacebookLoginUser facebookLoginUser)
        {
            var username = await GetUsernameForFacebookUser(facebookLoginUser.Fullname);

            while ((await _unitOfWork.Users.FindAsync(u => u.Username.Equals(username))) != null)
            {
                StringBuilder sb = new StringBuilder();
                sb.Append(username);
                sb.Append('1');
                username = sb.ToString();
            }

            var userId = await GetUserIdForFacebookUser(facebookLoginUser.Id);
            var randomPassword = BCrypt.Net.BCrypt.HashPassword(RandomString(12));
            var name = facebookLoginUser.Fullname.Split(' ')[0];
            var lastname = string.IsNullOrEmpty(facebookLoginUser.Fullname.Split(' ')[1]) ? "unknown last name" : facebookLoginUser.Fullname.Split(' ')[1];
            var dateOfBirth = new DateTime();
            var adress = "unknown adress";
            var userType = "Buyer";
            var profilePicture = facebookLoginUser.PictureUrl == null ? null : Encoding.ASCII.GetBytes(facebookLoginUser.PictureUrl);

            var user = new User()
            {
                Id = new Guid(userId),
                Username = username,
                Email = facebookLoginUser.Email,
                Password = randomPassword,
                Name = name,
                LastName = lastname,
                DateOfBirth = dateOfBirth,
                Adress = adress,
                UserType = (UserType)Enum.Parse(typeof(UserType), userType),
                ProfilePicture = profilePicture,
                Verified = 0
            };

            _unitOfWork.Users.Add(user);
            _unitOfWork.SaveChanges();

            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Role, user.UserType.ToString()));
            claims.Add(new Claim("UserId", user.Id.ToString()));
            var token = GetNewJwtToken(claims, user.Id.ToString());
            var logedInUser = _mapper.Map<LogedInUser>(user);
            logedInUser.ProfilePicture = user.ProfilePicture == null ? null : Encoding.ASCII.GetString(user.ProfilePicture);
            logedInUser.Token = token;
            return logedInUser;
        }
        private async Task<string> GetUsernameForFacebookUser(string fullname)
        {
            string[] names = fullname.Split(' ');
            StringBuilder usernameSB = new StringBuilder();
            usernameSB.Append(names[0]);
            if (!string.IsNullOrEmpty(names[1]))
            {
                usernameSB.Append(names[1][0]);
            }
            return usernameSB.ToString();
        }

        private static Random random = new Random();

        private string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        private async Task<byte[]> ParseProfilePictureToBytes(IFormFile incomingPicture)
        {
            byte[] bytePicture;
            if (incomingPicture != null && incomingPicture.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await incomingPicture.CopyToAsync(memoryStream);
                    bytePicture = memoryStream.ToArray();
                }
            }
            else
                bytePicture = new byte[0];
            return bytePicture;
        }

        private string GetNewJwtToken(List<Claim> userClaims, string userId)
        {
            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("jgsfngjlsdjkj21425"));
            var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(
                issuer: "http://localhost:7166",
                claims: userClaims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: signingCredentials);
            string stringToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return stringToken;
        }
        private async Task<string> ParseProfilePictureToString(byte[] picture)
        {
            if (picture == null)
                return null;
            return $"data:image/jpg;base64,{Convert.ToBase64String(picture)}";
        }
        private Task<string> GetUserIdForFacebookUser(string facebookId)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(facebookId.ToUpper());
            for (int i = facebookId.Length; i < 32; i++)
            {
                sb.Append('0');
            }
            sb.Insert(8, '-');
            sb.Insert(13, '-');
            sb.Insert(18, '-');
            sb.Insert(23, '-');
            return Task.FromResult(sb.ToString());
        }

        private void SendVerificationEmail(string email)
        {
            var senderEmail = _configuration.GetValue<string>("MailServiceCredentials:Email");
            var password = _configuration.GetValue<string>("MailServiceCredentials:Password");
            var stmpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(senderEmail, password),
                EnableSsl = true
            };

            stmpClient.Send(senderEmail, email, "Verifcation", "Admin has reviewed your verification request, log in to check it.");
        }


    }
}
