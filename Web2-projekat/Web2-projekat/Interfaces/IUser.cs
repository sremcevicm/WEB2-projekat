using DTOs;
using Web2_projekat.Models;

namespace Web2_projekat.Interfaces
{
    public interface IUser
    {
        Task<User> CreateUser(RegisterUser user);
        Task<LogedInUser> UpdateUser(UpdateUser user);
        Task<LogedInUser> Login(string username, string password);
        Task<string> Verify(VerifyUserModel user);
        Task<List<SellerView>> GetSellers();
        Task<LogedInUser> FacebookLogin(FacebookLoginUser facebookUser);
    }
}
