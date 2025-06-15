
import { useState, useEffect } from 'react';
import { ProviderProfile } from '@/types/providers';

interface GeocodedProvider extends ProviderProfile {
  geocoded_lat?: number;
  geocoded_lng?: number;
}

export const useGeocodeCities = (providers: ProviderProfile[]) => {
  const [geocodedProviders, setGeocodedProviders] = useState<GeocodedProvider[]>([]);
  const [isGeocoding, setIsGeocoding] = useState(false);

  useEffect(() => {
    const geocodeProviders = async () => {
      if (!providers.length || !window.google) return;

      setIsGeocoding(true);
      const geocoder = new google.maps.Geocoder();
      const results: GeocodedProvider[] = [];

      for (const provider of providers) {
        // Use existing coordinates if available
        if (provider.latitude && provider.longitude) {
          results.push(provider);
          continue;
        }

        // Geocode using service area city
        if (provider.service_area_city) {
          try {
            const geocodeResult = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
              geocoder.geocode(
                {
                  address: `${provider.service_area_city}, Quebec, Canada`,
                  region: 'CA',
                  componentRestrictions: { country: 'CA', administrativeArea: 'QC' }
                },
                (results, status) => {
                  if (status === 'OK' && results) {
                    resolve(results);
                  } else {
                    console.warn(`Geocoding failed for ${provider.service_area_city}: ${status}`);
                    resolve([]);
                  }
                }
              );
            });

            if (geocodeResult.length > 0) {
              const location = geocodeResult[0].geometry.location;
              results.push({
                ...provider,
                geocoded_lat: location.lat(),
                geocoded_lng: location.lng()
              });
            } else {
              results.push(provider);
            }
          } catch (error) {
            console.error(`Error geocoding ${provider.service_area_city}:`, error);
            results.push(provider);
          }
        } else {
          results.push(provider);
        }
      }

      setGeocodedProviders(results);
      setIsGeocoding(false);
    };

    geocodeProviders();
  }, [providers]);

  return { geocodedProviders, isGeocoding };
};
