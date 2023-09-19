using Web2_projekat.DTOs;
using Web2_projekat.DTOs;
using Web2_projekat.Models;

namespace Web2_projekat.Interfaces
{
    public interface IProduct
    {
        Task<Product> AddNewProduct(NewProduct newProduct);

        Task<List<ProductView>> GetAll();
        Task<List<ProductView>> GetAllBySellerId(string sellerId);

        Task<Product> Update(UpdateProduct product);
        Task<string> Delete(DeleteProduct product);
    }
}
