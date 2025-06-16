
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, DollarSign } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';

const pricingTypes = [
  { id: 'hourly', label: 'Hourly Rate', description: 'Charge by the hour' },
  { id: 'fixed', label: 'Fixed Price', description: 'Set price per job' },
  { id: 'both', label: 'Both', description: 'Flexible pricing options' }
];

export const PricingInputStep: React.FC = () => {
  const { updateOnboardingData, nextStep } = useOnboarding();
  const [pricingType, setPricingType] = useState('hourly');
  const [hourlyRate, setHourlyRate] = useState('');
  const [fixedPrice, setFixedPrice] = useState('');

  const handleNext = () => {
    updateOnboardingData('pricing', {
      type: pricingType,
      hourlyRate: hourlyRate,
      fixedPrice: fixedPrice
    });
    nextStep('service_location');
  };

  const isFormValid = () => {
    if (pricingType === 'hourly') return hourlyRate.trim() !== '';
    if (pricingType === 'fixed') return fixedPrice.trim() !== '';
    if (pricingType === 'both') return hourlyRate.trim() !== '' && fixedPrice.trim() !== '';
    return false;
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => nextStep('service_offerings')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            What are your rates?
          </h2>
          <p className="text-muted-foreground">Help customers understand your pricing</p>
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <DollarSign className="w-5 h-5 text-primary" />
          <span className="text-lg font-medium">Pricing Structure</span>
        </div>

        <div className="space-y-3">
          {pricingTypes.map((type) => (
            <Card 
              key={type.id}
              className={`cursor-pointer transition-all ${
                pricingType === type.id 
                  ? 'border-primary bg-primary/5' 
                  : 'hover:shadow-md hover:border-primary/50'
              }`}
              onClick={() => setPricingType(type.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    pricingType === type.id 
                      ? 'border-primary bg-primary' 
                      : 'border-muted-foreground'
                  }`} />
                  <div>
                    <h3 className="font-medium">{type.label}</h3>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          {(pricingType === 'hourly' || pricingType === 'both') && (
            <div>
              <Label htmlFor="hourlyRate">Hourly Rate (CAD)</Label>
              <Input
                id="hourlyRate"
                type="number"
                placeholder="25"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Average rate in your area: $20-35/hour
              </p>
            </div>
          )}

          {(pricingType === 'fixed' || pricingType === 'both') && (
            <div>
              <Label htmlFor="fixedPrice">Starting Price (CAD)</Label>
              <Input
                id="fixedPrice"
                type="number"
                placeholder="80"
                value={fixedPrice}
                onChange={(e) => setFixedPrice(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Base price for your most common service
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center pt-6">
          <Button 
            onClick={handleNext} 
            disabled={!isFormValid()}
            className="min-w-32"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
