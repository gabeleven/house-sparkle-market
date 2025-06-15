
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ServiceType } from '@/utils/serviceTypes';
import { ProviderProfile, ProviderService } from '@/types/providers';

interface UseProvidersProps {
  userLocation?: { latitude: number; longitude: number } | null;
  searchTerm?: string;
  locationFilter?: string;
  serviceFilters?: ServiceType[];
}

export const useProviders = ({ userLocation, searchTerm, locationFilter, serviceFilters }: UseProvidersProps) => {
  const { data: providers, isLoading, error } = useQuery({
    queryKey: ['providers', userLocation, searchTerm, locationFilter, serviceFilters],
    queryFn: async () => {
      console.log('Fetching service providers with enhanced search...');
      
      // Query providers with proper join to profiles using inner join
      let query = supabase
        .from('providers')
        .select(`
          *,
          profiles!inner(
            full_name,
            email
          ),
          provider_services(
            id,
            provider_id,
            service_category_id,
            description,
            base_price,
            price_unit,
            is_available,
            created_at,
            service_categories(
              id,
              name,
              description,
              icon_name,
              color_class,
              is_active,
              created_at,
              updated_at
            )
          )
        `)
        .eq('profiles.id', 'providers.user_id');

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

      let processedProviders = (data || [])
        .filter(provider => provider.profiles)
        .map((provider): ProviderProfile => {
          const profile = Array.isArray(provider.profiles) ? provider.profiles[0] : provider.profiles;
          
          // Transform provider_services to proper ProviderService format
          const transformedServices: ProviderService[] = (provider.provider_services || []).map((service: any) => ({
            id: service.id,
            provider_id: service.provider_id,
            service_category_id: service.service_category_id,
            description: service.description,
            base_price: service.base_price,
            price_unit: service.price_unit || 'hour',
            is_available: service.is_available,
            created_at: service.created_at,
            service_category: service.service_categories ? {
              id: service.service_categories.id,
              name: service.service_categories.name,
              description: service.service_categories.description,
              icon_name: service.service_categories.icon_name,
              color_class: service.service_categories.color_class,
              is_active: service.service_categories.is_active,
              created_at: service.service_categories.created_at,
              updated_at: service.service_categories.updated_at
            } : undefined
          }));

          return {
            id: provider.id,
            user_id: provider.user_id,
            email: profile?.email || '',
            full_name: profile?.full_name || '',
            business_name: provider.business_name,
            bio: provider.bio,
            phone: provider.phone,
            address: provider.address,
            latitude: provider.latitude,
            longitude: provider.longitude,
            service_radius_km: provider.service_radius_km,
            years_experience: provider.years_experience,
            hourly_rate: provider.hourly_rate,
            average_rating: provider.average_rating,
            total_reviews: provider.total_reviews,
            profile_photo_url: provider.profile_photo_url,
            banner_image_url: provider.banner_image_url,
            is_featured: provider.is_featured,
            is_profile_complete: provider.is_profile_complete,
            created_at: provider.created_at,
            updated_at: provider.updated_at,
            services: transformedServices,
            // Add required ProviderProfile compatibility properties
            brief_description: provider.bio || '',
            service_area_city: provider.address?.split(',')[1]?.trim() || 'Unknown'
          };
        });

      // Apply service type filtering if specified
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

      // Sort by average rating first (highest first), then by address
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

      return processedProviders;
    }
  });

  return {
    providers: providers || [],
    isLoading,
    error
  };
};

// Legacy export for backward compatibility
export const useCleaners = useProviders;
