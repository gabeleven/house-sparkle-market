
import React from 'react';
import { Marker, Circle, InfoWindow } from '@react-google-maps/api';
import { CleanerProfile } from '@/hooks/useCleaners';
import { CleanerMapPopup } from './CleanerMapPopup';

interface Location {
  latitude: number;
  longitude: number;
}

interface MapMarkersProps {
  cleaners: CleanerProfile[];
  userLocation?: Location | null;
  radius: number;
  selectedCleaner: CleanerProfile | null;
  onMarkerClick: (cleaner: CleanerProfile) => void;
  onInfoWindowClose: () => void;
  isGoogleMapsAvailable: () => boolean;
}

export const MapMarkers: React.FC<MapMarkersProps> = ({
  cleaners,
  userLocation,
  radius,
  selectedCleaner,
  onMarkerClick,
  onInfoWindowClose,
  isGoogleMapsAvailable
}) => {
  return (
    <>
      {/* User location marker */}
      {userLocation && isGoogleMapsAvailable() && (
        <>
          <Marker
            position={{
              lat: userLocation.latitude,
              lng: userLocation.longitude
            }}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" fill="#3b82f6" stroke="#ffffff" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" fill="#ffffff"/>
                </svg>
              `),
              scaledSize: isGoogleMapsAvailable() ? new window.google.maps.Size(24, 24) : undefined,
            }}
            title="Your Location"
          />
          
          {/* Service radius circle */}
          <Circle
            center={{
              lat: userLocation.latitude,
              lng: userLocation.longitude
            }}
            radius={radius * 1000} // Convert km to meters
            options={{
              fillColor: '#3b82f6',
              fillOpacity: 0.1,
              strokeColor: '#3b82f6',
              strokeOpacity: 0.3,
              strokeWeight: 2,
            }}
          />
        </>
      )}

      {/* Cleaner markers */}
      {cleaners.map((cleaner) => {
        if (!cleaner.latitude || !cleaner.longitude || !isGoogleMapsAvailable()) return null;
        
        return (
          <Marker
            key={cleaner.id}
            position={{
              lat: Number(cleaner.latitude),
              lng: Number(cleaner.longitude)
            }}
            onClick={() => onMarkerClick(cleaner)}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="12" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
                  <text x="16" y="21" text-anchor="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold">🧽</text>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(32, 32),
            }}
            title={cleaner.business_name || cleaner.full_name}
          />
        );
      })}

      {/* Info window for selected cleaner */}
      {selectedCleaner && selectedCleaner.latitude && selectedCleaner.longitude && isGoogleMapsAvailable() && (
        <InfoWindow
          position={{
            lat: Number(selectedCleaner.latitude),
            lng: Number(selectedCleaner.longitude)
          }}
          onCloseClick={onInfoWindowClose}
        >
          <div className="p-0">
            <CleanerMapPopup 
              cleaner={selectedCleaner}
              onClose={onInfoWindowClose}
            />
          </div>
        </InfoWindow>
      )}
    </>
  );
};
