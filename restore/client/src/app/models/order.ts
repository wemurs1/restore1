export interface ShippingAddress {
    fullName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export interface Orderitem {
    productId: number;
    name: string;
    pictureUrl: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: number;
    buyerId: string;
    shippingAddress: ShippingAddress;
    orderDate: string;
    orderitems: Orderitem[];
    subTotal: number;
    deliveryFee: number;
    orderStatus: string;
    total: number;
}

export interface OrderParams {
    pageNumber: number;
    pageSize: number;
  }