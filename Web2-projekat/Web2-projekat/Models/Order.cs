namespace Web2_projekat.Models
{
    public class Order
    {
        public long Id { get; set; }
        public int ArticleQuantity { get; set; }
        public List<Article> Articles { get; set; }
        public User Buyer { get; set; }
        public long ArticleId { get; set; }
        public string ArticleName { get; set; }
        public long BuyerId { get; set; }
        public long SellerId { get; set; }
        public string BuyerName { get; set; }
        public string SellerName { get; set; }
        public OrderState Status { get; set; }
        public string Address { get; set; }
        public double TotalPrice { get; set; }
        public string Comment { get; set; }
        public DateTime OrdredDate { get; set; }
        public DateTime ArrivalDate { get; set; }
    }
}
