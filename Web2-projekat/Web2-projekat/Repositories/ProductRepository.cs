using Web2_projekat.Data;
using Web2_projekat.Models;
using Web2_projekat.Repositories;
using Web2_projekat.Repositories.Interfaces.SpecificRepositories;

namespace Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }
    }
}