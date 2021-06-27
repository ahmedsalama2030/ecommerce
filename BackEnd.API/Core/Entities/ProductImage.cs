using System;
 using Core.Common;

namespace Core.Entities
{
    public class ProductImage:BaseEntity
    {
        public string PublicId { get; set; }
        public string URL { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public Guid ProductId { get; set; }
        public Product Product { get; set; }

    }
}