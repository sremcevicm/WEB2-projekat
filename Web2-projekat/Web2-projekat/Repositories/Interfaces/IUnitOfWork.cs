using Web2_projekat.Repositories.Interfaces.SpecificRepositories;

namespace Web2_projekat.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository Users { get; }
        IProductRepository Products { get; }
        IOrderRepository Orders { get; }
        IOrderProductRepository OrderProducts { get; }
        Task<int> SaveChanges();
    }
}
