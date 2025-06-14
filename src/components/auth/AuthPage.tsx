
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'forgot'>('login');
  const [userType, setUserType] = useState<'customer' | 'cleaner'>('customer');

  const handleUserTypeChange = (value: string) => {
    setUserType(value as 'customer' | 'cleaner');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">H</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Bienvenue Sur Housie
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              {activeTab === 'login' 
                ? 'Connectez-vous pour continuer' 
                : activeTab === 'signup' 
                ? 'Créez votre compte en quelques clics' 
                : 'Récupérez votre accès'
              }
            </p>
          </CardHeader>
          <CardContent>
            {/* User Type Selector */}
            {(activeTab === 'login' || activeTab === 'signup') && (
              <div className="mb-6">
                <Tabs value={userType} onValueChange={handleUserTypeChange} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="customer">Client</TabsTrigger>
                    <TabsTrigger value="cleaner">Ménagère</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )}

            {/* Forms */}
            {activeTab === 'login' && (
              <LoginForm
                userType={userType}
                onSwitchToSignup={() => setActiveTab('signup')}
                onSwitchToForgot={() => setActiveTab('forgot')}
              />
            )}

            {activeTab === 'signup' && (
              <SignupForm
                userType={userType}
                onSwitchToLogin={() => setActiveTab('login')}
              />
            )}

            {activeTab === 'forgot' && (
              <ForgotPasswordForm
                onBackToLogin={() => setActiveTab('login')}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
