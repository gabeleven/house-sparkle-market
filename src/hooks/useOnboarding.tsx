
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
      // Show immediately for testing, or delay for production
      const delay = window.location.hostname === 'localhost' ? 500 : 1000;
      console.log('Setting onboarding to show in', delay, 'ms');
      
      setTimeout(() => {
        console.log('Opening onboarding modal');
        setIsOnboardingOpen(true);
      }, delay);
    } else {
      console.log('User has already completed onboarding');
    }
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

  // Debug function to reset onboarding (for testing)
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
    resetOnboarding, // Added for testing
  };
};
