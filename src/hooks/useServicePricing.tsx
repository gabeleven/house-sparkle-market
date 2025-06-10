
import { useState, useEffect } from 'react';

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
      // Use fallback pricing data since service_pricing table doesn't exist yet
      const fallbackPricing: ServicePricing[] = [
        { service_type: 'deep_clean', base_price: 150, duration_minutes: 180, description: 'Comprehensive deep cleaning service' },
        { service_type: 'regular_clean', base_price: 80, duration_minutes: 120, description: 'Standard house cleaning' },
        { service_type: 'move_in_out', base_price: 200, duration_minutes: 240, description: 'Move-in or move-out cleaning' },
        { service_type: 'post_construction', base_price: 300, duration_minutes: 300, description: 'Post-construction cleanup' },
        { service_type: 'office_cleaning', base_price: 100, duration_minutes: 90, description: 'Office space cleaning' }
      ];
      
      setServicePricing(fallbackPricing);
    } catch (error) {
      console.error('Error fetching service pricing:', error);
      // Set fallback data on error
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
