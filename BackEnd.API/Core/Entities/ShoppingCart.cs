using System;
using Core.Common;

namespace Core.Entities
{
    public class ShoppingCart:BaseEntity
    {
        public int Quantity { get; set; }
        public Guid ProductId { get; set; }
        public Guid UserId { get; set; }

        public Product Product { get; set; }
        public User User { get; set; }
    }
}