
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Home, MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBreadcrumbsProps {
  postalCode?: string;
  hasLocation?: boolean;
}

export const SearchBreadcrumbs: React.FC<SearchBreadcrumbsProps> = ({
  postalCode,
  hasLocation,
}) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate('/')}
              className="flex items-center cursor-pointer hover:text-primary"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center">
              <Search className="w-4 h-4 mr-1" />
              Find Cleaners
              {postalCode && (
                <>
                  <MapPin className="w-3 h-3 ml-2 mr-1" />
                  <span className="font-medium">{postalCode}</span>
                </>
              )}
              {hasLocation && (
                <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  Using your location
                </span>
              )}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
