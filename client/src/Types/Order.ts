import { OrderItems,  DeliveryAddress } from "./CartItem";
import { User } from './User'
export type Order = {
    deliveryAddress: DeliveryAddress
    orderItems: OrderItems[]
    user: User
    userEmail: string
    itemPrice: number
    deliveryPrice: number
    totalPrice: number
    isPaid: boolean
    isDelivered: boolean
    _id: string
    createdAt: string
    updatedAt: string
    _v: number

}