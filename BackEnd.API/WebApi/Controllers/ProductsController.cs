using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos.product;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApi.helper.ExtensionsMethod;
using WebApi.helper.pagination;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class ProductsController : ControllerBase
    {
        private readonly IUnitOfWork<Product> _product;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork<ProductColor> _productColors;
        public ProductsController(IUnitOfWork<Product> product, IUnitOfWork<ProductColor> ProductColors, IMapper mapper)
        {
            _productColors = ProductColors;
            _mapper = mapper;
            _product = product;

        }

        [HttpGet]
         public async Task<IActionResult> Get([FromQuery] PaginationParam paginationParam)
        {

            var products = _product.Table.IncludeIQueryableAsync(c => c.Category, p => p.ProductImages, co => co.ProductColors);
            if ((!string.IsNullOrEmpty(paginationParam.filterType)) && (!string.IsNullOrEmpty(paginationParam.filterValue)) || (!string.IsNullOrEmpty(paginationParam.filterType)) && (!string.IsNullOrEmpty(paginationParam.filterValueFrom)) && (!string.IsNullOrEmpty(paginationParam.filterValueTo)))
                products = Filter(products, paginationParam);
                products=Sort(products,paginationParam);
            var PagedList = await PagedList<Product>.CreateAsync(products, paginationParam.pageNumber, paginationParam.PageSize);
            var ProductsReturn = _mapper.Map<IEnumerable<ProductListDto>>(PagedList);
            Response.AddPagination(PagedList.CurrentPage, PagedList.PageSize, PagedList.TotalItems, PagedList.TotalPages);
            return Ok(ProductsReturn);

        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBuId(Guid id)
        {
            var product = await _product.Table.FindBy(a => a.Id == id, c => c.Category, i => i.ProductImages, co => co.ProductColors);
            if (product == null)
                return BadRequest("Not Fount");
            var productReturn = _mapper.Map<ProductListDto>(product);
            return Ok(productReturn);
        }

        [HttpGet("brand")]
         public async Task<IActionResult> GetBrand()
        {
            var Brands = (await _product.Table.GetAllAsync()).Select(b=>b.Brand);
          
            if (Brands == null)
                return BadRequest("Not Fount");
           
            return Ok(Brands);
        }

         private IQueryable<Product> Filter(IQueryable<Product> product, PaginationParam paginationParam)
        {

            if (paginationParam.filterType == "category")
                return product.Where(a => a.CategoryId == Guid.Parse(paginationParam.filterValue));
            else if (paginationParam.filterType == "brand")
                return product.Where(a => a.Brand == paginationParam.filterValue);
            else if (paginationParam.filterType == "price")
                return product.Where(a => a.Price>=Convert.ToInt32(paginationParam.filterValueFrom) && a.Price<=Convert.ToInt32(paginationParam.filterValueTo));
            else if (paginationParam.filterType == "colorTag")
            {
                var qery = (from p in product
                            join c in _productColors.Table.Table()
                            on p.Id equals c.ProductId
                            where c.ColorTag == paginationParam.filterValue
                            select p);
                    return qery;
            }
            else
                return product;



        }

         private IQueryable<Product> Sort(IQueryable<Product> products, PaginationParam paginationParam){
               if(paginationParam.sortType=="nameaz")
               return products.OrderBy(n=>n.Name);
               else if(paginationParam.sortType=="nameza")
               return products.OrderByDescending(n=>n.Name);
               else if(paginationParam.sortType=="pricelow")
               return products.OrderBy(n=>n.Name);
               else if(paginationParam.sortType=="pricehight")
               return products.OrderByDescending(n=>n.Name);
               else 
               return products;
         }
  
  
  }

}