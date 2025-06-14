
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Loader2 } from 'lucide-react';

interface LocationSearchProps {
  onLocationSearch: (location: { lat: number; lng: number; address: string }) => void;
  placeholder?: string;
  initialValue?: string;
}

export const LocationSearch = ({ 
  onLocationSearch, 
  placeholder = "Search area or postal code...",
  initialValue = ""
}: LocationSearchProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isSearching, setIsSearching] = useState(false);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);

  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      autocompleteService.current = new google.maps.places.AutocompleteService();
      
      const dummyMap = new google.maps.Map(document.createElement('div'));
      placesService.current = new google.maps.places.PlacesService(dummyMap);
    }
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    
    try {
      // First try Places API if available
      if (autocompleteService.current && placesService.current) {
        await searchWithPlacesAPI();
      } else {
        // Fallback to Geocoding API
        await fallbackGeocode();
      }
    } catch (error) {
      console.error('Location search error:', error);
      // Try fallback geocoding on any error
      await fallbackGeocode();
    } finally {
      setIsSearching(false);
    }
  };

  const searchWithPlacesAPI = async () => {
    if (!autocompleteService.current || !placesService.current) return;

    try {
      const predictions = await new Promise<google.maps.places.AutocompletePrediction[]>((resolve, reject) => {
        const canadaBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(41.7, -141.0),
          new google.maps.LatLng(83.1, -52.6)
        );

        autocompleteService.current!.getPlacePredictions(
          {
            input: searchTerm,
            componentRestrictions: { country: 'CA' },
            types: ['geocode', 'establishment'],
            locationBias: canadaBounds
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
          // Fix: Properly handle Google Maps location type
          const lat = typeof location.lat === 'function' ? location.lat() : location.lat as number;
          const lng = typeof location.lng === 'function' ? location.lng() : location.lng as number;
          
          onLocationSearch({
            lat: lat,
            lng: lng,
            address: placeDetails.formatted_address || placeDetails.name || searchTerm
          });
          return;
        }
      }
      
      // If Places API doesn't work, fall back to geocoding
      await fallbackGeocode();
    } catch (error) {
      console.error('Places API error:', error);
      await fallbackGeocode();
    }
  };

  const fallbackGeocode = async () => {
    try {
      if (!window.google?.maps?.Geocoder) {
        console.error('Google Maps Geocoder not available');
        return;
      }

      const geocoder = new google.maps.Geocoder();
      
      const result = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
        geocoder.geocode(
          { 
            address: searchTerm,
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
        const location = result[0].geometry.location;
        // Fix: Properly handle Google Maps location type
        const lat = typeof location.lat === 'function' ? location.lat() : location.lat as number;
        const lng = typeof location.lng === 'function' ? location.lng() : location.lng as number;
        
        onLocationSearch({
          lat: lat,
          lng: lng,
          address: result[0].formatted_address
        });
      }
    } catch (error) {
      console.error('Fallback geocoding error:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
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
          disabled={isSearching}
        />
      </div>
      <Button 
        onClick={handleSearch}
        disabled={isSearching || !searchTerm.trim()}
        size="sm"
      >
        {isSearching ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Search className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
};
