using AutoMapper;
using Web2_projekat.DTOs;
using Web2_projekat.DTOs;
using Web2_projekat.Interfaces;
using Web2_projekat.Models;
using Web2_projekat.Repositories.Interfaces;

namespace Web2_projekat.Services
{
    public class ProductService : IProduct
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ProductService(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        public async Task<List<ProductView>> GetAll()
        {
            var allProducts = (await _unitOfWork.Products.GetAll()).Where(p => p.Quantity > 0).ToList();
            var allAddapted = _mapper.Map<List<ProductView>>(allProducts);
            return allAddapted;
        }

        public async Task<List<ProductView>> GetAllBySellerId(string sellerId)
        {
            var sellersProducts = _unitOfWork.Products.GetAll().Result.Where(p => p.SellerId.ToString().ToLower().Equals(sellerId.ToLower())).ToList();
            var productsAddapted = _mapper.Map<List<ProductView>>(sellersProducts);
            return productsAddapted;
        }

        public async Task<Product> AddNewProduct(NewProduct newProduct)
        {
            var product = _mapper.Map<Product>(newProduct);
            product.Image = await ParseProductImageToBytes(newProduct.Image);
            await _unitOfWork.Products.Add(product);
            await _unitOfWork.SaveChanges();
            return product;
        }

        public async Task<Product> Update(UpdateProduct product)
        {
            var productCurrentValues = await _unitOfWork.Products.FindAsync(p => p.Id.ToString().ToLower().Equals(product.ProductId.ToLower()));
            if (product.SellerId != null && !productCurrentValues.SellerId.ToString().ToLower().Equals(product.SellerId.ToLower()))
            {
                throw new Exception("You are not authorized to change informations about this product.");
            }
            var productUpdatedValues = _mapper.Map<Product>(product);
            if (product.UpdatedImage != null)
                productUpdatedValues.Image = await ParseProductImageToBytes(product.UpdatedImage);
            else
                productUpdatedValues.Image = productCurrentValues.Image;

            await _unitOfWork.Products.Update(productUpdatedValues, productUpdatedValues.Id);
            await _unitOfWork.SaveChanges();

            return productUpdatedValues;
        }

        public async Task<string> Delete(DeleteProduct product)
        {
            var exist = await _unitOfWork.Products.FindAsync(p => p.Id.ToString().ToLower().Equals(product.ProductId.ToLower()));
            if (exist != null)
            {
                if (!exist.SellerId.ToString().ToLower().Equals(product.SellerId.ToLower()))
                {
                    throw new Exception("You are not authorized to change informations about this product.");
                }
                await _unitOfWork.Products.Delete(exist);
                await _unitOfWork.SaveChanges();
                return exist.Name;
            }
            throw new KeyNotFoundException("This product can't be found in our system.");
        }

        private async Task<byte[]> ParseProductImageToBytes(IFormFile incomingImage)
        {
            byte[] byteImage;
            if (incomingImage != null && incomingImage.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await incomingImage.CopyToAsync(memoryStream);
                    byteImage = memoryStream.ToArray();
                }
            }
            else
                byteImage = new byte[0];
            return byteImage;
        }
    }
}
