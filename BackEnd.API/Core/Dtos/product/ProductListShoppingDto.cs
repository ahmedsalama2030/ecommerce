using System;
using Core.Common;

namespace Core.Dtos.product
{
    public class ProductListShoppingDto:BaseEntity
    {
       public string Name { get; set; }
        public string NameAr { get; set; }
        public int Price { get; set; }
        
        public string Brand { get; set; }
        public int ReturnDays { get; set; }
        public int ShippingPrice { get; set; }
         public DateTime ExpireDate { get; set; }
         public string ImageMain  { get; set; }
        public Guid CategoryId { get; set; }
         public string CategoryName { get; set; }
        public string CategoryNameAr { get; set; }  
         
    }
}