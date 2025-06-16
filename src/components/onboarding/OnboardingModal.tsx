
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

  if (!isOnboardingOpen) {
    console.log('OnboardingModal: not showing because isOnboardingOpen is false');
    return null;
  }

  console.log('OnboardingModal: rendering modal');

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        zIndex: 999999,
        pointerEvents: 'auto'
      }}
    >
      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '672px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          zIndex: 999999,
          pointerEvents: 'auto'
        }}
      >
        {renderStep()}
      </div>
    </div>
  );
};
