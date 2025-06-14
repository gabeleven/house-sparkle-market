
import React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import { ServiceItem } from './ServiceItem';
import { 
  ServiceCategory,
  ServiceType,
  serviceCategoryLabels,
  serviceCategoryIcons,
  servicesByCategory
} from '@/utils/serviceTypes';

interface ServiceCategoryMenuProps {
  category: ServiceCategory;
  selectedServices: ServiceType[];
  onServiceChange: (serviceType: ServiceType, checked: boolean) => void;
}

export const ServiceCategoryMenu: React.FC<ServiceCategoryMenuProps> = ({
  category,
  selectedServices,
  onServiceChange
}) => {
  const CategoryIcon = serviceCategoryIcons[category];
  const services = servicesByCategory[category];
  const selectedCount = services.filter(service => selectedServices.includes(service)).length;

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="h-auto px-4 py-3 bg-background hover:bg-accent/50 data-[state=open]:bg-accent/50">
        <div className="flex items-center space-x-2">
          <CategoryIcon className="w-4 h-4 text-primary" />
          <span className="font-medium">
            {serviceCategoryLabels[category]}
          </span>
          {selectedCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full ml-2">
              {selectedCount}
            </span>
          )}
          <ChevronDown className="w-4 h-4 ml-1" />
        </div>
      </NavigationMenuTrigger>
      
      <NavigationMenuContent className="min-w-[400px] p-4 bg-background border shadow-lg relative z-50">
        <div className="grid grid-cols-2 gap-4">
          {services.map((serviceType) => (
            <ServiceItem
              key={serviceType}
              serviceType={serviceType}
              category={category}
              isSelected={selectedServices.includes(serviceType)}
              onServiceChange={onServiceChange}
            />
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
