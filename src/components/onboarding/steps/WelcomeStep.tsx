
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Users, X } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';

export const WelcomeStep: React.FC = () => {
  const { setUserIntent, nextStep, skipOnboarding } = useOnboarding();

  const handleFindHelp = () => {
    console.log('Find help clicked');
    setUserIntent('find_help');
    nextStep('service_selection');
  };

  const handleOfferServices = () => {
    console.log('Offer services clicked');
    setUserIntent('offer_services');
    nextStep('account_creation');
  };

  const handleSkip = () => {
    console.log('Skip clicked');
    skipOnboarding();
  };

  return (
    <div className="p-6" style={{ pointerEvents: 'auto' }}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Welcome to Housie! 👋
          </h2>
          <p className="text-muted-foreground">
            Let's get you started with the perfect experience
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSkip}
          className="text-muted-foreground hover:text-foreground"
          style={{ pointerEvents: 'auto', zIndex: 10002 }}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <p className="text-center text-lg font-medium mb-6">
          Are you here to find help or offer your services?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">I'm looking for help</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Find trusted service providers in your area for cleaning, repairs, and more
              </p>
              <Button 
                className="w-full mt-4" 
                onClick={handleFindHelp}
                style={{ pointerEvents: 'auto', zIndex: 10002 }}
              >
                Find Services
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">I offer services</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                Join our network of service providers and grow your business
              </p>
              <Button 
                className="w-full mt-4" 
                onClick={handleOfferServices}
                style={{ pointerEvents: 'auto', zIndex: 10002 }}
              >
                Start Offering
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-6">
          <Button 
            variant="ghost" 
            onClick={handleSkip}
            style={{ pointerEvents: 'auto', zIndex: 10002 }}
          >
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
};
