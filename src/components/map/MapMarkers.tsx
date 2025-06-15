
import React from 'react';
import { Marker, InfoWindow, Circle } from '@react-google-maps/api';
import { ProviderPopup } from './ProviderPopup';
import { ProviderProfile } from '@/types/providers';
import { useNavigate } from 'react-router-dom';

interface MapMarkersProps {
  providers: ProviderProfile[];
  userLocation?: { latitude: number; longitude: number } | null;
  radius?: number;
  selectedProvider?: ProviderProfile | null;
  onMarkerClick: (provider: ProviderProfile) => void;
  onInfoWindowClose: () => void;
  isGoogleMapsAvailable: () => boolean;
}

export const MapMarkers: React.FC<MapMarkersProps> = ({
  providers,
  userLocation,
  radius = 25,
  selectedProvider,
  onMarkerClick,
  onInfoWindowClose,
  isGoogleMapsAvailable
}) => {
  const navigate = useNavigate();

  const handleViewProfile = (provider: ProviderProfile) => {
    navigate(`/public-profile/${provider.id}`);
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

      {/* Provider markers */}
      {providers.map((provider) => {
        if (!provider.latitude || !provider.longitude) return null;

        return (
          <React.Fragment key={provider.id}>
            <Marker
              position={{
                lat: provider.latitude,
                lng: provider.longitude
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
              title={provider.business_name || provider.full_name}
              onClick={() => onMarkerClick(provider)}
            />

            {selectedProvider?.id === provider.id && (
              <InfoWindow
                position={{
                  lat: provider.latitude,
                  lng: provider.longitude
                }}
                onCloseClick={onInfoWindowClose}
              >
                <ProviderPopup
                  provider={provider}
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
