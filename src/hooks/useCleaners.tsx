
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
      
      let query = supabase
        .from('cleaners_with_profiles')
        .select('*');

      // Apply search filters
      if (searchTerm) {
        query = query.or(`full_name.ilike.%${searchTerm}%,business_name.ilike.%${searchTerm}%,brief_description.ilike.%${searchTerm}%`);
      }

      if (locationFilter) {
        query = query.ilike('service_area_city', `%${locationFilter}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching cleaners:', error);
        throw error;
      }

      console.log('Fetched cleaners:', data);
      console.log('Number of cleaners found:', data?.length || 0);

      let processedCleaners = (data || [])
        .filter(cleaner => isValidCleanerData(cleaner))
        .map((cleaner): CleanerProfile => ({
          id: cleaner.id || '',
          full_name: cleaner.full_name || '',
          business_name: cleaner.business_name,
          brief_description: cleaner.brief_description,
          profile_photo_url: cleaner.profile_photo_url,
          latitude: cleaner.latitude,
          longitude: cleaner.longitude,
          service_radius_km: cleaner.service_radius_km,
          years_experience: cleaner.years_experience,
          service_area_city: cleaner.service_area_city,
          services: cleaner.services || []
        }));

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
