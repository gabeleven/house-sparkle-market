
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Home, Building, Hammer, TreePine, Car, Wrench } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';

const serviceOptions = [
  { id: 'residential_cleaning', label: 'Residential Cleaning', icon: Home, description: 'House cleaning, apartment cleaning' },
  { id: 'commercial_cleaning', label: 'Commercial Cleaning', icon: Building, description: 'Office cleaning, retail spaces' },
  { id: 'deep_cleaning', label: 'Deep Cleaning', icon: Home, description: 'Move-in/out, post-construction' },
  { id: 'maintenance', label: 'Home Maintenance', icon: Hammer, description: 'Repairs, handyman services' },
  { id: 'landscaping', label: 'Landscaping', icon: TreePine, description: 'Lawn care, garden maintenance' },
  { id: 'automotive', label: 'Automotive Services', icon: Car, description: 'Car detailing, maintenance' },
  { id: 'appliance', label: 'Appliance Repair', icon: Wrench, description: 'Washer, dryer, dishwasher repair' }
];

export const ServiceOfferingsStep: React.FC = () => {
  const { updateOnboardingData, nextStep } = useOnboarding();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleNext = () => {
    updateOnboardingData('offeredServices', selectedServices);
    nextStep('pricing_input');
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => nextStep('account_creation')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            What services do you offer?
          </h2>
          <p className="text-muted-foreground">Select all that apply to your business</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {serviceOptions.map((service) => {
          const Icon = service.icon;
          const isSelected = selectedServices.includes(service.id);
          
          return (
            <Card 
              key={service.id}
              className={`cursor-pointer transition-all ${
                isSelected 
                  ? 'border-primary bg-primary/5' 
                  : 'hover:shadow-md hover:border-primary/50'
              }`}
              onClick={() => toggleService(service.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Checkbox 
                    checked={isSelected}
                    onChange={() => toggleService(service.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-primary text-white' : 'bg-muted'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-medium">{service.label}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={handleNext} 
          disabled={selectedServices.length === 0}
          className="min-w-32"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
