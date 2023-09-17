using AutoMapper;
using Web2_projekat.Models;
using DTOs;
using Web2_projekat.Models.Enumerations;

namespace Web2_projekat.MapProfile
{
    public class Map : Profile
    {
        public Map()
        {
            CreateMap<RegisterUser, User>()
                    .ForMember(dest => dest.UserType, opt => opt.MapFrom(src => Enum.Parse(typeof(UserType), src.UserType)))
                    .ForMember(dest => dest.ProfilePicture, opt => opt.Ignore())
                    .ForMember(dest => dest.Verified, opt => opt.MapFrom(src => 0));

            CreateMap<User, LogedInUser>()
                .ForMember(dest => dest.UserType, opt => opt.MapFrom(src => src.UserType.ToString()))
                .ForMember(dest => dest.ProfilePicture, opt => opt.Ignore())
                .ForMember(dest => dest.Verified, opt => opt.MapFrom(src => src.Verified == 1 ? "Your account is verified."
                        : (src.Verified == null ? "Verification request is denied."
                        : "Your account is not verified.")));

            CreateMap<UpdateUser, User>()
                .ForMember(dest => dest.ProfilePicture, opt => opt.Ignore());

            CreateMap<User, SellerView>()
                .ForMember(dest => dest.ProfilePictureUrl, opt => opt.MapFrom(src => src.ProfilePicture == null ? null
                : $"data:image/jpg;base64,{Convert.ToBase64String(src.ProfilePicture)}"));

            CreateMap<NewProduct, Product>()
                .ForMember(dest => dest.SellerId, opt => opt.MapFrom(src => new Guid(src.SellerId)))
                .ForMember(dest => dest.Image, opt => opt.Ignore())
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => new Guid()));

            CreateMap<Product, ProductView>()
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Image == null ? null : $"data:image/jpg;base64,{Convert.ToBase64String(src.Image)}"));

            CreateMap<UpdateProduct, Product>()
                .ForMember(dest => dest.Image, opt => opt.Ignore())
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => new Guid(src.ProductId)));

            CreateMap<NewOrder, Order>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid()))
                .ForMember(dest => dest.OrderDeclinedd, opt => opt.MapFrom(src => false))
                .ForMember(dest => dest.OrderedAt, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(dest => dest.OrderProducts, opt => opt.MapFrom(src => new List<OrderProduct>()));

            CreateMap<Order, OrderView>()
                .ForMember(dest => dest.NumberOfProducts, opt => opt.MapFrom(src => 0))
                .ForMember(dest => dest.OrderCanceled, opt => opt.MapFrom(src => src.OrderDeclinedd));
        }
    }
}
