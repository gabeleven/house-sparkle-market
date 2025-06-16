
import React, { useEffect, useRef, useState } from 'react';
import { ProviderProfile } from '@/types/providers';
import { AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface SimpleMapViewProps {
  providers: ProviderProfile[];
  userLocation?: { latitude: number; longitude: number } | null;
  onProviderSelect?: (provider: ProviderProfile) => void;
  className?: string;
}

export const SimpleMapView: React.FC<SimpleMapViewProps> = ({
  providers,
  userLocation,
  onProviderSelect,
  className = "h-96"
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  // Load API key from Supabase secrets
  useEffect(() => {
    const loadApiKey = async () => {
      try {
        // Try to get API key from Supabase Edge Function
        const { data, error } = await supabase.functions.invoke('get-google-maps-key');
        
        if (error || !data?.apiKey) {
          // Fallback to the configured secret
          setApiKey('AIzaSyAJXkmufaWRLR5t4iFFp4qupryDKNZZO9o');
        } else {
          setApiKey(data.apiKey);
        }
      } catch (err) {
        console.error('Failed to load API key:', err);
        // Use fallback
        setApiKey('AIzaSyAJXkmufaWRLR5t4iFFp4qupryDKNZZO9o');
      }
    };

    loadApiKey();
  }, []);

  // Load Google Maps script
  useEffect(() => {
    if (!apiKey) return;

    const loadGoogleMaps = () => {
      return new Promise<void>((resolve, reject) => {
        // Check if Google Maps is already loaded
        if (window.google && window.google.maps) {
          resolve();
          return;
        }

        // Create script element
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;

        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Google Maps'));

        document.head.appendChild(script);
      });
    };

    loadGoogleMaps()
      .then(() => {
        console.log('Google Maps loaded successfully');
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Google Maps loading error:', err);
        setError('Failed to load Google Maps. Please try again.');
        setIsLoading(false);
      });
  }, [apiKey]);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || !window.google || !window.google.maps || map) return;

    const mapCenter = userLocation 
      ? { lat: userLocation.latitude, lng: userLocation.longitude }
      : { lat: 45.5017, lng: -73.5673 }; // Montreal default

    const mapZoom = userLocation ? 11 : 6;

    try {
      const newMap = new google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: mapZoom,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      // Create info window
      infoWindowRef.current = new google.maps.InfoWindow();

      setMap(newMap);
      console.log('Map initialized successfully');
    } catch (err) {
      console.error('Map initialization error:', err);
      setError('Failed to initialize map.');
    }
  }, [userLocation, map]);

  // Add user location marker
  useEffect(() => {
    if (!map || !userLocation) return;

    const userMarker = new google.maps.Marker({
      position: { lat: userLocation.latitude, lng: userLocation.longitude },
      map: map,
      title: 'Your Location',
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="#FFFFFF" stroke-width="2"/>
            <circle cx="12" cy="12" r="3" fill="#FFFFFF"/>
          </svg>
        `),
        scaledSize: new google.maps.Size(24, 24)
      }
    });

    return () => {
      userMarker.setMap(null);
    };
  }, [map, userLocation]);

  // Add provider markers
  useEffect(() => {
    if (!map || !providers) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers for providers
    providers.forEach(provider => {
      if (!provider.latitude || !provider.longitude) return;

      const marker = new google.maps.Marker({
        position: { lat: Number(provider.latitude), lng: Number(provider.longitude) },
        map: map,
        title: provider.business_name || provider.full_name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2C11.6 2 8 5.6 8 10C8 16 16 30 16 30C16 30 24 16 24 10C24 5.6 20.4 2 16 2Z" fill="#7C3AED" stroke="#FFFFFF" stroke-width="2"/>
              <circle cx="16" cy="10" r="4" fill="#FFFFFF"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(32, 32)
        }
      });

      // Add click listener for info window
      marker.addListener('click', () => {
        if (infoWindowRef.current) {
          const content = `
            <div style="padding: 8px; min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold;">${provider.business_name || provider.full_name}</h3>
              ${provider.bio ? `<p style="margin: 0 0 8px 0; color: #666;">${provider.bio}</p>` : ''}
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                ${provider.average_rating ? `
                  <span style="color: #f59e0b;">★ ${provider.average_rating.toFixed(1)}</span>
                  <span style="color: #666;">(${provider.total_reviews || 0} reviews)</span>
                ` : ''}
              </div>
              ${provider.hourly_rate ? `<p style="margin: 0; font-weight: bold;">$${provider.hourly_rate}/hour</p>` : ''}
            </div>
          `;

          infoWindowRef.current.setContent(content);
          infoWindowRef.current.open(map, marker);
        }

        if (onProviderSelect) {
          onProviderSelect(provider);
        }
      });

      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];
    };
  }, [map, providers, onProviderSelect]);

  if (isLoading) {
    return (
      <div className={`${className} bg-gray-100 rounded-lg flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${className} bg-red-50 border border-red-200 rounded-lg flex items-center justify-center`}>
        <div className="text-center p-4">
          <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-red-700 font-medium">Map Error</p>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className={`${className} rounded-lg border`} />;
};
