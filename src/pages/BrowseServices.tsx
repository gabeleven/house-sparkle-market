import React, { useState, useEffect } from 'react';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useEnhancedProviders } from '@/hooks/useEnhancedProviders';
import { ServiceType } from '@/utils/serviceTypes';
import { SearchHeader } from '@/components/browse/SearchHeader';
import { ServiceFilters } from '@/components/browse/ServiceFilters';
import { ResultsContent } from '@/components/browse/ResultsContent';
import { ResultsHeader } from '@/components/browse/ResultsHeader';
import { LocationAuthPrompt } from '@/components/browse/LocationAuthPrompt';
import { useSubscription } from '@/hooks/useSubscription';

const BrowseServices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [serviceFilters, setServiceFilters] = useState<ServiceType[]>([]);
  const { userLocation, requestLocation, isLoading: locationLoading } = useUserLocation();
  const { subscription: userSubscription } = useSubscription();

  useEffect(() => {
    if (!userLocation && !locationLoading) {
      requestLocation();
    }
  }, [requestLocation, userLocation, locationLoading]);

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  const handleLocationChange = (newLocationFilter: string) => {
    setLocationFilter(newLocationFilter);
  };

  const handleServiceFilter = (service: ServiceType, checked: boolean) => {
    setServiceFilters((prevServices) => {
      if (checked) {
        return [...prevServices, service];
      } else {
        return prevServices.filter((s) => s !== service);
      }
    });
  };

  const handleRequestLocation = () => {
    requestLocation();
  };

  const { 
    providers, 
    isLoading, 
    error 
  } = useEnhancedProviders({ 
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
            onSearchChange={setSearchTerm}
            onLocationChange={setLocationFilter}
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
          </div>

          <div className="lg:col-span-3">
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
  );
};

export default BrowseServices;
