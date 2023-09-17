 
namespace DTOs
{
    public class NewOrder
    {
        public string? UserId { get; set; }
        public string? Comment { get; set; }
        public string DeliveryAddress { get; set; }
        public List<string> ProductIds { get; set; }

    }
}
