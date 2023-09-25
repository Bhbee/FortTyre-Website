import apiClient from "../apiClient";
import { useQuery } from "@tanstack/react-query";


export const useGetLogoutQuery = () => 
    useQuery({
        queryKey: ["logout"],
        queryFn: async () => (await apiClient.get("/auth/sign-out")).data,
        enabled: false
    })