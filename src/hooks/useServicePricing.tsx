
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ServicePricing {
  service_type: string;
  base_price: number;
  duration_minutes: number;
  description: string;
}

export const useServicePricing = () => {
  const [servicePricing, setServicePricing] = useState<ServicePricing[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchServicePricing = async () => {
    setLoading(true);
    try {
      // Try direct table query first
      const { data, error } = await supabase
        .from('service_pricing')
        .select('*');
      
      if (!error && data) {
        setServicePricing(data);
      } else {
        console.log('Service pricing table not available, using fallback data');
        // Use fallback pricing
        setServicePricing([
          { service_type: 'deep_clean', base_price: 150, duration_minutes: 180, description: 'Comprehensive deep cleaning service' },
          { service_type: 'regular_clean', base_price: 80, duration_minutes: 120, description: 'Standard house cleaning' },
          { service_type: 'move_in_out', base_price: 200, duration_minutes: 240, description: 'Move-in or move-out cleaning' },
          { service_type: 'post_construction', base_price: 300, duration_minutes: 300, description: 'Post-construction cleanup' },
          { service_type: 'office_cleaning', base_price: 100, duration_minutes: 90, description: 'Office space cleaning' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching service pricing:', error);
      // Use fallback pricing on error
      setServicePricing([
        { service_type: 'deep_clean', base_price: 150, duration_minutes: 180, description: 'Comprehensive deep cleaning service' },
        { service_type: 'regular_clean', base_price: 80, duration_minutes: 120, description: 'Standard house cleaning' },
        { service_type: 'move_in_out', base_price: 200, duration_minutes: 240, description: 'Move-in or move-out cleaning' },
        { service_type: 'post_construction', base_price: 300, duration_minutes: 300, description: 'Post-construction cleanup' },
        { service_type: 'office_cleaning', base_price: 100, duration_minutes: 90, description: 'Office space cleaning' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicePricing();
  }, []);

  return {
    servicePricing,
    loading,
    fetchServicePricing
  };
};
