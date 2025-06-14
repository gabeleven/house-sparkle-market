
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ServiceType, serviceTypeLabels, serviceTypeIcons } from '@/utils/serviceTypes';
import { Button } from '@/components/ui/button';

interface ServiceFiltersProps {
  selectedServices: ServiceType[];
  onServiceChange: (services: ServiceType[]) => void;
}

export const ServiceFilters: React.FC<ServiceFiltersProps> = ({
  selectedServices,
  onServiceChange,
}) => {
  const [localSelectedServices, setLocalSelectedServices] = useState<ServiceType[]>(selectedServices);

  const handleServiceToggle = (serviceType: ServiceType) => {
    const updated = localSelectedServices.includes(serviceType)
      ? localSelectedServices.filter(s => s !== serviceType)
      : [...localSelectedServices, serviceType];
    setLocalSelectedServices(updated);
  };

  const handleApplyFilters = () => {
    onServiceChange(localSelectedServices);
  };

  const handleClearFilters = () => {
    setLocalSelectedServices([]);
    onServiceChange([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Service Types</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          disabled={localSelectedServices.length === 0}
        >
          Clear All
        </Button>
      </div>
      
      <div className="space-y-3">
        {Object.entries(serviceTypeLabels).map(([serviceType, label]) => {
          const IconComponent = serviceTypeIcons[serviceType as ServiceType];
          const isChecked = localSelectedServices.includes(serviceType as ServiceType);
          
          return (
            <div key={serviceType} className="flex items-center space-x-3">
              <Checkbox
                id={serviceType}
                checked={isChecked}
                onCheckedChange={() => handleServiceToggle(serviceType as ServiceType)}
              />
              <Label
                htmlFor={serviceType}
                className="flex items-center space-x-2 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <IconComponent className="w-4 h-4" />
                <span>{label}</span>
              </Label>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t">
        <Button onClick={handleApplyFilters} className="w-full">
          Apply Filters ({localSelectedServices.length})
        </Button>
      </div>
    </div>
  );
};
