
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Settings } from 'lucide-react';
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
  const getServiceIcon = (serviceCategoryName: string) => {
    if (!serviceCategoryName) return Settings;
    
    // Convert service category name to match our service type keys
    const serviceNameLower = serviceCategoryName.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z_]/g, '');
    
    // Direct mapping for exact matches
    if (serviceTypeIcons[serviceNameLower as ServiceType]) {
      return serviceTypeIcons[serviceNameLower as ServiceType];
    }

    // Map common service category names to our service types
    const serviceMapping: Record<string, ServiceType> = {
      'cleaning': 'residential_cleaning',
      'house_cleaning': 'residential_cleaning',
      'home_cleaning': 'residential_cleaning',
      'office_cleaning': 'commercial_cleaning',
      'apartment_cleaning': 'residential_cleaning',
      'move_out_cleaning': 'end_of_lease_cleaning',
      'move_in_cleaning': 'end_of_lease_cleaning',
      'vacation_rental_cleaning': 'chalet_airbnb_cleaning',
      'airbnb_cleaning': 'chalet_airbnb_cleaning',
      'windows': 'window_washing',
      'window_cleaning': 'window_washing',
      'pressing': 'ironing',
      'clothes_ironing': 'ironing',
      'maintenance_cleaning': 'light_housekeeping',
      'regular_cleaning': 'light_housekeeping',
      'spring_cleaning': 'deep_cleaning',
      'post_construction_cleaning': 'deep_cleaning'
    };

    // First try direct mapping
    const mappedServiceType = serviceMapping[serviceNameLower];
    if (mappedServiceType && serviceTypeIcons[mappedServiceType]) {
      return serviceTypeIcons[mappedServiceType];
    }

    // Try partial matching for complex service names
    for (const [key, serviceType] of Object.entries(serviceMapping)) {
      if (serviceNameLower.includes(key) || key.includes(serviceNameLower)) {
        if (serviceTypeIcons[serviceType]) {
          return serviceTypeIcons[serviceType];
        }
      }
    }
    
    return Settings;
  };

  const getServiceLabel = (serviceCategoryName: string) => {
    if (!serviceCategoryName) return 'Service';
    
    const serviceNameLower = serviceCategoryName.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z_]/g, '');
    
    // Direct mapping for exact matches
    if (serviceTypeLabels[serviceNameLower as ServiceType]) {
      return serviceTypeLabels[serviceNameLower as ServiceType];
    }

    // Map service category names to proper labels
    const labelMapping: Record<string, string> = {
      'cleaning': 'General Cleaning',
      'house_cleaning': 'House Cleaning',
      'home_cleaning': 'Home Cleaning',
      'office_cleaning': 'Office Cleaning',
      'apartment_cleaning': 'Apartment Cleaning',
      'move_out_cleaning': 'Move-out Cleaning',
      'move_in_cleaning': 'Move-in Cleaning',
      'vacation_rental_cleaning': 'Vacation Rental Cleaning',
      'airbnb_cleaning': 'Airbnb Cleaning',
      'windows': 'Window Cleaning',
      'window_cleaning': 'Window Cleaning',
      'pressing': 'Ironing & Pressing',
      'clothes_ironing': 'Clothes Ironing',
      'maintenance_cleaning': 'Maintenance Cleaning',
      'regular_cleaning': 'Regular Cleaning',
      'spring_cleaning': 'Spring Cleaning',
      'post_construction_cleaning': 'Post-Construction Cleaning'
    };

    // First try direct mapping
    const mappedLabel = labelMapping[serviceNameLower];
    if (mappedLabel) {
      return mappedLabel;
    }

    // Try partial matching
    for (const [key, label] of Object.entries(labelMapping)) {
      if (serviceNameLower.includes(key) || key.includes(serviceNameLower)) {
        return label;
      }
    }

    // Fallback to formatted original name
    return serviceCategoryName.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
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
            // Handle both possible field names from the database
            const categoryName = service.service_categories?.name || service.service_category?.name || '';
            const IconComponent = getServiceIcon(categoryName);
            const serviceLabel = getServiceLabel(categoryName);
            
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
          })}
        </div>
      </CardContent>
    </Card>
  );
};
