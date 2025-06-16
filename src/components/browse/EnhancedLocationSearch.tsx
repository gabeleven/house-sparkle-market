
import React, { useState, useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Search, X, Loader2 } from 'lucide-react';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useCanadianGeocoding } from '@/hooks/useCanadianGeocoding';

interface EnhancedLocationSearchProps {
  onLocationSelect: (location: { address: string; latitude: number; longitude: number } | null) => void;
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  onInputChange?: (value: string) => void;
}

export const EnhancedLocationSearch: React.FC<EnhancedLocationSearchProps> = ({
  onLocationSelect,
  onSearch,
  placeholder = "Search by city, neighborhood, or postal code...",
  initialValue = "",
  onInputChange
}) => {
  const [searchQuery, setSearchQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const { userLocation, requestUserLocation, loading: locationLoading } = useUserLocation();
  const { geocodeAddress, isGeocoding, isGoogleMapsReady } = useCanadianGeocoding();

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return function (...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleInputChange = useCallback(
    debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearchQuery(query);
      setShowSuggestions(query.length > 0);
      
      if (onInputChange) {
        onInputChange(query);
      }

      if (query.length > 2) {
        try {
          // Generate Canadian location suggestions
          const canadianSuggestions = [];
          
          // Check if it's a postal code pattern (Canadian: A1A 1A1)
          const postalCodePattern = /^[a-z]\d[a-z]/i;
          if (postalCodePattern.test(query)) {
            canadianSuggestions.push({ 
              description: `${query.toUpperCase()} - Postal Code Area`, 
              formatted_address: query.toUpperCase(),
              type: 'postal_code'
            });
          }
          
          // Add major Canadian cities that match
          const majorCities = [
            'Toronto, ON', 'Montreal, QC', 'Vancouver, BC', 'Calgary, AB', 
            'Edmonton, AB', 'Ottawa, ON', 'Winnipeg, MB', 'Quebec City, QC',
            'Hamilton, ON', 'Kitchener, ON', 'London, ON', 'Halifax, NS',
            'Victoria, BC', 'Windsor, ON', 'Oshawa, ON', 'Saskatoon, SK',
            'Regina, SK', 'St. John\'s, NL', 'Barrie, ON', 'Kelowna, BC'
          ];
          
          majorCities
            .filter(city => city.toLowerCase().includes(query.toLowerCase()))
            .forEach(city => {
              canadianSuggestions.push({ 
                description: city, 
                formatted_address: city,
                type: 'city'
              });
            });

          // Add province suggestions
          const provinces = [
            'Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba',
            'Saskatchewan', 'Nova Scotia', 'New Brunswick', 'Newfoundland and Labrador',
            'Prince Edward Island', 'Northwest Territories', 'Yukon', 'Nunavut'
          ];
          
          provinces
            .filter(province => province.toLowerCase().includes(query.toLowerCase()))
            .forEach(province => {
              canadianSuggestions.push({ 
                description: province, 
                formatted_address: province,
                type: 'province'
              });
            });
          
          setSuggestions(canadianSuggestions.slice(0, 8)); // Limit to 8 suggestions
        } catch (error) {
          console.error('Error generating suggestions:', error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 300),
    [onInputChange, isGoogleMapsReady]
  );

  const handleSuggestionSelect = useCallback(async (suggestion: any) => {
    console.log('Selected suggestion:', suggestion);
    const selectedText = suggestion.description || suggestion.formatted_address;
    setSearchQuery(selectedText);
    setShowSuggestions(false);
    
    // Try to geocode the selection if Google Maps is ready
    if (isGoogleMapsReady) {
      const geocodeResult = await geocodeAddress(selectedText);
      if (geocodeResult) {
        onLocationSelect({
          address: geocodeResult.address,
          latitude: geocodeResult.latitude,
          longitude: geocodeResult.longitude
        });
        return;
      }
    }
    
    // Fallback to just passing the search query
    onSearch(selectedText);
  }, [geocodeAddress, isGoogleMapsReady, onLocationSelect, onSearch]);

  const useCurrentLocation = useCallback(async () => {
    if (userLocation) {
      onLocationSelect({
        address: 'Current Location',
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      });
      setSearchQuery('Current Location');
    } else {
      requestUserLocation();
    }
  }, [userLocation, requestUserLocation, onLocationSelect]);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      
      // Try geocoding first if Google Maps is ready
      if (isGoogleMapsReady && searchQuery !== 'Current Location') {
        const geocodeResult = await geocodeAddress(searchQuery);
        if (geocodeResult) {
          onLocationSelect({
            address: geocodeResult.address,
            latitude: geocodeResult.latitude,
            longitude: geocodeResult.longitude
          });
          return;
        }
      }
      
      // Fallback to text search
      onSearch(searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    onLocationSelect(null);
    if (onInputChange) {
      onInputChange('');
    }
  };

  useEffect(() => {
    if (initialValue) {
      setSearchQuery(initialValue);
    }
  }, [initialValue]);

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder={placeholder}
            className="pl-10 pr-10"
            disabled={isGeocoding}
          />
          {searchQuery && !isGeocoding && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {isGeocoding && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
            </div>
          )}
        </div>
        
        <Button
          variant="outline"
          size="default"
          onClick={useCurrentLocation}
          disabled={locationLoading}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <MapPin className="w-4 h-4" />
          {locationLoading ? 'Locating...' : 'Use Location'}
        </Button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionSelect(suggestion)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 last:border-b-0 transition-colors"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    {suggestion.description || suggestion.formatted_address}
                  </span>
                  {suggestion.type && (
                    <span className="text-xs text-gray-500 ml-2 capitalize">
                      {suggestion.type.replace('_', ' ')}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {!isGoogleMapsReady && (
        <div className="absolute top-full left-0 right-0 mt-1">
          <div className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-200">
            Enhanced location features loading...
          </div>
        </div>
      )}
    </div>
  );
};
