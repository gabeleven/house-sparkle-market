
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { isValidCleanerData } from '@/utils/typeGuards';
import { ServiceType } from '@/utils/serviceTypes';

export interface CleanerProfile {
  id: string;
  full_name: string;
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
      console.log('Fetching cleaners from database...');
      
      // Use a direct query to cleaner_profiles joined with profiles to get hourly_rate and review data
      let query = supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          profile_photo_url,
          cleaner_profiles!inner(
            business_name,
            brief_description,
            latitude,
            longitude,
            service_radius_km,
            years_experience,
            service_area_city,
            hourly_rate,
            average_rating,
            total_reviews
          )
        `)
        .eq('user_role', 'cleaner');

      // Apply search filters
      if (searchTerm) {
        query = query.or(`full_name.ilike.%${searchTerm}%,cleaner_profiles.business_name.ilike.%${searchTerm}%,cleaner_profiles.brief_description.ilike.%${searchTerm}%`);
      }

      if (locationFilter) {
        query = query.ilike('cleaner_profiles.service_area_city', `%${locationFilter}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching cleaners:', error);
        throw error;
      }

      console.log('Fetched cleaners:', data);
      console.log('Number of cleaners found:', data?.length || 0);

      let processedCleaners = (data || [])
        .filter(cleaner => cleaner.cleaner_profiles)
        .map((cleaner): CleanerProfile => {
          const cleanerProfile = cleaner.cleaner_profiles;
          return {
            id: cleaner.id || '',
            full_name: cleaner.full_name || '',
            business_name: cleanerProfile.business_name,
            brief_description: cleanerProfile.brief_description,
            profile_photo_url: cleaner.profile_photo_url,
            latitude: cleanerProfile.latitude,
            longitude: cleanerProfile.longitude,
            service_radius_km: cleanerProfile.service_radius_km,
            years_experience: cleanerProfile.years_experience,
            service_area_city: cleanerProfile.service_area_city,
            hourly_rate: cleanerProfile.hourly_rate,
            average_rating: cleanerProfile.average_rating,
            total_reviews: cleanerProfile.total_reviews,
            services: [] // Will be fetched separately
          };
        });

      // Fetch services for each cleaner
      for (const cleaner of processedCleaners) {
        try {
          const { data: servicesData } = await supabase
            .from('cleaner_service_types')
            .select('service_type')
            .eq('cleaner_id', cleaner.id);

          cleaner.services = servicesData?.map(s => s.service_type as ServiceType) || [];
        } catch (error) {
          console.error(`Error fetching services for cleaner ${cleaner.id}:`, error);
          cleaner.services = [];
        }
      }

      // Sort by average rating first (highest first), then by service area city
      processedCleaners.sort((a, b) => {
        // First sort by rating (descending)
        const ratingA = a.average_rating || 0;
        const ratingB = b.average_rating || 0;
        if (ratingB !== ratingA) {
          return ratingB - ratingA;
        }
        
        // Then by city name
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
