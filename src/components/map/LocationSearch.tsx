
import React, { useState } from 'react';
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

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    
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
      console.error('Location search error:', error);
    } finally {
      setIsSearching(false);
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
        <Search className="w-4 h-4" />
      </Button>
    </div>
  );
};
