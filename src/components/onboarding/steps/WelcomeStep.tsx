
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
    <div style={{ padding: '24px', pointerEvents: 'auto', position: 'relative', zIndex: 999999 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
            Welcome to Housie! 👋
          </h2>
          <p style={{ color: '#6b7280' }}>
            Let's get you started with the perfect experience
          </p>
        </div>
        <button
          onClick={handleSkip}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '4px',
            color: '#6b7280',
            pointerEvents: 'auto',
            zIndex: 999999
          }}
        >
          <X style={{ width: '16px', height: '16px' }} />
        </button>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: '500', marginBottom: '24px' }}>
          Are you here to find help or offer your services?
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <div style={{ 
            border: '2px solid #e5e7eb', 
            borderRadius: '8px', 
            backgroundColor: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                backgroundColor: '#dbeafe', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 16px auto' 
              }}>
                <Search style={{ width: '32px', height: '32px', color: '#2563eb' }} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>I'm looking for help</h3>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                Find trusted service providers in your area for cleaning, repairs, and more
              </p>
              <button
                onClick={handleFindHelp}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#000',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  zIndex: 999999
                }}
              >
                Find Services
              </button>
            </div>
          </div>

          <div style={{ 
            border: '2px solid #e5e7eb', 
            borderRadius: '8px', 
            backgroundColor: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                backgroundColor: '#dcfce7', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 16px auto' 
              }}>
                <Users style={{ width: '32px', height: '32px', color: '#16a34a' }} />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>I offer services</h3>
              <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                Join our network of service providers and grow your business
              </p>
              <button
                onClick={handleOfferServices}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#000',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                  zIndex: 999999
                }}
              >
                Start Offering
              </button>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button
            onClick={handleSkip}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#6b7280',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '4px',
              fontSize: '14px',
              pointerEvents: 'auto',
              zIndex: 999999
            }}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};
