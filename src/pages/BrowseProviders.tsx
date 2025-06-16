
import React, { useState, useEffect } from 'react';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useUnifiedProviders } from '@/hooks/useUnifiedProviders';
import { ServiceType } from '@/utils/serviceTypes';
import { SearchHeader } from '@/components/browse/SearchHeader';
import { HierarchicalServiceFilters } from '@/components/browse/HierarchicalServiceFilters';
import { ResultsContent } from '@/components/browse/ResultsContent';
import { ResultsHeader } from '@/components/browse/ResultsHeader';
import { LocationAuthPrompt } from '@/components/browse/LocationAuthPrompt';
import { SimpleMapView } from '@/components/map/SimpleMapView';
import { Button } from '@/components/ui/button';
import { Map, List } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { toast } from 'sonner';
import { ProviderProfile } from '@/types/providers';

const BrowseProviders = () => {
  console.log('BrowseProviders component rendering');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [serviceFilters, setServiceFilters] = useState<ServiceType[]>([]);
  const [radiusKm, setRadiusKm] = useState(25);
  const [showMap, setShowMap] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ProviderProfile | null>(null);
  
  const { userLocation, requestUserLocation, loading: locationLoading } = useUserLocation();
  const { currentTier: userSubscription } = useSubscription();

  // Auto-request location on mount
  useEffect(() => {
    console.log('BrowseProviders: Auto-requesting location');
    if (!userLocation && !locationLoading) {
      requestUserLocation();
    }
  }, [requestUserLocation, userLocation, locationLoading]);

  // When serviceFilters is empty, show all providers (don't filter by service)
  const { 
    providers, 
    isLoading, 
    error 
  } = useUnifiedProviders({ 
    userLocation, 
    searchTerm, 
    locationFilter, 
    serviceFilters: serviceFilters.length === 0 ? [] : serviceFilters,
    radiusKm
  });

  console.log('BrowseProviders: providers count:', providers?.length || 0);
  console.log('BrowseProviders: serviceFilters:', serviceFilters);

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      console.error('BrowseProviders error:', error);
      toast.error(`Error loading service providers: ${error.message}`);
    }
  }, [error]);

  const handleRequestLocation = () => {
    console.log('BrowseProviders: Requesting location');
    requestUserLocation();
  };

  const handleServiceFilter = (services: ServiceType[]) => {
    console.log('BrowseProviders: Service filter changed:', services);
    setServiceFilters(services);
  };

  const handleToggleMap = () => {
    console.log('BrowseProviders: Toggling map view');
    setShowMap(!showMap);
  };

  const handleProviderSelect = (provider: ProviderProfile) => {
    console.log('BrowseProviders: Provider selected:', provider);
    setSelectedProvider(provider);
  };

  console.log('BrowseProviders: Rendering with state:', {
    isLoading,
    providersCount: providers?.length || 0,
    showMap,
    userLocation: !!userLocation,
    error: !!error,
    serviceFiltersCount: serviceFilters.length
  });

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
                {serviceFilters.length === 0 
                  ? "Showing all service providers. Select categories above to filter."
                  : `Filtered by ${serviceFilters.length} service category${serviceFilters.length !== 1 ? 'ies' : 'y'}.`
                }
              </p>
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
            <HierarchicalServiceFilters
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

            {/* Simple Map Section */}
            {showMap && (
              <div className="mb-6">
                <SimpleMapView
                  providers={providers}
                  userLocation={userLocation}
                  onProviderSelect={handleProviderSelect}
                  className="h-96"
                />
              </div>
            )}

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

export default BrowseProviders;
