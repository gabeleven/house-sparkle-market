
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProviderProfile } from '@/types/providers';
import { ServiceType } from '@/utils/serviceTypes';
import { useLocationSearch } from './useLocationSearch';

interface UseEnhancedProvidersProps {
  userLocation?: { latitude: number; longitude: number } | null;
  searchTerm?: string;
  locationFilter?: string;
  serviceFilters?: ServiceType[];
}

export const useEnhancedProviders = ({ 
  userLocation, 
  searchTerm, 
  locationFilter, 
  serviceFilters 
}: UseEnhancedProvidersProps) => {
  const { parseLocationQuery, generateSearchQueries, buildLocationFilter } = useLocationSearch();

  const { data: providers, isLoading, error } = useQuery({
    queryKey: ['enhanced-providers', userLocation, searchTerm, locationFilter, serviceFilters],
    queryFn: async () => {
      console.log('Fetching providers with enhanced location search...');
      
      // Build the base query
      let query = supabase
        .from('providers')
        .select(`
          *,
          profiles!providers_user_id_fkey(
            full_name,
            email
          ),
          provider_services(
            *,
            service_categories(*)
          )
        `);

      // Apply business name/bio search if searchTerm is provided
      if (searchTerm) {
        query = query.or(`business_name.ilike.%${searchTerm}%,bio.ilike.%${searchTerm}%`);
      }

      // Enhanced location filtering
      if (locationFilter) {
        const locationComponents = parseLocationQuery(locationFilter);
        const searchQueries = generateSearchQueries(locationComponents);
        
        console.log('Location components:', locationComponents);
        console.log('Generated search queries:', searchQueries);
        
        // Build OR conditions for address matching
        const locationConditions = searchQueries
          .map(searchQuery => `address.ilike.%${searchQuery}%`)
          .join(',');
        
        if (locationConditions) {
          query = query.or(locationConditions);
        }
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching providers:', error);
        throw error;
      }

      console.log('Enhanced providers found:', data?.length || 0);

      let processedProviders = (data || [])
        .filter(provider => provider.profiles)
        .map((provider): ProviderProfile => {
          const profile = Array.isArray(provider.profiles) ? provider.profiles[0] : provider.profiles;
          return {
            id: provider.id,
            user_id: provider.user_id,
            business_name: provider.business_name,
            bio: provider.bio,
            phone: provider.phone,
            address: provider.address,
            latitude: provider.latitude,
            longitude: provider.longitude,
            service_radius_km: provider.service_radius_km,
            hourly_rate: provider.hourly_rate,
            years_experience: provider.years_experience,
            profile_photo_url: provider.profile_photo_url,
            banner_image_url: provider.banner_image_url,
            is_featured: provider.is_featured,
            is_profile_complete: provider.is_profile_complete,
            average_rating: provider.average_rating,
            total_reviews: provider.total_reviews,
            created_at: provider.created_at,
            updated_at: provider.updated_at,
            full_name: profile?.full_name || '',
            email: profile?.email || '',
            services: provider.provider_services || []
          };
        });

      // Apply service filters if specified
      if (serviceFilters && serviceFilters.length > 0) {
        processedProviders = processedProviders.filter(provider => 
          provider.services?.some(service => 
            service.service_categories?.name && 
            serviceFilters.some(filter => 
              service.service_categories.name.toLowerCase().includes(filter.toLowerCase())
            )
          )
        );
      }

      // Calculate distance if user location is available
      if (userLocation) {
        processedProviders = processedProviders.map(provider => {
          if (provider.latitude && provider.longitude) {
            const distance = calculateDistance(
              userLocation.latitude,
              userLocation.longitude,
              Number(provider.latitude),
              Number(provider.longitude)
            );
            return { ...provider, distance };
          }
          return provider;
        });
        
        // Sort by distance first, then by rating
        processedProviders.sort((a, b) => {
          if (a.distance !== undefined && b.distance !== undefined) {
            return a.distance - b.distance;
          }
          if (a.distance !== undefined) return -1;
          if (b.distance !== undefined) return 1;
          
          const ratingA = a.average_rating || 0;
          const ratingB = b.average_rating || 0;
          return ratingB - ratingA;
        });
      } else {
        // Sort by rating if no location
        processedProviders.sort((a, b) => {
          const ratingA = a.average_rating || 0;
          const ratingB = b.average_rating || 0;
          if (ratingB !== ratingA) {
            return ratingB - ratingA;
          }
          
          if (a.address && b.address) {
            return a.address.localeCompare(b.address);
          }
          if (a.address) return -1;
          if (b.address) return 1;
          return 0;
        });
      }

      return processedProviders;
    }
  });

  return {
    providers: providers || [],
    isLoading,
    error
  };
};

// Haversine formula to calculate distance between two points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
