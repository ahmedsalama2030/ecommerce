namespace Core.Dtos.Order
{
    public class RegisterOrderDto
    {
        public string firstName { get; set; }
        public string LastName { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }
        public int Price { get; set; }
        public bool IsPaidOnline { get; set; }
        public bool IsPaidOndelivery { get; set; }
    }
}