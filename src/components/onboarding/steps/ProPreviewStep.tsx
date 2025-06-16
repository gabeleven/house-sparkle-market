
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, TrendingUp, Shield, Crown, BarChart3 } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useNavigate } from 'react-router-dom';

const proFeatures = [
  { icon: Crown, title: 'Priority Ranking', description: 'Appear at the top of search results' },
  { icon: Star, title: 'Premium Badge', description: 'Stand out with a verified professional badge' },
  { icon: BarChart3, title: 'Advanced Analytics', description: 'Track views, bookings, and revenue insights' },
  { icon: TrendingUp, title: 'Marketing Tools', description: 'Promote your services with featured listings' },
  { icon: Shield, title: 'Trust & Safety', description: 'Enhanced verification and customer protection' }
];

export const ProPreviewStep: React.FC = () => {
  const { completeOnboarding, onboardingData } = useOnboarding();
  const navigate = useNavigate();

  const handleSubscribeToPro = () => {
    completeOnboarding();
    navigate('/pricing');
  };

  const handleFinishLater = () => {
    completeOnboarding();
    navigate('/my-profile');
  };

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <h2 className="text-2xl font-bold text-foreground">
            Great! Your profile is nearly ready
          </h2>
        </div>
        <p className="text-muted-foreground">
          Welcome to Housie, {onboardingData.accountData?.name}!
        </p>
      </div>

      <Card className="mb-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Crown className="w-6 h-6 text-primary" />
            <CardTitle className="text-2xl">Housie Pro</CardTitle>
            <Badge variant="secondary" className="bg-primary/10 text-primary">Recommended</Badge>
          </div>
          <p className="text-muted-foreground">
            Get 3x more bookings with premium features
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {proFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center p-4 bg-white/50 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">$29/month</div>
            <p className="text-sm text-muted-foreground">7-day free trial</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3">
        <Button onClick={handleSubscribeToPro} className="w-full">
          Start Free Trial - Subscribe to Pro
        </Button>
        <Button variant="outline" onClick={handleFinishLater} className="w-full">
          Continue with Basic (Free)
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground mt-4">
        You can always upgrade later. No commitment required.
      </p>
    </div>
  );
};
