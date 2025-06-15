
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LocationData {
  latitude: number;
  longitude: number;
}

interface UseLocationReturn {
  location: LocationData | null;
  loading: boolean;
  error: string | null;
  requestLocation: () => Promise<void>;
  saveLocation: (lat: number, lng: number) => Promise<void>;
}

export const useLocation = (): UseLocationReturn => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const requestLocation = async () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        setLocation(newLocation);
        await saveLocation(newLocation.latitude, newLocation.longitude);
        setLoading(false);
        
        toast({
          title: "Location enabled",
          description: "We can now show you service providers near you"
        });
      },
      (error) => {
        console.error('Geolocation error:', error);
        setError('Unable to get your location');
        setLoading(false);
        
        toast({
          title: "Location denied",
          description: "You can enter your postal code manually",
          variant: "destructive"
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000 // 10 minutes
      }
    );
  };

  const saveLocation = async (lat: number, lng: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('customer_profiles')
        .upsert({
          id: user.id,
          latitude: lat,
          longitude: lng,
          location_permission_granted: true
        } as any);

      if (error) {
        console.error('Error saving location:', error);
      }
    } catch (err) {
      console.error('Error saving location:', err);
    }
  };

  return {
    location,
    loading,
    error,
    requestLocation,
    saveLocation
  };
};
