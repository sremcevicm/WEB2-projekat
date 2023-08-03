namespace Web2_projekat.Models
{
    public enum Role
    {
        ADMIN,
        USER,
        SELLER
    }
    public enum OrderState
    {
        AVAILABLE,
        RESERVED,
        SHIPPING,
        ARRIVED,
        RETURNED
    }

    public enum VerificationState
    {
        ACCEPTED,
        REJECTED,
        PENDING
    }
}
