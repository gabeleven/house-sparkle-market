
import React, { useState, useEffect } from 'react';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useUnifiedProviders } from '@/hooks/useUnifiedProviders';
import { ServiceType } from '@/utils/serviceTypes';
import { SearchHeader } from '@/components/browse/SearchHeader';
import { ServiceFilters } from '@/components/browse/ServiceFilters';
import { ResultsContent } from '@/components/browse/ResultsContent';
import { ResultsHeader } from '@/components/browse/ResultsHeader';
import { LocationAuthPrompt } from '@/components/browse/LocationAuthPrompt';
import { GoogleMapView } from '@/components/map/GoogleMapView';
import { Button } from '@/components/ui/button';
import { Map, List, X } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { toast } from 'sonner';

const BrowseServices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [serviceFilters, setServiceFilters] = useState<ServiceType[]>([]);
  const [radiusKm, setRadiusKm] = useState(25);
  const [showMap, setShowMap] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  
  const { userLocation, requestUserLocation, loading: locationLoading } = useUserLocation();
  const { currentTier: userSubscription } = useSubscription();

  // Auto-request location on mount
  useEffect(() => {
    if (!userLocation && !locationLoading) {
      requestUserLocation();
    }
  }, [requestUserLocation, userLocation, locationLoading]);

  const handleRequestLocation = () => {
    requestUserLocation();
  };

  const handleServiceFilter = (services: ServiceType[]) => {
    setServiceFilters(services);
  };

  const { 
    providers, 
    isLoading, 
    error 
  } = useUnifiedProviders({ 
    userLocation, 
    searchTerm, 
    locationFilter, 
    serviceFilters,
    radiusKm
  });

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast.error(`Error loading service providers: ${error.message}`);
    }
  }, [error]);

  const handleToggleMap = () => {
    setShowMap(!showMap);
  };

  const handleProviderSelect = (provider: any) => {
    setSelectedProvider(provider);
  };

  const handleMapError = () => {
    toast.error('Map failed to load. Showing list view instead.');
    setShowMap(false);
  };

  if (isLoading && !providers.length) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading service providers across Canada...</p>
        </div>
      </div>
    );
  }

  // Full screen map view
  if (showMap) {
    return (
      <div className="h-screen bg-background">
        <div className="absolute top-4 left-4 z-50">
          <Button
            onClick={() => setShowMap(false)}
            variant="outline"
            size="sm"
            className="bg-white shadow-lg"
          >
            <X className="w-4 h-4 mr-2" />
            Close Map
          </Button>
        </div>
        <GoogleMapView
          providers={providers}
          userLocation={userLocation}
          radiusKm={radiusKm}
          onProviderSelect={handleProviderSelect}
          selectedProvider={selectedProvider}
          onError={handleMapError}
          isFullScreen={true}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Find Service Providers Across Canada
              </h1>
              <p className="text-muted-foreground">
                Search for professional service providers in your area using postal codes, cities, or neighborhoods.
              </p>
            </div>
            
            {/* Map Toggle Button */}
            <div className="flex gap-2">
              <Button
                onClick={handleToggleMap}
                variant={showMap ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-2"
              >
                <Map className="w-4 h-4" />
                Map View
              </Button>
            </div>
          </div>
          
          <SearchHeader
            searchTerm={searchTerm}
            locationFilter={locationFilter}
            serviceFilters={serviceFilters}
            onSearchChange={setSearchTerm}
            onLocationChange={setLocationFilter}
            onServiceFiltersChange={handleServiceFilter}
            hasLocation={!!userLocation}
            onRequestLocation={handleRequestLocation}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ServiceFilters
              selectedServices={serviceFilters}
              onServiceChange={handleServiceFilter}
            />
            
            {userLocation && (
              <div className="mt-6 p-4 bg-card border rounded-lg">
                <h3 className="font-medium mb-3">Search Radius</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={radiusKm}
                    onChange={(e) => setRadiusKm(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>5 km</span>
                    <span className="font-medium">{radiusKm} km</span>
                    <span>100 km</span>
                  </div>
                </div>
              </div>
            )}

            {/* Compact Map Preview */}
            {providers.length > 0 && userLocation && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Service Area</h3>
                  <Button
                    onClick={handleToggleMap}
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                  >
                    <Map className="w-3 h-3 mr-1" />
                    Full Map
                  </Button>
                </div>
                <div className="h-48 rounded-lg overflow-hidden border bg-gray-50">
                  <GoogleMapView
                    providers={providers.slice(0, 10)} // Limit for performance
                    userLocation={userLocation}
                    radiusKm={radiusKm}
                    onProviderSelect={handleProviderSelect}
                    selectedProvider={selectedProvider}
                    onError={handleMapError}
                    className="h-full w-full"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <ResultsHeader
                totalResults={providers.length}
                searchTerm={searchTerm}
                locationFilter={locationFilter}
                serviceFilters={serviceFilters}
                userLocation={userLocation}
              />
              
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setShowMap(false)}
                  variant={!showMap ? "default" : "outline"}
                  size="sm"
                >
                  <List className="w-4 h-4 mr-2" />
                  List
                </Button>
                <Button
                  onClick={handleToggleMap}
                  variant={showMap ? "default" : "outline"}
                  size="sm"
                >
                  <Map className="w-4 h-4 mr-2" />
                  Map
                </Button>
              </div>
            </div>

            {!userLocation && !locationLoading && (
              <LocationAuthPrompt onRequestLocation={handleRequestLocation} />
            )}
            
            {error ? (
              <div className="text-center py-12">
                <p className="text-destructive mb-2">
                  Unable to load service providers
                </p>
                <p className="text-sm text-muted-foreground">
                  Please try refreshing the page or adjusting your search criteria.
                </p>
              </div>
            ) : (
              <ResultsContent
                cleaners={providers}
                isLoading={isLoading}
                error={error}
                hasLocation={!!userLocation}
                onRequestLocation={handleRequestLocation}
                userSubscription={userSubscription}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseServices;
