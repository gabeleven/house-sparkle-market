
import { useState, useEffect, useCallback } from 'react';

const GOOGLE_MAPS_API_KEY = "AIzaSyAJXkmufa_WRLR54fFpq4qupYDKNZZO9o";

export const useGoogleMapsApi = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Check if Google Maps is available - fixed to return boolean
  const isGoogleMapsAvailable = useCallback(() => {
    return !!(typeof window !== 'undefined' && window.google && window.google.maps);
  }, []);

  // Check if API key is configured properly
  const isApiKeyValid = useCallback(() => {
    return GOOGLE_MAPS_API_KEY && 
           GOOGLE_MAPS_API_KEY.length > 10 && 
           !GOOGLE_MAPS_API_KEY.includes('YOUR_API_KEY') &&
           !GOOGLE_MAPS_API_KEY.includes('placeholder');
  }, []);

  const handleLoadSuccess = useCallback(() => {
    console.log('Google Maps API loaded successfully');
    setScriptLoaded(true);
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleLoadError = useCallback((error: Error, onError?: () => void) => {
    console.error('Google Maps API failed to load:', error);
    setIsLoading(false);
    setHasError(true);
    setErrorMessage('Google Maps failed to load. This could be due to an API key issue or network problem.');
    
    // Automatically fall back to simple map after a short delay
    if (onError) {
      setTimeout(() => {
        onError();
      }, 2000);
    }
  }, []);

  // Check if API key is configured
  useEffect(() => {
    if (!isApiKeyValid()) {
      setHasError(true);
      setIsLoading(false);
      setErrorMessage('Google Maps API key is not properly configured.');
      return;
    }

    // Check if Google Maps is already loaded
    if (isGoogleMapsAvailable()) {
      setScriptLoaded(true);
      setIsLoading(false);
    }
  }, [isGoogleMapsAvailable, isApiKeyValid]);

  return {
    isLoading,
    hasError,
    errorMessage,
    scriptLoaded,
    isGoogleMapsAvailable,
    handleLoadSuccess,
    handleLoadError,
    apiKey: GOOGLE_MAPS_API_KEY
  };
};
