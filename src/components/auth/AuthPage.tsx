
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotPasswordForm from './ForgotPasswordForm';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'customer';
  const [currentView, setCurrentView] = useState('login');
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-green-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">HOUSIE</span>
          </div>
          <p className="text-gray-600">
            {userType === 'cleaner' ? 'Rejoignez notre équipe de nettoyeurs' : 'Trouvez votre nettoyeur idéal'}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {currentView === 'login' && 'Connexion'}
              {currentView === 'signup' && 'Inscription'}
              {currentView === 'forgot' && 'Mot de passe oublié'}
            </CardTitle>
            <CardDescription>
              {currentView === 'login' && 'Connectez-vous à votre compte'}
              {currentView === 'signup' && `Créez votre compte ${userType === 'cleaner' ? 'nettoyeur' : 'client'}`}
              {currentView === 'forgot' && 'Réinitialisez votre mot de passe'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentView === 'login' && (
              <LoginForm 
                userType={userType}
                onSwitchToSignup={() => setCurrentView('signup')}
                onSwitchToForgot={() => setCurrentView('forgot')}
              />
            )}
            {currentView === 'signup' && (
              <SignupForm 
                userType={userType}
                onSwitchToLogin={() => setCurrentView('login')}
              />
            )}
            {currentView === 'forgot' && (
              <ForgotPasswordForm onBackToLogin={() => setCurrentView('login')} />
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <Button variant="ghost" onClick={handleBackToHome}>
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
