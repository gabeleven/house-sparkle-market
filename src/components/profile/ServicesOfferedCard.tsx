
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Settings } from 'lucide-react';
import { serviceTypeIcons } from '@/utils/serviceTypes';

interface Service {
  service_categories?: {
    name: string;
  };
  description?: string;
  base_price?: number;
  price_unit?: string;
}

interface ServicesOfferedCardProps {
  services: Service[];
}

export const ServicesOfferedCard: React.FC<ServicesOfferedCardProps> = ({ services }) => {
  const getServiceIcon = (serviceCategoryName: string) => {
    const serviceNameLower = serviceCategoryName.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z_]/g, '');
    
    const matchingServiceType = Object.keys(serviceTypeIcons).find(key => 
      key.includes(serviceNameLower) || serviceNameLower.includes(key.replace(/_/g, ''))
    );
    
    if (matchingServiceType && serviceTypeIcons[matchingServiceType as keyof typeof serviceTypeIcons]) {
      return serviceTypeIcons[matchingServiceType as keyof typeof serviceTypeIcons];
    }
    
    return Settings;
  };

  if (!services || services.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Services Offered</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) => {
            const IconComponent = getServiceIcon(service.service_categories?.name || '');
            
            return (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <IconComponent className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {service.service_categories?.name || 'Service'}
                  </h4>
                  {service.description && (
                    <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                  )}
                  {service.base_price && (
                    <p className="text-sm text-green-600 font-medium">
                      From ${service.base_price}/{service.price_unit || 'hour'}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
