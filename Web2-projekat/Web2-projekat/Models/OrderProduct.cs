using System.Text.Json.Serialization;

namespace Web2_projekat.Models
{
    public class OrderProduct
    {
        public Guid OrderId { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.Always)]
        public Order Order { get; set; } = null!;

        public Guid ProductId { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.Always)]
        public Product Product { get; set; } = null!;

        public int ProductQuantity { get; set; }
    }
}
