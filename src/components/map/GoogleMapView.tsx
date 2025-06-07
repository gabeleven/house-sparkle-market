import React, { useState, useRef, useEffect } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { CleanerProfile } from '@/hooks/useCleaners';
import { Button } from '@/components/ui/button';
import { X, ZoomIn, ZoomOut, AlertCircle } from 'lucide-react';
import { CleanerMapPopup } from './CleanerMapPopup';
import { LocationSearch } from './LocationSearch';
import { DynamicRadiusSelector } from './DynamicRadiusSelector';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useGeocodeCities } from '@/hooks/useGeocodeCities';

interface GoogleMapViewProps {
  cleaners: CleanerProfile[];
  userLocation?: { latitude: number; longitude: number } | null;
  radius?: number;
  onClose: () => void;
  isFullScreen?: boolean;
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyC0T-uWpFRGR3Xi76KidhXZrbAjBst8JTQ';
const QUEBEC_CENTER = { lat: 46.8139, lng: -71.2080 }; // Quebec province center
const QUEBEC_BOUNDS = {
  north: 62.5834,
  south: 45.0059,
  east: -57.1017,
  west: -79.7624
};

interface MapComponentProps {
  cleaners: CleanerProfile[];
  userLocation?: { latitude: number; longitude: number } | null;
  radius?: number;
  searchLocation?: { lat: number; lng: number; address: string } | null;
  onMarkerClick: (cleaner: CleanerProfile, position: { x: number; y: number }) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  cleaners, 
  userLocation, 
  radius = 25,
  searchLocation,
  onMarkerClick 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const circleRef = useRef<google.maps.Circle | null>(null);
  const { geocodedCleaners, isGeocoding } = useGeocodeCities(cleaners);

  // Determine map center and zoom
  const getMapCenter = () => {
    if (searchLocation) return searchLocation;
    if (userLocation) return { lat: userLocation.latitude, lng: userLocation.longitude };
    return QUEBEC_CENTER;
  };

  const getInitialZoom = () => {
    if (searchLocation || userLocation) return 11;
    return 6; // Show most of Quebec province
  };

  useEffect(() => {
    if (!mapRef.current) return;

    console.log('Initializing Google Map...');
    const center = getMapCenter();

    // Initialize the map
    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      center,
      zoom: getInitialZoom(),
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: false,
      zoomControl: false,
      restriction: {
        latLngBounds: QUEBEC_BOUNDS,
        strictBounds: false,
      },
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    console.log('Map initialized with center:', center);

    return () => {
      // Cleanup markers and circle
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
      if (circleRef.current) {
        circleRef.current.setMap(null);
        circleRef.current = null;
      }
    };
  }, []);

  // Update map center when search location or user location changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const center = getMapCenter();
    mapInstanceRef.current.setCenter(center);
    mapInstanceRef.current.setZoom(getInitialZoom());

    // Clear existing circle
    if (circleRef.current) {
      circleRef.current.setMap(null);
      circleRef.current = null;
    }

