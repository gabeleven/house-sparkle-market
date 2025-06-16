
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useUnifiedProviders } from '@/hooks/useUnifiedProviders';
import { ServiceType } from '@/utils/serviceTypes';
import { SearchHeader } from '@/components/browse/SearchHeader';
import { ServiceFilters } from '@/components/browse/ServiceFilters';
import { ResultsContent } from '@/components/browse/ResultsContent';
import { ResultsHeader } from '@/components/browse/ResultsHeader';
import { LocationAuthPrompt } from '@/components/browse/LocationAuthPrompt';
import { ProviderPopup } from '@/components/map/ProviderPopup';
import { Button } from '@/components/ui/button';
import { Map, List, X, AlertTriangle } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { toast } from 'sonner';
import { ProviderProfile } from '@/types/providers';

const LIBRARIES: ("places" | "geometry")[] = ["places", "geometry"];

const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

const CANADA_CENTER = {
  lat: 56.1304,
  lng: -106.3468
};

const BrowseProviders = () => {
  console.log('BrowseProviders component rendering');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [serviceFilters, setServiceFilters] = useState<ServiceType[]>([]);
  const [radiusKm, setRadiusKm] = useState(25);
  const [showMap, setShowMap] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<ProviderProfile | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isMapLoading, setIsMapLoading] = useState(false);
  
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
    setIsMapLoading(true);
    setMapError(null);
    setShowMap(!showMap);
    
    // Reset loading state after a brief delay
    setTimeout(() => {
      setIsMapLoading(false);
    }, 1000);
  };

  const handleProviderSelect = (provider: ProviderProfile) => {
    console.log('BrowseProviders: Provider selected:', provider);
    setSelectedProvider(provider);
  };

  const handleCloseInfoWindow = () => {
    console.log('BrowseProviders: Closing info window');
    setSelectedProvider(null);
  };

  const handleMapLoadError = () => {
    console.error('BrowseProviders: Map failed to load');
    setMapError('Unable to load map. Please try again or use the list view.');
    setIsMapLoading(false);
    toast.error('Map failed to load. Showing list view instead.');
    setShowMap(false);
  };

  // Calculate map center and zoom
  const mapCenter = userLocation ? {
    lat: userLocation.latitude,
    lng: userLocation.longitude
  } : CANADA_CENTER;

  const mapZoom = userLocation ? 11 : 4;

  console.log('BrowseProviders: Rendering with state:', {
    isLoading,
    providersCount: providers?.length || 0,
    showMap,
    userLocation: !!userLocation,
    error: !!error,
    serviceFiltersCount: serviceFilters.length,
    mapError: !!mapError
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
            
            {/* Map Toggle Button */}
            <div className="flex gap-2">
              <Button
                onClick={handleToggleMap}
                variant={showMap ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-2"
                disabled={isMapLoading}
              >
                {isMapLoading ? (
                  <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                ) : (
                  <Map className="w-4 h-4" />
                )}
                {showMap ? 'Hide Map' : 'Show Map'}
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
                  disabled={isMapLoading}
                >
                  {isMapLoading ? (
                    <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                  ) : (
                    <Map className="w-4 h-4 mr-2" />
                  )}
                  Map
                </Button>
              </div>
            </div>

            {/* Map Section */}
            {showMap && (
              <div className="mb-6">
                {mapError ? (
                  <div className="bg-destructive/10 border border-destructive rounded-lg p-4 flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    <div>
                      <p className="text-destructive font-medium">Map Error</p>
                      <p className="text-sm text-muted-foreground">{mapError}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleToggleMap}
                      className="ml-auto"
                    >
                      Retry
                    </Button>
                  </div>
                ) : (
                  <div className="bg-card border rounded-lg overflow-hidden">
                    <LoadScript 
                      googleMapsApiKey={process.env.NODE_ENV === 'production' ? 'YOUR_GOOGLE_MAPS_API_KEY' : 'AIzaSyAJXkmufaWRLR5t4iFFp4qupryDKNZZO9o'}
                      libraries={LIBRARIES}
                      onError={handleMapLoadError}
                    >
                      <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={mapCenter}
                        zoom={mapZoom}
                        options={{
                          disableDefaultUI: false,
                          zoomControl: true,
                          mapTypeControl: false,
                          scaleControl: true,
                          streetViewControl: false,
                          rotateControl: false,
                          fullscreenControl: true
                        }}
                      >
                        {/* User location marker */}
                        {userLocation && (
                          <Marker
                            position={{ lat: userLocation.latitude, lng: userLocation.longitude }}
                            icon={{
                              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="#FFFFFF" stroke-width="2"/>
                                  <circle cx="12" cy="12" r="3" fill="#FFFFFF"/>
                                </svg>
                              `),
                              scaledSize: new window.google.maps.Size(24, 24)
                            }}
                            title="Your Location"
                          />
                        )}

                        {/* Provider markers */}
                        {providers.map((provider) => {
                          if (!provider.latitude || !provider.longitude) return null;
                          
                          return (
                            <Marker
                              key={provider.id}
                              position={{ lat: Number(provider.latitude), lng: Number(provider.longitude) }}
                              onClick={() => handleProviderSelect(provider)}
                              icon={{
                                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 2C11.6 2 8 5.6 8 10C8 16 16 30 16 30C16 30 24 16 24 10C24 5.6 20.4 2 16 2Z" fill="#7C3AED" stroke="#FFFFFF" stroke-width="2"/>
                                    <circle cx="16" cy="10" r="4" fill="#FFFFFF"/>
                                  </svg>
                                `),
                                scaledSize: new window.google.maps.Size(32, 32)
                              }}
                            />
                          );
                        })}

                        {/* Info window for selected provider */}
                        {selectedProvider && selectedProvider.latitude && selectedProvider.longitude && (
                          <InfoWindow
                            position={{ lat: Number(selectedProvider.latitude), lng: Number(selectedProvider.longitude) }}
                            onCloseClick={handleCloseInfoWindow}
                          >
                            <div>
                              <ProviderPopup
                                provider={selectedProvider}
                                onViewProfile={(provider) => {
                                  console.log('View profile:', provider);
                                }}
                                onClose={handleCloseInfoWindow}
                              />
                            </div>
                          </InfoWindow>
                        )}
                      </GoogleMap>
                    </LoadScript>
                  </div>
                )}
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
