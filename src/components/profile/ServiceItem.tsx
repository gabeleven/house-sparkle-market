
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ServiceType, serviceTypeLabels, serviceTypeIcons } from '@/utils/serviceTypes';

interface ServiceItemProps {
  serviceType: ServiceType;
  category: string;
  isSelected: boolean;
  onServiceChange: (serviceType: ServiceType, checked: boolean) => void;
}

export const ServiceItem: React.FC<ServiceItemProps> = ({
  serviceType,
  category,
  isSelected,
  onServiceChange
}) => {
  const ServiceIcon = serviceTypeIcons[serviceType];

  return (
    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/30 transition-colors">
      <Checkbox
        id={`${category}-${serviceType}`}
        checked={isSelected}
        onCheckedChange={(checked) => onServiceChange(serviceType, checked as boolean)}
      />
      <Label 
        htmlFor={`${category}-${serviceType}`}
        className="flex items-center space-x-2 cursor-pointer flex-1"
        onClick={() => onServiceChange(serviceType, !isSelected)}
      >
        <ServiceIcon className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm">{serviceTypeLabels[serviceType]}</span>
      </Label>
    </div>
  );
};
