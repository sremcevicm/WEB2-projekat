using Web2_projekat.DTOs;
using Web2_projekat.Models;

namespace Web2_projekat.Interfaces
{
    public interface IOrder
    {
        Task<Order> CreateNewOrder(NewOrder order);
        Task<List<OrderView>> GetAllByBuyerId(string userId);
        Task<bool> CancelOrder(CancelOrder order);
        Task<OrderDetailsView> OrderDetails(OrderDetailsInbound orderDetailsInbound);
        Task<OrderDetailsView> SellerOrderDetails(OrderDetailsInbound orderDetailsInbound);
        Task<List<OrderView>> GetNewOrdersForSeller(string userId);
        Task<List<OrderView>> GetMyOrdersForSeller(string userId);
        Task<List<OrderView>> GetAllOrders();
    }
}
