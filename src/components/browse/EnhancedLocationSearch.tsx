
import React, { useState, useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Search, X } from 'lucide-react';
import { useUserLocation } from '@/hooks/useUserLocation';

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
  const [isLoading, setIsLoading] = useState(false);
  
  const { userLocation, requestUserLocation, loading: locationLoading } = useUserLocation();

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

      if (query.length > 0) {
        setIsLoading(true);
        // Simple mock geocoding for now
        try {
          const mockSuggestions = [
            { description: `${query}, Montreal, QC`, formatted_address: `${query}, Montreal, QC` },
            { description: `${query}, Toronto, ON`, formatted_address: `${query}, Toronto, ON` },
          ];
          setSuggestions(mockSuggestions);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 300),
    [onInputChange]
  );

  const handleSuggestionSelect = useCallback(async (suggestion: any) => {
    console.log('Selected suggestion:', suggestion);
    setSearchQuery(suggestion.description || suggestion.formatted_address);
    setShowSuggestions(false);
    
    // Mock geocoding result
    const locationData = {
      address: suggestion.description || suggestion.formatted_address,
      latitude: 45.5017 + Math.random() * 0.1, // Montreal area
      longitude: -73.5673 + Math.random() * 0.1
    };
    
    console.log('Geocoded location:', locationData);
    onLocationSelect(locationData);
  }, [onLocationSelect]);

  const useCurrentLocation = useCallback(async () => {
    if (userLocation) {
      onLocationSelect({
        address: 'Current Location',
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      });
      setSearchQuery('');
    } else {
      requestUserLocation();
    }
  }, [userLocation, requestUserLocation, onLocationSelect]);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    onLocationSelect(null);
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
            placeholder={placeholder}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
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
                <span className="text-sm text-gray-900 dark:text-gray-100">
                  {suggestion.description || suggestion.formatted_address}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
