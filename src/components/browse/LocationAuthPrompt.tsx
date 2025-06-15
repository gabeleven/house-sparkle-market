
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Shield } from 'lucide-react';

interface LocationAuthPromptProps {
  onRequestLocation: () => void;
}

export const LocationAuthPrompt: React.FC<LocationAuthPromptProps> = ({ onRequestLocation }) => {
  return (
    <Card className="mb-6 border-blue-200 bg-blue-50">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Get Better Results with Location Access
            </h3>
            <p className="text-blue-700 mb-3">
              Allow location access to see service providers near you and get accurate distance estimates.
            </p>
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <Shield className="w-4 h-4" />
              <span>Your location is never shared with service providers</span>
            </div>
          </div>
          
          <Button 
            onClick={onRequestLocation}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Allow Location Access
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
