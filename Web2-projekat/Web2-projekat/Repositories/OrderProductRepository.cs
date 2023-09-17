using Web2_projekat.Data;
using Web2_projekat.Models;
using Web2_projekat.Repositories;
using Web2_projekat.Repositories.Interfaces.SpecificRepositories;

namespace Repositories
{
    public class OrderProductRepository : GenericRepository<OrderProduct>, IOrderProductRepository
    {
        public OrderProductRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}