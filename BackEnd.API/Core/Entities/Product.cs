using System;
using System.Collections.Generic;
using Core.Common;

namespace Core.Entities
{
    public class Product:BaseEntity
    {  
        public string Name { get; set; }
        public string NameAr { get; set; }
        public int Price { get; set; }
        public string Disctription { get; set; }
        public string DisctriptionAr { get; set; }
        public string Brand { get; set; }
        public int ReturnDays { get; set; }
        public int ShippingPrice { get; set; }
        public DateTime ExpireDate { get; set; }
        public Guid CategoryId { get; set; }
        public Category Category { get; set; }
        public ICollection<ProductImage> ProductImages { get; set; }
        public ICollection<ProductColor> ProductColors { get; set; }
        public ICollection<ProductBestSeller> ProductsBestSeller { get; set; }
        public ICollection<ShoppingCart> ShoppingCarts { get; set; }
        public ICollection<ProductOrder> ProductOrders { get; set; }

    }
}