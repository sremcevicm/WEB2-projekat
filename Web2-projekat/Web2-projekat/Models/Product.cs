using System.Text.Json.Serialization;

namespace Web2_projekat.Models
{
    public class Product
    {
        public Guid Id { get; set; }
        public Guid SellerId { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public byte[] Image { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.Always)]
        public List<OrderProduct> OrderProducts { get; set; } = new();

        [JsonIgnore(Condition = JsonIgnoreCondition.Always)]
        public List<Order> Orders { get; set; } = new();
    }
}
