
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { serviceTypeIcons, serviceTypeLabels, ServiceType } from '@/utils/serviceTypes';

interface Service {
  service_categories?: {
    name: string;
  };
  service_category?: {
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
  const getServiceTypeFromCategoryName = (serviceCategoryName: string): ServiceType | null => {
    if (!serviceCategoryName) return null;
    
    // Direct mapping for exact matches
    if (serviceTypeLabels[serviceCategoryName as ServiceType]) {
      return serviceCategoryName as ServiceType;
    }

    // Convert service category name for mapping
    const serviceNameLower = serviceCategoryName.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z_]/g, '');
    
    // Map common service category names to our service types
    const serviceMapping: Record<string, ServiceType> = {
      'general_cleaning': 'residential_cleaning',
      'cleaning': 'residential_cleaning',
      'house_cleaning': 'residential_cleaning',
      'home_cleaning': 'residential_cleaning',
      'office_cleaning': 'commercial_cleaning',
      'apartment_cleaning': 'residential_cleaning',
      'move_out_cleaning': 'end_of_lease_cleaning',
      'move_in_cleaning': 'end_of_lease_cleaning',
      'vacation_rental_cleaning': 'chalet_airbnb_cleaning',
      'airbnb_cleaning': 'chalet_airbnb_cleaning',
      'chalet_airbnb_cleaning': 'chalet_airbnb_cleaning',
      'windows': 'window_washing',
      'window_cleaning': 'window_washing',
      'window_washing': 'window_washing',
      'pressing': 'ironing',
      'clothes_ironing': 'ironing',
      'ironing': 'ironing',
      'maintenance_cleaning': 'light_housekeeping',
      'light_housekeeping': 'light_housekeeping',
      'regular_cleaning': 'light_housekeeping',
      'spring_cleaning': 'deep_cleaning',
      'deep_cleaning': 'deep_cleaning',
      'post_construction_cleaning': 'deep_cleaning',
      'massage_therapy': 'massage_therapy',
      'massage': 'massage_therapy'
    };

    // First try direct mapping
    const mappedServiceType = serviceMapping[serviceNameLower];
    if (mappedServiceType) {
      return mappedServiceType;
    }

    // Try partial matching for complex service names
    for (const [key, serviceType] of Object.entries(serviceMapping)) {
      if (serviceNameLower.includes(key) || key.includes(serviceNameLower)) {
        return serviceType;
      }
    }
    
    return null;
  };

  if (!services || services.length === 0) {
    return null;
  }

  console.log('ServicesOfferedCard: Services received:', services);

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Services Offered</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) => {
            // Handle both possible field names from the database
            const categoryName = service.service_categories?.name || service.service_category?.name || '';
            const serviceType = getServiceTypeFromCategoryName(categoryName);
            
            console.log('ServicesOfferedCard: Processing service:', {
              categoryName,
              serviceType,
              originalService: service
            });
            
            if (!serviceType) {
              console.warn('ServicesOfferedCard: Could not map service category:', categoryName);
              return null;
            }

            const IconComponent = serviceTypeIcons[serviceType];
            const serviceLabel = serviceTypeLabels[serviceType];
            
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
                    {serviceLabel}
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
          }).filter(Boolean)}
        </div>
      </CardContent>
    </Card>
  );
};
