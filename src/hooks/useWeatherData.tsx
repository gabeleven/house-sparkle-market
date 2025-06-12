
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface WeatherData {
  date: string;
  temperature: number;
  precipitation: number;
  weather_condition: string;
  humidity: number;
  wind_speed: number;
}

interface DemandStats {
  date: string;
  booking_count: number;
  total_bookings_value: number;
  weather_correlation_score: number;
}

interface WeatherDemandCorrelation {
  date: string;
  precipitation: number;
  booking_count: number;
  correlation_score: number;
}

export const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [demandStats, setDemandStats] = useState<DemandStats[]>([]);
  const [correlation, setCorrelation] = useState<WeatherDemandCorrelation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeatherAndDemandData();
  }, []);

  const fetchWeatherAndDemandData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch weather data for the past 30 days
      const { data: weather, error: weatherError } = await supabase
        .from('weather_data')
        .select('*')
        .gte('date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
        .order('date', { ascending: false });

      if (weatherError) throw weatherError;

      // Fetch demand statistics
      const { data: demand, error: demandError } = await supabase
        .from('daily_demand_stats')
        .select('*')
        .gte('date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
        .order('date', { ascending: false });

      if (demandError) throw demandError;

      // Fetch correlation data using the database function
      const { data: correlationData, error: correlationError } = await supabase
        .rpc('calculate_weather_demand_correlation');

      if (correlationError) throw correlationError;

      setWeatherData(weather || []);
      setDemandStats(demand || []);
      setCorrelation(correlationData || []);
      
    } catch (err) {
      console.error('Error fetching weather and demand data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    weatherData,
    demandStats,
    correlation,
    isLoading,
    error,
    refetch: fetchWeatherAndDemandData
  };
};
