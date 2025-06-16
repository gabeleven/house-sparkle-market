
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
      document.body.style.pointerEvents = 'none';
      return () => {
        document.body.style.overflow = 'unset';
        document.body.style.pointerEvents = 'auto';
      };
    }
  }, [isOnboardingOpen]);

  if (!isOnboardingOpen) {
    console.log('OnboardingModal: not showing because isOnboardingOpen is false');
    return null;
  }

  console.log('OnboardingModal: rendering modal');

  // Handle backdrop mouse events
  const handleBackdropMouseEvent = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Backdrop mouse event blocked');
  };

  // Handle backdrop touch events  
  const handleBackdropTouchEvent = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Backdrop touch event blocked');
  };

  // Handle modal content mouse events
  const handleModalContentMouseEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Modal content mouse event');
  };

  // Handle modal content touch events
  const handleModalContentTouchEvent = (e: React.TouchEvent) => {
    e.stopPropagation();
    console.log('Modal content touch event');
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4"
      style={{
        zIndex: 999999,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'auto'
      }}
      onClick={handleBackdropMouseEvent}
      onMouseDown={handleBackdropMouseEvent}
      onTouchStart={handleBackdropTouchEvent}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-2xl"
        style={{
          zIndex: 1000000,
          pointerEvents: 'auto'
        }}
        onClick={handleModalContentMouseEvent}
        onMouseDown={handleModalContentMouseEvent}
        onTouchStart={handleModalContentTouchEvent}
      >
        {renderStep()}
      </div>
    </div>
  );
};
