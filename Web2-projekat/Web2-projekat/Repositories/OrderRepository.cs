using Web2_projekat.Data;
using Web2_projekat.Models;
using Web2_projekat.Repositories;
using Web2_projekat.Repositories.Interfaces.SpecificRepositories;

namespace Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        public OrderRepository(ApplicationDbContext context) : base(context)
        {
        }
    }
}