
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from '@/components/auth/LoginForm';

const Auth = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'customer';

  useEffect(() => {
    // Redirect authenticated users to home
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect via useEffect
  }

  const handleSwitchToForgot = () => {
    // Add forgot password logic here if needed
    console.log('Forgot password clicked');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">
            Bienvenue sur HOUSIE
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Connectez-vous à votre compte existant
          </p>
          <p className="mt-4 text-sm text-primary">
            Nouveau sur HOUSIE ? <a href="/" className="underline hover:text-primary/80">Visitez notre page d'accueil</a> pour commencer.
          </p>
        </div>

        <Card className="pop-card bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-center">Connexion</CardTitle>
            <CardDescription className="text-center">
              Accédez à votre compte HOUSIE
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm 
              userType={userType}
              onSwitchToSignup={() => {
                // Redirect to homepage instead of signup
                navigate('/');
              }}
              onSwitchToForgot={handleSwitchToForgot}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
