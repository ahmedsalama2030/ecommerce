using Core.Dtos.Payment;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Dtos.Order
{
   public  class RegisterOrderOnlineDto
    {
        public RegisterOrderDto RegisterOrder { get; set; }
        public PaymentChargeDto  PaymentCharge { get; set; }
 
    }
}
