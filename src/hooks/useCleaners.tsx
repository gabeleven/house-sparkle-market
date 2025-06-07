
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { isValidCleanerData } from '@/utils/typeGuards';

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
  services: string[] | null;
  hourly_rate: number | null;
  distance?: number;
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
      
      // Use a direct query to cleaner_profiles joined with profiles to get hourly_rate
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
            hourly_rate
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
        .filter(cleaner => cleaner.cleaner_profiles && cleaner.cleaner_profiles.length > 0)
        .map((cleaner): CleanerProfile => {
          const cleanerProfile = cleaner.cleaner_profiles[0];
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
            services: [] // Services will be fetched separately if needed
          };
        });

      // Calculate distances if user location is available
      if (userLocation && userLocation.latitude && userLocation.longitude) {
        const cleanersWithDistance = await Promise.all(
          processedCleaners.map(async (cleaner) => {
            if (cleaner.latitude && cleaner.longitude) {
              try {
                const { data: distance, error: distanceError } = await supabase.rpc('calculate_distance', {
                  lat1: userLocation.latitude,
                  lon1: userLocation.longitude,
                  lat2: cleaner.latitude,
                  lon2: cleaner.longitude
                });
                
                if (distanceError) {
                  console.error('Error calculating distance:', distanceError);
                  return cleaner;
                }
                
                return {
                  ...cleaner,
                  distance: typeof distance === 'number' ? distance : undefined
                };
              } catch (err) {
                console.error('Distance calculation failed:', err);
                return cleaner;
              }
            }
            return cleaner;
          })
        );

        // Sort by distance
        cleanersWithDistance.sort((a, b) => {
          if (a.distance && b.distance) return a.distance - b.distance;
          if (a.distance) return -1;
          if (b.distance) return 1;
          return 0;
        });

        return cleanersWithDistance;
      }

      return processedCleaners;
    }
  });

  return {
    cleaners: cleaners || [],
    isLoading,
    error
  };
};
