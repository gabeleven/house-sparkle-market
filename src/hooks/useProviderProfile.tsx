
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Provider, CreateProviderServiceData } from '@/types/providers';
import { useToast } from '@/hooks/use-toast';

export const useProviderProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: provider, isLoading, error } = useQuery({
    queryKey: ['provider-profile', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('providers')
        .select(`
          *,
          provider_services(
            *,
            service_categories(*)
          )
        `)
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching provider profile:', error);
        throw error;
      }

      return data as Provider;
    },
    enabled: !!user,
  });

  const createProvider = useMutation({
    mutationFn: async (providerData: Partial<Provider>) => {
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('providers')
        .insert({
          ...providerData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider-profile'] });
      toast({
        title: "Provider profile created",
        description: "Your provider profile has been created successfully.",
      });
    },
    onError: (error) => {
      console.error('Error creating provider profile:', error);
      toast({
        title: "Error",
        description: "Failed to create provider profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateProvider = useMutation({
    mutationFn: async (providerData: Partial<Provider>) => {
      if (!user || !provider) throw new Error('User not authenticated or no provider profile');

      const { data, error } = await supabase
        .from('providers')
        .update(providerData)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider-profile'] });
      toast({
        title: "Profile updated",
        description: "Your provider profile has been updated successfully.",
      });
    },
    onError: (error) => {
      console.error('Error updating provider profile:', error);
      toast({
        title: "Error",
        description: "Failed to update provider profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addService = useMutation({
    mutationFn: async (serviceData: CreateProviderServiceData) => {
      if (!provider) throw new Error('No provider profile found');

      const { data, error } = await supabase
        .from('provider_services')
        .insert({
          provider_id: provider.id,
          service_category_id: serviceData.service_category_id,
          description: serviceData.description,
          base_price: serviceData.base_price,
          price_unit: serviceData.price_unit || 'hour',
          is_available: serviceData.is_available ?? true,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider-profile'] });
      toast({
        title: "Service added",
        description: "Service has been added to your profile.",
      });
    },
    onError: (error) => {
      console.error('Error adding service:', error);
      toast({
        title: "Error",
        description: "Failed to add service. Please try again.",
        variant: "destructive",
      });
    },
  });

  const removeService = useMutation({
    mutationFn: async (serviceId: string) => {
      const { error } = await supabase
        .from('provider_services')
        .delete()
        .eq('id', serviceId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['provider-profile'] });
      toast({
        title: "Service removed",
        description: "Service has been removed from your profile.",
      });
    },
    onError: (error) => {
      console.error('Error removing service:', error);
      toast({
        title: "Error",
        description: "Failed to remove service. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    provider,
    isLoading,
    error,
    createProvider,
    updateProvider,
    addService,
    removeService,
  };
};
