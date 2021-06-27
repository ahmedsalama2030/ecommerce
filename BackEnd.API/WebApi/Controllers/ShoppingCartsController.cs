using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos.ShoppingCarts;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.helper.ExtensionsMethod;
using WebApi.helper.pagination;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/{userId}/[controller]")]
    [AllowAnonymous]
    public class ShoppingCartsController : ControllerBase
    {
        private readonly IUnitOfWork<ShoppingCart> _shoppingCart;
        private readonly IMapper _mapper;
        public ShoppingCartsController(IUnitOfWork<ShoppingCart> shoppingCart, IMapper mapper)
        {
            _mapper = mapper;
            _shoppingCart = shoppingCart;

        }
        [HttpGet]
        public async Task<IActionResult> Get(Guid userId, [FromQuery] PaginationParam paginationParam)
        {

            var shoppingCarts = _shoppingCart.Table.GetQueryable(u => u.UserId == userId, c => c.Product.Category, p => p.Product.ProductImages, co => co.Product.ProductColors);
            if ((!string.IsNullOrEmpty(paginationParam.filterType)) && (!string.IsNullOrEmpty(paginationParam.filterValue)))
                shoppingCarts = Filter(shoppingCarts, paginationParam);
            if ((!string.IsNullOrEmpty(paginationParam.sortType)))
                shoppingCarts = Sort(shoppingCarts, paginationParam);
            var PagedList = await PagedList<ShoppingCart>.CreateAsync(shoppingCarts, paginationParam.pageNumber, paginationParam.PageSize);
            var ShoppingCartProductsReturn = _mapper.Map<IEnumerable<ShoppingCartListDto>>(PagedList);
            Response.AddPagination(PagedList.CurrentPage, PagedList.PageSize, PagedList.TotalItems, PagedList.TotalPages);
            return Ok(ShoppingCartProductsReturn);

        }
        [HttpGet("{id}", Name = "GetShoppingCart")]
        public async Task<IActionResult> GetShoppingCart(Guid id)
        {
            var returnShopping = await _shoppingCart.Table.FindBy(u => u.Id == id, c => c.Product.Category, p => p.Product.ProductImages, co => co.Product.ProductColors);
            if (returnShopping == null)
                return BadRequest("not fount");
            return Ok(_mapper.Map<ShoppingCartListDto>(returnShopping));
        }
         [HttpGet("totalprice")]
        public  IActionResult  GetTotalPrice(Guid userId)
        {
            var returnShoppingPrice =   _shoppingCart.Table.GetQueryable(u => u.UserId == userId ).Sum(a=>a.Product.Price*a.Quantity);
             
            return Ok (returnShoppingPrice);
        }
         [HttpGet("totalCount")]
        public  IActionResult  GetTotalCount(Guid userId)
        {
            var returnShoppingCount =   _shoppingCart.Table.GetQueryable(u => u.UserId == userId ).Count();
            return Ok (returnShoppingCount);
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(Guid userId, ShoppingCartRegisterDto shoppingCartRegisterDto)
        {
            var isFound = _shoppingCart.Table.IsFound(a => a.ProductId == shoppingCartRegisterDto.ProductId&&a.UserId ==userId);
            if (isFound)
                return BadRequest("product found");
            var shoppingCart = _mapper.Map<ShoppingCart>(shoppingCartRegisterDto);
            _shoppingCart.Table.Add(shoppingCart);
            var result = await _shoppingCart.SaveAllAsync();
            if (result)
            {
                var newShoppingCart = await _shoppingCart.Table.FindBy(u => u.Id == shoppingCart.Id, c => c.Product.Category, p => p.Product.ProductImages, co => co.Product.ProductColors);
                var returnShopping = _mapper.Map<ShoppingCartListDto>(newShoppingCart);
                return CreatedAtRoute("GetShoppingCart", new { controller = "api/" + userId + "/ShoppingCarts", id = returnShopping.Id }, returnShopping);
            }
            else
                return BadRequest("not added");


        }
        [HttpPut("updatequantity")]
        public async Task<IActionResult> UdateQuantity( ShoppingCartUpdateQuantity shoppingCartUpdateQuantity)
        {
            var shopCart = await _shoppingCart.Table.SingleOrDefaultAsync(a => a.Id == shoppingCartUpdateQuantity.Id);
            if (shopCart==null) 
                return BadRequest("product found");
            var shoppingCart = _mapper.Map(shoppingCartUpdateQuantity,shopCart);
            _shoppingCart.Table.Update(shoppingCart);
            var result = await _shoppingCart.SaveAllAsync();
            if (result)
             return Ok();
            else
                return BadRequest("not added");


        }
       [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var  shoppingCart=await _shoppingCart.Table.SingleOrDefaultAsync(a=>a.Id==id);
            if(shoppingCart==null)
              return BadRequest("not found");
              _shoppingCart.Table.Delete(shoppingCart);
           var result=  await _shoppingCart.SaveAllAsync();
           if(result)
           return Ok();
           else 
           return BadRequest("not delete");
           
        }


        private IQueryable<ShoppingCart> Filter(IQueryable<ShoppingCart> orders, PaginationParam paginationParam)
        {



            return orders;

        }

        private IQueryable<ShoppingCart> Sort(IQueryable<ShoppingCart> orders, PaginationParam paginationParam)
        {
            return orders.OrderByDescending(d => d.CreatedDate);
        }
    }
}