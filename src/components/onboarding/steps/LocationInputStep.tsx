
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';

export const LocationInputStep: React.FC = () => {
  const { updateOnboardingData, nextStep } = useOnboarding();
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleNext = () => {
    updateOnboardingData('city', city);
    updateOnboardingData('postalCode', postalCode);
    nextStep('timing_input');
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => nextStep('service_selection')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            What city are you in?
          </h2>
          <p className="text-muted-foreground">Help us find providers near you</p>
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-lg font-medium">Your Location</span>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="e.g., Toronto"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="postalCode">Postal Code (Optional)</Label>
            <Input
              id="postalCode"
              placeholder="e.g., M5V 3A1"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              For more accurate results
            </p>
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <Button 
            onClick={handleNext} 
            disabled={!city.trim()}
            className="min-w-32"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
