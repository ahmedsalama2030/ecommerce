using System;
using System.Threading.Tasks;
using Core.Dtos.Payment;
using Core.Interfaces.Order;

namespace Infrastructure.Services.Order
{
    public abstract class OrderEmailDecrator : IOrderEmail
    {
         public IOrder orderServices;

        public OrderEmailDecrator(IOrder Order)
        {
            orderServices = Order;
        }

        public Core.Entities.Order ChargeOnDelivery(Core.Entities.Order order)
        {
            return orderServices.ChargeOnDelivery(order);
            // complete code

        }

        public Task<Core.Entities.Order> OrderPerationPaymentOnDeliveryAsync(Guid userId)
        {
            return orderServices.OrderPerationPaymentOnDeliveryAsync(userId);
            // complete code

        }

        public Task<Core.Entities.Order> OrderPerationPaymentOnlineAsync(Guid userId, string token)
        {
            return orderServices.OrderPerationPaymentOnlineAsync(userId, token);

            // complete code
        }
    }
}