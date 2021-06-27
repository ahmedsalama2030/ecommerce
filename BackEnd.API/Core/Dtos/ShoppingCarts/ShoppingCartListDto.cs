using System;
using Core.Common;
using Core.Dtos.product;

namespace Core.Dtos.ShoppingCarts
{
    public class ShoppingCartListDto:BaseEntity
    {
         public int Quantity { get; set; }
         public Guid UserId { get; set; }

        public ProductListShoppingDto Product { get; set; }
     }
}