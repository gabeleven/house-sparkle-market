
import { useState, useCallback, useMemo } from 'react';
import { ProviderProfile } from '@/types/providers';
import { useMapCenter } from '@/hooks/useMapCenter';

interface Location {
  latitude: number;
  longitude: number;
}

interface UseMapStateProps {
  userLocation?: Location | null;
}

export const useMapState = ({ userLocation }: UseMapStateProps) => {
  const [selectedCleaner, setSelectedCleaner] = useState<ProviderProfile | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const { mapCenter, loading: mapCenterLoading } = useMapCenter();

  // Use map center from hook, fallback to user location, then default
  const center = useMemo(() => {
    if (!mapCenterLoading && mapCenter) {
      return {
        lat: mapCenter.latitude,
        lng: mapCenter.longitude
      };
    }
    if (userLocation) {
      return {
        lat: userLocation.latitude,
        lng: userLocation.longitude
      };
    }
    // Default to Montreal if nothing else available
    return {
      lat: 45.5017,
      lng: -73.5673
    };
  }, [mapCenter, mapCenterLoading, userLocation]);

  const zoom = useMemo(() => {
    if (!mapCenterLoading && mapCenter) {
      return mapCenter.zoom;
    }
    return 11;
  }, [mapCenter, mapCenterLoading]);

  const handleMarkerClick = useCallback((cleaner: ProviderProfile) => {
    setSelectedCleaner(cleaner);
  }, []);

  const handleRecenter = useCallback(() => {
    if (mapInstance && center) {
      mapInstance.panTo(center);
      mapInstance.setZoom(zoom);
    }
  }, [mapInstance, center, zoom]);

  const handleCenterOnUser = useCallback(() => {
    if (navigator.geolocation && mapInstance) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        mapInstance.panTo(userPos);
        mapInstance.setZoom(12);
      });
    }
  }, [mapInstance]);

  return {
    selectedCleaner,
    setSelectedCleaner,
    mapInstance,
    setMapInstance,
    center,
    zoom,
    handleMarkerClick,
    handleRecenter,
    handleCenterOnUser
  };
};
