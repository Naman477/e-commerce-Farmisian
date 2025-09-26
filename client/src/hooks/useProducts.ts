import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Product } from '../types';

// Get all products
export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get('/api/products');
      return response.data.products;
    },
  });
};

// Get product by ID
export const useProductById = (id: string) => {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await axios.get(`/api/products/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

// Get categories
export const useCategories = () => {
  return useQuery<string[], Error>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get('/api/products/categories');
      return response.data;
    },
  });
};