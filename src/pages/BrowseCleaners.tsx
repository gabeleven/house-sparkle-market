
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import { useCleaners } from "@/hooks/useCleaners";
import { useLocation } from "@/hooks/useLocation";
import { MapPreview } from "@/components/map/MapPreview";
import { GoogleMapView } from "@/components/map/GoogleMapView";
import { DynamicRadiusSelector } from "@/components/map/DynamicRadiusSelector";
import { SearchHeader } from "@/components/browse/SearchHeader";
import { ResultsHeader } from "@/components/browse/ResultsHeader";
import { ResultsContent } from "@/components/browse/ResultsContent";

const BrowseCleaners = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [locationFilter, setLocationFilter] = useState('');
  const [searchRadius, setSearchRadius] = useState(25);
  const [showMap, setShowMap] = useState(false);
  const { location, requestLocation } = useLocation();
  
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

  console.log('BrowseCleaners rendering - cleaners count:', cleaners?.length || 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Full Screen Map */}
        {showMap && (
          <GoogleMapView
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
            <ResultsHeader count={cleaners?.length || 0} />
            <ResultsContent
              cleaners={cleaners}
              isLoading={isLoading}
              error={error}
              hasLocation={!!location}
              onRequestLocation={requestLocation}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseCleaners;
