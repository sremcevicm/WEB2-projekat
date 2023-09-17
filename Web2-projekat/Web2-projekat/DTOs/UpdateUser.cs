using Microsoft.AspNetCore.Http;

namespace DTOs
{
    public class UpdateUser
    {
        public string Username { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Adress { get; set; }
        public IFormFile? ProfilePicture { get; set; }
    }
}