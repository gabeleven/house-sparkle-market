
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import { HierarchicalServiceFilters } from './HierarchicalServiceFilters';
import { ServiceType } from '@/utils/serviceTypes';

interface SearchHeaderProps {
  searchTerm: string;
  locationFilter: string;
  serviceFilters: ServiceType[];
  onSearchChange: (searchTerm: string) => void;
  onLocationChange: (locationFilter: string) => void;
  onServiceFiltersChange: (services: ServiceType[]) => void;
  hasLocation: boolean;
  onRequestLocation: () => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchTerm,
  locationFilter,
  serviceFilters,
  onSearchChange,
  onLocationChange,
  onServiceFiltersChange,
  hasLocation,
  onRequestLocation,
}) => {
  const handleSearch = () => {
    console.log('Search triggered with:', {
      searchTerm,
      locationFilter,
      serviceFilters
    });
    // The search is automatically triggered through the hooks when state changes
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleClearAll = () => {
    onSearchChange('');
    onLocationChange('');
    onServiceFiltersChange([]);
  };

  return (
    <div className="pop-card bg-card rounded-lg shadow-sm p-6 mb-8 border border-border ben-day-dots">
      {/* Service Categories Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Service Categories</h2>
          {(searchTerm || locationFilter || serviceFilters.length > 0) && (
            <Button
              onClick={handleClearAll}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          )}
        </div>
        <HierarchicalServiceFilters
          selectedServices={serviceFilters}
          onServiceChange={onServiceFiltersChange}
        />
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by business name, service type, or description..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="md:w-80">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Enter postal code, city, or address..."
              value={locationFilter}
              onChange={(e) => onLocationChange(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10"
            />
          </div>
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
              className="text-primary border-primary hover:bg-primary/10"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Use My Location
            </Button>
          )}
          
          {hasLocation && (
            <span className="text-sm text-primary font-medium">
              ✓ Using your location for better results across Canada
            </span>
          )}

          {serviceFilters.length > 0 && (
            <span className="text-sm text-primary font-medium">
              {serviceFilters.length} service{serviceFilters.length !== 1 ? 's' : ''} selected
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          {searchTerm && (
            <span className="text-xs text-muted-foreground">
              Searching: "{searchTerm}"
            </span>
          )}
          {locationFilter && (
            <span className="text-xs text-muted-foreground">
              Near: {locationFilter}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
