import {useQuery} from "@tanstack/react-query"; 
import apiClient from "../apiClient";
import { ProductList } from "../Types/Product";

export const useGetProductsQuery = () => 
    useQuery({
        queryKey: ["products"],
        queryFn: async () => (await apiClient.get<ProductList[]>("/products")).data
    })
