
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ServiceType } from '@/utils/serviceTypes';

export interface CleanerProfile {
  id: string;
  user_id?: string;
  full_name: string;
  email: string;
  business_name: string | null;
  brief_description: string | null;
  profile_photo_url: string | null;
  latitude: number | null;
  longitude: number | null;
  service_radius_km: number | null;
  years_experience: number | null;
  service_area_city: string | null;
  services: ServiceType[] | null;
  hourly_rate: number | null;
  distance?: number;
  average_rating: number | null;
  total_reviews: number | null;
}

interface UseCleanersProps {
  userLocation?: { latitude: number; longitude: number } | null;
  searchTerm?: string;
  locationFilter?: string;
}

export const useCleaners = ({ userLocation, searchTerm, locationFilter }: UseCleanersProps) => {
  const { data: cleaners, isLoading, error } = useQuery({
    queryKey: ['cleaners', userLocation, searchTerm, locationFilter],
    queryFn: async () => {
      console.log('Fetching service providers with enhanced search...');
      
      // Query providers with proper join to profiles using the new foreign key constraint
      let query = supabase
        .from('providers')
        .select(`
          *,
          profiles!fk_providers_user_id(
            full_name,
            email
          ),
          provider_services!inner(
            service_categories!inner(name)
          )
        `)
        .eq('provider_services.service_categories.name', 'cleaning');

      // Apply enhanced search filters including addresses
      if (searchTerm) {
        query = query.or(`business_name.ilike.%${searchTerm}%,bio.ilike.%${searchTerm}%,address.ilike.%${searchTerm}%`);
      }

      // Enhanced location filtering - search in address field for better coverage
      if (locationFilter) {
        query = query.or(`address.ilike.%${locationFilter}%,business_name.ilike.%${locationFilter}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching service providers:', error);
        throw error;
      }

      console.log('Successfully fetched service providers with enhanced search:', data);
      console.log('Number of service providers found:', data?.length || 0);

      let processedCleaners = (data || [])
        .filter(provider => provider.profiles)
        .map((provider): CleanerProfile => {
          const profile = Array.isArray(provider.profiles) ? provider.profiles[0] : provider.profiles;
          return {
            id: provider.user_id,
            user_id: provider.user_id,
            email: profile?.email || '',
            full_name: profile?.full_name || '',
            business_name: provider.business_name,
            brief_description: provider.bio,
            profile_photo_url: provider.profile_photo_url,
            latitude: provider.latitude,
            longitude: provider.longitude,
            service_radius_km: provider.service_radius_km,
            years_experience: provider.years_experience,
            service_area_city: provider.address, // Use address field for location display
            hourly_rate: provider.hourly_rate,
            average_rating: provider.average_rating,
            total_reviews: provider.total_reviews,
            services: []
          };
        });

      // Sort by average rating first (highest first), then by address
      processedCleaners.sort((a, b) => {
        const ratingA = a.average_rating || 0;
        const ratingB = b.average_rating || 0;
        if (ratingB !== ratingA) {
          return ratingB - ratingA;
        }
        
        if (a.service_area_city && b.service_area_city) {
          return a.service_area_city.localeCompare(b.service_area_city);
        }
        if (a.service_area_city) return -1;
        if (b.service_area_city) return 1;
        return 0;
      });

      return processedCleaners;
    }
  });

  return {
    cleaners: cleaners || [],
    isLoading,
    error
  };
};
