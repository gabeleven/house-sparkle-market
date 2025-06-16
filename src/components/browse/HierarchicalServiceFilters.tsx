
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { 
  ServiceType, 
  ServiceCategory,
  serviceCategoryLabels,
  serviceCategoryIcons,
  servicesByCategory,
  serviceTypeLabels,
  serviceTypeIcons
} from '@/utils/serviceTypes';

interface HierarchicalServiceFiltersProps {
  selectedServices: ServiceType[];
  onServiceChange: (services: ServiceType[]) => void;
}

export const HierarchicalServiceFilters: React.FC<HierarchicalServiceFiltersProps> = ({
  selectedServices,
  onServiceChange,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<ServiceCategory>>(new Set());

  const handleServiceToggle = (serviceType: ServiceType) => {
    const updated = selectedServices.includes(serviceType)
      ? selectedServices.filter(s => s !== serviceType)
      : [...selectedServices, serviceType];
    onServiceChange(updated);
  };

  const toggleCategory = (category: ServiceCategory) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const getCategoryServiceCount = (category: ServiceCategory) => {
    const categoryServices = servicesByCategory[category];
    return categoryServices.filter(service => selectedServices.includes(service)).length;
  };

  const handleClearAll = () => {
    onServiceChange([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Select service categories to filter providers</span>
          {selectedServices.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="text-xs h-6 px-2"
            >
              Clear All ({selectedServices.length})
            </Button>
          )}
        </div>
      </div>

      {/* App Icon Style Categories */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(servicesByCategory).map(([category, services]) => {
          const CategoryIcon = serviceCategoryIcons[category as ServiceCategory];
          const isExpanded = expandedCategories.has(category as ServiceCategory);
          const selectedCount = getCategoryServiceCount(category as ServiceCategory);
          
          return (
            <div key={category} className="relative">
              {/* App Icon Category Button */}
              <Button
                variant="outline"
                onClick={() => toggleCategory(category as ServiceCategory)}
                className={`w-full h-20 flex flex-col items-center justify-center space-y-2 relative border-2 transition-all duration-200 ${
                  selectedCount > 0 
                    ? 'border-primary bg-primary/5 text-primary shadow-md' 
                    : 'border-border hover:border-primary/50 hover:bg-accent/50'
                }`}
              >
                <CategoryIcon className={`w-6 h-6 ${selectedCount > 0 ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className="text-xs font-medium text-center leading-tight">
                  {serviceCategoryLabels[category as ServiceCategory]}
                </span>
                {selectedCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                    {selectedCount}
                  </span>
                )}
                <ChevronDown className={`w-3 h-3 absolute bottom-1 right-1 transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`} />
              </Button>
              
              {/* Dropdown Service Types */}
              {isExpanded && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-lg z-50 p-3 min-w-[200px]">
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-muted-foreground border-b pb-1 mb-2">
                      {serviceCategoryLabels[category as ServiceCategory]} Services
                    </div>
                    {services.map((serviceType) => {
                      const ServiceIcon = serviceTypeIcons[serviceType];
                      const isChecked = selectedServices.includes(serviceType);
                      
                      return (
                        <div key={serviceType} className="flex items-center space-x-2">
                          <Checkbox
                            id={serviceType}
                            checked={isChecked}
                            onCheckedChange={() => handleServiceToggle(serviceType)}
                            className="h-4 w-4"
                          />
                          <Label
                            htmlFor={serviceType}
                            className="flex items-center space-x-2 cursor-pointer text-xs font-medium leading-none flex-1"
                          >
                            <ServiceIcon className="w-3 h-3 text-muted-foreground" />
                            <span>{serviceTypeLabels[serviceType]}</span>
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
