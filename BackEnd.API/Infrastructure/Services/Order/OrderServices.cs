using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos.Order;
using Core.Dtos.Payment;
using Core.Entities;
using Core.Entities.pay;
using Core.Interfaces;
using Core.Interfaces.Factory;
using Core.Interfaces.Order;
using Core.Interfaces.payments;
using Microsoft.Extensions.Options;
using Stripe;

namespace Infrastructure.Services.Order
{
    public class OrderServices : IOrder
    {
        private readonly IMapper _mapper;
         private readonly IUnitOfWork<Payment> _payment;
        private readonly IUnitOfWork<ShoppingCart> _shoppingCart;
        private readonly IUnitOfWork<ProductOrder> _productOrder;
        private readonly IUnitOfWork<Core.Entities.Order> _order;
        private readonly IServicesLocator _servicesLocator;
        private readonly IPaymentStripe _stripServices;
        public OrderServices(IMapper mapper,
              IOptions<StripeSettings> stripeSettings,
              IPaymentStripe stripServices,
              IUnitOfWork<Payment> Payment,
              IUnitOfWork<ShoppingCart> ShoppingCart,
              IUnitOfWork<ProductOrder> ProductOrder,
              IUnitOfWork<Core.Entities.Order> Order,
              IServicesLocator ServicesLocator
               )
        {
            _stripServices = stripServices;
            _payment = Payment;
            _shoppingCart = ShoppingCart;
            _productOrder = ProductOrder;
            _order = Order;
            _servicesLocator = ServicesLocator;
             _mapper = mapper;
        }

        public Core.Entities.Order ChargeOnDelivery(Core.Entities.Order order)
        {
            order.IsPaidOndelivery = true;
            order.IsPaidOnline = false;
            return order;
        }


        public async Task<Core.Entities.Order> OrderPerationPaymentOnDeliveryAsync(Guid userId)
        {
            var order = CreateInstanceOrder(userId);
             ChargeOnDelivery(order);
            var ResultOperation = await OperationRegisterOrder(userId, order);
            return ResultOperation;
        }


        public async Task<Core.Entities.Order> OrderPerationPaymentOnlineAsync(Guid userId, string token)
        {
            var order = CreateInstanceOrder(userId);
             var resultPayment = await _stripServices.Charge(userId, token, order.TotalPrice);
            if (resultPayment.IsPaid)
            {
                order.IsPaidOnline = true;
                order.IsPaidOndelivery = false;
                var resultOrderOperation = await OperationRegisterOrder(userId, order);
                if (resultOrderOperation != null)
                {
                    var payment = _mapper.Map<Payment>(resultPayment);
                    payment.UserId = userId;
                    payment.OrderId = resultOrderOperation.Id;
                    _payment.Table.Add(payment);
                    var result = await _payment.SaveAllAsync();
                    return (resultOrderOperation != null) ? resultOrderOperation : null;
                }
            }
            return null;
        }

        private async Task<Core.Entities.Order> OperationRegisterOrder(Guid userId, Core.Entities.Order order)
        {
            var productShopping = _shoppingCart.Table.GetQueryable(u => u.UserId == userId);
            if (productShopping == null)
                return null;
            _order.Table.Add(order);
            CreateProductOrder(  productShopping, order.Id);
            _shoppingCart.Table.DeleteRange(productShopping.ToArray());
            var result = await _order.SaveAllAsync();
            if (result)
            {
                await _productOrder.SaveAllAsync();
                await _shoppingCart.SaveAllAsync();
                return order;
            }

            return null;

        }


        private void CreateProductOrder(  IQueryable<ShoppingCart> productShopping, Guid orderId)

        {
            foreach (var shopping in productShopping)
            {
                var productOrder = new ProductOrder
                {
                    OrderId = orderId,
                    ProductId = shopping.ProductId,
                    Quantity = shopping.Quantity
                };
                _productOrder.Table.Add(productOrder);

            }
        }

        private Core.Entities.Order CreateInstanceOrder(Guid userId)
        {
            var order = _servicesLocator.Get<Core.Entities.Order>();
            order.UserId = userId;
            order.DateOrder=order.CreatedDate = DateTime.Now;
            order.DateArrive = DateTime.Now.AddDays(1);
            order.TotalPrice = _shoppingCart.Table.GetQueryable(u => u.UserId == userId).Sum(a => a.Product.Price * a.Quantity);
          
            return order;

        }



    }


}
