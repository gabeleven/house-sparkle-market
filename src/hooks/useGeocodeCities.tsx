
import { useState, useEffect } from 'react';
import { CleanerProfile } from '@/hooks/useCleaners';

interface GeocodedCleaner extends CleanerProfile {
  geocoded_lat?: number;
  geocoded_lng?: number;
}

export const useGeocodeCities = (cleaners: CleanerProfile[]) => {
  const [geocodedCleaners, setGeocodedCleaners] = useState<GeocodedCleaner[]>([]);
  const [isGeocoding, setIsGeocoding] = useState(false);

  useEffect(() => {
    const geocodeCleaners = async () => {
      if (!cleaners.length || !window.google) return;

      setIsGeocoding(true);
      const geocoder = new google.maps.Geocoder();
      const results: GeocodedCleaner[] = [];

      for (const cleaner of cleaners) {
        // Use existing coordinates if available
        if (cleaner.latitude && cleaner.longitude) {
          results.push(cleaner);
          continue;
        }

        // Geocode using service area city
        if (cleaner.service_area_city) {
          try {
            const geocodeResult = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
              geocoder.geocode(
                {
                  address: `${cleaner.service_area_city}, Quebec, Canada`,
                  region: 'CA',
                  componentRestrictions: { country: 'CA', administrativeArea: 'QC' }
                },
                (results, status) => {
                  if (status === 'OK' && results) {
                    resolve(results);
                  } else {
                    console.warn(`Geocoding failed for ${cleaner.service_area_city}: ${status}`);
                    resolve([]);
                  }
                }
              );
            });

            if (geocodeResult.length > 0) {
              const location = geocodeResult[0].geometry.location;
              results.push({
                ...cleaner,
                geocoded_lat: location.lat(),
                geocoded_lng: location.lng()
              });
            } else {
              results.push(cleaner);
            }
          } catch (error) {
            console.error(`Error geocoding ${cleaner.service_area_city}:`, error);
            results.push(cleaner);
          }
        } else {
          results.push(cleaner);
        }
      }

      setGeocodedCleaners(results);
      setIsGeocoding(false);
    };

    geocodeCleaners();
  }, [cleaners]);

  return { geocodedCleaners, isGeocoding };
};
