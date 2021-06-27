using Core.Common;

namespace Core.Dtos.Category
{
    public class CategoryListDto : BaseEntity
    {
        public string Name { get; set; }
        public string NameAr { get; set; }
        public bool IsTop { get; set; }
        public string ImageUrl { get; set; }


    }
}