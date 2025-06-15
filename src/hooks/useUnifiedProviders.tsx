
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ServiceType } from '@/utils/serviceTypes';
import { ProviderProfile } from '@/types/providers';

interface UseUnifiedProvidersProps {
  userLocation?: { latitude: number; longitude: number } | null;
  searchTerm?: string;
  locationFilter?: string;
  serviceFilters?: ServiceType[];
  radiusKm?: number;
}

export const useUnifiedProviders = ({ 
  userLocation, 
  searchTerm, 
  locationFilter, 
  serviceFilters,
  radiusKm = 25
}: UseUnifiedProvidersProps) => {
  const { data: providers, isLoading, error } = useQuery({
    queryKey: ['unified-providers', userLocation, searchTerm, locationFilter, serviceFilters, radiusKm],
    queryFn: async () => {
      console.log('Fetching providers with unified search...');
      
      // Build the base query with proper relationships
      let query = supabase
        .from('providers')
        .select(`
          *,
          profiles(
            full_name,
            email
          ),
          provider_services(
            *,
            service_categories(*)
          )
        `);

      // Apply search filters
      const searchConditions = [];
      
      if (searchTerm) {
        searchConditions.push(`business_name.ilike.%${searchTerm}%`);
        searchConditions.push(`bio.ilike.%${searchTerm}%`);
      }
      
      if (locationFilter) {
        // Enhanced location search - handle postal codes and addresses
        const cleanLocation = locationFilter.trim().toLowerCase();
        searchConditions.push(`address.ilike.%${cleanLocation}%`);
        
        // Handle postal code formats (A1A 1A1 or A1A1A1)
        if (/^[a-z]\d[a-z]\s*\d[a-z]\d$/i.test(cleanLocation)) {
          const postalCode = cleanLocation.replace(/\s/g, '').toUpperCase();
          const formattedPostal = postalCode.replace(/(.{3})(.{3})/, '$1 $2');
          searchConditions.push(`address.ilike.%${postalCode}%`);
          searchConditions.push(`address.ilike.%${formattedPostal}%`);
        }
      }
      
      if (searchConditions.length > 0) {
        query = query.or(searchConditions.join(','));
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching providers:', error);
        throw error;
      }

      console.log('Unified providers found:', data?.length || 0);

      let processedProviders = (data || [])
        .filter(provider => provider.profiles)
        .map((provider): ProviderProfile => {
          const profile = provider.profiles;
          
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
            services: provider.provider_services || [],
            brief_description: provider.bio || '',
            service_area_city: provider.address?.split(',')[1]?.trim() || 'Unknown'
          };
        });

      // Apply service filters
      if (serviceFilters && serviceFilters.length > 0) {
        processedProviders = processedProviders.filter(provider => 
          provider.services?.some(service => 
            service.service_category?.name && 
            serviceFilters.some(filter => 
              service.service_category.name.toLowerCase().includes(filter.toLowerCase())
            )
          )
        );
      }

      // Calculate distance and apply radius filter if user location is available
      if (userLocation) {
        processedProviders = processedProviders
          .map(provider => {
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
          })
          .filter(provider => !provider.distance || provider.distance <= radiusKm);
        
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
        // Sort by rating and featured status
        processedProviders.sort((a, b) => {
          if (a.is_featured !== b.is_featured) {
            return b.is_featured ? 1 : -1;
          }
          
          const ratingA = a.average_rating || 0;
          const ratingB = b.average_rating || 0;
          if (ratingB !== ratingA) {
            return ratingB - ratingA;
          }
          
          if (a.address && b.address) {
            return a.address.localeCompare(b.address);
          }
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
