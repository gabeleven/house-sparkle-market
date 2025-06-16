
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

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
  const { user } = useAuth();
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [userIntent, setUserIntent] = useState<UserIntent>(null);
  const [onboardingData, setOnboardingData] = useState<Record<string, any>>({});

  useEffect(() => {
    console.log('useOnboarding: initializing', { user });
    
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('housie_onboarding_completed');
    
    // Check for force parameter
    const urlParams = new URLSearchParams(window.location.search);
    const forceOnboarding = urlParams.get('forceOnboarding');
    
    // Show onboarding for new visitors or when forced
    const shouldShowOnboarding = forceOnboarding === 'true' || (!user && !hasCompletedOnboarding);
    
    console.log('Onboarding decision:', {
      forceOnboarding,
      hasUser: !!user,
      hasCompletedOnboarding: !!hasCompletedOnboarding,
      shouldShowOnboarding
    });
    
    if (shouldShowOnboarding) {
      console.log('Opening onboarding modal');
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        setIsOnboardingOpen(true);
        setCurrentStep('welcome');
      }, 100);
    }

    // Global testing functions
    (window as any).resetOnboarding = () => {
      console.log('Resetting onboarding via global function');
      localStorage.removeItem('housie_onboarding_completed');
      setIsOnboardingOpen(true);
      setCurrentStep('welcome');
      setUserIntent(null);
      setOnboardingData({});
    };

    (window as any).showOnboarding = () => {
      console.log('Showing onboarding via global function');
      setIsOnboardingOpen(true);
      setCurrentStep('welcome');
    };
  }, [user]);

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
    
    // Redirect to profile page after completion
    setTimeout(() => {
      window.location.href = '/my-profile';
    }, 1000);
  };

  const skipOnboarding = () => {
    console.log('Skipping onboarding');
    localStorage.setItem('housie_onboarding_completed', 'true');
    setIsOnboardingOpen(false);
    setCurrentStep('welcome');
    setUserIntent(null);
    setOnboardingData({});
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
