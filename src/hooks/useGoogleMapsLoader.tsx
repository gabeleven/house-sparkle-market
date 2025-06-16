
import { useState, useEffect, useCallback } from 'react';

const GOOGLE_MAPS_API_KEY = "AIzaSyAJXkmufaWRLR5t4iFFp4qupryDKNZZO9o";
const REQUIRED_LIBRARIES = ["places", "geometry"];

interface GoogleMapsLoaderState {
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useGoogleMapsLoader = () => {
  const [state, setState] = useState<GoogleMapsLoaderState>({
    isLoaded: false,
    isLoading: true,
    error: null
  });

  const isGoogleMapsAvailable = useCallback(() => {
    return !!(
      typeof window !== 'undefined' && 
      window.google && 
      window.google.maps &&
      window.google.maps.Map &&
      window.google.maps.places &&
      window.google.maps.places.PlacesService
    );
  }, []);

  useEffect(() => {
    const initializeGoogleMaps = () => {
      // Check if already loaded
      if (isGoogleMapsAvailable()) {
        setState({ isLoaded: true, isLoading: false, error: null });
        return;
      }

      // Check if script already exists
      const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
      if (existingScript) {
        // Wait for existing script to load
        existingScript.addEventListener('load', () => {
          if (isGoogleMapsAvailable()) {
            setState({ isLoaded: true, isLoading: false, error: null });
          } else {
            setState({ isLoaded: false, isLoading: false, error: 'Google Maps failed to initialize' });
          }
        });
        return;
      }

      // Create and load new script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=${REQUIRED_LIBRARIES.join(',')}&v=3.55`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        setTimeout(() => {
          if (isGoogleMapsAvailable()) {
            setState({ isLoaded: true, isLoading: false, error: null });
          } else {
            setState({ isLoaded: false, isLoading: false, error: 'Google Maps libraries not available' });
          }
        }, 100);
      };

      script.onerror = () => {
        setState({ isLoaded: false, isLoading: false, error: 'Failed to load Google Maps script' });
      };

      document.head.appendChild(script);
    };

    initializeGoogleMaps();
  }, [isGoogleMapsAvailable]);

  return {
    ...state,
    isGoogleMapsAvailable
  };
};
