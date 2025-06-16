
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Home, Building, Droplets, TreePine, Hammer } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';

const serviceOptions = [
  { id: 'cleaning', label: 'Cleaning Services', icon: Home, description: 'House cleaning, deep cleaning, maintenance' },
  { id: 'commercial', label: 'Commercial Cleaning', icon: Building, description: 'Office cleaning, commercial spaces' },
  { id: 'maintenance', label: 'Home Maintenance', icon: Hammer, description: 'Repairs, handyman services, renovations' },
  { id: 'landscaping', label: 'Landscaping', icon: TreePine, description: 'Lawn care, garden maintenance, snow removal' },
  { id: 'windows', label: 'Window Cleaning', icon: Droplets, description: 'Professional window washing services' }
];

export const ServiceSelectionStep: React.FC = () => {
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
    updateOnboardingData('selectedServices', selectedServices);
    nextStep('location_input');
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => nextStep('welcome')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            What kind of service are you looking for?
          </h2>
          <p className="text-muted-foreground">Select all that apply</p>
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
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-primary text-white' : 'bg-muted'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg">{service.label}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{service.description}</p>
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