    // Add radius circle if we have a search location or user location
    const circleCenter = searchLocation || (userLocation ? { lat: userLocation.latitude, lng: userLocation.longitude } : null);
    if (circleCenter && mapInstanceRef.current) {
      circleRef.current = new google.maps.Circle({
        strokeColor: '#6366f1',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#6366f1',
        fillOpacity: 0.1,
        map: mapInstanceRef.current,
        center: circleCenter,
        radius: radius * 1000, // Convert km to meters
      });
    }
  }, [userLocation, searchLocation, radius]);

  // Update markers when cleaners change
  useEffect(() => {
    if (!mapInstanceRef.current || isGeocoding) return;

    console.log('Updating markers for', geocodedCleaners.length, 'cleaners');

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Get cleaners with valid coordinates
    const cleanersWithCoords = geocodedCleaners.filter(cleaner => {
      const lat = cleaner.latitude || cleaner.geocoded_lat;
      const lng = cleaner.longitude || cleaner.geocoded_lng;
      return lat && lng;
    });

    console.log('Cleaners with coordinates:', cleanersWithCoords.length);

    // Add cleaner markers
    cleanersWithCoords.forEach(cleaner => {
      const lat = cleaner.latitude || cleaner.geocoded_lat;
      const lng = cleaner.longitude || cleaner.geocoded_lng;
      
      if (!lat || !lng) return;

      const marker = new google.maps.Marker({
        position: { lat, lng },
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
      marker.addListener('click', () => {
        const rect = mapRef.current?.getBoundingClientRect();
        if (rect) {
          onMarkerClick(cleaner, {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          });
        }
      });

      markersRef.current.push(marker);
    });

    // If we have cleaners and no specific search location, fit bounds to show all cleaners
    if (cleanersWithCoords.length > 0 && !searchLocation && !userLocation) {
      const bounds = new google.maps.LatLngBounds();
      cleanersWithCoords.forEach(cleaner => {
        const lat = cleaner.latitude || cleaner.geocoded_lat;
        const lng = cleaner.longitude || cleaner.geocoded_lng;
        if (lat && lng) {
          bounds.extend({ lat, lng });
        }
      });
      mapInstanceRef.current.fitBounds(bounds);
      
      // Ensure minimum zoom level for better UX
      const listener = google.maps.event.addListener(mapInstanceRef.current, 'bounds_changed', () => {
        if (mapInstanceRef.current!.getZoom()! > 12) {
          mapInstanceRef.current!.setZoom(12);
        }
        google.maps.event.removeListener(listener);
      });
    }
  }, [geocodedCleaners, isGeocoding, onMarkerClick, searchLocation, userLocation]);

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

      {isGeocoding && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
            <span className="text-sm">Loading cleaner locations...</span>
          </div>
        </div>
      )}
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

export const GoogleMapView = ({ cleaners, userLocation, radius = 25, onClose, isFullScreen = false }: GoogleMapViewProps) => {
  const [selectedCleaner, setSelectedCleaner] = useState<CleanerProfile | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
  const [searchLocation, setSearchLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [currentRadius, setCurrentRadius] = useState(radius);

  const handleMarkerClick = (cleaner: CleanerProfile, position: { x: number; y: number }) => {
    setSelectedCleaner(cleaner);
    setPopupPosition(position);
  };

  const handleClosePopup = () => {
    setSelectedCleaner(null);
    setPopupPosition(null);
  };

  const handleLocationSearch = (location: { lat: number; lng: number; address: string }) => {
    setSearchLocation(location);
    console.log('Location search result:', location);
  };

  const handleRadiusChange = (newRadius: number) => {
    setCurrentRadius(newRadius);
  };

  const render = (status: Status) => {
    switch (status) {
      case Status.LOADING:
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading Google Maps...</p>
            </div>
          </div>
        );
      case Status.FAILURE:
        return (
          <div className="w-full h-full flex items-center justify-center bg-red-50 p-4">
            <Alert className="max-w-md">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-medium text-red-800">Google Maps API Error</p>
                  <p className="text-red-700 text-sm">Please check API key configuration</p>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        );
      case Status.SUCCESS:
        return (
          <MapComponent 
            cleaners={cleaners}
            userLocation={userLocation}
            radius={currentRadius}
            searchLocation={searchLocation}
            onMarkerClick={handleMarkerClick}
          />
        );
      default:
        return (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading Google Maps...</p>
            </div>
          </div>
        );
    }
  };

  const containerClass = isFullScreen 
    ? "fixed inset-0 z-50 bg-white"
    : "relative w-full h-96 rounded-lg overflow-hidden border";

  const cleanersWithLocation = cleaners.filter(c => 
    (c.latitude && c.longitude) || c.service_area_city
  );

  return (
    <div className={containerClass}>
      <Wrapper 
        apiKey={GOOGLE_MAPS_API_KEY} 
        render={render}
        libraries={['geocoding']}
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

      {/* Location Search */}
      <div className="absolute top-4 left-16 right-16">
        <div className="bg-white p-3 rounded-lg shadow-md">
          <LocationSearch onLocationSearch={handleLocationSearch} />
        </div>
      </div>

      {/* Dynamic Radius Selector */}
      {searchLocation && (
        <div className="absolute bottom-20 left-4 right-4">
          <DynamicRadiusSelector
            currentRadius={currentRadius}
            onRadiusChange={handleRadiusChange}
            searchLocation={searchLocation}
          />
        </div>
      )}

      {/* Current Location Info */}
      {(userLocation || searchLocation) && (
        <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-md">
          <p className="text-sm text-gray-600">
            {searchLocation ? `Area: ${searchLocation.address.split(',')[0]}` : 'Using your location'}
            <span className="ml-2 font-medium">{currentRadius} km radius</span>
          </p>
        </div>
      )}

      {/* Cleaner Count */}
      <div className="absolute bottom-4 right-4 bg-white px-3 py-2 rounded-lg shadow-md">
        <p className="text-sm text-gray-600">
          <span className="font-medium">{cleanersWithLocation.length}</span> cleaner{cleanersWithLocation.length !== 1 ? 's' : ''} available
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
