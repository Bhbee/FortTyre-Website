import { useMutation } from "@tanstack/react-query"
import apiClient from "../apiClient"
import { UserSignUpMessage } from "../Types/UserSignUpMessage"

export const useSignUpMutation = () => 
    useMutation({
        mutationFn: async ({
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
        }: {
            firstName: string,
            lastName: string,
            email: string,
            phoneNumber: string,
            password: string
        }) => (
            await apiClient.post<UserSignUpMessage>("/auth/sign-up", {
                firstName,
                lastName,
                email,
                phoneNumber,
                password

            })
        ).data
    })
