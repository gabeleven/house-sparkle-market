
import React, { useEffect, useRef, useState } from 'react';
import { CleanerProfile } from '@/hooks/useCleaners';
import { Button } from '@/components/ui/button';
import { X, MapPin, Users } from 'lucide-react';
import { CleanerMapPopup } from './CleanerMapPopup';
import { useMapCenter } from '@/hooks/useMapCenter';
import { Badge } from '@/components/ui/badge';

interface MapViewProps {
  cleaners: CleanerProfile[];
  userLocation?: { latitude: number; longitude: number } | null;
  radius?: number;
  onClose: () => void;
  isFullScreen?: boolean;
}

export const MapView = ({ cleaners, userLocation, radius = 10, onClose, isFullScreen = false }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [selectedCleaner, setSelectedCleaner] = useState<CleanerProfile | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
  const { mapCenter, loading: centerLoading } = useMapCenter();

  const containerClass = isFullScreen 
    ? "fixed inset-0 z-50 bg-white"
    : "relative w-full h-96 rounded-lg overflow-hidden border";

  // Filter featured cleaners for highlighting
  const featuredCleaners = cleaners.filter(cleaner => 
    cleaner.business_name && cleaner.years_experience && cleaner.years_experience > 2
  );

  const regularCleaners = cleaners.filter(cleaner => 
    !featuredCleaners.includes(cleaner)
  );

  const handleCleanerClick = (cleaner: CleanerProfile, index: number) => {
    setSelectedCleaner(cleaner);
    setPopupPosition({ x: 200 + index * 50, y: 150 + index * 30 });
  };

  const handleClosePopup = () => {
    setSelectedCleaner(null);
    setPopupPosition(null);
  };

  return (
    <div className={containerClass}>
      <div ref={mapContainer} className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
        {/* Map placeholder with user-centered content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <div className="mb-6">
              <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Service Area Map View
              </h3>
              {centerLoading ? (
                <p className="text-gray-600">Loading your service area...</p>
              ) : (
                <div className="space-y-2">
                  <p className="text-gray-600">
                    Centered on: {mapCenter.latitude.toFixed(4)}, {mapCenter.longitude.toFixed(4)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Zoom level: {mapCenter.zoom} (radius-based)
                  </p>
                </div>
              )}
            </div>
            
            {/* Cleaner markers simulation */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {featuredCleaners.slice(0, 4).map((cleaner, index) => (
                <div 
                  key={cleaner.id}
                  className="bg-white p-3 rounded-lg shadow-md border-2 border-yellow-400 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleCleanerClick(cleaner, index)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                      Featured
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {cleaner.business_name || cleaner.full_name}
                  </p>
                  <p className="text-xs text-gray-600">
                    ${cleaner.hourly_rate || 25}/hr
                  </p>
                </div>
              ))}
            </div>

            <div className="text-sm text-gray-500">
              <p className="mb-2">Interactive map coming soon with Google Maps integration</p>
              <div className="flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Featured ({featuredCleaners.length})</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Regular ({regularCleaners.length})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simulated regular cleaner markers */}
        {regularCleaners.slice(0, 6).map((cleaner, index) => (
          <div
            key={cleaner.id}
            className="absolute bg-white p-2 rounded-lg shadow-md border cursor-pointer hover:shadow-lg transition-shadow"
            style={{
              left: `${20 + index * 12}%`,
              top: `${30 + (index % 3) * 20}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => handleCleanerClick(cleaner, index)}
          >
            <div className="flex items-center gap-1 mb-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-xs font-medium text-gray-800 truncate max-w-20">
              {cleaner.business_name || cleaner.full_name}
            </p>
          </div>
        ))}
      </div>
      
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

      {/* Map Center Info */}
      <div className="absolute top-4 right-4 bg-white px-3 py-2 rounded-lg shadow-md max-w-48">
        <div className="text-xs text-gray-600">
          <p className="font-medium">Map Center</p>
          <p>{mapCenter.latitude.toFixed(3)}, {mapCenter.longitude.toFixed(3)}</p>
          <p>Zoom: {mapCenter.zoom}</p>
        </div>
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
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span className="font-medium">{cleaners.length}</span> cleaner{cleaners.length !== 1 ? 's' : ''} shown
        </div>
      </div>

      {/* Cleaner Popup */}
      {selectedCleaner && popupPosition && (
        <div 
          className="absolute z-20 bg-white rounded-lg shadow-lg border"
          style={{
            left: popupPosition.x,
            top: popupPosition.y,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <CleanerMapPopup
            cleaner={selectedCleaner}
            position={popupPosition}
            onClose={handleClosePopup}
          />
        </div>
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
