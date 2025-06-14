
import { useCallback } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export const useUserLocationData = () => {
  const { user } = useAuth();

  const loadProviderLocation = useCallback(async () => {
    if (!user) return null;

    try {
      // Get provider's service area data
      const { data: providerProfile } = await supabase
        .from('providers')
        .select('address, service_radius_km, latitude, longitude')
        .eq('user_id', user.id)
        .single();

      return providerProfile;
    } catch (error) {
      console.error('Error loading provider location:', error);
      return null;
    }
  }, [user]);

  const loadCustomerLocation = useCallback(async () => {
    if (!user) return null;

    try {
      // Get customer's location if available
      const { data: customerProfile } = await supabase
        .from('customer_profiles')
        .select('latitude, longitude')
        .eq('id', user.id)
        .single();

      return customerProfile;
    } catch (error) {
      console.error('Error loading customer location:', error);
      return null;
    }
  }, [user]);

  return { loadProviderLocation, loadCustomerLocation };
};
