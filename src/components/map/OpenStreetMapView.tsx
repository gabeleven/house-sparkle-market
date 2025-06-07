
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { CleanerProfile } from '@/hooks/useCleaners';
import { Button } from '@/components/ui/button';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { CleanerMapPopup } from './CleanerMapPopup';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface OpenStreetMapViewProps {
  cleaners: CleanerProfile[];
  userLocation?: { latitude: number; longitude: number } | null;
  radius?: number;
  onClose: () => void;
  isFullScreen?: boolean;
}

// Component to handle map instance access
const MapInstanceHandler = ({ setMap }: { setMap: (map: L.Map) => void }) => {
  const map = useMap();
  
  useEffect(() => {
    setMap(map);
  }, [map, setMap]);
  
  return null;
};

export const OpenStreetMapView = ({ 
  cleaners, 
  userLocation, 
  radius = 10, 
  onClose, 
  isFullScreen = false 
}: OpenStreetMapViewProps) => {
  const [selectedCleaner, setSelectedCleaner] = useState<CleanerProfile | null>(null);
  const [map, setMap] = useState<L.Map | null>(null);

  const defaultCenter: [number, number] = userLocation 
    ? [userLocation.latitude, userLocation.longitude]
    : [45.5017, -73.5673]; // Montreal

  const createCustomIcon = (cleaner: CleanerProfile) => {
    return L.divIcon({
      html: `
        <div style="
          width: 40px; 
          height: 40px; 
          background-image: url('${cleaner.profile_photo_url || '/placeholder.svg'}'); 
          background-size: cover; 
          background-position: center;
          border-radius: 50%; 
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>
      `,
      className: 'custom-div-icon',
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });
  };

  const handleZoom = (zoomIn: boolean) => {
    if (map) {
      if (zoomIn) {
        map.zoomIn();
      } else {
        map.zoomOut();
      }
    }
  };

  const containerClass = isFullScreen 
    ? "fixed inset-0 z-50 bg-background"
    : "relative w-full h-96 rounded-lg overflow-hidden border border-border";

  return (
    <div className={containerClass}>
      <MapContainer 
        center={defaultCenter} 
        zoom={userLocation ? 12 : 10}
        style={{ height: "100%", width: "100%" }}
      >
        <MapInstanceHandler setMap={setMap} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* User location circle */}
        {userLocation && (
          <Circle
            center={[userLocation.latitude, userLocation.longitude]}
            radius={radius * 1000} // Convert km to meters
            pathOptions={{
              color: '#6366f1',
              fillColor: '#6366f1',
              fillOpacity: 0.1,
              weight: 2
            }}
          />
        )}

        {/* Cleaner markers */}
        {cleaners.map(cleaner => {
          if (!cleaner.latitude || !cleaner.longitude) return null;
          
          return (
            <Marker
              key={cleaner.id}
              position={[cleaner.latitude, cleaner.longitude]}
              icon={createCustomIcon(cleaner)}
              eventHandlers={{
                click: () => setSelectedCleaner(cleaner)
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{cleaner.full_name}</h3>
                  {cleaner.business_name && (
                    <p className="text-sm text-purple-600">{cleaner.business_name}</p>
                  )}
                  {cleaner.service_area_city && (
                    <p className="text-sm text-gray-600">{cleaner.service_area_city}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <Button
          onClick={onClose}
          variant="outline"
          size="icon"
          className="bg-card shadow-md hover:bg-accent"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          onClick={() => handleZoom(true)}
          variant="outline"
          size="icon"
          className="bg-card shadow-md hover:bg-accent"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => handleZoom(false)}
          variant="outline"
          size="icon"
          className="bg-card shadow-md hover:bg-accent"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
      </div>

      {/* Radius Info */}
      {userLocation && (
        <div className="absolute bottom-4 left-4 bg-card px-3 py-2 rounded-lg shadow-md">
          <p className="text-sm text-muted-foreground">
            Search radius: <span className="font-medium">{radius} km</span>
          </p>
        </div>
      )}

      {/* Cleaner Count */}
      <div className="absolute bottom-4 right-4 bg-card px-3 py-2 rounded-lg shadow-md">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">{cleaners.length}</span> cleaner{cleaners.length !== 1 ? 's' : ''} shown
        </p>
      </div>

      {/* Cleaner Popup */}
      {selectedCleaner && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <CleanerMapPopup
            cleaner={selectedCleaner}
            position={{ x: 0, y: 0 }}
            onClose={() => setSelectedCleaner(null)}
          />
        </div>
      )}

      {/* Click to close overlay */}
      {selectedCleaner && (
        <div 
          className="absolute inset-0 z-40" 
          onClick={() => setSelectedCleaner(null)}
        />
      )}
    </div>
  );
};
