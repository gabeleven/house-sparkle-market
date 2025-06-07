
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { CleanerProfile } from '@/hooks/useCleaners';

interface MapPreviewProps {
  cleaners: CleanerProfile[];
  onShowMap: () => void;
  userLocation?: { latitude: number; longitude: number } | null;
}

export const MapPreview = ({ cleaners, onShowMap, userLocation }: MapPreviewProps) => {
  const cleanersWithLocation = cleaners.filter(c => c.latitude && c.longitude);

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
              <MapPin className="w-8 h-8 text-purple-600" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                View Cleaners on Google Maps
              </h3>
              <p className="text-sm text-muted-foreground">
                {cleanersWithLocation.length} cleaner{cleanersWithLocation.length !== 1 ? 's' : ''} available in your area
              </p>
              {userLocation && (
                <p className="text-xs text-green-600 mt-1">
                  ✓ Using your location for accurate results
                </p>
              )}
            </div>
          </div>
          
          <Button 
            onClick={onShowMap}
            className="bg-purple-600 hover:bg-purple-700"
            disabled={cleanersWithLocation.length === 0}
          >
            Show Map
          </Button>
        </div>
        
        {cleanersWithLocation.length === 0 && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              No cleaners with location data found. Try adjusting your search filters.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
