
import React, { useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Circle } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  gestureHandling: 'none',
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'transit',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ]
};

const libraries: ["places", "geometry"] = ["places", "geometry"];

interface ServiceAreaMapProps {
  centerLat: number;
  centerLng: number;
  radiusKm: number;
  className?: string;
}

export const ServiceAreaMap: React.FC<ServiceAreaMapProps> = ({
  centerLat,
  centerLng,
  radiusKm,
  className = ""
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'service-area-map',
    googleMapsApiKey: 'AIzaSyAJXkmufaWRLR5t4iFFp4qupryDKNZZO9o',
    libraries: libraries,
    version: '3.55'
  });

  const center = { lat: centerLat, lng: centerLng };
  
  // Calculate zoom level based on radius
  const getZoomLevel = (radius: number) => {
    if (radius <= 5) return 12;
    if (radius <= 10) return 11;
    if (radius <= 25) return 10;
    if (radius <= 50) return 9;
    return 8;
  };

  const onLoad = useCallback((map: google.maps.Map) => {
    // Set zoom based on radius
    map.setZoom(getZoomLevel(radiusKm));
  }, [radiusKm]);

  if (loadError) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-center p-4">
          <p className="text-red-600 text-sm">Unable to load map</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">Loading service area...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={getZoomLevel(radiusKm)}
        options={mapOptions}
        onLoad={onLoad}
      >
        {/* Center marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-3 h-3 bg-purple-600 rounded-full border-2 border-white shadow-lg"></div>
        </div>

        {/* Service radius circle */}
        <Circle
          center={center}
          radius={radiusKm * 1000} // Convert km to meters
          options={{
            fillColor: '#7C3AED',
            fillOpacity: 0.15,
            strokeColor: '#7C3AED',
            strokeOpacity: 0.6,
            strokeWeight: 2
          }}
        />
      </GoogleMap>
    </div>
  );
};
