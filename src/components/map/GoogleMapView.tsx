
import React, { useState, useRef, useEffect } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { CleanerProfile } from '@/hooks/useCleaners';
import { Button } from '@/components/ui/button';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { CleanerMapPopup } from './CleanerMapPopup';

interface GoogleMapViewProps {
  cleaners: CleanerProfile[];
  userLocation?: { latitude: number; longitude: number } | null;
  radius?: number;
  onClose: () => void;
  isFullScreen?: boolean;
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyCh7eDl0EFO4QyhBTgByLdL5VKM2EgcynU';
const MONTREAL_CENTER = { lat: 45.5017, lng: -73.5673 };

interface MapComponentProps {
  cleaners: CleanerProfile[];
  userLocation?: { latitude: number; longitude: number } | null;
  radius?: number;
  onMarkerClick: (cleaner: CleanerProfile, position: { x: number; y: number }) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  cleaners, 
  userLocation, 
  radius = 10,
  onMarkerClick 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const circleRef = useRef<google.maps.Circle | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const center = userLocation 
      ? { lat: userLocation.latitude, lng: userLocation.longitude }
      : MONTREAL_CENTER;

    // Initialize the map
    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      center,
      zoom: userLocation ? 12 : 10,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: false,
      zoomControl: false, // We'll add custom controls
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    // Add radius circle if user location is available
    if (userLocation && mapInstanceRef.current) {
      circleRef.current = new google.maps.Circle({
        strokeColor: '#6366f1',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#6366f1',
        fillOpacity: 0.1,
        map: mapInstanceRef.current,
        center: { lat: userLocation.latitude, lng: userLocation.longitude },
        radius: radius * 1000, // Convert km to meters
      });
    }

    return () => {
      // Cleanup markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      
      // Cleanup circle
      if (circleRef.current) {
        circleRef.current.setMap(null);
        circleRef.current = null;
      }
    };
  }, [userLocation, radius]);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add cleaner markers
    cleaners.forEach(cleaner => {
      if (!cleaner.latitude || !cleaner.longitude || !mapInstanceRef.current) return;

      const marker = new google.maps.Marker({
        position: { lat: cleaner.latitude, lng: cleaner.longitude },
        map: mapInstanceRef.current,
        title: cleaner.full_name,
        icon: {
          url: cleaner.profile_photo_url || 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="white" stroke="#6366f1" stroke-width="3"/>
              <text x="20" y="26" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#6366f1">
                ${cleaner.full_name.charAt(0).toUpperCase()}
              </text>
            </svg>
          `),
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 20)
        }
      });

      marker.addListener('click', (event: google.maps.MapMouseEvent) => {
        if (event.domEvent) {
          const rect = (event.domEvent.target as HTMLElement)?.getBoundingClientRect();
          if (rect) {
            onMarkerClick(cleaner, {
              x: rect.left + rect.width / 2,
              y: rect.top
            });
          }
        }
      });

      markersRef.current.push(marker);
    });
  }, [cleaners, onMarkerClick]);

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      const currentZoom = mapInstanceRef.current.getZoom() || 10;
      mapInstanceRef.current.setZoom(currentZoom + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      const currentZoom = mapInstanceRef.current.getZoom() || 10;
      mapInstanceRef.current.setZoom(currentZoom - 1);
    }
  };

  return (
    <>
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Custom Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          onClick={handleZoomIn}
          variant="outline"
          size="icon"
          className="bg-white shadow-md hover:bg-gray-50"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          onClick={handleZoomOut}
          variant="outline"
          size="icon"
          className="bg-white shadow-md hover:bg-gray-50"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
};

const MapLoadingComponent = () => (
  <div className="w-full h-full flex items-center justify-center bg-gray-100">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading Google Maps...</p>
    </div>
  </div>
);

const MapErrorComponent = ({ error }: { error: Status }) => (
  <div className="w-full h-full flex items-center justify-center bg-red-50">
    <div className="text-center">
      <p className="text-red-600 font-medium mb-2">Failed to load Google Maps</p>
      <p className="text-red-500 text-sm">Error: {error}</p>
      <p className="text-gray-600 text-sm mt-2">Please check your API key and internet connection</p>
    </div>
  </div>
);

export const GoogleMapView = ({ cleaners, userLocation, radius = 10, onClose, isFullScreen = false }: GoogleMapViewProps) => {
  const [selectedCleaner, setSelectedCleaner] = useState<CleanerProfile | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);

  const handleMarkerClick = (cleaner: CleanerProfile, position: { x: number; y: number }) => {
    setSelectedCleaner(cleaner);
    setPopupPosition(position);
  };

  const handleClosePopup = () => {
    setSelectedCleaner(null);
    setPopupPosition(null);
  };

  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return <MapLoadingComponent />;
      case Status.FAILURE:
        return <MapErrorComponent error={status} />;
      case Status.SUCCESS:
        return (
          <MapComponent 
            cleaners={cleaners}
            userLocation={userLocation}
            radius={radius}
            onMarkerClick={handleMarkerClick}
          />
        );
      default:
        return <MapLoadingComponent />;
    }
  };

  const containerClass = isFullScreen 
    ? "fixed inset-0 z-50 bg-white"
    : "relative w-full h-96 rounded-lg overflow-hidden border";

  return (
    <div className={containerClass}>
      <Wrapper apiKey={GOOGLE_MAPS_API_KEY} render={render} />
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <Button
          onClick={onClose}
          variant="outline"
          size="icon"
          className="bg-white shadow-md hover:bg-gray-50"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Radius Info */}
      {userLocation && (
        <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-md">
          <p className="text-sm text-gray-600">
            Search radius: <span className="font-medium">{radius} km</span>
          </p>
        </div>
      )}

      {/* Cleaner Count */}
      <div className="absolute bottom-4 right-4 bg-white px-3 py-2 rounded-lg shadow-md">
        <p className="text-sm text-gray-600">
          <span className="font-medium">{cleaners.length}</span> cleaner{cleaners.length !== 1 ? 's' : ''} shown
        </p>
      </div>

      {/* Cleaner Popup */}
      {selectedCleaner && popupPosition && (
        <CleanerMapPopup
          cleaner={selectedCleaner}
          position={popupPosition}
          onClose={handleClosePopup}
        />
      )}

      {/* Click to close overlay */}
      {selectedCleaner && (
        <div 
          className="absolute inset-0 z-10" 
          onClick={handleClosePopup}
        />
      )}
    </div>
  );
};
