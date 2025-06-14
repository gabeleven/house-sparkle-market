
import React from 'react';
import { HierarchicalServiceTypesSelector } from './HierarchicalServiceTypesSelector';

interface ServiceTypesSelectorProps {
  cleanerId: string;
}

export const ServiceTypesSelector = ({ cleanerId }: ServiceTypesSelectorProps) => {
  return <HierarchicalServiceTypesSelector cleanerId={cleanerId} />;
};
