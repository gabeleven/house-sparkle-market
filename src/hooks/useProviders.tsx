
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Provider, ProviderProfile, ServiceCategory } from '@/types/providers';

interface UseProvidersProps {
  userLocation?: { latitude: number; longitude: number } | null;
  searchTerm?: string;
  locationFilter?: string;
  serviceCategory?: string;
}

export const useProviders = ({ userLocation, searchTerm, locationFilter, serviceCategory }: UseProvidersProps) => {
  const { data: providers, isLoading, error } = useQuery({
    queryKey: ['providers', userLocation, searchTerm, locationFilter, serviceCategory],
    queryFn: async () => {
      console.log('Fetching providers from database...');
      
      // Build the query for providers with their profile data
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

      // Apply search filters
      if (searchTerm) {
        query = query.or(`business_name.ilike.%${searchTerm}%,bio.ilike.%${searchTerm}%`);
      }

      if (locationFilter) {
        query = query.ilike('address', `%${locationFilter}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching providers:', error);
        throw error;
      }

      console.log('Fetched providers:', data);
      console.log('Number of providers found:', data?.length || 0);

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
            services: provider.provider_services?.map(service => service.service_category?.name).filter(Boolean) || [],
            // Add required CleanerProfile properties with defaults
            brief_description: provider.bio || '',
            service_area_city: provider.address?.split(',')[1]?.trim() || 'Unknown'
          };
        });

      // Filter by service category if specified
      if (serviceCategory) {
        processedProviders = processedProviders.filter(provider => 
          provider.services?.includes(serviceCategory)
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

export const useServiceCategories = () => {
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['service-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_categories')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) {
        console.error('Error fetching service categories:', error);
        throw error;
      }

      return data as ServiceCategory[];
    }
  });

  return {
    categories: categories || [],
    isLoading,
    error
  };
};
