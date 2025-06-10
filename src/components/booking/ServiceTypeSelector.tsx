
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ServicePricing } from '@/hooks/useServicePricing';

interface ServiceTypeSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  servicePricing: ServicePricing[];
}

const serviceTypeLabels = {
  deep_clean: 'Deep Clean',
  regular_clean: 'Regular Clean',
  move_in_out: 'Move-in/Move-out Clean',
  post_construction: 'Post-construction Cleanup',
  office_cleaning: 'Office Cleaning'
};

export const ServiceTypeSelector: React.FC<ServiceTypeSelectorProps> = ({
  value,
  onValueChange,
  servicePricing
}) => {
  const selectedServicePricing = servicePricing.find(sp => sp.service_type === value);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select a type of service *</label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Choose service type" />
        </SelectTrigger>
        <SelectContent>
          {servicePricing.map((pricing) => (
            <SelectItem key={pricing.service_type} value={pricing.service_type}>
              <div className="flex justify-between w-full">
                <span>{serviceTypeLabels[pricing.service_type as keyof typeof serviceTypeLabels]}</span>
                <span className="ml-4 text-muted-foreground">${pricing.base_price}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedServicePricing && (
        <p className="text-xs text-muted-foreground">
          {selectedServicePricing.description} • {selectedServicePricing.duration_minutes} mins
        </p>
      )}
    </div>
  );
};
