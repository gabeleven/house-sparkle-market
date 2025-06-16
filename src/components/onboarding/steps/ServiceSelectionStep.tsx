
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';

export const ServiceSelectionStep: React.FC = () => {
  const { nextStep, updateOnboardingData } = useOnboarding();

  const handleServiceSelect = (service: string) => {
    updateOnboardingData('selectedService', service);
    nextStep('account_creation');
  };

  const services = [
    { id: 'cleaning', name: 'House Cleaning', icon: '🏠' },
    { id: 'gardening', name: 'Gardening', icon: '🌱' },
    { id: 'repairs', name: 'Home Repairs', icon: '🔧' },
    { id: 'other', name: 'Other Services', icon: '⚡' }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => nextStep('welcome')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-2xl font-bold">What service do you need?</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {services.map((service) => (
          <Button
            key={service.id}
            onClick={() => handleServiceSelect(service.id)}
            className="h-20 flex flex-col items-center space-y-2"
            variant="outline"
          >
            <span className="text-2xl">{service.icon}</span>
            <span className="text-sm">{service.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
