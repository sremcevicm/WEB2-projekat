using System.Data;

namespace Web2_projekat.Models
{
    public class User
    {
        public long Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Address { get; set; }
        public string? BirthDay { get; set; }
        public Role? Role { get; set; }
        public VerificationState? VerificationStatus { get; set; }
        public string? ProfilePicture { get; set; }
        public List<Article> Articles { get; set; }
        public List<Order> Orders { get; set; }
    }
}
