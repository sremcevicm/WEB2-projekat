﻿using DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Web2_projekat.Interfaces;
using Web2_projekat.Services;

namespace Web2_projekat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrder _orderService;
        public OrdersController(IOrder orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        [Route("")]
        [Authorize(Roles = "Buyer")]
        public async Task<ActionResult> CreateNewOrder([FromBody] NewOrder order)
        {
            order.UserId = User.FindFirst("UserId").Value;
            return Ok(await _orderService.CreateNewOrder(order));
        }

        [HttpGet]
        [Route("buyer/orders")]
        [Authorize(Roles = "Buyer")]
        public async Task<ActionResult> GetAllOrdersByByer()
        {
            var userId = User.FindFirst("UserId").Value;
            return Ok(await _orderService.GetAllByBuyerId(userId));
        }

        [HttpPut]
        [Route("cancel")]
        [Authorize(Roles = "Buyer")]
        public async Task<ActionResult> CancelOrder([FromBody] CancelOrder order)
        {
            order.UserId = User.FindFirst("UserId").Value;
            return Ok(await _orderService.CancelOrder(order));
        }


        [HttpGet]
        [Route("details")]
        [Authorize(Roles = "Buyer, Admin")]
        public async Task<ActionResult> OrderDetails(string orderId)
        {
            var order = new OrderDetailsInbound() { OrderId = orderId, UserId = User.FindFirst("UserId").Value };
            return Ok(await _orderService.OrderDetails(order));
        }

        [HttpGet]
        [Route("seller/new-orders")]
        [Authorize(Roles = "Seller")]
        public async Task<ActionResult> GetNewOrdersBySeller()
        {
            var userId = User.FindFirst("UserId").Value;
            return Ok(await _orderService.GetNewOrdersForSeller(userId));
        }

        [HttpGet]
        [Route("seller/details")]
        [Authorize(Roles = "Seller")]
        public async Task<ActionResult> SellerOrderDetails(string orderId)
        {
            var order = new OrderDetailsInbound() { OrderId = orderId, UserId = User.FindFirst("UserId").Value };
            return Ok(await _orderService.SellerOrderDetails(order));
        }

        [HttpGet]
        [Route("seller/my-orders")]
        [Authorize(Roles = "Seller")]
        public async Task<ActionResult> GetSellersOrders()
        {
            var userId = User.FindFirst("UserId").Value;
            return Ok(await _orderService.GetMyOrdersForSeller(userId));
        }

        [HttpGet]
        [Route("")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> GetAllOrders()
        {
            return Ok(await _orderService.GetAllOrders());
        }
    }
}
