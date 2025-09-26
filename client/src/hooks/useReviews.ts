import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Review } from '../types';

// Get reviews for a product
export const useProductReviews = (productId: string) => {
  return useQuery<Review[], Error>({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const response = await axios.get(`/api/products/${productId}/reviews`);
      return response.data;
    },
    enabled: !!productId,
  });
};

// Add a review
export const useAddReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ productId, review }: { productId: string; review: Omit<Review, 'id' | 'createdAt'> }) => {
      const response = await axios.post(`/api/products/${productId}/reviews`, review);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.productId] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.productId] });
    },
  });
};