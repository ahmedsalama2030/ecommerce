using System;
using Core.Common;

namespace Core.Entities
{
    public class ProductViewRecently:BaseEntity
    {
        public DateTime DateView { get; set; }
         public Guid ProductId { get; set; }
        public Product Product { get; set; }

    }
}