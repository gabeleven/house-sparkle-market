import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { MapMarkers } from './MapMarkers';
import { MapControls } from './MapControls';
import { useMapState } from '@/hooks/useMapState';
import { useUserLocation } from '@/hooks/useUserLocation';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

// Canada geographic center as fallback coordinates
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

// Required libraries for new Places API
const libraries: ["places", "geometry"] = ["places", "geometry"];

interface GoogleMapViewProps {
  cleaners: any[];
  onCleanerSelect?: (cleaner: any) => void;
  selectedCleaner?: any;
  radiusKm?: number;
  onRadiusChange?: (radius: number) => void;
  className?: string;
  onClose?: () => void;
  onError?: () => void;
  isFullScreen?: boolean;
}

export const GoogleMapView: React.FC<GoogleMapViewProps> = ({
  cleaners,
  onCleanerSelect,
  selectedCleaner,
  radiusKm = 25,
  onRadiusChange,
  className = "",
  onClose,
  onError,
  isFullScreen = false
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAJXkmufaWRLR5t4iFFp4qupryDKNZZO9o',
    libraries: libraries,
    version: '3.55'
  });

  const { userLocation, loading: locationLoading, error: locationError } = useUserLocation();
  
  // Convert userLocation to the format expected by useMapState
  const mapUserLocation = userLocation ? {
    latitude: userLocation.latitude,
    longitude: userLocation.longitude
  } : null;

  const { 
    selectedCleaner: mapSelectedCleaner,
    setSelectedCleaner,
    mapInstance,
    setMapInstance,
    center,
    zoom,
    handleMarkerClick,
    handleRecenter,
    handleCenterOnUser
  } = useMapState({ userLocation: mapUserLocation });

  const [finalCenter, setFinalCenter] = useState(CANADA_CENTER);
  const [isMapReady, setIsMapReady] = useState(false);

  // Update map center based on user location
  useEffect(() => {
    if (userLocation) {
      console.log('Setting map center to user location:', userLocation);
      const newCenter = { lat: userLocation.latitude, lng: userLocation.longitude };
      setFinalCenter(newCenter);
    } else {
      console.log('Using Canada geographic center as fallback');
      setFinalCenter(CANADA_CENTER);
    }
  }, [userLocation]);

  const onLoad = useCallback((map: google.maps.Map) => {
    console.log('Google Map loaded successfully with Places API for Canada-wide coverage');
    
    // Verify Places API is available
    if (window.google?.maps?.places) {
      console.log('Places API is available and ready for Canadian locations');
    } else {
      console.warn('Places API not available');
    }
    
    setMapInstance(map);
    setIsMapReady(true);
    
    // Add click handler for map
    map.addListener('click', () => {
      setSelectedCleaner(null);
    });
  }, [setMapInstance, setSelectedCleaner]);

  const onUnmount = useCallback(() => {
    setMapInstance(null);
    setIsMapReady(false);
  }, [setMapInstance]);

  const handleCleanerSelect = useCallback((cleaner: any) => {
    setSelectedCleaner(cleaner);
    if (onCleanerSelect) {
      onCleanerSelect(cleaner);
    }
  }, [setSelectedCleaner, onCleanerSelect]);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedCleaner(null);
  }, [setSelectedCleaner]);

  if (loadError) {
    console.error('Google Maps load error:', loadError);
    if (onError) {
      onError();
    }
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-center p-4">
          <p className="text-red-600 mb-2">Failed to load Google Maps</p>
          <p className="text-sm text-gray-500 mb-2">
            {loadError.message}
          </p>
          <p className="text-xs text-gray-400">
            Please ensure the Google Maps API key has Places API (New) enabled for Canadian coverage.
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded || locationLoading) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
          <p className="text-gray-600">
            {locationLoading ? 'Getting your location...' : 'Loading Google Maps with Canada-wide Places API...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={finalCenter}
        zoom={zoom}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {isMapReady && (
          <MapMarkers
            cleaners={cleaners}
            userLocation={mapUserLocation}
            radius={radiusKm}
            selectedCleaner={mapSelectedCleaner || selectedCleaner}
            onMarkerClick={handleCleanerSelect}
            onInfoWindowClose={handleInfoWindowClose}
            isGoogleMapsAvailable={() => !!(window.google && window.google.maps && window.google.maps.places)}
          />
        )}
        
        <MapControls
          cleanerCount={cleaners.length}
          onRecenter={handleRecenter}
          onCenterOnUser={handleCenterOnUser}
          onClose={onClose}
        />
      </GoogleMap>
    </div>
  );
};
