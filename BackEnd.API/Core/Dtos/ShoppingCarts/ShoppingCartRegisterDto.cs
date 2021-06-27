using System;

namespace Core.Dtos.ShoppingCarts
{
    public class ShoppingCartRegisterDto
    {
         
        public int Quantity { get; set; }
        public Guid ProductId { get; set; }
        public Guid UserId { get; set; }

    }
}