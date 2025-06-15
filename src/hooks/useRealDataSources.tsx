
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CanadianCity } from './useCitySelection';

export type DataSource = 'real-time' | 'historical' | 'projected' | 'estimated' | 'collecting';

export interface DataSourceInfo {
  source: DataSource;
  label: string;
  description: string;
  lastUpdated?: Date;
  reliability: 'high' | 'medium' | 'low';
}

export interface CityBusinessData {
  city: string;
  providerCount: number;
  totalBookings: number;
  averageRevenue: number;
  marketPenetration: number;
  dataSource: DataSourceInfo;
}

export const useRealDataSources = (selectedCity: CanadianCity) => {
  const [businessData, setBusinessData] = useState<CityBusinessData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCityBusinessData();
  }, [selectedCity]);

  const fetchCityBusinessData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get real provider data for the selected city
      const { data: providers, error: providerError } = await supabase
        .from('providers')
        .select('id, address, latitude, longitude')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null);

      if (providerError) throw providerError;

      // Get real booking data
      const { data: bookings, error: bookingError } = await supabase
        .from('bookings')
        .select('id, total_amount, created_at, provider_id')
        .not('total_amount', 'is', null);

      if (bookingError) throw bookingError;

      // Filter providers near the selected city (within ~50km)
      const cityProviders = providers?.filter(provider => {
        if (!provider.latitude || !provider.longitude) return false;
        
        const distance = calculateDistance(
          selectedCity.coordinates.lat,
          selectedCity.coordinates.lng,
          provider.latitude,
          provider.longitude
        );
        
        return distance <= 50; // 50km radius
      }) || [];

      // Filter bookings for city providers
      const cityBookings = bookings?.filter(booking => 
        cityProviders.some(provider => provider.id === booking.provider_id)
      ) || [];

      // Calculate metrics
      const totalRevenue = cityBookings.reduce((sum, booking) => 
        sum + (Number(booking.total_amount) || 0), 0
      );

      const averageRevenue = cityBookings.length > 0 ? totalRevenue / cityBookings.length : 0;
      
      // Determine data source based on availability
      let dataSourceInfo: DataSourceInfo;
      
      if (cityProviders.length > 0 && cityBookings.length > 0) {
        dataSourceInfo = {
          source: 'real-time',
          label: 'Live HOUSIE Data',
          description: 'Real provider and booking data from HOUSIE platform',
          lastUpdated: new Date(),
          reliability: 'high'
        };
      } else if (selectedCity.name === 'Montreal' || selectedCity.name === 'Toronto' || selectedCity.name === 'Vancouver') {
        dataSourceInfo = {
          source: 'projected',
          label: 'Market Projection',
          description: 'Projected based on demographic and market analysis',
          reliability: 'medium'
        };
      } else {
        dataSourceInfo = {
          source: 'collecting',
          label: 'Data Collection in Progress',
          description: 'Expanding to this market - data collection underway',
          reliability: 'low'
        };
      }

      // Calculate market penetration based on city population
      const estimatedMarketSize = Math.floor((selectedCity.population || 100000) * 0.15); // 15% of households
      const marketPenetration = cityProviders.length > 0 
        ? Math.min((cityProviders.length / estimatedMarketSize) * 100, 100)
        : 0;

      setBusinessData({
        city: `${selectedCity.name}, ${selectedCity.code}`,
        providerCount: cityProviders.length,
        totalBookings: cityBookings.length,
        averageRevenue,
        marketPenetration,
        dataSource: dataSourceInfo
      });

    } catch (err) {
      console.error('Error fetching city business data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      
      // Fallback to projected data
      setBusinessData({
        city: `${selectedCity.name}, ${selectedCity.code}`,
        providerCount: 0,
        totalBookings: 0,
        averageRevenue: 0,
        marketPenetration: 0,
        dataSource: {
          source: 'collecting',
          label: 'Data Collection in Progress',
          description: 'Real-time data not yet available for this city',
          reliability: 'low'
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Haversine formula to calculate distance between two points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  return {
    businessData,
    isLoading,
    error,
    refetch: fetchCityBusinessData
  };
};
