﻿using Microsoft.AspNetCore.Http;

namespace Web2_projekat.DTOs
{
    public class UpdateProduct
    {
        public string? SellerId { get; set; }
        public string ProductId { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public IFormFile? UpdatedImage { get; set; }
    }
}
