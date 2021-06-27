using Core.Common;

namespace Core.Dtos.productImage
{
    public class ProductImagesDtos:BaseEntity
    {
        public string URL {get; set; }
         public bool IsMain {get; set; }
    }
}