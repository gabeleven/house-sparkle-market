
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { CleanerProfile } from '@/hooks/useCleaners';
import { Button } from '@/components/ui/button';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { CleanerMapPopup } from './CleanerMapPopup';

interface MapViewProps {
  cleaners: CleanerProfile[];
  userLocation?: { latitude: number; longitude: number } | null;
  radius?: number;
  onClose: () => void;
  isFullScreen?: boolean;
}

export const MapView = ({ cleaners, userLocation, radius = 10, onClose, isFullScreen = false }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedCleaner, setSelectedCleaner] = useState<CleanerProfile | null>(null);
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map with Mapbox public token
    mapboxgl.accessToken = 'pk.eyJ1IjoiaG91c2llbWFwIiwiYSI6ImNtNWVsMDIyMzBxNjAybHNkZTJrbzl4cWgifQ.placeholder';
    
    // Default to Montreal area
    const defaultCenter: [number, number] = [-73.5673, 45.5017];
    const initialCenter = userLocation ? [userLocation.longitude, userLocation.latitude] as [number, number] : defaultCenter;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: initialCenter,
      zoom: userLocation ? 12 : 10,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add radius circle if user location is available
    if (userLocation) {
      map.current.on('load', () => {
        if (!map.current) return;

        // Add radius circle
        map.current.addSource('radius-circle', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [userLocation.longitude, userLocation.latitude]
            }
          }
        });

        map.current.addLayer({
          id: 'radius-circle',
          type: 'circle',
          source: 'radius-circle',
          paint: {
            'circle-radius': {
              stops: [
                [0, 0],
                [20, radius * 1000 / 2] // Approximate conversion for visualization
              ],
              base: 2
            },
            'circle-color': '#6366f1',
            'circle-opacity': 0.1,
            'circle-stroke-color': '#6366f1',
            'circle-stroke-width': 2,
            'circle-stroke-opacity': 0.5
          }
        });
      });
    }

    return () => {
      map.current?.remove();
    };
  }, [userLocation, radius]);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add cleaner markers
    cleaners.forEach(cleaner => {
      if (!cleaner.latitude || !cleaner.longitude) return;

      // Create marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'cleaner-marker';
      markerEl.style.cssText = `
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: white;
        border: 3px solid #6366f1;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        background-image: url(${cleaner.profile_photo_url || '/placeholder.svg'});
        background-size: cover;
        background-position: center;
      `;

      if (!cleaner.profile_photo_url) {
        markerEl.textContent = cleaner.full_name.charAt(0).toUpperCase();
        markerEl.style.fontSize = '16px';
        markerEl.style.fontWeight = 'bold';
        markerEl.style.color = '#6366f1';
      }

      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat([cleaner.longitude, cleaner.latitude])
        .addTo(map.current!);

      // Add click handler
      markerEl.addEventListener('click', (e) => {
        e.stopPropagation();
        setSelectedCleaner(cleaner);
        const rect = markerEl.getBoundingClientRect();
        setPopupPosition({
          x: rect.left + rect.width / 2,
          y: rect.top
        });
      });

      markersRef.current.push(marker);
    });
  }, [cleaners]);

  const handleZoomIn = () => {
    if (map.current) {
      map.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (map.current) {
      map.current.zoomOut();
    }
  };

  const containerClass = isFullScreen 
    ? "fixed inset-0 z-50 bg-white"
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
          className="bg-white shadow-md hover:bg-gray-50"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

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
        <p className="text-sm text-gray-600">
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
