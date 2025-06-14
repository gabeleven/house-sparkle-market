
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Shield, Search } from 'lucide-react';

interface LocationAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAllowLocation: () => void;
  onDenyLocation: () => void;
}

export const LocationAuthModal: React.FC<LocationAuthModalProps> = ({
  isOpen,
  onClose,
  onAllowLocation,
  onDenyLocation
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-xl">Access Local Service Providers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Find Local Service Providers Near You
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Search className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Better Search Results</p>
                <p className="text-xs text-muted-foreground">
                  Find verified service providers in your area
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Privacy Protected</p>
                <p className="text-xs text-muted-foreground">
                  Your location is never shared with service providers
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <Button 
              onClick={onAllowLocation}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Allow Location Access
            </Button>
            <Button 
              onClick={onDenyLocation}
              variant="outline" 
              className="w-full"
            >
              Continue without location
            </Button>
          </div>
          
          <p className="text-xs text-center text-muted-foreground">
            You can change this setting anytime in your browser
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
