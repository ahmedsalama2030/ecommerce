using System;
using AutoMapper;
using Core.Interfaces;
using Core.Interfaces.Factory;
using Core.Interfaces.Order;
using Core.Interfaces.payments;
using Infrastracture.Repository;
using Infrastructure.Data;
using Infrastructure.Helper;
using Infrastructure.Services.Factory;
using Infrastructure.Services.Order;
using Infrastructure.Services.PaymentServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class InfrastructureStartup
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, Action<DbContextOptionsBuilder> options)
        {
           //Register DbContext
           services.AddDbContext<ApplicationDbContext>(options);

           // Register AutoMapper 
           services.AddAutoMapper(typeof(AutoMapperProfiles) /* You can add more Assembly profiles*/);
           services.AddTransient<TrailData>();
           services.AddScoped(typeof(IUnitOfWork<>), typeof(UnitOfWork<>));
            // servies order
            services.AddScoped(typeof(IOrder), typeof(OrderServices));

            services.AddScoped(typeof(IPaymentStripe), typeof(PaymentStripeServices));
            services.AddSingleton(typeof(IServicesLocator), typeof(ServicesLocator));

 
            return services;
        }
    }
}