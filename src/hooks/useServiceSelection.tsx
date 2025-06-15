
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ServiceType } from '@/utils/serviceTypes';
import { useAuth } from '@/hooks/useAuth';

export const useServiceSelection = (providerId: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [providerRecordId, setProviderRecordId] = useState<string | null>(null);

  const verifyProviderProfile = async () => {
    try {
      console.log('useServiceSelection: Verifying provider profile exists for:', providerId);
      const { data: provider, error } = await supabase
        .from('providers')
        .select('id')
        .eq('user_id', providerId)
        .maybeSingle();

      if (error) {
        console.error('Error checking provider profile:', error);
        setError('Unable to verify provider profile. Please refresh the page.');
        return null;
      }

      if (!provider) {
        console.error('Provider profile not found for:', providerId);
        setError('Provider profile not found. Please complete your profile setup first.');
        return null;
      }

      console.log('useServiceSelection: Provider profile verified, ID:', provider.id);
      setProviderRecordId(provider.id);
      return provider.id;
    } catch (error) {
      console.error('Error verifying provider profile:', error);
      setError('Unable to verify provider profile. Please refresh the page.');
      return null;
    }
  };

  const loadSelectedServices = async () => {
    try {
      setError(null);
      
      const providerIdResult = await verifyProviderProfile();
      if (!providerIdResult) {
        setLoading(false);
        return;
      }

      console.log('useServiceSelection: Loading selected services for provider:', providerIdResult);
      const { data, error } = await supabase
        .from('provider_services')
        .select(`
          service_categories(name)
        `)
        .eq('provider_id', providerIdResult)
        .eq('is_available', true);

      if (error) {
        console.error('Error loading services:', error);
        setError('Failed to load service types. Please try again.');
      } else {
        const services = data?.map(item => item.service_categories?.name as ServiceType).filter(Boolean) || [];
        console.log('useServiceSelection: Loaded services:', services);
        setSelectedServices(services);
      }
    } catch (error) {
      console.error('Error loading services:', error);
      setError('Failed to load service types. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleServiceChange = async (serviceType: ServiceType, checked: boolean) => {
    if (!user || !providerRecordId) {
      console.error('useServiceSelection: No user or provider ID found');
      return;
    }

    console.log('useServiceSelection: Changing service', serviceType, 'to', checked);

    try {
      if (checked) {
        const { data: category, error: categoryError } = await supabase
          .from('service_categories')
          .select('id')
          .eq('name', serviceType)
          .single();

        if (categoryError) {
          console.error('Error finding service category:', categoryError);
          throw categoryError;
        }

        const { error } = await supabase
          .from('provider_services')
          .insert({
            provider_id: providerRecordId,
            service_category_id: category.id,
            is_available: true
          });

        if (error) throw error;
        setSelectedServices(prev => [...prev, serviceType]);
        console.log('useServiceSelection: Added service:', serviceType);
      } else {
        const { data: category, error: categoryError } = await supabase
          .from('service_categories')
          .select('id')
          .eq('name', serviceType)
          .single();

        if (categoryError) {
          console.error('Error finding service category:', categoryError);
          throw categoryError;
        }

        const { error } = await supabase
          .from('provider_services')
          .delete()
          .eq('provider_id', providerRecordId)
          .eq('service_category_id', category.id);

        if (error) throw error;
        setSelectedServices(prev => prev.filter(s => s !== serviceType));
        console.log('useServiceSelection: Removed service:', serviceType);
      }

      toast({
        title: "Success",
        description: `Service ${checked ? 'added' : 'removed'} successfully`
      });
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: "Error",
        description: "Failed to update service",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (providerId) {
      console.log('useServiceSelection: Loading services for user:', providerId);
      loadSelectedServices();
    }
  }, [providerId]);

  return {
    selectedServices,
    loading,
    error,
    handleServiceChange
  };
};
