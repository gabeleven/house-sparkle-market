
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCleaners } from "@/hooks/useCleaners";
import { useLocation } from "@/hooks/useLocation";
import { useAuth } from "@/hooks/useAuth";
import { MapPreview } from "@/components/map/MapPreview";
import { GoogleMapView } from "@/components/map/GoogleMapView";
import { MapView } from "@/components/map/MapView";
import { MapErrorBoundary } from "@/components/map/MapErrorBoundary";
import { DynamicRadiusSelector } from "@/components/map/DynamicRadiusSelector";
import { SearchHeader } from "@/components/browse/SearchHeader";
import { ResultsHeader } from "@/components/browse/ResultsHeader";
import { ResultsContent } from "@/components/browse/ResultsContent";
import { LocationAuthPrompt } from "@/components/browse/LocationAuthPrompt";
import { SearchBreadcrumbs } from "@/components/browse/SearchBreadcrumbs";
import { SubscriptionTier } from "@/types/subscription";

const BrowseCleaners = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialLocation = searchParams.get('location') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [locationFilter, setLocationFilter] = useState(initialLocation);
  const [searchRadius, setSearchRadius] = useState(25);
  const [showMap, setShowMap] = useState(false);
  const [useGoogleMaps, setUseGoogleMaps] = useState(true);
  const [selectedCleaner, setSelectedCleaner] = useState(null);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const { location, requestLocation } = useLocation();
  const { user } = useAuth();
  
  // Mock user subscription - in a real app, this would come from user subscription data
  const userSubscription: SubscriptionTier = 'FREE'; // This would be fetched from user's actual subscription
  
  // Show location prompt when user first arrives with a postal code but no location permission
  useEffect(() => {
    if (user && initialLocation && !location) {
      setShowLocationPrompt(true);
    }
  }, [user, initialLocation, location]);
  
  // Create a search location object for the DynamicRadiusSelector
  const searchLocation = location ? {
    lat: location.latitude,
    lng: location.longitude,
    address: "Your location"
  } : null;
  
  const { cleaners, isLoading, error } = useCleaners({
    userLocation: location,
    searchTerm: searchTerm,
    locationFilter: locationFilter
  });

  const handleSearch = () => {
    console.log('Search triggered with term:', searchTerm, 'and location:', locationFilter);
  };

  const handleRadiusChange = (newRadius: number) => {
    setSearchRadius(newRadius);
    console.log('Radius changed to:', newRadius);
  };

  const handleMapFallback = () => {
    console.log('Falling back to simple map view');
    setUseGoogleMaps(false);
  };

  const handleCloseMap = () => {
    setShowMap(false);
    setUseGoogleMaps(true); // Reset to try Google Maps again next time
  };

  const handleCleanerSelect = (cleaner: any) => {
    setSelectedCleaner(cleaner);
  };

  const handleLocationGranted = () => {
    setShowLocationPrompt(false);
    // Location will be automatically updated by the useLocation hook
  };

  const handleLocationDenied = () => {
    setShowLocationPrompt(false);
    // Continue with postal code search
  };

  console.log('BrowseCleaners rendering - cleaners count:', cleaners?.length || 0);

  // Show location authorization prompt
  if (showLocationPrompt) {
    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SearchBreadcrumbs postalCode={initialLocation} />
          <div className="flex items-center justify-center min-h-[60vh]">
            <LocationAuthPrompt
              onLocationGranted={handleLocationGranted}
              onLocationDenied={handleLocationDenied}
              postalCode={initialLocation}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBreadcrumbs 
          postalCode={locationFilter || initialLocation} 
          hasLocation={!!location}
        />

        <SearchHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          onSearch={handleSearch}
          location={location}
          onRequestLocation={requestLocation}
        />

        {/* Integrated Radius Selector */}
        {!showMap && searchLocation && (
          <DynamicRadiusSelector 
            currentRadius={searchRadius}
            onRadiusChange={handleRadiusChange}
            searchLocation={searchLocation}
          />
        )}

        {/* Map Preview */}
        {!showMap && !isLoading && cleaners && cleaners.length > 0 && (
          <MapPreview 
            cleaners={cleaners}
            onShowMap={() => setShowMap(true)}
            userLocation={location}
          />
        )}

        {/* Full Screen Map with Error Boundary */}
        {showMap && (
          <MapErrorBoundary 
            fallback={
              <MapView
                cleaners={cleaners || []}
                userLocation={location}
                radius={searchRadius}
                onClose={handleCloseMap}
                isFullScreen={true}
              />
            }
          >
            {useGoogleMaps ? (
              <GoogleMapView
                cleaners={cleaners || []}
                onCleanerSelect={handleCleanerSelect}
                selectedCleaner={selectedCleaner}
                radiusKm={searchRadius}
                onRadiusChange={handleRadiusChange}
                onClose={handleCloseMap}
                onError={handleMapFallback}
                isFullScreen={true}
                className="h-[80vh]"
              />
            ) : (
              <MapView
                cleaners={cleaners || []}
                userLocation={location}
                radius={searchRadius}
                onClose={handleCloseMap}
                isFullScreen={true}
              />
            )}
          </MapErrorBoundary>
        )}

        {/* Results */}
        {!showMap && (
          <>
            <ResultsHeader count={cleaners?.length || 0} />
            <ResultsContent
              cleaners={cleaners}
              isLoading={isLoading}
              error={error}
              hasLocation={!!location}
              onRequestLocation={requestLocation}
              userSubscription={userSubscription}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseCleaners;
