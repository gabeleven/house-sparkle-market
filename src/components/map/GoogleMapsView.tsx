
import React, { useEffect, useRef, useState } from 'react';
import { CleanerProfile } from '@/hooks/useCleaners';
import { Button } from '@/components/ui/button';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { CleanerMapPopup } from './CleanerMapPopup';

interface GoogleMapsViewProps {
  cleaners: CleanerProfile[];
  userLocation?: { latitude: number; longitude: number } | null;
  radius?: number;
  onClose: () => void;
  isFullScreen?: boolean;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export const GoogleMapsView = ({ cleaners, userLocation, radius = 10, onClose, isFullScreen = false }: GoogleMapsViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [selectedCleaner, setSelectedCleaner] = useState<CleanerProfile | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google) {
        initializeMap();
        return;
      }

      window.initMap = initializeMap;
      
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapContainer.current) return;

      const defaultCenter = userLocation 
        ? { lat: userLocation.latitude, lng: userLocation.longitude }
        : { lat: 45.5017, lng: -73.5673 }; // Montreal

      map.current = new window.google.maps.Map(mapContainer.current, {
        center: defaultCenter,
        zoom: userLocation ? 12 : 10,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry.fill',
            stylers: [{ color: '#f5f5f5' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#c9c9c9' }]
          }
        ]
      });

      // Add radius circle if user location is available
      if (userLocation) {
        new window.google.maps.Circle({
          strokeColor: '#6366f1',
          strokeOpacity: 0.5,
          strokeWeight: 2,
          fillColor: '#6366f1',
          fillOpacity: 0.1,
          map: map.current,
          center: defaultCenter,
          radius: radius * 1000, // Convert km to meters
        });
      }

      setIsLoaded(true);
    };

    loadGoogleMaps();
  }, [userLocation, radius]);

  useEffect(() => {
    if (!isLoaded || !map.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add cleaner markers
    cleaners.forEach(cleaner => {
      if (!cleaner.latitude || !cleaner.longitude) return;

      const marker = new window.google.maps.Marker({
        position: { lat: cleaner.latitude, lng: cleaner.longitude },
        map: map.current,
        icon: {
          url: cleaner.profile_photo_url || '/placeholder.svg',
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 20),
        },
        title: cleaner.full_name
      });

      marker.addListener('click', (e: any) => {
        setSelectedCleaner(cleaner);
        const overlay = new window.google.maps.OverlayView();
        overlay.setMap(map.current);
        overlay.onAdd = function() {};
        overlay.draw = function() {};
        overlay.onRemove = function() {};
        
        const projection = overlay.getProjection();
        if (projection) {
          const point = projection.fromLatLngToContainerPixel(marker.getPosition());
          setPopupPosition({
            x: point.x,
            y: point.y
          });
        }
      });

      markersRef.current.push(marker);
    });
  }, [cleaners, isLoaded]);

  const handleZoomIn = () => {
    if (map.current) {
      map.current.setZoom(map.current.getZoom() + 1);
    }
  };

  const handleZoomOut = () => {
    if (map.current) {
      map.current.setZoom(map.current.getZoom() - 1);
    }
  };

  const containerClass = isFullScreen 
    ? "fixed inset-0 z-50 bg-background"
    : "relative w-full h-96 rounded-lg overflow-hidden border";

  return (
    <div className={containerClass}>
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <Button
          onClick={onClose}
          variant="outline"
          size="icon"
          className="bg-background shadow-md hover:bg-accent"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          onClick={handleZoomIn}
          variant="outline"
          size="icon"
          className="bg-background shadow-md hover:bg-accent"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          onClick={handleZoomOut}
          variant="outline"
          size="icon"
          className="bg-background shadow-md hover:bg-accent"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
      </div>

      {/* Radius Info */}
      {userLocation && (
        <div className="absolute bottom-4 left-4 bg-background px-3 py-2 rounded-lg shadow-md">
          <p className="text-sm text-muted-foreground">
            Search radius: <span className="font-medium">{radius} km</span>
          </p>
        </div>
      )}

      {/* Cleaner Count */}
      <div className="absolute bottom-4 right-4 bg-background px-3 py-2 rounded-lg shadow-md">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">{cleaners.length}</span> cleaner{cleaners.length !== 1 ? 's' : ''} shown
        </p>
      </div>

      {/* Cleaner Popup */}
      {selectedCleaner && popupPosition && (
        <CleanerMapPopup
          cleaner={selectedCleaner}
          position={popupPosition}
          onClose={() => {
            setSelectedCleaner(null);
            setPopupPosition(null);
          }}
        />
      )}

      {/* Click to close overlay */}
      {selectedCleaner && (
        <div 
          className="absolute inset-0 z-10" 
          onClick={() => {
            setSelectedCleaner(null);
            setPopupPosition(null);
          }}
        />
      )}
    </div>
  );
};
