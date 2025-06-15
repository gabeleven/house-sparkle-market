
import React, { useEffect, useRef, useState } from 'react';
import { ProviderProfile } from '@/types/providers';
import { Button } from '@/components/ui/button';
import { X, MapPin, Users } from 'lucide-react';
import { CleanerMapPopup } from './CleanerMapPopup';
import { useMapCenter } from '@/hooks/useMapCenter';
import { Badge } from '@/components/ui/badge';

interface MapViewProps {
  providers: ProviderProfile[];
  userLocation?: { latitude: number; longitude: number } | null;
  radius?: number;
  onClose: () => void;
  isFullScreen?: boolean;
}

// Transform ProviderProfile to match CleanerMapPopup expected format
interface CleanerMapProfile {
  id: string;
  full_name: string;
  business_name?: string;
  brief_description?: string;
  profile_photo_url?: string;
  service_area_city?: string;
  latitude?: number;
  longitude?: number;
  service_radius_km?: number;
  hourly_rate?: number;
  years_experience?: number;
  average_rating?: number;
  total_reviews?: number;
  distance?: number;
  services?: string[];
}

export const MapView = ({ providers, userLocation, radius = 10, onClose, isFullScreen = false }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [selectedProvider, setSelectedProvider] = useState<CleanerMapProfile | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
  const { mapCenter, loading: centerLoading } = useMapCenter();

  const containerClass = isFullScreen 
    ? "fixed inset-0 z-50 bg-white"
    : "relative w-full h-96 rounded-lg overflow-hidden border";

  // Transform providers to match expected format
  const transformedProviders: CleanerMapProfile[] = providers.map(provider => ({
    id: provider.id,
    full_name: provider.full_name,
    business_name: provider.business_name || undefined,
    brief_description: provider.brief_description,
    profile_photo_url: provider.profile_photo_url || undefined,
    service_area_city: provider.service_area_city,
    latitude: provider.latitude || undefined,
    longitude: provider.longitude || undefined,
    service_radius_km: provider.service_radius_km,
    hourly_rate: provider.hourly_rate || undefined,
    years_experience: provider.years_experience,
    average_rating: provider.average_rating,
    total_reviews: provider.total_reviews,
    distance: provider.distance,
    services: provider.services?.map(service => service.service_category?.name || 'Unknown Service').filter(Boolean) || []
  }));

  // Filter featured providers for highlighting
  const featuredProviders = transformedProviders.filter(provider => 
    provider.business_name && provider.years_experience && provider.years_experience > 2
  );

  const regularProviders = transformedProviders.filter(provider => 
    !featuredProviders.includes(provider)
  );

  const handleProviderClick = (provider: CleanerMapProfile, index: number) => {
    setSelectedProvider(provider);
    setPopupPosition({ x: 200 + index * 50, y: 150 + index * 30 });
  };

  const handleClosePopup = () => {
    setSelectedProvider(null);
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
            
            {/* Provider markers simulation */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {featuredProviders.slice(0, 4).map((provider, index) => (
                <div 
                  key={provider.id}
                  className="bg-white p-3 rounded-lg shadow-md border-2 border-yellow-400 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleProviderClick(provider, index)}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                      Featured
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {provider.business_name || provider.full_name}
                  </p>
                  <p className="text-xs text-gray-600">
                    ${provider.hourly_rate || 25}/hr
                  </p>
                </div>
              ))}
            </div>

            <div className="text-sm text-gray-500">
              <p className="mb-2">Interactive map coming soon with Google Maps integration</p>
              <div className="flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Featured ({featuredProviders.length})</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Regular ({regularProviders.length})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simulated regular provider markers */}
        {regularProviders.slice(0, 6).map((provider, index) => (
          <div
            key={provider.id}
            className="absolute bg-white p-2 rounded-lg shadow-md border cursor-pointer hover:shadow-lg transition-shadow"
            style={{
              left: `${20 + index * 12}%`,
              top: `${30 + (index % 3) * 20}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => handleProviderClick(provider, index)}
          >
            <div className="flex items-center gap-1 mb-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-xs font-medium text-gray-800 truncate max-w-20">
              {provider.business_name || provider.full_name}
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

      {/* Provider Count */}
      <div className="absolute bottom-4 right-4 bg-white px-3 py-2 rounded-lg shadow-md">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span className="font-medium">{providers.length}</span> provider{providers.length !== 1 ? 's' : ''} shown
        </div>
      </div>

      {/* Provider Popup */}
      {selectedProvider && popupPosition && (
        <div 
          className="absolute z-20 bg-white rounded-lg shadow-lg border"
          style={{
            left: popupPosition.x,
            top: popupPosition.y,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <CleanerMapPopup
            cleaner={selectedProvider}
            position={popupPosition}
            onClose={handleClosePopup}
          />
        </div>
      )}

      {/* Click to close overlay */}
      {selectedProvider && (
        <div 
          className="absolute inset-0 z-10" 
          onClick={handleClosePopup}
        />
      )}
    </div>
  );
};
