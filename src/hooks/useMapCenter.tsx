import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

interface MapCenter {
  latitude: number;
  longitude: number;
  zoom: number;
}

interface CleanerProfile {
  service_area_city?: string;
  service_radius_km?: number;
  latitude?: number;
  longitude?: number;
}

interface CustomerProfile {
  latitude?: number;
  longitude?: number;
}

export const useMapCenter = () => {
  const { user } = useAuth();
  const [mapCenter, setMapCenter] = useState<MapCenter>({
    latitude: 46.8139, // Quebec province center as fallback
    longitude: -71.2082,
    zoom: 8
  });
  const [loading, setLoading] = useState(true);

  // City coordinates for fallback geocoding
  const cityCoordinates: Record<string, { lat: number; lng: number }> = {
    'Montreal': { lat: 45.5017, lng: -73.5673 },
    'Toronto': { lat: 43.6532, lng: -79.3832 },
    'Vancouver': { lat: 49.2827, lng: -123.1207 },
    'Calgary': { lat: 51.0447, lng: -114.0719 },
    'Ottawa': { lat: 45.4215, lng: -75.6972 },
    'Quebec City': { lat: 46.8139, lng: -71.2082 },
    'Winnipeg': { lat: 49.8951, lng: -97.1384 },
    'Edmonton': { lat: 53.5444, lng: -113.4909 },
    'Mississauga': { lat: 43.5890, lng: -79.6441 },
    'Brampton': { lat: 43.7315, lng: -79.7624 }
  };

  const calculateZoomFromRadius = (radiusKm: number): number => {
    if (radiusKm <= 10) return 12;
    if (radiusKm <= 25) return 10;
    if (radiusKm <= 50) return 9;
    return 8;
  };

  const geocodeCity = (cityName: string): { lat: number; lng: number } | null => {
    const normalized = cityName.toLowerCase().trim();
    
    // Direct match
    const directMatch = Object.keys(cityCoordinates).find(
      city => city.toLowerCase() === normalized
    );
    if (directMatch) {
      return cityCoordinates[directMatch];
    }

    // Partial match
    const partialMatch = Object.keys(cityCoordinates).find(
      city => city.toLowerCase().includes(normalized) || normalized.includes(city.toLowerCase())
    );
    if (partialMatch) {
      return cityCoordinates[partialMatch];
    }

    return null;
  };

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
          // Get cleaner's service area data
          const { data: cleanerProfile } = await supabase
            .from('cleaner_profiles')
            .select('service_area_city, service_radius_km, latitude, longitude')
            .eq('id', user.id)
            .single();

          if (cleanerProfile) {
            let centerLat: number;
            let centerLng: number;
            let zoom: number;

            // Use coordinates if available, otherwise geocode city
            if (cleanerProfile.latitude && cleanerProfile.longitude) {
              centerLat = Number(cleanerProfile.latitude);
              centerLng = Number(cleanerProfile.longitude);
            } else if (cleanerProfile.service_area_city) {
              const coords = geocodeCity(cleanerProfile.service_area_city);
              if (coords) {
                centerLat = coords.lat;
                centerLng = coords.lng;
              } else {
                // Fallback to Quebec if geocoding fails
                centerLat = 46.8139;
                centerLng = -71.2082;
              }
            } else {
              // Default fallback
              centerLat = 46.8139;
              centerLng = -71.2082;
            }

            // Calculate zoom based on service radius
            const radius = cleanerProfile.service_radius_km || 10;
            zoom = calculateZoomFromRadius(radius);

            setMapCenter({
              latitude: centerLat,
              longitude: centerLng,
              zoom
            });
          }
        } else if (profile.user_role === 'customer') {
          // Get customer's location if available
          const { data: customerProfile } = await supabase
            .from('customer_profiles')
            .select('latitude, longitude')
            .eq('id', user.id)
            .single();

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
  }, [user]);

  return { mapCenter, loading };
};
