
import React from 'react';

interface ResultsHeaderProps {
  totalResults: number;
  searchTerm: string;
  locationFilter: string;
  serviceFilters: any[];
  userLocation: any;
}

export const ResultsHeader: React.FC<ResultsHeaderProps> = ({ 
  totalResults,
  searchTerm,
  locationFilter,
  serviceFilters,
  userLocation 
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          {totalResults} service provider{totalResults !== 1 ? 's' : ''} found across Canada
        </h2>
        {searchTerm && (
          <span className="text-sm text-muted-foreground">
            Results for "{searchTerm}"
          </span>
        )}
      </div>
      
      {locationFilter && (
        <div className="mt-2">
          <span className="text-sm text-muted-foreground">
            in {locationFilter}
          </span>
        </div>
      )}
      
      {serviceFilters.length > 0 && (
        <div className="mt-2">
          <span className="text-sm text-muted-foreground">
            Filtered by {serviceFilters.length} service{serviceFilters.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </div>
  );
};
