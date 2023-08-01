import { useMutation } from "@tanstack/react-query"
import apiClient from "../apiClient"
import { UserSignUpMessage } from "../Types/UserSignUpMessage"

export const useSignUpMutation = () => 
    useMutation({
        mutationFn: async ({
            first_name,
            last_name,
            email,
            phone_number,
            password,
        }: {
            first_name: string,
            last_name: string,
            email: string,
            phone_number: string,
            password: string
        }) => (
            await apiClient.post<UserSignUpMessage>("/auth/sign-up", {
                first_name,
                last_name,
                email,
                phone_number,
                password

            })
        ).data
    })
