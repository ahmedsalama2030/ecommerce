using System;

namespace Core.Dtos.Payment
{
    public class StripeChargeDto
    {
         public DateTime PaymentDate {get; set;}
        public double Amount { get; set; } 
        public Guid UserId { get; set; } 
        public string ReceiptUrl { get; set; } 
        public string Description  { get; set; }
        public string Currency  { get; set; }
        public bool IsPaid { get; set; }
        
     }
}