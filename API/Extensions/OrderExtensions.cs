using API.DTOs;
using API.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrderDto> ProjectOrderToOrderDto(this IQueryable<Order> query)
        {
            return query
                .Select(order => new OrderDto
                {
                    Id = order.Id,
                    BuyerId = order.BuyerId,
                    ShippingAddress = order.ShippingAddress,
                    OrderDate = order.OrderDate,
                    SubTotal = order.Subtotal,
                    DeliveryFee = order.DeliveryFee,
                    OrderStatus = order.OrderStatus.ToString(),
                    Total = order.GetTotal(),
                    OrderItems = order.OrderItems.Select(orderItem => new OrderItemDto
                    {
                        ProductId = orderItem.ItemOrdered!.ProductId,
                        Name = orderItem.ItemOrdered.Name,
                        PictureUrl = orderItem.ItemOrdered.PictureUrl,
                        Price = orderItem.Price,
                        Quantity = orderItem.Quantity
                    }).ToList()
                }).AsNoTracking();
        }
    }
}