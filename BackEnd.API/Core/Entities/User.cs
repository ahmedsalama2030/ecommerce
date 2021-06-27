using System;
using System.Collections.Generic;
using Core.Common;
using Core.Entities.pay;
using Microsoft.AspNetCore.Identity;

namespace Core.Entities
{
    public class User:IdentityUser<Guid>
    { 
      public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddelName { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Street { get; set; }    
        public string photoUrl { get; set; }    
        public string PublicId { get; set; }

        public ICollection<UserRole> UserRole { get; set; }
        public ICollection<Payment> Payments { get; set; }


    }
}