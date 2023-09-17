using DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Web2_projekat.Interfaces;

namespace Web2_projekat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class ProductsController : ControllerBase
    {
        private readonly IProduct _productService;

        public ProductsController(IProduct productService)
        {
            _productService = productService;
        }

        [HttpGet]
        [Route("")]
        [Authorize(Roles = "Buyer")]
        public async Task<ActionResult> GetAll()
        {
            return Ok(await _productService.GetAll());
        }

        [HttpGet]
        [Route("seller/products")]
        [Authorize(Roles = "Seller")]
        public async Task<ActionResult> GetAllBySeller()
        {
            var userId = User.FindFirst("UserId").Value;
            return Ok(await _productService.GetAllBySellerId(userId.ToString()));
        }

        [HttpPost]
        [Route("")]
        [Authorize(Roles = "Seller")]
        public async Task<ActionResult> AddNewProduct([FromForm] NewProduct product)
        {
            product.SellerId = User.FindFirst("UserId").Value;
            return Ok(await _productService.AddNewProduct(product));
        }
        [HttpPut]
        [Route("products/{productId}/update")]
        [Authorize(Roles = "Seller")]
        public async Task<ActionResult> Update([FromForm] UpdateProduct product)
        {
            product.SellerId = User.FindFirst("UserId").Value;
            return Ok(await _productService.Update(product));
        }

        [HttpDelete]
        [Route("products/{productId}/delete")]
        [Authorize(Roles = "Seller")]
        public async Task<ActionResult> Delete(DeleteProduct product)
        {
            product.SellerId = User.FindFirst("UserId").Value;
            return Ok(await _productService.Delete(product));
        }
    }
}
