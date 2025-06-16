
import { useState, useCallback } from 'react';
import { useGoogleMapsApi } from './useGoogleMapsApi';

interface GeocodingResult {
  address: string;
  latitude: number;
  longitude: number;
  city?: string;
  province?: string;
  postalCode?: string;
}

export const useCanadianGeocoding = () => {
  const [isGeocoding, setIsGeocoding] = useState(false);
  const { isLoading, hasError, scriptLoaded } = useGoogleMapsApi();

  const geocodeAddress = useCallback(async (address: string): Promise<GeocodingResult | null> => {
    if (!scriptLoaded || !window.google?.maps?.Geocoder) {
      console.error('Google Maps Geocoder not available');
      return null;
    }

    setIsGeocoding(true);
    
    try {
      const geocoder = new google.maps.Geocoder();
      
      const result = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
        geocoder.geocode(
          { 
            address: address,
            region: 'CA',
            componentRestrictions: { country: 'CA' }
          },
          (results, status) => {
            if (status === 'OK' && results) {
              resolve(results);
            } else {
              reject(new Error(`Geocoding failed: ${status}`));
            }
          }
        );
      });

      if (result.length > 0) {
        const location = result[0];
        // Handle both function and direct property access for lat/lng
        const lat = typeof location.geometry.location.lat === 'function' 
          ? location.geometry.location.lat() 
          : location.geometry.location.lat as number;
        const lng = typeof location.geometry.location.lng === 'function' 
          ? location.geometry.location.lng() 
          : location.geometry.location.lng as number;

        // Extract components
        let city = '';
        let province = '';
        let postalCode = '';
        
        location.address_components?.forEach(component => {
          const types = component.types;
          if (types.includes('locality')) {
            city = component.long_name;
          } else if (types.includes('administrative_area_level_1')) {
            province = component.short_name;
          } else if (types.includes('postal_code')) {
            postalCode = component.long_name;
          }
        });

        return {
          address: location.formatted_address,
          latitude: lat,
          longitude: lng,
          city,
          province,
          postalCode
        };
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    } finally {
      setIsGeocoding(false);
    }

    return null;
  }, [scriptLoaded]);

  const reverseGeocode = useCallback(async (lat: number, lng: number): Promise<GeocodingResult | null> => {
    if (!scriptLoaded || !window.google?.maps?.Geocoder) {
      console.error('Google Maps Geocoder not available');
      return null;
    }

    setIsGeocoding(true);
    
    try {
      const geocoder = new google.maps.Geocoder();
      
      const result = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
        geocoder.geocode(
          { 
            location: { lat, lng },
            region: 'CA'
          },
          (results, status) => {
            if (status === 'OK' && results) {
              resolve(results);
            } else {
              reject(new Error(`Reverse geocoding failed: ${status}`));
            }
          }
        );
      });

      if (result.length > 0) {
        const location = result[0];
        
        // Extract components
        let city = '';
        let province = '';
        let postalCode = '';
        
        location.address_components?.forEach(component => {
          const types = component.types;
          if (types.includes('locality')) {
            city = component.long_name;
          } else if (types.includes('administrative_area_level_1')) {
            province = component.short_name;
          } else if (types.includes('postal_code')) {
            postalCode = component.long_name;
          }
        });

        return {
          address: location.formatted_address,
          latitude: lat,
          longitude: lng,
          city,
          province,
          postalCode
        };
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error);
    } finally {
      setIsGeocoding(false);
    }

    return null;
  }, [scriptLoaded]);

  return {
    geocodeAddress,
    reverseGeocode,
    isGeocoding,
    isGoogleMapsReady: scriptLoaded && !isLoading && !hasError
  };
};
