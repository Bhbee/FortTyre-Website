import { useMutation, useQuery } from "@tanstack/react-query";
import { OrderItems, DeliveryAddress} from "../Types/CartItem"; 
import { Order } from "../Types/Order";
import apiClient from "../apiClient";


export const useCreateOrderMutation = () => 
useMutation({
    mutationFn: async (order: {
        orderItems: OrderItems[]
        deliveryAddress: DeliveryAddress
        itemPrice: number
        deliveryPrice: number
        totalPrice: number
    }) => (
        await apiClient.post<{message: string, order: Order}>(
            `/orders`, order
        )
    ).data 
})

export const useGetOrderDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ['orders', id],
    queryFn: async () => (await apiClient.get<Order>(`/orders/${id}`)).data,
    enabled: false
  })







