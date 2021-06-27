 
namespace Core.Interfaces.payments
{
    public interface IPaymentDelivery
    {
      Core.Entities.Order  ChargeOnDelivery (Core.Entities.Order order);

    }
}