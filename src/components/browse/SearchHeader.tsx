
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Filter } from 'lucide-react';
import { EnhancedLocationSearch } from './EnhancedLocationSearch';
import { HierarchicalServiceFilters } from './HierarchicalServiceFilters';
import { ServiceType } from '@/utils/serviceTypes';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface SearchHeaderProps {
  searchTerm: string;
  locationFilter: string;
  onSearchChange: (searchTerm: string) => void;
  onLocationChange: (locationFilter: string) => void;
  hasLocation: boolean;
  onRequestLocation: () => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchTerm,
  locationFilter,
  onSearchChange,
  onLocationChange,
  hasLocation,
  onRequestLocation,
}) => {
  const [serviceFilters, setServiceFilters] = useState<ServiceType[]>([]);
  const [useEnhancedLocationSearch, setUseEnhancedLocationSearch] = useState(true);

  const handleLocationSelect = (result: { address: string; latitude: number; longitude: number } | null) => {
    if (result) {
      console.log('Enhanced location search result:', result);
      onLocationChange(result.address);
    } else {
      onLocationChange('');
    }
  };

  const handleSearch = () => {
    // Search logic handled by parent component
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="pop-card bg-card rounded-lg shadow-sm p-6 mb-8 border border-border ben-day-dots">
      <h1 className="text-3xl font-bold text-foreground mb-6">Find Professional Service Providers Across Canada</h1>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by name, service, or description..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="md:w-80">
          {useEnhancedLocationSearch ? (
            <EnhancedLocationSearch
              onLocationSelect={handleLocationSelect}
              onSearch={onLocationChange}
              placeholder="Search city, province, postal code, or address..."
              initialValue={locationFilter}
              onInputChange={onLocationChange}
            />
          ) : (
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Enter city, postal code, or address..."
                value={locationFilter}
                onChange={(e) => onLocationChange(e.target.value)}
                onFocus={() => setUseEnhancedLocationSearch(true)}
                onKeyPress={handleKeyPress}
                className="pl-10"
              />
            </div>
          )}
        </div>

        <Button onClick={handleSearch} className="search-btn-pop">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4">
        <div className="flex items-center gap-4">
          {!hasLocation && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRequestLocation}
              className="text-[hsl(var(--pop-blue))] border-[hsl(var(--pop-blue))] hover:bg-[hsl(var(--pop-blue)/0.1)]"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Use My Location
            </Button>
          )}
          
          {hasLocation && (
            <span className="text-sm text-[hsl(var(--pop-blue))] font-medium">
              ✓ Using your location for better results across Canada
            </span>
          )}

          {!useEnhancedLocationSearch && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUseEnhancedLocationSearch(true)}
              className="text-sm"
            >
              Use Enhanced Search
            </Button>
          )}

          {serviceFilters.length > 0 && (
            <span className="text-sm text-primary font-medium">
              {serviceFilters.length} service{serviceFilters.length !== 1 ? 's' : ''} selected
            </span>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="mt-2 sm:mt-0 pop-blue-btn">
              <Filter className="w-4 h-4 mr-2" />
              Service Categories {serviceFilters.length > 0 && `(${serviceFilters.length})`}
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter by Service Categories</SheetTitle>
              <SheetDescription>
                Choose from organized service categories to find the perfect provider across Canada.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <HierarchicalServiceFilters
                selectedServices={serviceFilters}
                onServiceChange={setServiceFilters}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
