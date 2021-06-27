using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos.Category;
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
    public class CategoriesController : ControllerBase
    {
        private readonly IUnitOfWork<Category> _category;
        private readonly IMapper _mapper;
        public CategoriesController(IUnitOfWork<Category> category, IMapper mapper)
        {
            _mapper = mapper;
            _category = category;

        }
        [HttpGet("all")]
        public async Task<IActionResult> Get()
        {
            var Categories = await _category.Table.GetAllAsync();
            var CategoriesReturn =_mapper.Map<IEnumerable<CategoryListDto>>(Categories);
            return Ok(CategoriesReturn);

        }

            [HttpGet("top")]
        public async Task<IActionResult> GetTop([FromQuery] PaginationParam paginationParam)
        {
            var Categories = _category.Table.GetQueryable(t=>t.IsTop==true);
              var PagedList = await PagedList<Category>.CreateAsync(Categories, paginationParam.pageNumber, paginationParam.PageSize);
            var CategoriesReturn =_mapper.Map<IEnumerable<CategoryListDto>>(PagedList);
            Response.AddPagination(PagedList.CurrentPage, PagedList.PageSize, PagedList.TotalItems, PagedList.TotalPages);
            return Ok(CategoriesReturn);

        }
    }
}