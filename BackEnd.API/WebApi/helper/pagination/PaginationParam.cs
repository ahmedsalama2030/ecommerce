namespace WebApi.helper.pagination
{
    public class PaginationParam
    {
        private const int MaxPageSize = 1000;

        public int pageNumber { get; set; } = 1;
        private int pageSize = 4;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }

        public string filterValue { get; set; }
        public string filterType { get; set; }
        public string filterValueTo { get; set; }
        public string filterValueFrom { get; set; }
        public string sortType { get; set; }
        

    }
}