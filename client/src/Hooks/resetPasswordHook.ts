import { useMutation } from "@tanstack/react-query"
import apiClient from "../apiClient"
import {ResetPassword} from "../Types/ResetPasswordType";

export const useResetPasswordHookMutation = () => 
 useMutation({
        mutationFn: async({
            password,
        }: {
            password: string,
        }) => (
            await apiClient.post<ResetPassword>("/auth/reset-password",{
                   password
            })   
        ).data
    })