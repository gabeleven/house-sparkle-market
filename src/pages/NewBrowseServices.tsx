
import React, { useState, useEffect } from 'react';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useUnifiedProviders } from '@/hooks/useUnifiedProviders';
import { ServiceType } from '@/utils/serviceTypes';
import { SearchHeader } from '@/components/browse/SearchHeader';
import { ServiceFilters } from '@/components/browse/ServiceFilters';
import { ResultsContent } from '@/components/browse/ResultsContent';
import { ResultsHeader } from '@/components/browse/ResultsHeader';
import { LocationAuthPrompt } from '@/components/browse/LocationAuthPrompt';
import { useSubscription } from '@/hooks/useSubscription';
import { toast } from 'sonner';

const NewBrowseServices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [serviceFilters, setServiceFilters] = useState<ServiceType[]>([]);
  const [radiusKm, setRadiusKm] = useState(25);
  
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
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Find Service Providers Across Canada
          </h1>
          <p className="text-muted-foreground mb-6">
            Search for professional service providers in your area using postal codes, cities, or neighborhoods.
          </p>
          
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
          </div>

          <div className="lg:col-span-3">
            <ResultsHeader
              totalResults={providers.length}
              searchTerm={searchTerm}
              locationFilter={locationFilter}
              serviceFilters={serviceFilters}
              userLocation={userLocation}
            />

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

export default NewBrowseServices;
