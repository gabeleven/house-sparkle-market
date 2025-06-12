
import { useState, useEffect } from 'react';
import { SubscriptionTier, SUBSCRIPTION_PLANS } from '@/types/subscription';
import { useAuth } from '@/hooks/useAuth';

export const useSubscription = () => {
  const { user } = useAuth();
  const [currentTier, setCurrentTier] = useState<SubscriptionTier>('PREMIUM'); // Default to PREMIUM for demo
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading subscription data
    // In a real app, this would fetch from your backend/Supabase
    const loadSubscription = async () => {
      if (!user) {
        setCurrentTier('FREE');
        setIsLoading(false);
        return;
      }

      // For demo purposes, always grant Premium access to show AI features
      // In production, this would come from your subscription table
      const mockTier = getMockTierForUser(user.email || '');
      setCurrentTier(mockTier);
      setIsLoading(false);
    };

    loadSubscription();
  }, [user]);

  const getMockTierForUser = (email: string): SubscriptionTier => {
    // Updated logic: Always return PREMIUM for demo purposes to ensure
    // Market Intelligence and other AI features are consistently available
    // This fixes the inconsistent paywall/dashboard switching issue
    return 'PREMIUM';
    
    // Original logic kept for reference (commented out):
    // if (email.includes('premium')) return 'PREMIUM';
    // if (email.includes('pro')) return 'PRO';
    // if (email.includes('starter')) return 'STARTER';
    // return 'FREE';
  };

  const upgradeTo = (tier: SubscriptionTier) => {
    // In a real app, this would handle the upgrade flow
    console.log(`Upgrading to ${tier}`);
    setCurrentTier(tier);
  };

  const canAccessFeature = (requiredTier: SubscriptionTier): boolean => {
    const tierOrder: SubscriptionTier[] = ['FREE', 'STARTER', 'PRO', 'PREMIUM'];
    const currentIndex = tierOrder.indexOf(currentTier);
    const requiredIndex = tierOrder.indexOf(requiredTier);
    return currentIndex >= requiredIndex;
  };

  const getCurrentPlan = () => {
    return SUBSCRIPTION_PLANS[currentTier];
  };

  return {
    currentTier,
    isLoading,
    upgradeTo,
    canAccessFeature,
    getCurrentPlan,
    plans: SUBSCRIPTION_PLANS,
  };
};
