
import React from 'react';
import { HierarchicalServiceOfferings } from './HierarchicalServiceOfferings';
import { ServiceType } from '@/utils/serviceTypes';

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
    <HierarchicalServiceOfferings
      services={services}
      isProvider={isProvider}
      onManageServices={onManageServices}
    />
  );
};
