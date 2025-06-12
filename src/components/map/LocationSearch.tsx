
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';

interface LocationSearchProps {
  onLocationSearch: (location: { lat: number; lng: number; address: string }) => void;
  placeholder?: string;
}

export const LocationSearch = ({ onLocationSearch, placeholder = "Search area or postal code..." }: LocationSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);

  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      // Initialize the new Places API services
      autocompleteService.current = new google.maps.places.AutocompleteService();
      
      // Create a dummy map for PlacesService (required by Google)
      const dummyMap = new google.maps.Map(document.createElement('div'));
      placesService.current = new google.maps.places.PlacesService(dummyMap);
    }
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim() || !autocompleteService.current || !placesService.current) return;

    setIsSearching(true);
    
    try {
      // Use the new Places API (New) approach
      const predictions = await new Promise<google.maps.places.AutocompletePrediction[]>((resolve, reject) => {
        autocompleteService.current!.getPlacePredictions(
          {
            input: searchTerm,
            componentRestrictions: { country: 'CA' },
            types: ['geocode', 'establishment'],
            locationBias: {
              // Bias towards Quebec
              center: { lat: 46.8139, lng: -71.2082 },
              radius: 100000 // 100km radius
            } as google.maps.LatLng
          },
          (predictions, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
              resolve(predictions);
            } else {
              reject(new Error(`Places prediction failed: ${status}`));
            }
          }
        );
      });

      if (predictions.length > 0) {
        // Get detailed place information using place_id
        const placeDetails = await new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
          placesService.current!.getDetails(
            {
              placeId: predictions[0].place_id,
              fields: ['geometry.location', 'formatted_address', 'name']
            },
            (place, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK && place) {
                resolve(place);
              } else {
                reject(new Error(`Place details failed: ${status}`));
              }
            }
          );
        });

        if (placeDetails.geometry?.location) {
          const location = placeDetails.geometry.location;
          onLocationSearch({
            lat: typeof location.lat === 'function' ? location.lat() : location.lat,
            lng: typeof location.lng === 'function' ? location.lng() : location.lng,
            address: placeDetails.formatted_address || placeDetails.name || searchTerm
          });
        }
      } else {
        // Fallback to Geocoding API if no predictions
        await fallbackGeocode();
      }
    } catch (error) {
      console.error('Places API search error:', error);
      // Fallback to Geocoding API
      await fallbackGeocode();
    } finally {
      setIsSearching(false);
    }
  };

  const fallbackGeocode = async () => {
    try {
      const geocoder = new google.maps.Geocoder();
      
      const result = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
        geocoder.geocode(
          { 
            address: searchTerm,
            region: 'CA',
            componentRestrictions: { country: 'CA', administrativeArea: 'QC' }
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
        const location = result[0].geometry.location;
        onLocationSearch({
          lat: location.lat(),
          lng: location.lng(),
          address: result[0].formatted_address
        });
      }
    } catch (error) {
      console.error('Fallback geocoding error:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-10"
        />
      </div>
      <Button 
        onClick={handleSearch}
        disabled={isSearching || !searchTerm.trim()}
        size="sm"
      >
        {isSearching ? (
          <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <Search className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
};
