
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
    console.log('Onboarding check:', { hasSeenOnboarding });
    
    if (!hasSeenOnboarding) {
      console.log('Opening onboarding modal for new user');
      setIsOnboardingOpen(true);
    } else {
      console.log('User has already completed onboarding');
    }

    // Add global reset function for testing
    (window as any).resetOnboarding = () => {
      console.log('Resetting onboarding via global function');
      localStorage.removeItem('housie_onboarding_completed');
      setIsOnboardingOpen(true);
      setCurrentStep('welcome');
      setUserIntent(null);
      setOnboardingData({});
    };

    // Also add to window for easy access
    (window as any).showOnboarding = () => {
      console.log('Showing onboarding via global function');
      setIsOnboardingOpen(true);
      setCurrentStep('welcome');
    };
  }, []);

  const updateOnboardingData = (key: string, value: any) => {
    console.log('Updating onboarding data:', key, value);
    setOnboardingData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = (step: OnboardingStep) => {
    console.log('Moving to next step:', step);
    setCurrentStep(step);
  };

  const completeOnboarding = () => {
    console.log('Completing onboarding');
    localStorage.setItem('housie_onboarding_completed', 'true');
    setIsOnboardingOpen(false);
    setCurrentStep('welcome');
    setUserIntent(null);
    setOnboardingData({});
  };

  const skipOnboarding = () => {
    console.log('Skipping onboarding');
    completeOnboarding();
  };

  const resetOnboarding = () => {
    console.log('Resetting onboarding for testing');
    localStorage.removeItem('housie_onboarding_completed');
    setIsOnboardingOpen(true);
    setCurrentStep('welcome');
    setUserIntent(null);
    setOnboardingData({});
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
    resetOnboarding,
  };
};
