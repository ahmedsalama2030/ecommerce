using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Core.Dtos.Payment;
using Core.Dtos.User;
using Core.Entities;
using Core.Entities.pay;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Stripe;
using WebApi.helper.ApiKays;
using WebApi.helper.ExtensionsMethod;
using WebApi.helper.pagination;
 
namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly IOptions<StripeSettings> _stripeSettings;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private readonly IUnitOfWork<Payment> _payment;
        private Cloudinary _cloudinary;
        public UsersController(
            UserManager<User> User,
            IMapper mapper,
            IOptions<StripeSettings> stripeSettings,
            IOptions<CloudinarySettings> cloudinaryConfig,
             IUnitOfWork<Payment> Payment)
        {
            _payment = Payment;
            _stripeSettings = stripeSettings;
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _userManager = User;
            var acc = new CloudinaryDotNet.Account(
               _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(acc);
        }


        [HttpGet]
       [Authorize(Roles = "admin")]
        public async Task<IActionResult> Get([FromQuery] PaginationParam paginationParam)
        {
            var users = _userManager.Users;
            if ((!string.IsNullOrEmpty(paginationParam.filterType)) && (!string.IsNullOrEmpty(paginationParam.filterValue)) || (!string.IsNullOrEmpty(paginationParam.filterType)) && (!string.IsNullOrEmpty(paginationParam.filterValueFrom)) && (!string.IsNullOrEmpty(paginationParam.filterValueTo)))
                users = Filter(users, paginationParam);
            //   users = Sort(users, paginationParam);
            var PagedList = await PagedList<User>.CreateAsync(users, paginationParam.pageNumber, paginationParam.PageSize);
            var UsersReturn = _mapper.Map<IEnumerable<UserListDto>>(PagedList);
            Response.AddPagination(PagedList.CurrentPage, PagedList.PageSize, PagedList.TotalItems, PagedList.TotalPages);

            return Ok(users);
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(Guid id)
        {
            var getReturn = await _userManager.Users.FirstOrDefaultAsync(a => a.Id == id);
            if (getReturn == null)
                return BadRequest();
            return Ok(getReturn);
        }
        [HttpPost("updateuser")]
        public async Task<IActionResult> UpdateUser(UserListDto UserListDto)
        {
            var id = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return BadRequest("user not found");
            _mapper.Map(UserListDto, user);
            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                if (!string.IsNullOrWhiteSpace(UserListDto.Password))
                {
                    var resultPassword = await updatePasswordAsync(user, UserListDto.Password);
                    if (!resultPassword)
                        return BadRequest("password not change");
                }
                return NoContent();
            }
            else
                return BadRequest();

        }
        public async Task<bool> updatePasswordAsync(User user, string password)
        {

            await _userManager.RemovePasswordAsync(user);
            var result = await _userManager.AddPasswordAsync(user, password);
            return result.Succeeded;

        }
        [HttpPost("{userId}/charge/{stripeToken}")]
        public async Task<IActionResult> Charge(Guid userId, string stripeToken, int  price)

        {
            var customers = new CustomerService();
            var charges = new ChargeService();
            var customer =await customers.CreateAsync(new CustomerCreateOptions
            { SourceToken = stripeToken });
            var charge =await charges.CreateAsync(new ChargeCreateOptions
            {
                Amount = price * 100 / 16,
                Description = "Pay order ",
                Currency = "usd",
                CustomerId = customer.Id
            });

            var payment = new Payment
            {
                PaymentDate = DateTime.Now,
                Amount = charge.Amount / 100 / 16,
                UserId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value),
                ReceiptUrl = charge.ReceiptUrl,
                Description = charge.Description,
                Currency = charge.Currency,
                IsPaid = charge.Paid,
          
            };
            _payment.Table.Add(payment);
            if (await _payment.SaveAllAsync())
                return Ok(new { IsPaid = charge.Paid });
            return BadRequest("fail");

        }
        [HttpPost("changePhoto/{id}"), DisableRequestSizeLimit]
        public async Task<IActionResult> changePhoto(Guid id )
        {
            var formCollection = await Request.ReadFormAsync();
            var file = formCollection.Files.First();
            var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (userId != id)
                return BadRequest();
            var user = await _userManager.Users.FirstOrDefaultAsync(a => a.Id == id);
            if (user == null)
                return BadRequest();
            if(!string.IsNullOrEmpty(user.PublicId)){
                var deleteParams = new DeletionParams(user.PublicId);
                var resultDelete=  this._cloudinary.Destroy(deleteParams);
                if(resultDelete.Result != "ok")
                 return BadRequest();
            }
             var uploadResult = new ImageUploadResult();
            if (file != null && file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation()
                       .Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }

            }

            user.photoUrl = uploadResult.Url.ToString();
            user.PublicId = uploadResult.PublicId.ToString();
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                return BadRequest();
         var UsersReturn = _mapper.Map<UserListDto>(user);

            return Ok(UsersReturn);
        }



        private IQueryable<User> Filter(IQueryable<User> users, PaginationParam paginationParam)
        {



            return users;

        }

        private IQueryable<User> Sort(IQueryable<User> users, PaginationParam paginationParam)
        {

            return users;
        }
    }
}