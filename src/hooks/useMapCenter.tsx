import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { useGeocoding } from './useGeocoding';
import { useZoomCalculation } from './useZoomCalculation';
import { useUserLocationData } from './useUserLocationData';
import { supabase } from '@/integrations/supabase/client';

interface MapCenter {
  latitude: number;
  longitude: number;
  zoom: number;
}

export const useMapCenter = () => {
  const { user } = useAuth();
  const { geocodeCity } = useGeocoding();
  const { calculateZoomFromRadius } = useZoomCalculation();
  const { loadProviderLocation, loadCustomerLocation } = useUserLocationData();
  
  const [mapCenter, setMapCenter] = useState<MapCenter>({
    latitude: 56.1304, // Geographic center of Canada
    longitude: -106.3468,
    zoom: 4 // Wider zoom to show all of Canada
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserMapCenter = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Get user's profile to determine their role
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_role')
          .eq('id', user.id)
          .single();

        if (!profile) {
          setLoading(false);
          return;
        }

        if (profile.user_role === 'cleaner') {
          const providerProfile = await loadProviderLocation();

          if (providerProfile) {
            let centerLat: number;
            let centerLng: number;
            let zoom: number;

            // Use coordinates if available, otherwise geocode city from address
            if (providerProfile.latitude && providerProfile.longitude) {
              centerLat = Number(providerProfile.latitude);
              centerLng = Number(providerProfile.longitude);
            } else if (providerProfile.address) {
              const coords = geocodeCity(providerProfile.address);
              if (coords) {
                centerLat = coords.lat;
                centerLng = coords.lng;
              } else {
                // Fallback to Canada center if geocoding fails
                centerLat = 56.1304;
                centerLng = -106.3468;
              }
            } else {
              // Default fallback to Canada center
              centerLat = 56.1304;
              centerLng = -106.3468;
            }

            // Calculate zoom based on service radius
            const radius = providerProfile.service_radius_km || 10;
            zoom = calculateZoomFromRadius(radius);

            setMapCenter({
              latitude: centerLat,
              longitude: centerLng,
              zoom
            });
          }
        } else if (profile.user_role === 'customer') {
          const customerProfile = await loadCustomerLocation();

          if (customerProfile?.latitude && customerProfile?.longitude) {
            setMapCenter({
              latitude: Number(customerProfile.latitude),
              longitude: Number(customerProfile.longitude),
              zoom: 11 // Good zoom for customer area browsing
            });
          }
          // If customer has no location, keep default fallback
        }
      } catch (error) {
        console.error('Error loading user map center:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserMapCenter();
  }, [user, geocodeCity, calculateZoomFromRadius, loadProviderLocation, loadCustomerLocation]);

  return { mapCenter, loading };
};
