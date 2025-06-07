
import React, { useState, useRef, useEffect } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { CleanerProfile } from '@/hooks/useCleaners';
import { Button } from '@/components/ui/button';
import { X, ZoomIn, ZoomOut, AlertCircle } from 'lucide-react';
import { CleanerMapPopup } from './CleanerMapPopup';
import { Alert, AlertDescription } from '@/components/ui/alert';

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

    // Initialize the map without mapId to allow custom styling
    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      center,
      zoom: userLocation ? 12 : 10,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: false,
      zoomControl: false,
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
      markersRef.current.forEach(marker => {
        marker.setMap(null);
      });
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
    markersRef.current.forEach(marker => {
      marker.setMap(null);
    });
    markersRef.current = [];

    // Add cleaner markers using standard Marker (for broader compatibility)
    cleaners.forEach(cleaner => {
      if (!cleaner.latitude || !cleaner.longitude || !mapInstanceRef.current) return;

      const marker = new google.maps.Marker({
        position: { lat: cleaner.latitude, lng: cleaner.longitude },
        map: mapInstanceRef.current,
        title: cleaner.full_name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 20,
          fillColor: '#7c3aed',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3,
        },
        label: {
          text: cleaner.full_name.charAt(0).toUpperCase(),
          color: 'white',
          fontWeight: 'bold',
          fontSize: '14px'
        }
      });

      // Add click event listener
      marker.addListener('click', (event: google.maps.MapMouseEvent) => {
        const markerPosition = marker.getPosition();
        if (markerPosition) {
          // Convert map coordinates to screen coordinates for popup positioning
          const projection = mapInstanceRef.current?.getProjection();
          if (projection) {
            const point = projection.fromLatLngToPoint(markerPosition);
            const scale = Math.pow(2, mapInstanceRef.current?.getZoom() || 10);
            const worldPoint = new google.maps.Point(
              point.x * scale,
              point.y * scale
            );
            
            onMarkerClick(cleaner, {
              x: worldPoint.x,
              y: worldPoint.y
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

const MapErrorComponent = ({ error }: { error: Status }) => {
  const getErrorMessage = () => {
    switch (error) {
      case Status.FAILURE:
        return {
          title: "Google Maps API Error",
          description: "Please check that the Maps JavaScript API is enabled in Google Cloud Console and the API key has proper domain restrictions configured."
        };
      default:
        return {
          title: "Map Loading Failed",
          description: `Error: ${error}. Please refresh the page or contact support if the issue persists.`
        };
    }
  };

  const { title, description } = getErrorMessage();

  return (
    <div className="w-full h-full flex items-center justify-center bg-red-50 p-4">
      <Alert className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-2">
            <p className="font-medium text-red-800">{title}</p>
            <p className="text-red-700 text-sm">{description}</p>
            <div className="text-xs text-red-600 mt-2">
              <p>Required steps to fix:</p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>Enable Maps JavaScript API in Google Cloud Console</li>
                <li>Configure API key restrictions for: housie.ca/*, *.lovableproject.com/*</li>
                <li>Ensure proper billing is set up</li>
                <li>Verify the API key is active and valid</li>
              </ul>
            </div>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};

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
      <Wrapper 
        apiKey={GOOGLE_MAPS_API_KEY} 
        render={render}
        libraries={['geometry']}
      />
      
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
