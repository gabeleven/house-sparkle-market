
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, DollarSign } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';

const pricingOptions = [
  { id: 'hourly', label: 'Hourly Rate', placeholder: 'e.g., $35' },
  { id: 'fixed', label: 'Fixed Price per Service', placeholder: 'e.g., $150' },
  { id: 'custom', label: 'Custom Pricing', placeholder: 'Varies by project' }
];

export const PricingInputStep: React.FC = () => {
  const { updateOnboardingData, nextStep } = useOnboarding();
  const [pricingType, setPricingType] = useState('hourly');
  const [priceValue, setPriceValue] = useState('');

  const handleNext = () => {
    updateOnboardingData('pricing', { type: pricingType, value: priceValue });
    nextStep('service_location');
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => nextStep('service_offerings')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            What's your pricing?
          </h2>
          <p className="text-muted-foreground">Help customers understand your rates</p>
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <div className="space-y-3">
          {pricingOptions.map((option) => (
            <Card 
              key={option.id}
              className={`cursor-pointer transition-all ${
                pricingType === option.id 
                  ? 'border-primary bg-primary/5' 
                  : 'hover:border-primary/50'
              }`}
              onClick={() => setPricingType(option.id)}
            >
              <CardContent className="flex items-center gap-3 p-4">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  pricingType === option.id 
                    ? 'border-primary bg-primary' 
                    : 'border-muted-foreground'
                }`}>
                  {pricingType === option.id && (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </div>
                <span className="font-medium">{option.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="pt-4">
          <Label htmlFor="price" className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            {pricingOptions.find(opt => opt.id === pricingType)?.label}
          </Label>
          <Input
            id="price"
            placeholder={pricingOptions.find(opt => opt.id === pricingType)?.placeholder}
            value={priceValue}
            onChange={(e) => setPriceValue(e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-muted-foreground mt-1">
            You can always adjust this later in your profile
          </p>
        </div>

        <div className="flex justify-center pt-6">
          <Button 
            onClick={handleNext} 
            disabled={!priceValue.trim()}
            className="min-w-32"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
