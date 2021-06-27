using System;
using Core.Common;

namespace Core.Dtos.product
{
    public class ProductOrderRegisterDto:BaseEntity
    {
        
        public int Quantity { get; set; }
        public Guid OrderId { get; set; }
 
        public Guid ProductId { get; set; }

    }
}