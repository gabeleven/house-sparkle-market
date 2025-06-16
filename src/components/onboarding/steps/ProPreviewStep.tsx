import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Crown, TrendingUp, Shield, Star, CheckCircle } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';

const proFeatures = [
  { icon: Crown, title: 'Pro Badge', description: 'Stand out with a verified Pro badge' },
  { icon: TrendingUp, title: 'Higher Ranking', description: 'Appear first in search results' },
  { icon: Shield, title: 'Priority Support', description: '24/7 dedicated customer support' },
  { icon: Star, title: 'Analytics Dashboard', description: 'Track your performance and earnings' }
];

export const ProPreviewStep: React.FC = () => {
  const { completeOnboarding, onboardingData, nextStep } = useOnboarding();

  const handleSubscribe = () => {
    // Here you would typically handle the subscription process
    completeOnboarding();
  };

  const handleFinishLater = () => {
    completeOnboarding();
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => nextStep('service_location')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            You're almost ready! 🎉
          </h2>
          <p className="text-muted-foreground">Upgrade to Housie Pro for maximum visibility</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Profile Preview */}
        <Card className="mb-6 border-2 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                {onboardingData.accountData?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold">
                    {onboardingData.accountData?.name || 'Your Name'}
                  </h3>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    <Crown className="w-3 h-3 mr-1" />
                    PRO
                  </Badge>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">5.0</span>
                  <span className="text-muted-foreground">(New Provider)</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {onboardingData.serviceLocation?.area || 'Your Service Area'}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600 font-medium">Verified Pro Provider</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {onboardingData.offeredServices?.slice(0, 3).map((service: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {service.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              ))}
              {(onboardingData.offeredServices?.length || 0) > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{(onboardingData.offeredServices?.length || 0) - 3} more
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pro Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {proFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="p-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-medium mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pricing */}
        <Card className="mb-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold mb-2">Start with Housie Pro</h3>
            <div className="text-3xl font-bold text-primary mb-2">
              $29<span className="text-lg text-muted-foreground">/month</span>
            </div>
            <p className="text-muted-foreground mb-4">Cancel anytime • 30-day money-back guarantee</p>
            <div className="flex justify-center gap-4">
              <Button size="lg" onClick={handleSubscribe}>
                Start Pro Trial
              </Button>
              <Button variant="outline" size="lg" onClick={handleFinishLater}>
                Finish Profile Later
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          You can always upgrade to Pro later from your dashboard
        </p>
      </div>
    </div>
  );
};
