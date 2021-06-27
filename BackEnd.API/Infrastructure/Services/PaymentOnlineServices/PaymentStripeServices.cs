using System;
using System.Threading.Tasks;
using Core.Dtos.Payment;
using Core.Interfaces.payments;
using Stripe;

namespace Infrastructure.Services.PaymentServices
{
    public class PaymentStripeServices :  IPaymentStripe
    {
        public async Task<StripeChargeDto> Charge(Guid UserId, string stripeToken, int TotalPrice)
        {
             var customers = new CustomerService();
            var charges = new ChargeService();
            var customer =await customers.CreateAsync(new CustomerCreateOptions
            { SourceToken = stripeToken });
            var charge =await charges.CreateAsync(new ChargeCreateOptions
            {
                Amount = TotalPrice * 100 / 16,
                Description = "Pay order ",
                Currency = "usd",
                CustomerId = customer.Id
            });

            if(charge.Paid)
            return  new StripeChargeDto{
                PaymentDate = DateTime.Now,
                Amount = charge.Amount / 100 / 16,
                ReceiptUrl = charge.ReceiptUrl,
                Description = charge.Description,
                Currency = charge.Currency,
                IsPaid = charge.Paid
            };
            else
            return null;
        }
    }
}