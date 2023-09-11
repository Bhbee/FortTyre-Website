import { useMutation } from "@tanstack/react-query";
import { OrderItems, DeliveryAddress, Cart } from "../Types/CartItem"; 
import { Order } from "../Types/Order";
import apiClient from "../apiClient";




export const useCreateOrderMutation = () => 
useMutation({
    mutationFn: async (order: {
        orderItems: OrderItems[],
        deliveryAddress: DeliveryAddress,
        itemPrice: number,
        deliveryPrice: number,
        totalPrice: number
    }) => (
        await apiClient.post<{message: string}>(
            "/orders", order
        )
    ).data 
})








