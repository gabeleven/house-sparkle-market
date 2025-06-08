
import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Circle, InfoWindow } from '@react-google-maps/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Navigation, RotateCcw, AlertCircle } from 'lucide-react';
import { CleanerMapPopup } from './CleanerMapPopup';
import { useMapCenter } from '@/hooks/useMapCenter';
import { CleanerProfile } from '@/hooks/useCleaners';
import { Skeleton } from '@/components/ui/skeleton';

interface Location {
  latitude: number;
  longitude: number;
}

interface GoogleMapViewProps {
  cleaners: CleanerProfile[];
  userLocation?: Location | null;
  radius?: number;
  onClose?: () => void;
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
  isFullScreen = false
}) => {
  const [selectedCleaner, setSelectedCleaner] = useState<CleanerProfile | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { mapCenter, loading: mapCenterLoading } = useMapCenter();
  
  // Use map center from hook, fallback to user location, then default
  const center = React.useMemo(() => {
    if (!mapCenterLoading && mapCenter) {
      return {
        lat: mapCenter.latitude,
        lng: mapCenter.longitude
      };
    }
    if (userLocation) {
      return {
        lat: userLocation.latitude,
        lng: userLocation.longitude
      };
    }
    // Default to Montreal if nothing else available
    return {
      lat: 45.5017,
      lng: -73.5673
    };
  }, [mapCenter, mapCenterLoading, userLocation]);

  const zoom = React.useMemo(() => {
    if (!mapCenterLoading && mapCenter) {
      return mapCenter.zoom;
    }
    return 11;
  }, [mapCenter, mapCenterLoading]);

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

  const handleMarkerClick = (cleaner: CleanerProfile) => {
    setSelectedCleaner(cleaner);
  };

  const handleRecenter = () => {
    if (mapInstance && center) {
      mapInstance.panTo(center);
      mapInstance.setZoom(zoom);
    }
  };

  const handleCenterOnUser = () => {
    if (navigator.geolocation && mapInstance) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        mapInstance.panTo(userPos);
        mapInstance.setZoom(12);
      });
    }
  };

  const handleLoadSuccess = () => {
    console.log('Google Maps API loaded successfully');
    setIsLoading(false);
    setHasError(false);
  };

  const handleLoadError = (error: Error) => {
    console.error('Google Maps API failed to load:', error);
    setIsLoading(false);
    setHasError(true);
    setErrorMessage('Failed to load Google Maps. Please check your internet connection and try again.');
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    setErrorMessage('');
  };

  if (hasError) {
    return (
      <Card className={isFullScreen ? "fixed inset-0 z-50 rounded-none" : "h-96"}>
        <CardHeader className="flex flex-row items-center justify-between py-3">
          <CardTitle className="text-lg">Map Error</CardTitle>
          {onClose && (
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-3 h-3" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-6 flex flex-col items-center justify-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <p className="text-center text-gray-600 mb-4">{errorMessage}</p>
          <Button onClick={handleRetry} variant="outline">
            Try Again
          </Button>
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
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRecenter}
            className="text-xs"
            disabled={isLoading}
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Center
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCenterOnUser}
            className="text-xs"
            disabled={isLoading}
          >
            <Navigation className="w-3 h-3 mr-1" />
            My Location
          </Button>
          {onClose && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="text-xs"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1">
        <div className={isFullScreen ? "h-full" : "h-80"}>
          {isLoading && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
                <p className="text-gray-600">Loading Google Maps...</p>
              </div>
            </div>
          )}
          <LoadScript 
            googleMapsApiKey="AIzaSyAJXkmufa WRLR54fFpq4qupYDKNZZO9o"
            onLoad={handleLoadSuccess}
            onError={handleLoadError}
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
              {/* User location marker */}
              {userLocation && (
                <>
                  <Marker
                    position={{
                      lat: userLocation.latitude,
                      lng: userLocation.longitude
                    }}
                    icon={{
                      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="8" fill="#3b82f6" stroke="#ffffff" stroke-width="2"/>
                          <circle cx="12" cy="12" r="3" fill="#ffffff"/>
                        </svg>
                      `),
                      scaledSize: new google.maps.Size(24, 24),
                    }}
                    title="Your Location"
                  />
                  
                  {/* Service radius circle */}
                  <Circle
                    center={{
                      lat: userLocation.latitude,
                      lng: userLocation.longitude
                    }}
                    radius={radius * 1000} // Convert km to meters
                    options={{
                      fillColor: '#3b82f6',
                      fillOpacity: 0.1,
                      strokeColor: '#3b82f6',
                      strokeOpacity: 0.3,
                      strokeWeight: 2,
                    }}
                  />
                </>
              )}

              {/* Cleaner markers */}
              {cleaners.map((cleaner) => {
                if (!cleaner.latitude || !cleaner.longitude) return null;
                
                return (
                  <Marker
                    key={cleaner.id}
                    position={{
                      lat: Number(cleaner.latitude),
                      lng: Number(cleaner.longitude)
                    }}
                    onClick={() => handleMarkerClick(cleaner)}
                    icon={{
                      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="16" cy="16" r="12" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
                          <text x="16" y="21" text-anchor="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold">🧽</text>
                        </svg>
                      `),
                      scaledSize: new google.maps.Size(32, 32),
                    }}
                    title={cleaner.business_name || cleaner.full_name}
                  />
                );
              })}

              {/* Info window for selected cleaner */}
              {selectedCleaner && selectedCleaner.latitude && selectedCleaner.longitude && (
                <InfoWindow
                  position={{
                    lat: Number(selectedCleaner.latitude),
                    lng: Number(selectedCleaner.longitude)
                  }}
                  onCloseClick={() => setSelectedCleaner(null)}
                >
                  <div className="p-0">
                    <CleanerMapPopup 
                      cleaner={selectedCleaner}
                      onClose={() => setSelectedCleaner(null)}
                    />
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </CardContent>
    </Card>
  );
};
