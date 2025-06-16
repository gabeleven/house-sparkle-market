
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

  // Add debugging button for testing
  React.useEffect(() => {
    const addTestButton = () => {
      const existingButton = document.getElementById('test-onboarding-button');
      if (!existingButton) {
        const button = document.createElement('button');
        button.id = 'test-onboarding-button';
        button.textContent = 'Test Onboarding';
        button.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 99999;
          background: red;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        `;
        button.onclick = () => {
          console.log('Test button clicked - resetting onboarding');
          localStorage.removeItem('housie_onboarding_completed');
          window.location.reload();
        };
        document.body.appendChild(button);
      }
    };
    addTestButton();
  }, []);

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
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        pointerEvents: 'auto'
      }}
      onClick={(e) => {
        console.log('Modal backdrop clicked');
        e.stopPropagation();
      }}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          maxWidth: '640px',
          width: '100%',
          margin: '16px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          zIndex: 10000,
          pointerEvents: 'auto'
        }}
        onClick={(e) => {
          console.log('Modal content clicked');
          e.stopPropagation();
        }}
      >
        {renderStep()}
      </div>
    </div>
  );
};
