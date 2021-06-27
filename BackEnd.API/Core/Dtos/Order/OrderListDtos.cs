using System;
using Core.Common;

namespace Core.Dtos.Order
{
    public class OrderListDtos:BaseEntity
    {
       
         public int TotalPrice { get; set; }
         public int TotalShipping { get; set; }
         public DateTime DateOrder { get; set; }
         public DateTime DateArrive { get; set; }
        public int TotalProduct { get; set; }
         public bool IsPaidOnline { get; set; }
        public bool IsPaidOndelivery { get; set; }

      }
}