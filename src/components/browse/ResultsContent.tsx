
import React from 'react';
import { CleanerProfile } from '@/hooks/useCleaners';
import { CleanerCard } from '@/components/CleanerCard';
import { LoadingSkeleton } from './LoadingSkeleton';
import { ErrorMessage } from './ErrorMessage';
import { NoResultsMessage } from './NoResultsMessage';

interface ResultsContentProps {
  cleaners: CleanerProfile[] | undefined;
  isLoading: boolean;
  error: Error | null;
  hasLocation: boolean;
  onRequestLocation: () => void;
}

export const ResultsContent: React.FC<ResultsContentProps> = ({
  cleaners,
  isLoading,
  error,
  hasLocation,
  onRequestLocation,
}) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!cleaners || cleaners.length === 0) {
    return (
      <NoResultsMessage 
        hasLocation={hasLocation}
        onRequestLocation={onRequestLocation}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cleaners.map((cleaner) => (
        <CleanerCard key={cleaner.id} cleaner={cleaner} />
      ))}
    </div>
  );
};
