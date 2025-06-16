
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';

export const ServiceLocationStep: React.FC = () => {
  const { updateOnboardingData, nextStep } = useOnboarding();
  const [serviceArea, setServiceArea] = useState('');
  const [radius, setRadius] = useState('25');

  const handleNext = () => {
    updateOnboardingData('serviceLocation', { area: serviceArea, radius });
    nextStep('pro_preview');
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => nextStep('pricing_input')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Where do you provide services?
          </h2>
          <p className="text-muted-foreground">Define your service area</p>
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-lg font-medium">Service Area</span>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="serviceArea">Primary City/Region</Label>
            <Input
              id="serviceArea"
              placeholder="e.g., Toronto, Ontario"
              value={serviceArea}
              onChange={(e) => setServiceArea(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="radius">Service Radius (km)</Label>
            <Input
              id="radius"
              type="number"
              placeholder="25"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              How far are you willing to travel for jobs?
            </p>
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <Button 
            onClick={handleNext} 
            disabled={!serviceArea.trim()}
            className="min-w-32"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
