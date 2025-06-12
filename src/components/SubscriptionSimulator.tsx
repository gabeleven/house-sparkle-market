
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubscriptionTier, SUBSCRIPTION_PLANS } from '@/types/subscription';
import { Settings, Crown, Zap, Star } from 'lucide-react';

interface SubscriptionSimulatorProps {
  currentTier: SubscriptionTier;
  onTierChange: (tier: SubscriptionTier) => void;
}

const SubscriptionSimulator = ({ currentTier, onTierChange }: SubscriptionSimulatorProps) => {
  const getTierIcon = (tier: SubscriptionTier) => {
    switch (tier) {
      case 'FREE':
        return <Settings className="w-4 h-4" />;
      case 'STARTER':
        return <Zap className="w-4 h-4" />;
      case 'PRO':
        return <Star className="w-4 h-4" />;
      case 'PREMIUM':
        return <Crown className="w-4 h-4" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  };

  const getTierColor = (tier: SubscriptionTier) => {
    switch (tier) {
      case 'FREE':
        return 'default';
      case 'STARTER':
        return 'secondary';
      case 'PRO':
        return 'default';
      case 'PREMIUM':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const currentPlan = SUBSCRIPTION_PLANS[currentTier];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground hidden sm:block">Simuler:</span>
      <Select value={currentTier} onValueChange={(value) => onTierChange(value as SubscriptionTier)}>
        <SelectTrigger className="w-[180px]">
          <div className="flex items-center space-x-2">
            {getTierIcon(currentTier)}
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent>
          {Object.entries(SUBSCRIPTION_PLANS).map(([tier, plan]) => (
            <SelectItem key={tier} value={tier}>
              <div className="flex items-center space-x-2 w-full">
                {getTierIcon(tier as SubscriptionTier)}
                <span>{tier} - {plan.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Badge variant={getTierColor(currentTier) as any} className="text-xs">
        {currentPlan.name}
      </Badge>
    </div>
  );
};

export default SubscriptionSimulator;
