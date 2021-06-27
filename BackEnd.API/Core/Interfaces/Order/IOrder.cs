using System;
using System.Threading.Tasks;
using Core.Dtos.Order;
using Core.Dtos.Payment;

namespace Core.Interfaces.Order
{
    public interface IOrder:IOrderPayment
    {
   
         Task<Core.Entities.Order> OrderPerationPaymentOnlineAsync(Guid userId,  string token );
          Task<Core.Entities.Order> OrderPerationPaymentOnDeliveryAsync(Guid userId );
        
    }
}