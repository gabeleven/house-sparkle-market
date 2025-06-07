
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Filter } from 'lucide-react';
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
  return (
    <div className="bg-card rounded-lg shadow-sm p-6 mb-8 border border-border">
      <h1 className="text-3xl font-bold text-foreground mb-6">Find Cleaners Across Quebec</h1>
      
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
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="City or postal code..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Button onClick={onSearch} className="bg-primary hover:bg-primary/90">
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
              className="text-primary border-primary hover:bg-primary/10"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Use My Location
            </Button>
          )}
          
          {location && (
            <span className="text-sm text-green-600 dark:text-green-400 font-medium">
              ✓ Using your location for better results
            </span>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Results</SheetTitle>
              <SheetDescription>
                Refine your search to find the perfect cleaner.
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
