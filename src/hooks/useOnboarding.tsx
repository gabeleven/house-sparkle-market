
import { useState, useEffect } from 'react';

export type UserIntent = 'find_help' | 'offer_services' | null;
export type OnboardingStep = 
  | 'welcome'
  | 'service_selection'
  | 'location_input'
  | 'timing_input'
  | 'search_results'
  | 'account_creation'
  | 'service_offerings'
  | 'pricing_input'
  | 'service_location'
  | 'pro_preview';

export const useOnboarding = () => {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [userIntent, setUserIntent] = useState<UserIntent>(null);
  const [onboardingData, setOnboardingData] = useState<Record<string, any>>({});

  useEffect(() => {
    // Check if user has seen onboarding before
    const hasSeenOnboarding = localStorage.getItem('housie_onboarding_completed');
    if (!hasSeenOnboarding) {
      // Delay to let the page load
      setTimeout(() => {
        setIsOnboardingOpen(true);
      }, 1000);
    }
  }, []);

  const updateOnboardingData = (key: string, value: any) => {
    setOnboardingData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = (step: OnboardingStep) => {
    setCurrentStep(step);
  };

  const completeOnboarding = () => {
    localStorage.setItem('housie_onboarding_completed', 'true');
    setIsOnboardingOpen(false);
    setCurrentStep('welcome');
    setUserIntent(null);
    setOnboardingData({});
  };

  const skipOnboarding = () => {
    completeOnboarding();
  };

  return {
    isOnboardingOpen,
    currentStep,
    userIntent,
    onboardingData,
    setUserIntent,
    updateOnboardingData,
    nextStep,
    completeOnboarding,
    skipOnboarding,
  };
};
