using System;
using Core.Common;

namespace Core.Dtos
{
       public class ProductListJsonDto
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
        public string CategoryId { get; set; }
 
    }
}