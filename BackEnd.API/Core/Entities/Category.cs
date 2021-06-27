using System.Collections.Generic;
using Core.Common;

namespace Core.Entities
{
    public class Category:BaseEntity
    {
        public string Name { get; set; }
        public string NameAr { get; set; }
        public bool IsTop { get; set; }

        public string ImageUrl { get; set; }
        public ICollection<Product> Products { get; set; }
        public ICollection<TopCategory> TopCategories { get; set; }

    }
}