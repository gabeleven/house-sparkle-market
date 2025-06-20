
import { useCallback } from 'react';

interface CityCoordinates {
  [key: string]: { lat: number; lng: number };
}

export const useGeocoding = () => {
  // Major Canadian city coordinates for nationwide coverage
  const cityCoordinates: CityCoordinates = {
    // Ontario
    'Toronto': { lat: 43.6532, lng: -79.3832 },
    'Ottawa': { lat: 45.4215, lng: -75.6972 },
    'Mississauga': { lat: 43.5890, lng: -79.6441 },
    'Brampton': { lat: 43.7315, lng: -79.7624 },
    'Hamilton': { lat: 43.2557, lng: -79.8711 },
    'London': { lat: 42.9849, lng: -81.2453 },
    'Markham': { lat: 43.8561, lng: -79.3370 },
    'Vaughan': { lat: 43.8361, lng: -79.4985 },
    'Kitchener': { lat: 43.4516, lng: -80.4925 },
    'Windsor': { lat: 42.3149, lng: -83.0364 },
    
    // Quebec
    'Montreal': { lat: 45.5017, lng: -73.5673 },
    'Quebec City': { lat: 46.8139, lng: -71.2082 },
    'Laval': { lat: 45.6066, lng: -73.7124 },
    'Gatineau': { lat: 45.4765, lng: -75.7013 },
    'Longueuil': { lat: 45.5312, lng: -73.5186 },
    'Sherbrooke': { lat: 45.4042, lng: -71.8929 },
    'Saguenay': { lat: 48.3477, lng: -71.0612 },
    'Lévis': { lat: 46.7378, lng: -71.1683 },
    'Trois-Rivières': { lat: 46.3432, lng: -72.5432 },
    
    // British Columbia
    'Vancouver': { lat: 49.2827, lng: -123.1207 },
    'Surrey': { lat: 49.1913, lng: -122.8490 },
    'Burnaby': { lat: 49.2488, lng: -122.9805 },
    'Richmond': { lat: 49.1666, lng: -123.1336 },
    'Abbotsford': { lat: 49.0579, lng: -122.2906 },
    'Coquitlam': { lat: 49.2838, lng: -122.7932 },
    'Kelowna': { lat: 49.8880, lng: -119.4960 },
    'Victoria': { lat: 48.4284, lng: -123.3656 },
    
    // Alberta
    'Calgary': { lat: 51.0447, lng: -114.0719 },
    'Edmonton': { lat: 53.5444, lng: -113.4909 },
    'Red Deer': { lat: 52.2681, lng: -113.8112 },
    'Lethbridge': { lat: 49.6936, lng: -112.8451 },
    'Medicine Hat': { lat: 50.0406, lng: -110.6764 },
    
    // Manitoba
    'Winnipeg': { lat: 49.8951, lng: -97.1384 },
    'Brandon': { lat: 49.8478, lng: -99.9531 },
    
    // Saskatchewan
    'Saskatoon': { lat: 52.1332, lng: -106.6700 },
    'Regina': { lat: 50.4452, lng: -104.6189 },
    
    // Nova Scotia
    'Halifax': { lat: 44.6488, lng: -63.5752 },
    'Sydney': { lat: 46.1351, lng: -60.1831 },
    
    // New Brunswick
    'Saint John': { lat: 45.2733, lng: -66.0633 },
    'Moncton': { lat: 46.0878, lng: -64.7782 },
    'Fredericton': { lat: 45.9636, lng: -66.6431 },
    
    // Newfoundland and Labrador
    'St. John\'s': { lat: 47.5615, lng: -52.7126 },
    
    // Prince Edward Island
    'Charlottetown': { lat: 46.2382, lng: -63.1311 },
    
    // Yukon
    'Whitehorse': { lat: 60.7212, lng: -135.0568 },
    
    // Northwest Territories
    'Yellowknife': { lat: 62.4540, lng: -114.3718 },
    
    // Nunavut
    'Iqaluit': { lat: 63.7467, lng: -68.5170 }
  };

  const geocodeCity = useCallback((cityName: string): { lat: number; lng: number } | null => {
    const normalized = cityName.toLowerCase().trim();
    
    // Direct match
    const directMatch = Object.keys(cityCoordinates).find(
      city => city.toLowerCase() === normalized
    );
    if (directMatch) {
      return cityCoordinates[directMatch];
    }

    // Partial match
    const partialMatch = Object.keys(cityCoordinates).find(
      city => city.toLowerCase().includes(normalized) || normalized.includes(city.toLowerCase())
    );
    if (partialMatch) {
      return cityCoordinates[partialMatch];
    }

    return null;
  }, []);

  return { geocodeCity };
};
