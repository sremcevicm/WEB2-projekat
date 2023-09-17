using System.Data;
using Web2_projekat.Models.Enumerations;

namespace Web2_projekat.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Adress { get; set; }
        public UserType UserType { get; set; }
        public byte[]? ProfilePicture { get; set; }
        public int? Verified { get; set; }
    }
}
