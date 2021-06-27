using Core.Dtos.product;

namespace Core.Dtos.Order
{
    public class OrderDetailDtos
    {
        public int ProductQuantity { get; set; }
         public ProductListShoppingDto Products { get; set; }
    }
}