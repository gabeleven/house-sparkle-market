
import React from 'react';
import { ServiceType } from '@/utils/serviceTypes';
import { Sparkles, Home, Building, Car, Shirt, Users } from 'lucide-react';

interface ServiceIconsProps {
  services: ServiceType[] | null;
  showIcons: boolean;
}

const getServiceIcon = (service: ServiceType) => {
  const iconMap = {
    'residential_cleaning': Home,
    'deep_cleaning': Sparkles,
    'commercial_cleaning': Building,
    'move_in_out_cleaning': Car,
    'laundry_service': Shirt,
    'organization_service': Users,
  };
  
  return iconMap[service] || Home;
};

const getServiceLabel = (service: ServiceType) => {
  const labelMap = {
    'residential_cleaning': 'Résidentiel',
    'deep_cleaning': 'Nettoyage en profondeur',
    'commercial_cleaning': 'Commercial',
    'move_in_out_cleaning': 'Déménagement',
    'laundry_service': 'Blanchisserie',
    'organization_service': 'Organisation',
  };
  
  return labelMap[service] || service;
};

export const ServiceIcons: React.FC<ServiceIconsProps> = ({ services, showIcons }) => {
  if (!showIcons || !services || services.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {services.map((service) => {
        const IconComponent = getServiceIcon(service);
        return (
          <div 
            key={service}
            className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs"
          >
            <IconComponent className="w-3 h-3" />
            <span>{getServiceLabel(service)}</span>
          </div>
        );
      })}
    </div>
  );
};
