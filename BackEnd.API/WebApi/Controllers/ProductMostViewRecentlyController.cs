using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos.ProductViewRecently;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using WebApi.helper.ExtensionsMethod;
using WebApi.helper.pagination;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]

    public class ProductMostViewRecentlyController : ControllerBase
    {
        private readonly IUnitOfWork<ProductViewRecently> _productViewRecently;
        private readonly IMapper _mapper;
        private const int ProductViewSize =50;
        public ProductMostViewRecentlyController(IUnitOfWork<ProductViewRecently> ProductViewRecently, IMapper Mapper)
        {
            _mapper = Mapper;
            _productViewRecently = ProductViewRecently;

        }
        [HttpGet]
        public  async Task<IActionResult> Get([FromQuery] PaginationParam paginationParam)
        {
            var productsViewRecently =  _productViewRecently.Table.IncludeIQueryableAsync( p => p.Product, c => c.Product.Category, p => p.Product.ProductImages) ;

             var PagedList = await PagedList<ProductViewRecently>.CreateAsync(productsViewRecently, paginationParam.pageNumber, paginationParam.PageSize);
            var productViewRecentlyReturn = _mapper.Map<IEnumerable<ProductViewRecentlyListDto>>(PagedList);
            Response.AddPagination(PagedList.CurrentPage, PagedList.PageSize, PagedList.TotalItems, PagedList.TotalPages);
            return (Ok(productViewRecentlyReturn));
         }

        public async Task< IQueryable<ProductViewRecently>>  productViewRecentlySelected(List<Guid> productsid)
        {
            List<ProductViewRecently> products = new List<ProductViewRecently>();
            
            foreach (var id in productsid)
            {
          var ProductAll=  await _productViewRecently.Table.FindBy(a=>a.ProductId==id,p => p.Product, c => c.Product.Category, p => p.Product.ProductImages);
          products.Add(ProductAll);
            }
            var x= products.AsQueryable();
             return x;
        }
    }
}