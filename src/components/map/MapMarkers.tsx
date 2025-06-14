
import React from 'react';
import { Marker, InfoWindow, Circle } from '@react-google-maps/api';
import { CleanerPopup } from './CleanerPopup';
import { CleanerProfile } from '@/hooks/useCleaners';
import { useNavigate } from 'react-router-dom';

interface MapMarkersProps {
  cleaners: CleanerProfile[];
  userLocation?: { latitude: number; longitude: number } | null;
  radius?: number;
  selectedCleaner?: CleanerProfile | null;
  onMarkerClick: (cleaner: CleanerProfile) => void;
  onInfoWindowClose: () => void;
  isGoogleMapsAvailable: () => boolean;
}

export const MapMarkers: React.FC<MapMarkersProps> = ({
  cleaners,
  userLocation,
  radius = 25,
  selectedCleaner,
  onMarkerClick,
  onInfoWindowClose,
  isGoogleMapsAvailable
}) => {
  const navigate = useNavigate();

  const handleViewProfile = (cleaner: CleanerProfile) => {
    navigate(`/public-profile/${cleaner.id}`);
    onInfoWindowClose();
  };

  if (!isGoogleMapsAvailable()) {
    return null;
  }

  return (
    <>
      {/* User location marker */}
      {userLocation && (
        <Marker
          position={{
            lat: userLocation.latitude,
            lng: userLocation.longitude
          }}
          icon={{
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="#FFFFFF" stroke-width="3"/>
                <circle cx="12" cy="12" r="3" fill="#FFFFFF"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(24, 24),
            anchor: new google.maps.Point(12, 12)
          }}
          title="Your Location"
        />
      )}

      {/* Service radius circle */}
      {userLocation && (
        <Circle
          center={{
            lat: userLocation.latitude,
            lng: userLocation.longitude
          }}
          radius={radius * 1000} // Convert km to meters
          options={{
            fillColor: '#3B82F6',
            fillOpacity: 0.1,
            strokeColor: '#3B82F6',
            strokeOpacity: 0.3,
            strokeWeight: 2
          }}
        />
      )}

      {/* Cleaner markers */}
      {cleaners.map((cleaner) => {
        if (!cleaner.latitude || !cleaner.longitude) return null;

        return (
          <React.Fragment key={cleaner.id}>
            <Marker
              position={{
                lat: cleaner.latitude,
                lng: cleaner.longitude
              }}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="16" cy="16" r="12" fill="#7C3AED" stroke="#FFFFFF" stroke-width="3"/>
                    <circle cx="16" cy="16" r="6" fill="#FFFFFF"/>
                  </svg>
                `),
                scaledSize: new google.maps.Size(32, 32),
                anchor: new google.maps.Point(16, 16)
              }}
              title={cleaner.business_name || cleaner.full_name}
              onClick={() => onMarkerClick(cleaner)}
            />

            {selectedCleaner?.id === cleaner.id && (
              <InfoWindow
                position={{
                  lat: cleaner.latitude,
                  lng: cleaner.longitude
                }}
                onCloseClick={onInfoWindowClose}
              >
                <CleanerPopup
                  cleaner={cleaner}
                  onViewProfile={handleViewProfile}
                  onClose={onInfoWindowClose}
                />
              </InfoWindow>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
