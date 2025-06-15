
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Search, Loader2 } from 'lucide-react';
import { useLocationSearch } from '@/hooks/useLocationSearch';

interface LocationSearchSuggestion {
  type: 'city' | 'province' | 'postal_code' | 'address';
  value: string;
  display: string;
  province?: string;
}

interface EnhancedLocationSearchProps {
  onLocationSearch: (location: { lat: number; lng: number; address: string }) => void;
  placeholder?: string;
  initialValue?: string;
  onInputChange?: (value: string) => void;
}

export const EnhancedLocationSearch = ({ 
  onLocationSearch, 
  placeholder = "Search city, province, postal code, or address...",
  initialValue = "",
  onInputChange
}: EnhancedLocationSearchProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationSearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const { parseLocationQuery, MAJOR_CANADIAN_CITIES, CANADIAN_PROVINCES } = useLocationSearch();

  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      autocompleteService.current = new google.maps.places.AutocompleteService();
    }
  }, []);

  const generateLocalSuggestions = (input: string): LocationSearchSuggestion[] => {
    const suggestions: LocationSearchSuggestion[] = [];
    const lowerInput = input.toLowerCase();

    // Postal code pattern
    const postalPattern = /^[a-z]\d[a-z]\s?\d?[a-z]?\d?$/i;
    if (postalPattern.test(input)) {
      suggestions.push({
        type: 'postal_code',
        value: input.toUpperCase(),
        display: `Postal Code: ${input.toUpperCase()}`
      });
    }

    // Major cities
    MAJOR_CANADIAN_CITIES
      .filter(city => city.toLowerCase().includes(lowerInput))
      .slice(0, 5)
      .forEach(city => {
        suggestions.push({
          type: 'city',
          value: city,
          display: city
        });
      });

    // Provinces
    CANADIAN_PROVINCES
      .filter(province => 
        province.name.toLowerCase().includes(lowerInput) ||
        province.abbreviation.toLowerCase().includes(lowerInput) ||
        province.variations.some(v => v.includes(lowerInput))
      )
      .slice(0, 3)
      .forEach(province => {
        suggestions.push({
          type: 'province',
          value: province.name,
          display: `${province.name} (${province.abbreviation})`
        });
      });

    return suggestions;
  };

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    onInputChange?.(value);

    if (value.length > 1) {
      const localSuggestions = generateLocalSuggestions(value);
      setSuggestions(localSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: LocationSearchSuggestion) => {
    setSearchTerm(suggestion.value);
    onInputChange?.(suggestion.value);
    setShowSuggestions(false);
    handleSearch(suggestion.value);
  };

  const handleSearch = async (searchValue?: string) => {
    const valueToSearch = searchValue || searchTerm;
    if (!valueToSearch.trim()) return;

    setIsSearching(true);
    setShowSuggestions(false);
    
    try {
      // Parse the location to understand what we're searching for
      const locationComponents = parseLocationQuery(valueToSearch);
      
      // Try Google Maps Geocoding first
      if (window.google?.maps?.Geocoder) {
        const geocoder = new google.maps.Geocoder();
        
        const result = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
          geocoder.geocode(
            { 
              address: valueToSearch,
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
          // Proper type handling for Google Maps lat/lng
          const lat = typeof location.lat === 'function' ? location.lat() : location.lat;
          const lng = typeof location.lng === 'function' ? location.lng() : location.lng;
          
          onLocationSearch({
            lat,
            lng,
            address: result[0].formatted_address
          });
          return;
        }
      }
      
      // Fallback: Use predefined coordinates for major cities
      if (locationComponents.city) {
        // You could extend this with a comprehensive city coordinate mapping
        console.log('Searching for city:', locationComponents.city);
      }
      
    } catch (error) {
      console.error('Location search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => searchTerm.length > 1 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="pl-10"
            disabled={isSearching}
          />
        </div>
        <Button 
          onClick={() => handleSearch()}
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

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-12 z-50 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 border-b border-gray-100 last:border-b-0 flex items-center gap-2"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <MapPin className="w-4 h-4 text-gray-400" />
              <div>
                <div className="font-medium">{suggestion.display}</div>
                <div className="text-xs text-gray-500 capitalize">{suggestion.type.replace('_', ' ')}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
