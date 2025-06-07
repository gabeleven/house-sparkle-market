
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Filter } from "lucide-react";
import { useCleaners } from "@/hooks/useCleaners";
import { useLocation } from "@/hooks/useLocation";
import { CleanerCard } from "@/components/CleanerCard";
import { MapPreview } from "@/components/map/MapPreview";
import { MapView } from "@/components/map/MapView";
import { RadiusSelector } from "@/components/map/RadiusSelector";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const BrowseCleaners = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [locationFilter, setLocationFilter] = useState('');
  const [searchRadius, setSearchRadius] = useState(10);
  const [showMap, setShowMap] = useState(false);
  const { location, requestLocation } = useLocation();
  
  const { cleaners, isLoading, error } = useCleaners({
    userLocation: location,
    searchTerm: searchTerm,
    locationFilter: locationFilter
  });

  const handleSearch = () => {
    // The search is reactive, so this is mainly for mobile submit
    console.log('Search triggered with term:', searchTerm, 'and location:', locationFilter);
  };

  const handleRadiusChange = (newRadius: number) => {
    setSearchRadius(newRadius);
    // Here you could refetch cleaners with new radius
    console.log('Radius changed to:', newRadius);
  };

  console.log('BrowseCleaners rendering - cleaners count:', cleaners?.length || 0);
  console.log('Loading state:', isLoading);
  console.log('Error state:', error);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Cleaners Near You</h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search by name, service, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300"
                />
              </div>
            </div>
            
            <div className="md:w-64">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Location..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10 border-gray-300"
                />
              </div>
            </div>

            <Button onClick={handleSearch} className="bg-purple-600 hover:bg-purple-700">
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
                  onClick={requestLocation}
                  className="text-purple-600 border-purple-600 hover:bg-purple-50"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Use My Location
                </Button>
              )}
              
              {location && (
                <span className="text-sm text-green-600 font-medium">
                  ✓ Using your location for better results
                </span>
              )}
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="mt-2 sm:mt-0 border-gray-300">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-white">
                <SheetHeader>
                  <SheetTitle>Filter Results</SheetTitle>
                  <SheetDescription>
                    Refine your search to find the perfect cleaner.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <p className="text-sm text-gray-500">More filters coming soon...</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Map Preview */}
        {!showMap && !isLoading && cleaners && cleaners.length > 0 && (
          <MapPreview 
            cleaners={cleaners}
            onShowMap={() => setShowMap(true)}
            userLocation={location}
          />
        )}

        {/* Radius Selector */}
        {!showMap && location && (
          <RadiusSelector 
            currentRadius={searchRadius}
            onRadiusChange={handleRadiusChange}
            userLocation={location}
          />
        )}

        {/* Full Screen Map */}
        {showMap && (
          <MapView
            cleaners={cleaners || []}
            userLocation={location}
            radius={searchRadius}
            onClose={() => setShowMap(false)}
            isFullScreen={true}
          />
        )}

        {/* Results */}
        {!showMap && (
          <>
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {cleaners?.length || 0} cleaner{(cleaners?.length || 0) !== 1 ? 's' : ''} found
                </h2>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse bg-white border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6 text-center">
                  <p className="text-red-600">Error loading cleaners: {error.message || 'Unknown error'}. Please try again.</p>
                </CardContent>
              </Card>
            ) : !cleaners || cleaners.length === 0 ? (
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No cleaners found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search terms or location to find more results.
                    </p>
                    {!location && (
                      <Button
                        onClick={requestLocation}
                        variant="outline"
                        className="text-purple-600 border-purple-600 hover:bg-purple-50"
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Enable Location for Better Results
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cleaners.map((cleaner) => (
                  <CleanerCard key={cleaner.id} cleaner={cleaner} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseCleaners;
