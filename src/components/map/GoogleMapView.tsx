
import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, useJSApiLoader } from '@react-google-maps/api';
import { MapMarkers } from './MapMarkers';
import { MapControls } from './MapControls';
import { useMapState } from '@/hooks/useMapState';
import { useUserLocation } from '@/hooks/useUserLocation';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

// Montreal fallback coordinates
const MONTREAL_CENTER = {
  lat: 45.5017,
  lng: -73.5673
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ]
};

interface GoogleMapViewProps {
  cleaners: any[];
  onCleanerSelect: (cleaner: any) => void;
  selectedCleaner: any;
  radiusKm: number;
  onRadiusChange: (radius: number) => void;
  className?: string;
}

export const GoogleMapView: React.FC<GoogleMapViewProps> = ({
  cleaners,
  onCleanerSelect,
  selectedCleaner,
  radiusKm,
  onRadiusChange,
  className = ""
}) => {
  const { isLoaded, loadError } = useJSApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAJXkmufaWRLR5t4iFFp4qupryDKNZZO9o'
  });

  const { userLocation, isLoading: locationLoading, error: locationError } = useUserLocation();
  const { 
    mapCenter, 
    zoom, 
    setMapCenter, 
    setZoom,
    setMapInstance
  } = useMapState();

  const [finalCenter, setFinalCenter] = useState(MONTREAL_CENTER);

  // Update map center based on user location
  useEffect(() => {
    if (userLocation) {
      console.log('Setting map center to user location:', userLocation);
      const newCenter = { lat: userLocation.lat, lng: userLocation.lng };
      setFinalCenter(newCenter);
      setMapCenter(newCenter);
      setZoom(13); // Closer zoom when we have user location
    } else if (mapCenter.lat !== MONTREAL_CENTER.lat || mapCenter.lng !== MONTREAL_CENTER.lng) {
      // Use stored map center if available and different from Montreal
      console.log('Using stored map center:', mapCenter);
      setFinalCenter(mapCenter);
    } else {
      console.log('Using Montreal fallback center');
      setFinalCenter(MONTREAL_CENTER);
      setMapCenter(MONTREAL_CENTER);
    }
  }, [userLocation, mapCenter, setMapCenter, setZoom]);

  const onLoad = useCallback((map: google.maps.Map) => {
    console.log('Google Map loaded successfully');
    setMapInstance(map);
  }, [setMapInstance]);

  const onUnmount = useCallback(() => {
    setMapInstance(null);
  }, [setMapInstance]);

  const handleCenterChanged = useCallback(() => {
    // This will be called when user manually moves the map
  }, []);

  if (loadError) {
    console.error('Google Maps load error:', loadError);
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-center p-4">
          <p className="text-red-600 mb-2">Failed to load Google Maps</p>
          <p className="text-sm text-gray-500">
            Please check your internet connection and try again.
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
            {locationLoading ? 'Getting your location...' : 'Loading Google Maps...'}
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
        onCenterChanged={handleCenterChanged}
      >
        <MapMarkers
          cleaners={cleaners}
          onCleanerSelect={onCleanerSelect}
          selectedCleaner={selectedCleaner}
          userLocation={userLocation}
          radiusKm={radiusKm}
        />
        
        <MapControls
          radiusKm={radiusKm}
          onRadiusChange={onRadiusChange}
          userLocation={userLocation || finalCenter}
        />
      </GoogleMap>
    </div>
  );
};
