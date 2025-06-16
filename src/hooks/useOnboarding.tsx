
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export type UserIntent = 'find_help' | 'offer_services' | null;
export type OnboardingStep = 'welcome' | 'service_selection' | 'account_creation';

export const useOnboarding = () => {
  const { user } = useAuth();
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [userIntent, setUserIntent] = useState<UserIntent>(null);
  const [onboardingData, setOnboardingData] = useState<Record<string, any>>({});

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('housie_onboarding_completed');
    const urlParams = new URLSearchParams(window.location.search);
    const forceOnboarding = urlParams.get('forceOnboarding');
    
    const shouldShowOnboarding = forceOnboarding === 'true' || (!user && !hasCompletedOnboarding);
    
    if (shouldShowOnboarding) {
      setTimeout(() => {
        setIsOnboardingOpen(true);
        setCurrentStep('welcome');
      }, 100);
    }

    // Global testing functions
    (window as any).resetOnboarding = () => {
      localStorage.removeItem('housie_onboarding_completed');
      setIsOnboardingOpen(true);
      setCurrentStep('welcome');
      setUserIntent(null);
      setOnboardingData({});
    };

    (window as any).showOnboarding = () => {
      setIsOnboardingOpen(true);
      setCurrentStep('welcome');
    };
  }, [user]);

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
    
    setTimeout(() => {
      window.location.href = '/my-profile';
    }, 1000);
  };

  const skipOnboarding = () => {
    localStorage.setItem('housie_onboarding_completed', 'true');
    setIsOnboardingOpen(false);
    setCurrentStep('welcome');
    setUserIntent(null);
    setOnboardingData({});
  };

  const resetOnboarding = () => {
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
