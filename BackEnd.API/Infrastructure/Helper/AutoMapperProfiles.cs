using System.Linq;
using AutoMapper;
using Core.Dtos.Category;
using Core.Dtos.ProductViewRecently;
using Core.Entities;
using Core.Dtos.ProductsBestSeller;
using Core.Dtos;
using Core.Dtos.product;
using Core.Dtos.productImage;
using Core.Dtos.ProductColor;
using Core.Dtos.User;
using Core.Dtos.Order;
using Core.Dtos.ShoppingCarts;
using Core.Entities.pay;
using Core.Dtos.Payment;

namespace Infrastructure.Helper
{
    public class AutoMapperProfiles
    {
        public class ProductProfile : Profile
        {

            public ProductProfile()
            {
                CreateMap<ProductListJsonDto, Product>();
                CreateMap<Product, ProductListDto>().ForMember(des => des.ImageMain, op => { op.MapFrom(src => src.ProductImages.FirstOrDefault(a => a.IsMain == true).URL); }); ;
                CreateMap<Product, ProductListShoppingDto>().ForMember(des => des.ImageMain, op => { op.MapFrom(src => src.ProductImages.FirstOrDefault(a => a.IsMain == true).URL); }); ;

                CreateMap<ProductImage, ProductImagesDtos>();
                CreateMap<ProductColor, ProductColorDtos>();

                CreateMap<Category, CategoryListDto>();

                CreateMap<ProductViewRecently, ProductViewRecentlyListDto>().ForMember(des => des.ProductImageMain, op => { op.MapFrom(src => src.Product.ProductImages.FirstOrDefault(a => a.IsMain == true).URL); });

                CreateMap<ProductBestSeller, ProductBestSellerListDto>().ForMember(des => des.ProductImageMain, op => { op.MapFrom(src => src.Product.ProductImages.FirstOrDefault(a => a.IsMain == true).URL); });

                CreateMap<User, UserListDto>().ReverseMap();
                CreateMap<UserRegisterDto, User>();

                CreateMap<Order, OrderListDtos>().ForMember(des => des.TotalProduct, op => { op.MapFrom(src => src.ProductOrders.Count()); });
                CreateMap<ShoppingCart, ShoppingCartListDto>();
                CreateMap<RegisterOrderDto,Order>();

                CreateMap<ShoppingCartRegisterDto, ShoppingCart>();
                CreateMap<ShoppingCartUpdateQuantity, ShoppingCart>();

                // stripe map
                 CreateMap< Payment,  StripeChargeDto>().ReverseMap();


            }
        }


    }
}