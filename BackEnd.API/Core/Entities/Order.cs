using System;
using System.Collections.Generic;
using Core.Common;
 
namespace Core.Entities
{
    public class Order:BaseEntity
    {
         public int TotalPrice { get; set; }
         public int TotalShipping { get; set; }
         public DateTime DateOrder { get; set; }
         public DateTime DateArrive { get; set; }
         public bool IsPaidOnline { get; set; }
        public bool IsPaidOndelivery { get; set; }
        public Guid UserId { get; set; } 
         public User User { get; set; }
       public string firstName { get; set; }
        public string LastName { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }

        public ICollection<ProductOrder> ProductOrders { get; set; }

 
    }
}