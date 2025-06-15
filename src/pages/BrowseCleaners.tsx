
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

const BrowseCleaners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [serviceFilters, setServiceFilters] = useState<ServiceType[]>([]);
  const { userLocation, requestUserLocation, loading: locationLoading } = useUserLocation();
  const { currentTier: userSubscription } = useSubscription();

  useEffect(() => {
    if (userLocation) {
      console.log('User location:', userLocation);
    }
  }, [userLocation]);

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
  } = useEnhancedProviders({ 
    userLocation, 
    searchTerm, 
    locationFilter, 
    serviceFilters 
  });

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
    </div>
  );
};

export default BrowseCleaners;
