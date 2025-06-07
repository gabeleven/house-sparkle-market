
import React from 'react';

interface ResultsHeaderProps {
  count: number;
}

export const ResultsHeader: React.FC<ResultsHeaderProps> = ({ count }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          {count} cleaner{count !== 1 ? 's' : ''} found across Quebec
        </h2>
      </div>
    </div>
  );
};
