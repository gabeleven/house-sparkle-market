
import { useState, useEffect } from 'react';

export interface CanadianCity {
  name: string;
  province: string;
  code: string;
  coordinates: { lat: number; lng: number };
  population?: number;
}

export const CANADIAN_CITIES: CanadianCity[] = [
  // Ontario
  { name: 'Toronto', province: 'Ontario', code: 'ON', coordinates: { lat: 43.6532, lng: -79.3832 }, population: 2794356 },
  { name: 'Ottawa', province: 'Ontario', code: 'ON', coordinates: { lat: 45.4215, lng: -75.6972 }, population: 1017449 },
  { name: 'Hamilton', province: 'Ontario', code: 'ON', coordinates: { lat: 43.2557, lng: -79.8711 }, population: 569353 },
  { name: 'Kitchener', province: 'Ontario', code: 'ON', coordinates: { lat: 43.4516, lng: -80.4925 }, population: 256885 },
  { name: 'London', province: 'Ontario', code: 'ON', coordinates: { lat: 42.9849, lng: -81.2453 }, population: 422324 },
  
  // Quebec
  { name: 'Montreal', province: 'Quebec', code: 'QC', coordinates: { lat: 45.5017, lng: -73.5673 }, population: 1762949 },
  { name: 'Quebec City', province: 'Quebec', code: 'QC', coordinates: { lat: 46.8139, lng: -71.2082 }, population: 549459 },
  
  // British Columbia
  { name: 'Vancouver', province: 'British Columbia', code: 'BC', coordinates: { lat: 49.2827, lng: -123.1207 }, population: 675218 },
  { name: 'Victoria', province: 'British Columbia', code: 'BC', coordinates: { lat: 48.4284, lng: -123.3656 }, population: 91867 },
  
  // Alberta
  { name: 'Calgary', province: 'Alberta', code: 'AB', coordinates: { lat: 51.0447, lng: -114.0719 }, population: 1336000 },
  { name: 'Edmonton', province: 'Alberta', code: 'AB', coordinates: { lat: 53.5444, lng: -113.4909 }, population: 1010899 },
  
  // Manitoba
  { name: 'Winnipeg', province: 'Manitoba', code: 'MB', coordinates: { lat: 49.8951, lng: -97.1384 }, population: 749534 },
  
  // Saskatchewan
  { name: 'Saskatoon', province: 'Saskatchewan', code: 'SK', coordinates: { lat: 52.1332, lng: -106.6700 }, population: 317480 },
  { name: 'Regina', province: 'Saskatchewan', code: 'SK', coordinates: { lat: 50.4452, lng: -104.6189 }, population: 249217 },
  
  // Nova Scotia
  { name: 'Halifax', province: 'Nova Scotia', code: 'NS', coordinates: { lat: 44.6488, lng: -63.5752 }, population: 439819 },
  
  // New Brunswick
  { name: 'Fredericton', province: 'New Brunswick', code: 'NB', coordinates: { lat: 45.9636, lng: -66.6431 }, population: 63116 },
  
  // Prince Edward Island
  { name: 'Charlottetown', province: 'Prince Edward Island', code: 'PE', coordinates: { lat: 46.2382, lng: -63.1311 }, population: 38809 },
  
  // Newfoundland and Labrador
  { name: 'St. John\'s', province: 'Newfoundland and Labrador', code: 'NL', coordinates: { lat: 47.5615, lng: -52.7126 }, population: 114688 },
  
  // Territories
  { name: 'Yellowknife', province: 'Northwest Territories', code: 'NT', coordinates: { lat: 62.4540, lng: -114.3718 }, population: 20340 },
  { name: 'Whitehorse', province: 'Yukon', code: 'YT', coordinates: { lat: 60.7212, lng: -135.0568 }, population: 28201 },
  { name: 'Iqaluit', province: 'Nunavut', code: 'NU', coordinates: { lat: 63.7467, lng: -68.5170 }, population: 7740 }
];

export const useCitySelection = () => {
  const [selectedCity, setSelectedCity] = useState<CanadianCity>(() => {
    // Check if we're in the browser before accessing localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('housie-selected-city');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return CANADIAN_CITIES.find(city => 
            city.name === parsed.name && city.province === parsed.province
          ) || CANADIAN_CITIES[0]; // Default to Montreal
        } catch {
          return CANADIAN_CITIES[0];
        }
      }
    }
    return CANADIAN_CITIES[0]; // Default to Montreal
  });

  const updateSelectedCity = (city: CanadianCity) => {
    setSelectedCity(city);
    // Save to localStorage only in browser
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('housie-selected-city', JSON.stringify(city));
    }
  };

  const getCitiesByProvince = () => {
    const grouped = CANADIAN_CITIES.reduce((acc, city) => {
      const province = city.province;
      if (!acc[province]) {
        acc[province] = [];
      }
      acc[province].push(city);
      return acc;
    }, {} as Record<string, CanadianCity[]>);

    return grouped;
  };

  return {
    selectedCity,
    updateSelectedCity,
    cities: CANADIAN_CITIES,
    getCitiesByProvince
  };
};
