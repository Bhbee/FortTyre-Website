import { useMutation } from "@tanstack/react-query"
import apiClient from "../apiClient"
import {ForgotPassword} from "../Types/ForgotPasswordType";

export const useForgotPasswordMutation = () => 
    useMutation({
        mutationFn: async({
            email
        }: {
            email: string,
        }) => (
            await apiClient.post<ForgotPassword>("/auth/forgot-password",{
                   email
            })   
        ).data
    })

