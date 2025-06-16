
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';

export const WelcomeStep: React.FC = () => {
  const { setUserIntent, nextStep, skipOnboarding } = useOnboarding();

  const handleFindHelp = () => {
    setUserIntent('find_help');
    nextStep('account_creation');
  };

  const handleOfferServices = () => {
    setUserIntent('offer_services');
    nextStep('account_creation');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Welcome to Housie! 👋</h2>
        <Button variant="ghost" size="icon" onClick={skipOnboarding}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <p className="text-gray-600 mb-8">
        Let's get you started! Are you here to find help or offer services?
      </p>

      <div className="space-y-4">
        <Button 
          onClick={handleFindHelp}
          className="w-full h-auto p-6 flex flex-col items-center space-y-3"
          variant="outline"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg">I'm looking for help</h3>
            <p className="text-sm text-gray-600">Find trusted service providers</p>
          </div>
        </Button>

        <Button 
          onClick={handleOfferServices}
          className="w-full h-auto p-6 flex flex-col items-center space-y-3"
          variant="outline"
        >
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg">I offer services</h3>
            <p className="text-sm text-gray-600">Join our network of providers</p>
          </div>
        </Button>
      </div>

      <div className="mt-6 text-center">
        <Button variant="ghost" onClick={skipOnboarding}>
          Skip for now
        </Button>
      </div>
    </div>
  );
};
