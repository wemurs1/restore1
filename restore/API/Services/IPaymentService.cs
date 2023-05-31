using API.Entities;
using Stripe;

namespace API.Services
{
    public interface IPaymentService
    {
        Task<PaymentIntent> CreateOrUpdatePaymentIntent(Basket basket);
    }
}