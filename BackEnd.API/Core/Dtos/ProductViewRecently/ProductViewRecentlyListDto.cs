using System;
using Core.Common;

namespace Core.Dtos.ProductViewRecently
{
    public class ProductViewRecentlyListDto:BaseEntity
    {
        
        public DateTime DateView { get; set; }
        public Guid ProductId { get; set; }
         public string ProductName { get; set; }
        public string ProductNameAr { get; set; }
        public int ProductPrice { get; set; }
        public string ProductDisctription { get; set; }
        public string ProductDisctriptionAr { get; set; }
        public string ProductBrand { get; set; }
        public int ProductReturnDays { get; set; }
        public int ProductShippingPrice { get; set; }
         public DateTime ProductExpireDate { get; set; }
         public string ProductImageMain  { get; set; }
        public Guid ProductCategoryId { get; set; }
         public string ProductCategoryName { get; set; }
        public string ProductCategoryNameAr { get; set; }
     }
}