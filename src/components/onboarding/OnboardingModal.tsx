
import React from 'react';
import { useOnboarding } from '@/hooks/useOnboarding';
import { WelcomeStep } from './steps/WelcomeStep';
import { ServiceSelectionStep } from './steps/ServiceSelectionStep';
import { LocationInputStep } from './steps/LocationInputStep';
import { TimingInputStep } from './steps/TimingInputStep';
import { SearchResultsStep } from './steps/SearchResultsStep';
import { AccountCreationStep } from './steps/AccountCreationStep';
import { ServiceOfferingsStep } from './steps/ServiceOfferingsStep';
import { PricingInputStep } from './steps/PricingInputStep';
import { ServiceLocationStep } from './steps/ServiceLocationStep';
import { ProPreviewStep } from './steps/ProPreviewStep';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, currentStep } = useOnboarding();

  console.log('OnboardingModal render:', { isOnboardingOpen, currentStep });

  const renderStep = () => {
    console.log('Rendering step:', currentStep);
    switch (currentStep) {
      case 'welcome':
        return <WelcomeStep />;
      case 'service_selection':
        return <ServiceSelectionStep />;
      case 'location_input':
        return <LocationInputStep />;
      case 'timing_input':
        return <TimingInputStep />;
      case 'search_results':
        return <SearchResultsStep />;
      case 'account_creation':
        return <AccountCreationStep />;
      case 'service_offerings':
        return <ServiceOfferingsStep />;
      case 'pricing_input':
        return <PricingInputStep />;
      case 'service_location':
        return <ServiceLocationStep />;
      case 'pro_preview':
        return <ProPreviewStep />;
      default:
        return <WelcomeStep />;
    }
  };

  // Prevent scroll when modal is open
  React.useEffect(() => {
    if (isOnboardingOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOnboardingOpen]);

  if (!isOnboardingOpen) {
    console.log('OnboardingModal: not showing because isOnboardingOpen is false');
    return null;
  }

  console.log('OnboardingModal: rendering modal');

  // Fixed modal with proper z-index and pointer events
  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ 
        background: 'rgba(0, 0, 0, 0.8)',
        pointerEvents: 'auto'
      }}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-2xl"
        style={{ 
          pointerEvents: 'auto',
          zIndex: 10000
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {renderStep()}
      </div>
    </div>
  );
};
