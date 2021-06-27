using System;
using Core.Common;

namespace Core.Entities
{
    public   class ProductBestSeller:BaseEntity
    {
          public Guid ProductId { get; set; }
        public Product Product { get; set; }
    }
}