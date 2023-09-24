import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { PaymentType } from "../Types/PaymentType";



export const usePostPaymentMutation = () => 
    useMutation({
        mutationFn: async({
            id,
            email,
            amount
        }: {id: string | undefined, email: string | undefined, amount: number | undefined}) => (await apiClient.post<PaymentType>( `/orders/${id}/pay?email=${email}/amount=${amount}`, {
            id, email, amount
        })
        ).data
    })