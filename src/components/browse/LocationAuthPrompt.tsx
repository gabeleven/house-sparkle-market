
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Shield, Clock, Target } from 'lucide-react';
import { useLocation } from '@/hooks/useLocation';

interface LocationAuthPromptProps {
  onLocationGranted: () => void;
  onLocationDenied: () => void;
  postalCode?: string;
}

export const LocationAuthPrompt: React.FC<LocationAuthPromptProps> = ({
  onLocationGranted,
  onLocationDenied,
  postalCode,
}) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const { requestLocation } = useLocation();

  const handleRequestLocation = async () => {
    setIsRequesting(true);
    try {
      await requestLocation();
      onLocationGranted();
    } catch (error) {
      onLocationDenied();
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <Card className="pop-card bg-card/80 backdrop-blur border-2 border-primary/20 max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
            <MapPin className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl">Find Service Providers Near You</CardTitle>
        <CardDescription className="text-base">
          Allow location access to see service providers in your exact area
          {postalCode && ` around ${postalCode}`}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center space-y-2">
            <Target className="w-8 h-8 text-primary mx-auto" />
            <h4 className="font-semibold">Precise Results</h4>
            <p className="text-sm text-muted-foreground">
              See service providers within your preferred distance
            </p>
          </div>
          <div className="text-center space-y-2">
            <Clock className="w-8 h-8 text-primary mx-auto" />
            <h4 className="font-semibold">Faster Booking</h4>
            <p className="text-sm text-muted-foreground">
              Skip manual address entry for quicker service
            </p>
          </div>
          <div className="text-center space-y-2">
            <Shield className="w-8 h-8 text-primary mx-auto" />
            <h4 className="font-semibold">Privacy Protected</h4>
            <p className="text-sm text-muted-foreground">
              Your location is only used for search results
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleRequestLocation}
            disabled={isRequesting}
            className="w-full pop-blue-btn"
            size="lg"
          >
            {isRequesting ? (
              <>
                <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                Requesting Location...
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4 mr-2" />
                Allow Location Access
              </>
            )}
          </Button>
          
          <Button
            onClick={onLocationDenied}
            variant="outline"
            className="w-full"
          >
            Continue with {postalCode || 'Postal Code'} Search
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          We use your location only to show nearby service providers. You can change this anytime in your browser settings.
        </p>
      </CardContent>
    </Card>
  );
};
