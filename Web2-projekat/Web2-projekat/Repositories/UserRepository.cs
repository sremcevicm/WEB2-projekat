using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web2_projekat.Data;
using Web2_projekat.Models;
using Web2_projekat.Repositories;
using Web2_projekat.Repositories.Interfaces.SpecificRepositories;

namespace Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(ApplicationDbContext dbContext) : base(dbContext) { }
    }
}
