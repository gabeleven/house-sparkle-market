
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Review } from '@/types/reviews';
import { useToast } from '@/hooks/use-toast';

interface UseReviewsProps {
  cleanerId?: string;
  customerId?: string;
}

interface CreateReviewData {
  booking_id: string;
  reviewee_id: string;
  reviewer_type: 'customer' | 'cleaner';
  rating: number;
  title?: string;
  comment?: string;
  photos?: string[];
}

export const useReviews = ({ cleanerId, customerId }: UseReviewsProps = {}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reviews, isLoading, error } = useQuery({
    queryKey: ['reviews', cleanerId, customerId],
    queryFn: async () => {
      let query = supabase
        .from('reviews')
        .select(`
          *,
          reviewer_profile:profiles!reviewer_id(
            full_name,
            profile_photo_url
          )
        `)
        .order('created_at', { ascending: false });

      if (cleanerId) {
        query = query.eq('reviewee_id', cleanerId);
      }
      if (customerId) {
        query = query.eq('reviewee_id', customerId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching reviews:', error);
        throw error;
      }

      return data as Review[];
    },
    enabled: !!(cleanerId || customerId),
  });

  const createReview = useMutation({
    mutationFn: async (reviewData: CreateReviewData) => {
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          ...reviewData,
          reviewer_id: (await supabase.auth.getUser()).data.user?.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });
    },
    onError: (error) => {
      console.error('Error creating review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addCleanerResponse = useMutation({
    mutationFn: async ({ reviewId, response }: { reviewId: string; response: string }) => {
      const { data, error } = await supabase
        .from('reviews')
        .update({
          cleaner_response: response,
          cleaner_response_date: new Date().toISOString(),
        })
        .eq('id', reviewId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast({
        title: "Response added",
        description: "Your response has been added to the review.",
      });
    },
    onError: (error) => {
      console.error('Error adding response:', error);
      toast({
        title: "Error",
        description: "Failed to add response. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    reviews: reviews || [],
    isLoading,
    error,
    createReview,
    addCleanerResponse,
  };
};
