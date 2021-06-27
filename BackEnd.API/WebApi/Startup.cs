using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Core.Entities;
using Infrastructure;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Stripe;
using WebApi.helper.ApiKays;
using WebApi.helper.ExtensionsMethod;

namespace WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
             services.AddInfrastructure(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("ProductionConnection"));
            });   
               services.AddControllers()
                .AddNewtonsoftJson(options =>
                {
                      options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                });
 
              
            // 1- IdentityBuilder
                IdentityBuilder builder = services.AddIdentityCore<User>(opt=>{ //Helper functions for configuring identity services.
                opt.Password.RequireDigit = false;
                opt.Password.RequiredLength = 4;
                opt.Password.RequireNonAlphanumeric = false;
                opt.Password.RequireUppercase = false;
                opt.Password.RequireLowercase = false;
                
            });
            // 2- IdentityBuilder config
            builder = new IdentityBuilder(builder.UserType,typeof(Role),builder.Services);
            builder.AddEntityFrameworkStores<ApplicationDbContext>();
            builder.AddRoleValidator<RoleValidator<Role>>();
            builder.AddRoleManager<RoleManager<Role>>();
            builder.AddSignInManager<SignInManager<User>>();
           // 2- AuthenticationScheme config
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(Options =>
            {
                Options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                    ValidateIssuer = false,
                    ValidateAudience = false

                };
            });
 

            services.AddCors();
            services.AddLocalization(options => options.ResourcesPath = "Resources");
          services.AddMvc(options =>
            {
                var policy = new AuthorizationPolicyBuilder()
                            .RequireAuthenticatedUser()
                            .Build();
                 options.Filters.Add(new AuthorizeFilter(policy));
                options.EnableEndpointRouting = false;

            }).AddDataAnnotationsLocalization().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

            services.Configure<StripeSettings> (Configuration.GetSection("Stripe"));
            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));
        }
    
    //    public void ConfigureDevelopmentServices(IServiceCollection services)
    //     {
    //          services.AddInfrastructure(options =>
    //         {
    //             options.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
    //         });   
    //            services.AddControllers()
    //             .AddNewtonsoftJson(options =>
    //             {
    //                   options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
    //             });

              
    //         // 1- IdentityBuilder
    //             IdentityBuilder builder = services.AddIdentityCore<User>(opt=>{ //Helper functions for configuring identity services.
    //             opt.Password.RequireDigit = false;
    //             opt.Password.RequiredLength = 4;
    //             opt.Password.RequireNonAlphanumeric = false;
    //             opt.Password.RequireUppercase = false;
    //             opt.Password.RequireLowercase = false;
    //             opt.User.RequireUniqueEmail = true;                
    //          });
    //         // 2- IdentityBuilder config
    //         builder = new IdentityBuilder(builder.UserType,typeof(Role),builder.Services);
    //         builder.AddEntityFrameworkStores<ApplicationDbContext>();
    //         builder.AddRoleValidator<RoleValidator<Role>>();
    //         builder.AddRoleManager<RoleManager<Role>>();
    //         builder.AddSignInManager<SignInManager<User>>();
    //        // 2- AuthenticationScheme config
    //         services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    //         .AddJwtBearer(Options =>
    //         {
    //             Options.TokenValidationParameters = new TokenValidationParameters
    //             {
    //                 ValidateIssuerSigningKey = true,
    //                 IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
    //                 ValidateIssuer = false,
    //                 ValidateAudience = false

    //             };
    //         });
 
    //         services.AddCors();
    //         services.AddLocalization(options => options.ResourcesPath = "Resources");
    //       services.AddMvc(options =>
    //         {
    //             var policy = new AuthorizationPolicyBuilder()
    //                         .RequireAuthenticatedUser()
    //                         .Build();
    //              options.Filters.Add(new AuthorizeFilter(policy));
    //             options.EnableEndpointRouting = false;

    //         }).AddDataAnnotationsLocalization().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

    //         services.Configure<StripeSettings> (Configuration.GetSection("Stripe"));
    //        services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));
    //     }
    

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env,TrailData trailData)
        {
            StripeConfiguration.SetApiKey(Configuration.GetSection("Stripe:SecretKey").Value.ToString());
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else{  // global exceptionn
                app.UseExceptionHandler(BuilderExtensions =>
                {
                    BuilderExtensions.Run(async context =>
                    {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if (error != null)
                        {
                            context.Response.AddApplicationError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message);
                        }
                    });
                });
            }
           ///trailData.RunTrialData();
            var cultures = new List<CultureInfo> {
    new CultureInfo("en"),
    new CultureInfo("ar")
};
app.UseRequestLocalization(options => {
    options.DefaultRequestCulture = new Microsoft.AspNetCore.Localization.RequestCulture("en");
    options.SupportedCultures = cultures;
    options.SupportedUICultures = cultures;
  });
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors(a=>a.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            app.UseAuthorization();
            app.UseAuthentication();
            app.UseEndpoints(endpoints =>
            {
             });
            app.UseDefaultFiles();
            app.Use(async(context,next) =>{
                await next();
                if(context.Response.StatusCode== 404){
                    context.Request.Path="/index.html";
                    await next();
                }
                
            });
            app.UseStaticFiles();
            app.UseMvc();
 
         }
    }
}
