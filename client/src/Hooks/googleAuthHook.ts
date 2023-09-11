import {useQuery} from "@tanstack/react-query"; 
import apiClient from "../apiClient";

export const useGetGoogleAuth = () => 
    useQuery({
        queryKey: ["googleAuth"],
        queryFn: async () => (await apiClient.get("/auth/google")).data
    })
