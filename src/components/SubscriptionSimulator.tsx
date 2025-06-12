
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubscriptionTier } from '@/types/subscription';
import { Settings, Crown, Zap, Star } from 'lucide-react';

interface SubscriptionSimulatorProps {
  currentTier: SubscriptionTier;
  onTierChange: (tier: SubscriptionTier) => void;
}

const SubscriptionSimulator = ({ currentTier, onTierChange }: SubscriptionSimulatorProps) => {
  const getTierIcon = (tier: SubscriptionTier) => {
    switch (tier) {
      case SubscriptionTier.FREE:
        return <Settings className="w-4 h-4" />;
      case SubscriptionTier.STARTER:
        return <Zap className="w-4 h-4" />;
      case SubscriptionTier.PRO:
        return <Star className="w-4 h-4" />;
      case SubscriptionTier.PREMIUM:
        return <Crown className="w-4 h-4" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  };

  const getTierLabel = (tier: SubscriptionTier) => {
    switch (tier) {
      case SubscriptionTier.FREE:
        return 'Basic Access';
      case SubscriptionTier.STARTER:
        return 'Essential Tools';
      case SubscriptionTier.PRO:
        return 'Professional Suite';
      case SubscriptionTier.PREMIUM:
        return 'Business Intelligence';
      default:
        return 'Basic Access';
    }
  };

  const getTierColor = (tier: SubscriptionTier) => {
    switch (tier) {
      case SubscriptionTier.FREE:
        return 'default';
      case SubscriptionTier.STARTER:
        return 'secondary';
      case SubscriptionTier.PRO:
        return 'default';
      case SubscriptionTier.PREMIUM:
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-muted-foreground hidden sm:block">Simuler:</span>
      <Select value={currentTier} onValueChange={(value) => onTierChange(value as SubscriptionTier)}>
        <SelectTrigger className="w-[200px]">
          <div className="flex items-center space-x-2">
            {getTierIcon(currentTier)}
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={SubscriptionTier.FREE}>
            <div className="flex items-center space-x-2 w-full">
              <Settings className="w-4 h-4" />
              <span>FREE - Basic Access</span>
            </div>
          </SelectItem>
          <SelectItem value={SubscriptionTier.STARTER}>
            <div className="flex items-center space-x-2 w-full">
              <Zap className="w-4 h-4" />
              <span>STARTER - $5 CAD/mo</span>
            </div>
          </SelectItem>
          <SelectItem value={SubscriptionTier.PRO}>
            <div className="flex items-center space-x-2 w-full">
              <Star className="w-4 h-4" />
              <span>PRO - $10 CAD/mo</span>
            </div>
          </SelectItem>
          <SelectItem value={SubscriptionTier.PREMIUM}>
            <div className="flex items-center space-x-2 w-full">
              <Crown className="w-4 h-4" />
              <span>PREMIUM - $15 CAD/mo</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      <Badge variant={getTierColor(currentTier) as any} className="text-xs">
        {getTierLabel(currentTier)}
      </Badge>
    </div>
  );
};

export default SubscriptionSimulator;
