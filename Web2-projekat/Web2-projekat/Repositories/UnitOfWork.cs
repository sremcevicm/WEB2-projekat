using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Web2_projekat.Repositories.Interfaces;
using Web2_projekat.Data;
using Web2_projekat.Repositories.Interfaces.SpecificRepositories;

namespace Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _dbContext;
        public IUserRepository Users { get; }
        public IProductRepository Products { get; }
        public IOrderRepository Orders { get; }
        public IOrderProductRepository OrderProducts { get; }

        public UnitOfWork(ApplicationDbContext dbContext,
                            IUserRepository users,
                            IProductRepository products,
                            IOrderRepository orders,
                            IOrderProductRepository orderProducts)
        {
            _dbContext = dbContext;
            Users = users;
            Products = products;
            Orders = orders;
            OrderProducts = orderProducts;
        }

        public async Task<int> SaveChanges()
        {
            return await _dbContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _dbContext.Dispose();
            }
        }
    }
}
