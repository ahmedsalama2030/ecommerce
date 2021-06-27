using System;
using System.Threading.Tasks;
using Core.Dtos.Payment;

namespace Core.Interfaces.payments
{
    public interface IPaymentStripe
    {
        Task<StripeChargeDto>  Charge (Guid UserId,string stripeToken, int TotalPrice);

    } 
}