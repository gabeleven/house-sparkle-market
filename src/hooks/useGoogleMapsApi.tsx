
import { useState, useEffect, useCallback } from 'react';

const GOOGLE_MAPS_API_KEY = "AIzaSyAJXkmufaWRLR5t4iFFp4qupryDKNZZO9o";

export const useGoogleMapsApi = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Check if Google Maps is available - with better Edge compatibility
  const isGoogleMapsAvailable = useCallback(() => {
    return !!(
      typeof window !== 'undefined' && 
      window.google && 
      window.google.maps &&
      window.google.maps.Map
    );
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
    console.log('Google Maps version:', window.google?.maps?.version);
    console.log('Browser:', navigator.userAgent);
    setScriptLoaded(true);
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleLoadError = useCallback((error: Error, onError?: () => void) => {
    console.error('Google Maps API failed to load:', error);
    console.error('Browser:', navigator.userAgent);
    console.error('API Key used:', GOOGLE_MAPS_API_KEY);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    setIsLoading(false);
    setHasError(true);
    setErrorMessage(`Google Maps failed to load in ${navigator.userAgent.includes('Edge') ? 'Edge' : 'this browser'}. Error: ${error.message}`);
    
    // Automatically fall back to simple map after a short delay
    if (onError) {
      setTimeout(() => {
        console.log('Falling back to simple map view');
        onError();
      }, 3000);
    }
  }, []);

  // Enhanced script loading with Edge compatibility
  const loadGoogleMapsScript = useCallback(() => {
    if (isGoogleMapsAvailable()) {
      console.log('Google Maps already available');
      setScriptLoaded(true);
      setIsLoading(false);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
    if (existingScript) {
      console.log('Google Maps script already exists, waiting for load...');
      return;
    }

    console.log('Loading Google Maps script manually for better Edge compatibility...');
    
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&v=3.55`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      console.log('Google Maps script loaded via manual method');
      handleLoadSuccess();
    };
    
    script.onerror = (error) => {
      console.error('Manual script loading failed:', error);
      handleLoadError(new Error('Script loading failed'), undefined);
    };
    
    document.head.appendChild(script);
  }, [isGoogleMapsAvailable, handleLoadSuccess, handleLoadError]);

  // Check API key and load script
  useEffect(() => {
    console.log('Initializing Google Maps API...');
    console.log('Browser:', navigator.userAgent);
    console.log('API key validity:', isApiKeyValid());
    
    if (!isApiKeyValid()) {
      setHasError(true);
      setIsLoading(false);
      setErrorMessage('Google Maps API key is not properly configured.');
      return;
    }

    // For Edge browser, use manual script loading
    if (navigator.userAgent.includes('Edge') || navigator.userAgent.includes('Edg/')) {
      console.log('Edge browser detected, using manual script loading');
      loadGoogleMapsScript();
    } else {
      // For other browsers, check if already loaded
      if (isGoogleMapsAvailable()) {
        console.log('Google Maps already available');
        setScriptLoaded(true);
        setIsLoading(false);
      }
    }
  }, [isApiKeyValid, isGoogleMapsAvailable, loadGoogleMapsScript]);

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
