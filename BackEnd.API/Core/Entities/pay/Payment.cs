using System;

namespace Core.Entities.pay
{
    public class Payment
    {
         public Guid Id { get; set; } 
        public DateTime PaymentDate {get; set;}
        public double Amount { get; set; } 
        public Guid UserId { get; set; } 
        public string ReceiptUrl { get; set; } 
        public string Description  { get; set; }
        public string Currency  { get; set; }
        public bool IsPaid { get; set; }
        
        public bool IsCancel { get; set; }
         public Guid OrderId { get; set; }
         public Order Order { get; set; }
         public User User { get; set; }
        }
}