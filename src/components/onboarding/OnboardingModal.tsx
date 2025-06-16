
import React from 'react';
import { useOnboarding } from '@/hooks/useOnboarding';
import { WelcomeStep } from './steps/WelcomeStep';
import { ServiceSelectionStep } from './steps/ServiceSelectionStep';
import { AccountCreationStep } from './steps/AccountCreationStep';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, currentStep } = useOnboarding();

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeStep />;
      case 'service_selection':
        return <ServiceSelectionStep />;
      case 'account_creation':
        return <AccountCreationStep />;
      default:
        return <WelcomeStep />;
    }
  };

  if (!isOnboardingOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {renderStep()}
      </div>
    </div>
  );
};
