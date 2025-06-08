
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, AlertCircle, MapPin } from 'lucide-react';
import { CleanerProfile } from '@/hooks/useCleaners';
import { Skeleton } from '@/components/ui/skeleton';
import { useGoogleMapsApi } from '@/hooks/useGoogleMapsApi';
import { useMapState } from '@/hooks/useMapState';
import { useUserLocation } from '@/hooks/useUserLocation';
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
  userLocation: propUserLocation,
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

  const { userLocation: hookUserLocation, loading: locationLoading, requestUserLocation } = useUserLocation();
  const [mapReady, setMapReady] = useState(false);

  // Use hook location if prop location is not provided
  const effectiveUserLocation = propUserLocation || hookUserLocation;

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
  } = useMapState({ userLocation: effectiveUserLocation });

  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: !isFullScreen,
    gestureHandling: 'cooperative', // Better for Edge browser
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      }
    ]
  };

  // Handle map load
  const handleMapLoad = (map: google.maps.Map) => {
    console.log('Map instance loaded successfully');
    console.log('Map center:', map.getCenter()?.toJSON());
    console.log('Map zoom:', map.getZoom());
    setMapInstance(map);
    setMapReady(true);

    // Center on user location if available
    if (effectiveUserLocation) {
      const userPos = {
        lat: effectiveUserLocation.latitude,
        lng: effectiveUserLocation.longitude
      };
      console.log('Centering map on user location:', userPos);
      map.setCenter(userPos);
      map.setZoom(12);
    }
  };

  // Enhanced error handling for Edge browser
  useEffect(() => {
    if (hasError && onError) {
      console.log('Map loading failed, triggering fallback after delay...');
      const timer = setTimeout(() => {
        onError();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasError, onError]);

  // Auto-request location if not available
  useEffect(() => {
    if (!effectiveUserLocation && !locationLoading) {
      console.log('No user location available, requesting...');
      requestUserLocation();
    }
  }, [effectiveUserLocation, locationLoading, requestUserLocation]);

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
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Loading state
  if (isLoading || !scriptLoaded || !mapReady) {
    return (
      <Card className={isFullScreen ? "fixed inset-0 z-50 rounded-none" : "h-96"}>
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Loading Interactive Map...
          </CardTitle>
          {onClose && (
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-3 h-3" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0 flex-1">
          <div className={isFullScreen ? "h-full" : "h-80"}>
            <div className="h-full flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Loading Google Maps...</p>
                <p className="text-sm text-gray-500">
                  {navigator.userAgent.includes('Edge') || navigator.userAgent.includes('Edg/') 
                    ? 'Optimizing for Edge browser...' 
                    : 'This may take a moment...'}
                </p>
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
            loadingElement={
              <div className="h-full flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <Skeleton className="w-12 h-12 rounded-full mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Loading...</p>
                </div>
              </div>
            }
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={zoom}
              options={mapOptions}
              onLoad={handleMapLoad}
              onError={(error) => {
                console.error('GoogleMap component error:', error);
                if (onError) onError();
              }}
            >
              <MapMarkers
                cleaners={cleaners}
                userLocation={effectiveUserLocation}
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
