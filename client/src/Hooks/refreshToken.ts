import apiClient from "../apiClient";
import { useQuery } from "@tanstack/react-query";
import { UserToken } from "../Types/UserAccessTokenType";

export const useGetRefreshTokenQuery = () => 
    useQuery({
        queryKey: ["refreshToken"],
        queryFn: async () => (await apiClient.get<UserToken>("/auth/refresh")).data,
        enabled: false
    })