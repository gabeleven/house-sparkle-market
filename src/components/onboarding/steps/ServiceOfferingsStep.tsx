
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Home, Building, Droplets, TreePine, Hammer, Heart, Users } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';

const serviceCategories = [
  { id: 'cleaning', label: 'Cleaning Services', icon: Home, services: ['House Cleaning', 'Deep Cleaning', 'Move-in/out Cleaning'] },
  { id: 'commercial', label: 'Commercial Cleaning', icon: Building, services: ['Office Cleaning', 'Commercial Spaces', 'Post-construction'] },
  { id: 'maintenance', label: 'Home Maintenance', icon: Hammer, services: ['Handyman Services', 'Home Repairs', 'Renovations'] },
  { id: 'landscaping', label: 'Landscaping', icon: TreePine, services: ['Lawn Care', 'Garden Maintenance', 'Snow Removal'] },
  { id: 'windows', label: 'Window Cleaning', icon: Droplets, services: ['Residential Windows', 'Commercial Windows'] },
  { id: 'wellness', label: 'Wellness Services', icon: Heart, services: ['Massage Therapy', 'Personal Training', 'Physiotherapy'] },
  { id: 'care', label: 'Care Services', icon: Users, services: ['Pet Sitting', 'Elder Care', 'Child Care'] }
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
    updateOnboardingData('serviceOfferings', selectedServices);
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
        {serviceCategories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedServices.includes(category.id);
          
          return (
            <Card 
              key={category.id}
              className={`cursor-pointer transition-all ${
                isSelected 
                  ? 'border-primary bg-primary/5' 
                  : 'hover:shadow-md hover:border-primary/50'
              }`}
              onClick={() => toggleService(category.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-primary text-white' : 'bg-muted'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg">{category.label}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {category.services.map((service, index) => (
                    <p key={index} className="text-xs text-muted-foreground">
                      • {service}
                    </p>
                  ))}
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
