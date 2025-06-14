
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';
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
  const [localSelectedServices, setLocalSelectedServices] = useState<ServiceType[]>(selectedServices);
  const [expandedCategories, setExpandedCategories] = useState<Set<ServiceCategory>>(new Set());

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
    return categoryServices.filter(service => localSelectedServices.includes(service)).length;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Service Categories</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          disabled={localSelectedServices.length === 0}
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-2">
        {Object.entries(servicesByCategory).map(([category, services]) => {
          const CategoryIcon = serviceCategoryIcons[category as ServiceCategory];
          const isExpanded = expandedCategories.has(category as ServiceCategory);
          const selectedCount = getCategoryServiceCount(category as ServiceCategory);
          
          return (
            <div key={category} className="border rounded-lg">
              <Collapsible
                open={isExpanded}
                onOpenChange={() => toggleCategory(category as ServiceCategory)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-4 h-auto hover:bg-muted/50"
                  >
                    <div className="flex items-center space-x-3">
                      <CategoryIcon className="w-5 h-5 text-primary" />
                      <span className="font-medium text-left">
                        {serviceCategoryLabels[category as ServiceCategory]}
                      </span>
                      {selectedCount > 0 && (
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          {selectedCount}
                        </span>
                      )}
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="px-4 pb-4">
                  <div className="grid grid-cols-1 gap-3 pt-2 border-t">
                    {services.map((serviceType) => {
                      const ServiceIcon = serviceTypeIcons[serviceType];
                      const isChecked = localSelectedServices.includes(serviceType);
                      
                      return (
                        <div key={serviceType} className="flex items-center space-x-3">
                          <Checkbox
                            id={serviceType}
                            checked={isChecked}
                            onCheckedChange={() => handleServiceToggle(serviceType)}
                          />
                          <Label
                            htmlFor={serviceType}
                            className="flex items-center space-x-2 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            <ServiceIcon className="w-4 h-4 text-muted-foreground" />
                            <span>{serviceTypeLabels[serviceType]}</span>
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
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
