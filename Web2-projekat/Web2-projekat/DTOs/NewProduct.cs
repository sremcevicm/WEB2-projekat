using Microsoft.AspNetCore.Http;

namespace DTOs
{
    public class NewProduct
    {
        public string? SellerId { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public IFormFile Image { get; set; }
    }
}