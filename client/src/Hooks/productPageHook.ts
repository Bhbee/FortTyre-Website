import { useQuery } from '@tanstack/react-query'
import { Product } from '../Types/Product'
import apiClient from "../apiClient"

export const useGetProductDetailsBySlugQuery = (id: string) =>
  useQuery({
    queryKey: ['products', id],
    queryFn: async () =>
      (await apiClient.get<Product>(`api/products/${id}`)).data,
  })
