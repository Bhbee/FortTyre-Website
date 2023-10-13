import {useQuery} from "@tanstack/react-query"; 
import apiClient from "../apiClient";
import { ProductList} from "../Types/Product";

export const useGetFilterSearchQuery = (search: string | undefined) => 
    useQuery({
        queryKey: ["filterProducts", search],
        queryFn: async () =>
        {  if (search === undefined) {
        return { products: [] };
      }
return (await apiClient.get<ProductList>(`/products/search?brand=${search}`)).data 
            

    
        },
        enabled: false,

    })