using Microsoft.EntityFrameworkCore;
using Web2_projekat.Models;

namespace Web2_projekat.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Web2_projekat.Models.User> User { get; set; } = default!;
    }
}
