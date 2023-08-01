import { useMutation } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { UserToken } from "../Types/UserAccessTokenType";


export const useLoginMutation = () => 
    useMutation({
        mutationFn: async({
            email,
            password,
        }: {
            email: string,
            password: string,
        }) => (
            await apiClient.post<UserToken>("/auth/sign-in", {
                email,
                password,
            })
        ).data
    })
