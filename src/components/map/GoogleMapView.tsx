
import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, AlertCircle } from 'lucide-react';
import { CleanerProfile } from '@/hooks/useCleaners';
import { Skeleton } from '@/components/ui/skeleton';
import { useGoogleMapsApi } from '@/hooks/useGoogleMapsApi';
import { useMapState } from '@/hooks/useMapState';
import { MapMarkers } from './MapMarkers';
import { MapControls } from './MapControls';

interface Location {
  latitude: number;
  longitude: number;
}

interface GoogleMapViewProps {
  cleaners: CleanerProfile[];
  userLocation?: Location | null;
  radius?: number;
  onClose?: () => void;
  onError?: () => void;
  isFullScreen?: boolean;
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

export const GoogleMapView: React.FC<GoogleMapViewProps> = ({
  cleaners,
  userLocation,
  radius = 25,
  onClose,
  onError,
  isFullScreen = false
}) => {
  const {
    isLoading,
    hasError,
    errorMessage,
    scriptLoaded,
    isGoogleMapsAvailable,
    handleLoadSuccess,
    handleLoadError,
    apiKey
  } = useGoogleMapsApi();

  const {
    selectedCleaner,
    setSelectedCleaner,
    mapInstance,
    setMapInstance,
    center,
    zoom,
    handleMarkerClick,
    handleRecenter,
    handleCenterOnUser
  } = useMapState({ userLocation });

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: !isFullScreen,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      }
    ]
  };

  // Error state
  if (hasError) {
    return (
      <Card className={isFullScreen ? "fixed inset-0 z-50 rounded-none" : "h-96"}>
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            Map Unavailable
          </CardTitle>
          {onClose && (
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-3 h-3" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <p className="text-center text-gray-600 mb-4">{errorMessage}</p>
          <div className="flex gap-2">
            {onError && (
              <Button onClick={onError} variant="default">
                Use Simple Map
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Loading state
  if (isLoading || !scriptLoaded) {
    return (
      <Card className={isFullScreen ? "fixed inset-0 z-50 rounded-none" : "h-96"}>
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <CardTitle className="text-lg">Loading Map...</CardTitle>
          {onClose && (
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-3 h-3" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0 flex-1">
          <div className={isFullScreen ? "h-full" : "h-80"}>
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
                <p className="text-gray-600">Loading Google Maps...</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={isFullScreen ? "fixed inset-0 z-50 rounded-none" : "h-96"}>
      <CardHeader className="flex flex-row items-center justify-between py-3">
        <CardTitle className="text-lg">
          {cleaners.length} Cleaners in Your Area
        </CardTitle>
        <MapControls
          cleanerCount={cleaners.length}
          onRecenter={handleRecenter}
          onCenterOnUser={handleCenterOnUser}
          onClose={onClose}
        />
      </CardHeader>
      <CardContent className="p-0 flex-1">
        <div className={isFullScreen ? "h-full" : "h-80"}>
          <LoadScript 
            googleMapsApiKey={apiKey}
            onLoad={handleLoadSuccess}
            onError={(error) => handleLoadError(error, onError)}
            libraries={['places']}
            preventGoogleFontsLoading={true}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={zoom}
              options={mapOptions}
              onLoad={setMapInstance}
            >
              <MapMarkers
                cleaners={cleaners}
                userLocation={userLocation}
                radius={radius}
                selectedCleaner={selectedCleaner}
                onMarkerClick={handleMarkerClick}
                onInfoWindowClose={() => setSelectedCleaner(null)}
                isGoogleMapsAvailable={isGoogleMapsAvailable}
              />
            </GoogleMap>
          </LoadScript>
        </div>
      </CardContent>
    </Card>
  );
};
