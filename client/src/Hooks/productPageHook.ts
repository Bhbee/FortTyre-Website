import { useQuery } from '@tanstack/react-query'
import { Product } from '../Types/Product'
import apiClient from "../apiClient"

export const useGetProductDetailsBySlugQuery = (id: string) =>
  useQuery({
    queryKey: ['products', id],
    queryFn: async () => 
      
(await apiClient.get<Product>(`/products/${id}`)).data, 
enabled: false
    

  })
