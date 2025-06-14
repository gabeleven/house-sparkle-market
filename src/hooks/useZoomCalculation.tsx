
import { useCallback } from 'react';

export const useZoomCalculation = () => {
  const calculateZoomFromRadius = useCallback((radiusKm: number): number => {
    if (radiusKm <= 10) return 12;
    if (radiusKm <= 25) return 10;
    if (radiusKm <= 50) return 9;
    return 8;
  }, []);

  return { calculateZoomFromRadius };
};
