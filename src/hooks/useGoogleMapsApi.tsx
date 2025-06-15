
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useGoogleMapsApi = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Check if Google Maps is available with Places API
  const isGoogleMapsAvailable = useCallback(() => {
    return !!(
      typeof window !== 'undefined' && 
      window.google && 
      window.google.maps &&
      window.google.maps.Map &&
      window.google.maps.places &&
      window.google.maps.places.PlacesService &&
      window.google.maps.places.AutocompleteService
    );
  }, []);

  const handleLoadSuccess = useCallback(() => {
    console.log('Google Maps API with Places API loaded successfully');
    setScriptLoaded(true);
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleLoadError = useCallback((error: Error, onError?: () => void) => {
    console.error('Google Maps API failed to load:', error);
    
    setIsLoading(false);
    setHasError(true);
    setErrorMessage(`Google Maps failed to load. Error: ${error.message}. Please check if the API key has Places API (New) enabled.`);
    
    // Automatically fall back to simple map after a short delay
    if (onError) {
      setTimeout(() => {
        console.log('Falling back to simple map view');
        onError();
      }, 3000);
    }
  }, []);

  // Secure API key retrieval through edge function
  const getSecureApiKey = useCallback(async () => {
    try {
      const { data, error } = await supabase.functions.invoke('google-maps-proxy', {
        body: { action: 'get_key' }
      });
      
      if (error) {
        console.error('Failed to get secure API key:', error);
        return null;
      }
      
      return data?.apiKey;
    } catch (error) {
      console.error('Error retrieving secure API key:', error);
      return null;
    }
  }, []);

  // Enhanced script loading with secure API key
  const loadGoogleMapsScript = useCallback(async () => {
    // Skip in SSR environment
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    if (isGoogleMapsAvailable()) {
      console.log('Google Maps with Places API already available');
      setScriptLoaded(true);
      setIsLoading(false);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
    if (existingScript) {
      console.log('Google Maps script already exists, waiting for load...');
      
      // Add load event listener to existing script
      existingScript.addEventListener('load', () => {
        if (isGoogleMapsAvailable()) {
          handleLoadSuccess();
        } else {
          handleLoadError(new Error('Places API not available after script load'));
        }
      });
      
      existingScript.addEventListener('error', () => {
        handleLoadError(new Error('Script loading failed'));
      });
      
      return;
    }

    console.log('Loading Google Maps script with Places API (New)...');
    
    try {
      // Get secure API key
      const apiKey = await getSecureApiKey();
      if (!apiKey) {
        handleLoadError(new Error('Failed to retrieve secure API key'));
        return;
      }
      
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&v=3.55&loading=async`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        console.log('Google Maps script loaded, checking Places API availability...');
        
        // Wait a bit for all libraries to initialize
        setTimeout(() => {
          if (isGoogleMapsAvailable()) {
            handleLoadSuccess();
          } else {
            handleLoadError(new Error('Places API not available after script load'));
          }
        }, 100);
      };
      
      script.onerror = () => {
        console.error('Google Maps script loading failed');
        handleLoadError(new Error('Script loading failed'));
      };
      
      document.head.appendChild(script);
    } catch (error) {
      handleLoadError(new Error(`Script loading setup failed: ${error.message}`));
    }
  }, [isGoogleMapsAvailable, handleLoadSuccess, handleLoadError, getSecureApiKey]);

  // Initialize with secure API key loading
  useEffect(() => {
    console.log('Initializing Google Maps API with secure key retrieval...');
    loadGoogleMapsScript();
  }, [loadGoogleMapsScript]);

  return {
    isLoading,
    hasError,
    errorMessage,
    scriptLoaded,
    isGoogleMapsAvailable,
    handleLoadSuccess,
    handleLoadError
  };
};
