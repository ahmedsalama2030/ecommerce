using System;
using Core.Common;

namespace Core.Entities
{
    public class ProductColor:BaseEntity
    {
        public string Name { get; set; }
        public string Value { get; set; }
        public string ColorTag { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }

    }
}