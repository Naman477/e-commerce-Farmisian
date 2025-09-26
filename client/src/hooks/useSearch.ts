import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Product } from '../types';

interface SearchParams {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export const useSearchProducts = (params: SearchParams) => {
  return useQuery<Product[], Error>({
    queryKey: ['search', params],
    queryFn: async () => {
      const response = await axios.get('/api/products/search', { params });
      return response.data.products;
    },
    placeholderData: (previousData) => previousData,
  });
};