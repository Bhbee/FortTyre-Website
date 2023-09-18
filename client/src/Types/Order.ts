import { OrderItems,  DeliveryAddress } from "./CartItem";
import { User } from './User'
export type Order = {
    deliveryAddress: DeliveryAddress
    orderItems: OrderItems[]
    user: User
    itemPrice: number
    deliveryPrice: number
    totalPrice: number
    isPaid: boolean
    paidAt: string
    isDelivered: boolean
    _id: string
    createdAt: string
}