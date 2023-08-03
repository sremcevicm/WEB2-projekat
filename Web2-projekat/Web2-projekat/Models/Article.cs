namespace Web2_projekat.Models
{
    public class Article
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public User Seller { get; set; }
        public long SellerId { get; set; }
        public long? OrderId { get; set; }
    }
}
