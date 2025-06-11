
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

const Auth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('login');
  const [currentView, setCurrentView] = useState('login');
  const userType = searchParams.get('type') || 'customer';

  useEffect(() => {
    // Redirect authenticated users to home
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Check URL params for tab switching
    const tab = searchParams.get('tab');
    if (tab === 'signup') {
      setActiveTab('signup');
      setCurrentView('signup');
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div>Loading...</div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect via useEffect
  }

  const handleSwitchToSignup = () => {
    setCurrentView('signup');
    setActiveTab('signup');
  };

  const handleSwitchToLogin = () => {
    setCurrentView('login');
    setActiveTab('login');
  };

  const handleSwitchToForgot = () => {
    setCurrentView('forgot');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">
            Bienvenue sur HOUSIE
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Connectez-vous ou créez un compte pour commencer
          </p>
        </div>

        <Card className="pop-card">
          <CardHeader>
            <CardTitle className="text-center">Authentification</CardTitle>
            <CardDescription className="text-center">
              Accédez à votre compte ou inscrivez-vous
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="signup">S'inscrire</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="mt-6">
                <LoginForm 
                  userType={userType}
                  onSwitchToSignup={handleSwitchToSignup}
                  onSwitchToForgot={handleSwitchToForgot}
                />
              </TabsContent>
              
              <TabsContent value="signup" className="mt-6">
                <SignupForm 
                  userType={userType}
                  onSwitchToLogin={handleSwitchToLogin}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
