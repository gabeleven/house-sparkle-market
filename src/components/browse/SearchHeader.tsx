
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Filter } from 'lucide-react';
import { LocationSearch } from '@/components/map/LocationSearch';
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
  setSearchTerm: (value: string) => void;
  locationFilter: string;
  setLocationFilter: (value: string) => void;
  onSearch: () => void;
  location: { latitude: number; longitude: number } | null;
  onRequestLocation: () => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  locationFilter,
  setLocationFilter,
  onSearch,
  location,
  onRequestLocation,
}) => {
  const [useLocationSearch, setUseLocationSearch] = useState(false);

  const handleLocationSearchResult = (result: { lat: number; lng: number; address: string }) => {
    console.log('Location search result:', result);
    setLocationFilter(result.address);
    setUseLocationSearch(false);
    // Trigger search automatically after location is selected
    setTimeout(() => {
      onSearch();
    }, 100);
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
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="md:w-64">
          {useLocationSearch ? (
            <LocationSearch
              onLocationSearch={handleLocationSearchResult}
              placeholder="Search location..."
            />
          ) : (
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="City or postal code..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                onFocus={() => setUseLocationSearch(true)}
                className="pl-10"
              />
            </div>
          )}
        </div>

        <Button onClick={onSearch} className="search-btn-pop">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4">
        <div className="flex items-center gap-4">
          {!location && (
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
          
          {location && (
            <span className="text-sm text-[hsl(var(--pop-blue))] font-medium">
              ✓ Using your location for better results across Canada
            </span>
          )}

          {useLocationSearch && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUseLocationSearch(false)}
              className="text-sm"
            >
              Use Simple Search
            </Button>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="mt-2 sm:mt-0 pop-blue-btn">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Results</SheetTitle>
              <SheetDescription>
                Refine your search to find the perfect service provider across Canada.
              </SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">More filters coming soon...</p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
