import {useQuery} from "@tanstack/react-query"; 
import apiClient from "../apiClient";

export const useGetGoogleAuthQuery = () => 
    useQuery({
        queryKey: ["googleAuth"],
        queryFn: async () => (await apiClient.get<string>("/auth/google")).data,
        enabled: false
    })
