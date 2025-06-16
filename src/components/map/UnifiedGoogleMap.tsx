
import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { MapMarkers } from './MapMarkers';
import { MapControls } from './MapControls';
import { ProviderProfile } from '@/types/providers';
import { useGoogleMapsLoader } from '@/hooks/useGoogleMapsLoader';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const CANADA_CENTER = {
  lat: 56.1304,
  lng: -106.3468
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
  gestureHandling: 'cooperative',
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ]
};

interface UnifiedGoogleMapProps {
  providers: ProviderProfile[];
  userLocation?: { latitude: number; longitude: number } | null;
  radiusKm?: number;
  onProviderSelect?: (provider: ProviderProfile) => void;
  selectedProvider?: ProviderProfile | null;
  onClose?: () => void;
  className?: string;
  isFullScreen?: boolean;
}

export const UnifiedGoogleMap: React.FC<UnifiedGoogleMapProps> = ({
  providers,
  userLocation,
  radiusKm = 25,
  onProviderSelect,
  selectedProvider,
  onClose,
  className = "",
  isFullScreen = false
}) => {
  const { isLoaded, isLoading, error } = useGoogleMapsLoader();
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [mapSelectedProvider, setMapSelectedProvider] = useState<ProviderProfile | null>(null);

  // Calculate map center and zoom
  const mapCenter = userLocation ? {
    lat: userLocation.latitude,
    lng: userLocation.longitude
  } : CANADA_CENTER;

  const mapZoom = userLocation ? 11 : 4;

  const onLoad = useCallback((map: google.maps.Map) => {
    setMapInstance(map);
    
    // Add click handler to deselect providers when clicking on map
    map.addListener('click', () => {
      setMapSelectedProvider(null);
    });
  }, []);

  const onUnmount = useCallback(() => {
    setMapInstance(null);
  }, []);

  const handleMarkerClick = useCallback((provider: ProviderProfile) => {
    setMapSelectedProvider(provider);
    if (onProviderSelect) {
      onProviderSelect(provider);
    }
  }, [onProviderSelect]);

  const handleInfoWindowClose = useCallback(() => {
    setMapSelectedProvider(null);
  }, []);

  const handleRecenter = useCallback(() => {
    if (mapInstance && userLocation) {
      mapInstance.panTo({ lat: userLocation.latitude, lng: userLocation.longitude });
      mapInstance.setZoom(11);
    }
  }, [mapInstance, userLocation]);

  const handleCenterOnUser = useCallback(() => {
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
  }, [mapInstance]);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-center p-4">
          <p className="text-red-600 mb-2">Failed to load Google Maps</p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading || !isLoaded) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading Google Maps...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={mapZoom}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <MapMarkers
          providers={providers}
          userLocation={userLocation}
          radius={radiusKm}
          selectedProvider={mapSelectedProvider || selectedProvider}
          onMarkerClick={handleMarkerClick}
          onInfoWindowClose={handleInfoWindowClose}
          isGoogleMapsAvailable={() => isLoaded}
        />
        
        <MapControls
          cleanerCount={providers.length}
          onRecenter={handleRecenter}
          onCenterOnUser={handleCenterOnUser}
          onClose={onClose}
        />
      </GoogleMap>
    </div>
  );
};
