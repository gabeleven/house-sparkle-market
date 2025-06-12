
import { useState, useEffect, useCallback } from 'react';

const GOOGLE_MAPS_API_KEY = "AIzaSyAJXkmufaWRLR5t4iFFp4qupryDKNZZO9o";

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

  // Check if API key is configured properly
  const isApiKeyValid = useCallback(() => {
    return GOOGLE_MAPS_API_KEY && 
           GOOGLE_MAPS_API_KEY.length > 10 && 
           !GOOGLE_MAPS_API_KEY.includes('YOUR_API_KEY') &&
           !GOOGLE_MAPS_API_KEY.includes('placeholder');
  }, []);

  const handleLoadSuccess = useCallback(() => {
    console.log('Google Maps API with Places API loaded successfully');
    console.log('Google Maps version:', window.google?.maps?.version);
    console.log('Places API available:', !!(window.google?.maps?.places));
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
    setErrorMessage(`Google Maps failed to load. Error: ${error.message}. Please check if the API key has Places API (New) enabled.`);
    
    // Automatically fall back to simple map after a short delay
    if (onError) {
      setTimeout(() => {
        console.log('Falling back to simple map view');
        onError();
      }, 3000);
    }
  }, []);

  // Enhanced script loading with new Places API
  const loadGoogleMapsScript = useCallback(() => {
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
      
      existingScript.addEventListener('error', (error) => {
        handleLoadError(new Error('Script loading failed'));
      });
      
      return;
    }

    console.log('Loading Google Maps script with Places API (New)...');
    
    const script = document.createElement('script');
    // Updated to include the new Places API and required libraries
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry&v=3.55&loading=async`;
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
    
    script.onerror = (error) => {
      console.error('Google Maps script loading failed:', error);
      handleLoadError(new Error('Script loading failed'), undefined);
    };
    
    document.head.appendChild(script);
  }, [isGoogleMapsAvailable, handleLoadSuccess, handleLoadError]);

  // Check API key and load script
  useEffect(() => {
    console.log('Initializing Google Maps API with Places API (New)...');
    console.log('Browser:', navigator.userAgent);
    console.log('API key validity:', isApiKeyValid());
    
    if (!isApiKeyValid()) {
      setHasError(true);
      setIsLoading(false);
      setErrorMessage('Google Maps API key is not properly configured. Please ensure Places API (New) is enabled.');
      return;
    }

    // Load the script with Places API
    loadGoogleMapsScript();
  }, [isApiKeyValid, loadGoogleMapsScript]);

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
