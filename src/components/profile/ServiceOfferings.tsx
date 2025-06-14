
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Settings } from 'lucide-react';
import { ServiceType, serviceTypeLabels, serviceTypeIcons } from '@/utils/serviceTypes';

interface ServiceOfferingsProps {
  services: ServiceType[];
  isProvider: boolean;
  onManageServices?: () => void;
}

export const ServiceOfferings: React.FC<ServiceOfferingsProps> = ({
  services,
  isProvider,
  onManageServices
}) => {
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
        {services.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {services.map((service) => {
              const IconComponent = serviceTypeIcons[service];
              const label = serviceTypeLabels[service];
              
              return (
                <Badge key={service} variant="secondary" className="flex items-center gap-1">
                  <IconComponent className="w-3 h-3" />
                  {label}
                </Badge>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            {isProvider ? (
              <>
                <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No services configured yet</p>
                <p className="text-sm">Add your cleaning services to attract customers</p>
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
