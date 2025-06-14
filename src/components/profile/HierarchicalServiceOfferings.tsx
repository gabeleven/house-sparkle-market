
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, Settings, ChevronDown, ChevronRight } from 'lucide-react';
import { 
  ServiceType, 
  ServiceCategory,
  serviceCategoryLabels,
  serviceCategoryIcons,
  servicesByCategory,
  serviceTypeLabels,
  serviceTypeIcons
} from '@/utils/serviceTypes';

interface HierarchicalServiceOfferingsProps {
  services: ServiceType[];
  isProvider: boolean;
  onManageServices?: () => void;
}

export const HierarchicalServiceOfferings: React.FC<HierarchicalServiceOfferingsProps> = ({
  services,
  isProvider,
  onManageServices
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<ServiceCategory>>(new Set());

  const toggleCategory = (category: ServiceCategory) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const getCategoryServices = (category: ServiceCategory) => {
    const categoryServices = servicesByCategory[category];
    return categoryServices.filter(service => services.includes(service));
  };

  const getCategoriesWithServices = () => {
    return Object.keys(servicesByCategory).filter(category => 
      getCategoryServices(category as ServiceCategory).length > 0
    ) as ServiceCategory[];
  };

  const categoriesWithServices = getCategoriesWithServices();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Services Offered
          </CardTitle>
          {isProvider && (
            <Button variant="outline" size="sm" onClick={onManageServices}>
              <Plus className="w-4 h-4 mr-2" />
              Manage Services
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {categoriesWithServices.length > 0 ? (
          <div className="space-y-3">
            {categoriesWithServices.map((category) => {
              const CategoryIcon = serviceCategoryIcons[category];
              const categoryServices = getCategoryServices(category);
              const isExpanded = expandedCategories.has(category);
              
              return (
                <div key={category} className="border rounded-lg">
                  <Collapsible
                    open={isExpanded}
                    onOpenChange={() => toggleCategory(category)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between p-3 h-auto hover:bg-muted/50"
                      >
                        <div className="flex items-center space-x-3">
                          <CategoryIcon className="w-4 h-4 text-primary" />
                          <span className="font-medium">
                            {serviceCategoryLabels[category]}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {categoryServices.length}
                          </Badge>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="px-3 pb-3">
                      <div className="flex flex-wrap gap-2 pt-2 border-t">
                        {categoryServices.map((service) => {
                          const ServiceIcon = serviceTypeIcons[service];
                          const label = serviceTypeLabels[service];
                          
                          return (
                            <Badge key={service} variant="outline" className="flex items-center gap-1">
                              <ServiceIcon className="w-3 h-3" />
                              {label}
                            </Badge>
                          );
                        })}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            {isProvider ? (
              <>
                <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No services configured yet</p>
                <p className="text-sm">Add your services to attract customers</p>
              </>
            ) : (
              <>
                <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Service preferences</p>
                <p className="text-sm">Set your preferred service types for better recommendations</p>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
