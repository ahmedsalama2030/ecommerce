using System;
using Core.Common;

namespace Core.Entities
{
    public class ProductOrder
    {
        public int Quantity { get; set; }
        public Guid OrderId { get; set; }
 
        public Guid ProductId { get; set; }
        public Product Product { get; set; }
        public Order Order { get; set; }
        
    }
}