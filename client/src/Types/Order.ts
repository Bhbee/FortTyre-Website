import { OrderItems  } from "./CartItem";

export type Order = {
    orderItems: OrderItems,
    deliveryAddress: {
        fullname: string,
        address: string,
        city: string,
        country: string,
        _id: string,
        createdAt: string,
        updatedAt: string,
    },
    user: string,
    itemPrice: number,
    deliveryPrice: number,
    totalPrice: number,
    isPaid: boolean,
    isDelivered: boolean,
    _id: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}