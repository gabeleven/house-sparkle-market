
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface EnvironmentCanadaWeatherData {
  city: string;
  province: string;
  temperature: number;
  conditions: string;
  humidity: number;
  wind_speed: number;
  pressure: number;
  visibility: number;
  timestamp: string;
}

interface WeatherCorrelationData {
  city: string;
  date: string;
  temperature: number;
  weather_condition: string;
  booking_count: number;
  correlation_score: number;
}

export const useEnvironmentCanadaWeather = () => {
  const [weatherData, setWeatherData] = useState<EnvironmentCanadaWeatherData[]>([]);
  const [correlationData, setCorrelationData] = useState<WeatherCorrelationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEnvironmentCanadaData();
  }, []);

  const fetchEnvironmentCanadaData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Call our edge function to fetch Environment Canada data
      const { data, error } = await supabase.functions.invoke('environment-canada-weather');

      if (error) {
        throw error;
      }

      if (data) {
        setWeatherData(data.current_weather || []);
        setCorrelationData(data.weather_correlation || []);
      }
    } catch (err) {
      console.error('Error fetching Environment Canada weather data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      
      // Fallback to realistic mock data for demo purposes
      const mockWeatherData: EnvironmentCanadaWeatherData[] = [
        {
          city: 'Toronto',
          province: 'Ontario',
          temperature: -8,
          conditions: 'Snow',
          humidity: 78,
          wind_speed: 15,
          pressure: 1015,
          visibility: 8,
          timestamp: new Date().toISOString()
        },
        {
          city: 'Vancouver',
          province: 'British Columbia',
          temperature: 3,
          conditions: 'Rain',
          humidity: 85,
          wind_speed: 12,
          pressure: 1012,
          visibility: 12,
          timestamp: new Date().toISOString()
        },
        {
          city: 'Calgary',
          province: 'Alberta',
          temperature: -12,
          conditions: 'Clear',
          humidity: 65,
          wind_speed: 8,
          pressure: 1020,
          visibility: 15,
          timestamp: new Date().toISOString()
        },
        {
          city: 'Montreal',
          province: 'Quebec',
          temperature: -6,
          conditions: 'Cloudy',
          humidity: 72,
          wind_speed: 10,
          pressure: 1018,
          visibility: 10,
          timestamp: new Date().toISOString()
        },
        {
          city: 'Ottawa',
          province: 'Ontario',
          temperature: -10,
          conditions: 'Snow',
          humidity: 80,
          wind_speed: 18,
          pressure: 1016,
          visibility: 6,
          timestamp: new Date().toISOString()
        }
      ];

      const mockCorrelationData: WeatherCorrelationData[] = [
        { city: 'Toronto', date: '2024-12-01', temperature: -5, weather_condition: 'Snow', booking_count: 45, correlation_score: 0.78 },
        { city: 'Toronto', date: '2024-12-02', temperature: -3, weather_condition: 'Cloudy', booking_count: 32, correlation_score: 0.65 },
        { city: 'Vancouver', date: '2024-12-01', temperature: 2, weather_condition: 'Rain', booking_count: 38, correlation_score: 0.72 },
        { city: 'Vancouver', date: '2024-12-02', temperature: 4, weather_condition: 'Clear', booking_count: 28, correlation_score: 0.45 },
        { city: 'Calgary', date: '2024-12-01', temperature: -8, weather_condition: 'Snow', booking_count: 29, correlation_score: 0.82 },
        { city: 'Montreal', date: '2024-12-01', temperature: -4, weather_condition: 'Snow', booking_count: 41, correlation_score: 0.75 }
      ];

      setWeatherData(mockWeatherData);
      setCorrelationData(mockCorrelationData);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    weatherData,
    correlationData,
    isLoading,
    error,
    refetch: fetchEnvironmentCanadaData
  };
};
