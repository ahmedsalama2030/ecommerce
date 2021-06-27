using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos.ProductsBestSeller;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.helper.ExtensionsMethod;
using WebApi.helper.pagination;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class ProductsBestSellerController : ControllerBase
    {
        private readonly IUnitOfWork<ProductBestSeller> _bestSeller;
        private readonly IMapper _mapper;
        public ProductsBestSellerController(IUnitOfWork<ProductBestSeller> BestSeller, IMapper Mapper)
        {
            _mapper = Mapper;
            _bestSeller = BestSeller;

        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] PaginationParam paginationParam)
        {
            var bestSeller = _bestSeller.Table.IncludeIQueryableAsync(p => p.Product, c => c.Product.Category, p => p.Product.ProductImages);
            var PagedList = await PagedList<ProductBestSeller>.CreateAsync(bestSeller, paginationParam.pageNumber, paginationParam.PageSize);
            var bestSellerReturn = _mapper.Map<IEnumerable<ProductBestSellerListDto>>(PagedList);
            Response.AddPagination(PagedList.CurrentPage, PagedList.PageSize, PagedList.TotalItems, PagedList.TotalPages);
            return Ok(bestSellerReturn);
        }
    }
}