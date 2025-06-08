
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export const useUserLocation = () => {
  const { user } = useAuth();
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Default fallback coordinates (Montreal)
  const DEFAULT_LOCATION: UserLocation = {
    latitude: 45.5017,
    longitude: -73.5673
  };

  const loadStoredLocation = useCallback(async () => {
    if (!user) return null;

    try {
      // Try to get location from user's profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('user_role')
        .eq('id', user.id)
        .single();

      if (profile?.user_role === 'customer') {
        const { data: customerProfile } = await supabase
          .from('customer_profiles')
          .select('latitude, longitude')
          .eq('id', user.id)
          .single();

        if (customerProfile?.latitude && customerProfile?.longitude) {
          return {
            latitude: Number(customerProfile.latitude),
            longitude: Number(customerProfile.longitude)
          };
        }
      } else if (profile?.user_role === 'cleaner') {
        const { data: cleanerProfile } = await supabase
          .from('cleaner_profiles')
          .select('latitude, longitude')
          .eq('id', user.id)
          .single();

        if (cleanerProfile?.latitude && cleanerProfile?.longitude) {
          return {
            latitude: Number(cleanerProfile.latitude),
            longitude: Number(cleanerProfile.longitude)
          };
        }
      }
    } catch (error) {
      console.error('Error loading stored location:', error);
    }

    return null;
  }, [user]);

  const getCurrentPosition = useCallback((): Promise<UserLocation> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      console.log('Requesting current location...');
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          console.log('Location obtained:', location);
          resolve(location);
        },
        (error) => {
          console.error('Geolocation error:', error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }, []);

  const saveLocationToProfile = useCallback(async (location: UserLocation) => {
    if (!user) return;

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('user_role')
        .eq('id', user.id)
        .single();

      if (profile?.user_role === 'customer') {
        await supabase
          .from('customer_profiles')
          .upsert({
            id: user.id,
            latitude: location.latitude,
            longitude: location.longitude,
            location_permission_granted: true
          } as any);
      } else if (profile?.user_role === 'cleaner') {
        await supabase
          .from('cleaner_profiles')
          .update({
            latitude: location.latitude,
            longitude: location.longitude
          })
          .eq('id', user.id);
      }

      console.log('Location saved to profile');
    } catch (error) {
      console.error('Error saving location to profile:', error);
    }
  }, [user]);

  const requestUserLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // First try to get current position
      const currentLocation = await getCurrentPosition();
      setUserLocation(currentLocation);
      await saveLocationToProfile(currentLocation);
    } catch (locationError) {
      console.log('Current location failed, trying stored location...');
      
      // Fall back to stored location
      const storedLocation = await loadStoredLocation();
      if (storedLocation) {
        console.log('Using stored location:', storedLocation);
        setUserLocation(storedLocation);
      } else {
        console.log('Using default location (Montreal)');
        setUserLocation(DEFAULT_LOCATION);
        setError('Location permission denied. Using default location.');
      }
    } finally {
      setLoading(false);
    }
  }, [getCurrentPosition, loadStoredLocation, saveLocationToProfile]);

  // Auto-load location on component mount
  useEffect(() => {
    requestUserLocation();
  }, [requestUserLocation]);

  return {
    userLocation,
    loading,
    error,
    requestUserLocation,
    defaultLocation: DEFAULT_LOCATION
  };
};
