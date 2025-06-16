
import React, { useState, useEffect } from 'react';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useUnifiedProviders } from '@/hooks/useUnifiedProviders';
import { ServiceType } from '@/utils/serviceTypes';
import { SearchHeader } from '@/components/browse/SearchHeader';
import { ResultsContent } from '@/components/browse/ResultsContent';
import { ResultsHeader } from '@/components/browse/ResultsHeader';
import { LocationAuthPrompt } from '@/components/browse/LocationAuthPrompt';
import { useSubscription } from '@/hooks/useSubscription';

const BrowseServices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [serviceFilters, setServiceFilters] = useState<ServiceType[]>([]);
  const { userLocation, requestUserLocation, loading: locationLoading } = useUserLocation();
  const { currentTier: userSubscription } = useSubscription();

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
    serviceFilters 
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading service providers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Error loading service providers: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
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

        <div className="space-y-8">
          <ResultsHeader
            totalResults={providers.length}
            searchTerm={searchTerm}
            locationFilter={locationFilter}
            serviceFilters={serviceFilters}
            userLocation={userLocation}
          />

          {!userLocation && (
            <LocationAuthPrompt onRequestLocation={handleRequestLocation} />
          )}
          
          <ResultsContent
            cleaners={providers}
            isLoading={isLoading}
            error={error}
            hasLocation={!!userLocation}
            onRequestLocation={handleRequestLocation}
            userSubscription={userSubscription}
          />
        </div>
      </div>
    </div>
  );
};

export default BrowseServices;
