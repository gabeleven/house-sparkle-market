
import React from 'react';
import { ProviderProfile } from '@/types/providers';
import { ProviderCardWithSubscription } from './CleanerCardWithSubscription';
import { LoadingSkeleton } from './LoadingSkeleton';
import { ErrorMessage } from './ErrorMessage';
import { NoResultsMessage } from './NoResultsMessage';
import { SubscriptionTier } from '@/types/subscription';

interface ResultsContentProps {
  cleaners: ProviderProfile[] | undefined;
  isLoading: boolean;
  error: Error | null;
  hasLocation: boolean;
  onRequestLocation: () => void;
  userSubscription?: SubscriptionTier;
}

export const ResultsContent: React.FC<ResultsContentProps> = ({
  cleaners,
  isLoading,
  error,
  hasLocation,
  onRequestLocation,
  userSubscription = 'FREE',
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
      {cleaners.map((provider) => (
        <ProviderCardWithSubscription 
          key={provider.id} 
          provider={provider} 
          userSubscription={userSubscription}
        />
      ))}
    </div>
  );
};
