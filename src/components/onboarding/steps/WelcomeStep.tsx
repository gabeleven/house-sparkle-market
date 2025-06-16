
import React from 'react';
import { X } from 'lucide-react';
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
    <div className="p-6">
      {/* Header with close button */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Welcome to Housie! 👋</h2>
          <p className="text-gray-600">Let's get you started with the perfect experience</p>
        </div>
        <button
          onClick={handleSkip}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          type="button"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Main content */}
      <div className="text-center mb-8">
        <p className="text-lg font-medium mb-6">
          Are you here to find help or offer your services?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Find Help Card */}
          <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">I'm looking for help</h3>
            <p className="text-gray-600 mb-6">
              Find trusted service providers in your area for cleaning, repairs, and more
            </p>
            <button
              onClick={handleFindHelp}
              className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer"
              type="button"
            >
              Find Services
            </button>
          </div>

          {/* Offer Services Card */}
          <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-green-500 hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">I offer services</h3>
            <p className="text-gray-600 mb-6">
              Join our network of service providers and grow your business
            </p>
            <button
              onClick={handleOfferServices}
              className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer"
              type="button"
            >
              Start Offering
            </button>
          </div>
        </div>
      </div>

      {/* Skip button */}
      <div className="text-center">
        <button
          onClick={handleSkip}
          className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded transition-colors cursor-pointer"
          type="button"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};
