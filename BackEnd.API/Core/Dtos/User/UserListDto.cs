using System;

namespace Core.Dtos.User
{
    public class UserListDto
    {

        public Guid Id { get; set; }
         public string UserName { get; set; }
         public string Email { get; set; }
         public string FirstName { get; set; }
         public string PhoneNumber { get; set; }
        public string LastName { get; set; }
        public string MiddelName { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Street { get; set; }   
        public string Password { get; set; }   
         public string photoUrl { get; set; } 
    }
}