using System;

namespace Core.Dtos.ShoppingCarts
{
    public class ShoppingCartUpdateQuantity
    {
        public Guid Id { get; set; }
        public int Quantity { get; set; }
    }
}