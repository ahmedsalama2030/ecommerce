using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Core.Entities
{
    public class Role:IdentityRole<Guid>
    {
         public string NameAr { get; set; }
         public ICollection<UserRole>  UserRole { get; set; }  
    }
}