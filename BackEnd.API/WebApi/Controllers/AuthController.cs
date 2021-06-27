using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos.User;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using Microsoft.Extensions.Configuration;
using System;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Localization;
using Google.Apis.Auth;

namespace WebApi.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _config;
        private readonly IStringLocalizer<AuthController> _localizer;
        private readonly IConfigurationSection _goolgeSettings;
        public AuthController(
            IStringLocalizer<AuthController> localizer,
            UserManager<User> User,
            IConfiguration config,
             IMapper mapper,
              SignInManager<User> signInManager)
        {
            _config = config;
            _signInManager = signInManager;
            _mapper = mapper;
            _userManager = User;
            _localizer = localizer;
            _goolgeSettings = _config.GetSection("GoogleAuthSettings");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDto userRegister)
        {
            var userToCreate = _mapper.Map<User>(userRegister);
            var userEmail = await _userManager.FindByEmailAsync(userRegister.Email);
            if (userEmail != null) return BadRequest(_localizer["emailfail"].Value);
            var result = await _userManager.CreateAsync(userToCreate, userRegister.Password);
            var userToReturn = _mapper.Map<UserListDto>(userToCreate);
            if (result.Succeeded)
            {
                var UserSignRole = await _userManager.AddToRoleAsync(userToCreate,"user");
                return CreatedAtRoute("GetUser", new { controller = "api/Users", id = userToCreate.Id }, userToReturn);
            }
            else
                return BadRequest(_localizer["registerfail"].Value);

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto userLoginDto)
        {
            var user = await _userManager.FindByNameAsync(userLoginDto.UserName);
            if (user == null) return BadRequest(_localizer["loginerror"].Value);
            var result = await _signInManager.CheckPasswordSignInAsync(user, userLoginDto.Password, false);
            if (result.Succeeded)
            {
                var appUser = await _userManager.Users.FirstOrDefaultAsync(
                    u => u.NormalizedUserName == userLoginDto.UserName.ToUpper()
                );
                var users = _mapper.Map<UserListDto>(appUser);
               return Ok(new
                {
                    token = GenerateJWTToken(appUser).Result,
                    user = users
                });
             }
            return Unauthorized(_localizer["loginerror"].Value);

        }

        [HttpPost("ExternalLogin")]
        public async Task<IActionResult> ExternalLogin([FromBody] ExternalAuthDto externalAuth)
        {
            var payload = await VerifyGoogleToken(externalAuth);
            if (payload == null)
                return BadRequest(_localizer["loginerror"].Value);
            var info = new UserLoginInfo(externalAuth.Provider, payload.Subject, externalAuth.Provider);
            var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
            if (user == null)
            {
                user = await _userManager.FindByEmailAsync(payload.Email);
                if (user == null)
                {
                    user = new User { Email = payload.Email, UserName = payload.Email };
                    await _userManager.CreateAsync(user);
                    //prepare and send an email for the email confirmation
                    await _userManager.AddToRoleAsync(user, "user");
                    await _userManager.AddLoginAsync(user, info);
                }
                else
                  await _userManager.AddLoginAsync(user, info);
                
            }
            if (user == null)
                return BadRequest(_localizer["loginerror"].Value);
             var token = await GenerateJWTToken(user);
            var userNew = _mapper.Map<UserListDto>(user);
           return Ok(new
            {
                token = token,
                user = userNew
            });
        }
        public async Task<GoogleJsonWebSignature.Payload> VerifyGoogleToken(ExternalAuthDto externalAuth)
        { 
             var settings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new List<string>() { _goolgeSettings.GetSection("clientId").Value }
                };
                var payload = await GoogleJsonWebSignature.ValidateAsync(externalAuth.IdToken, settings);
                return payload;
             
        }

        private async Task<string> GenerateJWTToken(User user)
        {
            var calims = new List<Claim>{  // claim is represent info of entity (user),and key value
                   new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                   new Claim(ClaimTypes.Name,user.UserName)
               };
            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                calims.Add(new Claim(ClaimTypes.Role, role));

            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value)); // set of characters into a sequence of bytes
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);//Represents the cryptographic key and security algorithms that are used to generate a digital signature.

            var tokenDescripror = new SecurityTokenDescriptor //Contains some information which used to create a security token.
            {
                Subject = new ClaimsIdentity(calims),
                Expires =  DateTime.UtcNow.AddMinutes(20),
                SigningCredentials = creds

            };

            var tokenHandler = new JwtSecurityTokenHandler();// designed for creating and validating Json Web Tokens.
            var token = tokenHandler.CreateToken(tokenDescripror);
            return tokenHandler.WriteToken(token);
        }
    }
}