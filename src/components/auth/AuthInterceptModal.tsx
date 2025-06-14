
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Users, Shield, Star } from 'lucide-react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface AuthInterceptModalProps {
  isOpen: boolean;
  onClose: () => void;
  postalCode: string;
}

export const AuthInterceptModal: React.FC<AuthInterceptModalProps> = ({
  isOpen,
  onClose,
  postalCode,
}) => {
  const [currentView, setCurrentView] = useState<'choice' | 'login' | 'signup'>('choice');
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    onClose();
    navigate(`/browse-cleaners?location=${encodeURIComponent(postalCode)}`);
  };

  const renderChoice = () => (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <MapPin className="w-6 h-6 text-primary" />
          <span className="text-lg font-semibold">Searching in: {postalCode}</span>
        </div>
        
        <h3 className="text-xl font-bold">Find Local Service Providers Near You</h3>
        <p className="text-muted-foreground">
          To see verified service providers in your area and book services, you'll need an account
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-primary" />
          <span>CRA Compliant</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-primary" />
          <span>Verified Professionals</span>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="w-4 h-4 text-primary" />
          <span>Rated & Reviewed</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button 
          onClick={() => setCurrentView('signup')}
          className="w-full"
          size="lg"
        >
          Create Account - It's Free!
        </Button>
        <Button 
          onClick={() => setCurrentView('login')}
          variant="outline"
          className="w-full"
          size="lg"
        >
          Sign In to Existing Account
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );

  const renderLogin = () => (
    <div className="space-y-4">
      <Button 
        variant="ghost" 
        onClick={() => setCurrentView('choice')}
        className="mb-4"
      >
        ← Back
      </Button>
      <LoginForm
        userType="customer"
        onSwitchToSignup={() => setCurrentView('signup')}
        onSwitchToForgot={() => {}} // Handle forgot password if needed
      />
    </div>
  );

  const renderSignup = () => (
    <div className="space-y-4">
      <Button 
        variant="ghost" 
        onClick={() => setCurrentView('choice')}
        className="mb-4"
      >
        ← Back
      </Button>
      <SignupForm
        userType="customer"
        onSwitchToLogin={() => setCurrentView('login')}
      />
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {currentView === 'choice' && 'Access Local Service Providers'}
            {currentView === 'login' && 'Sign In'}
            {currentView === 'signup' && 'Create Your Account'}
          </DialogTitle>
          <DialogDescription>
            {currentView === 'choice' && 'Join thousands of Canadians finding trusted home services'}
            {currentView === 'login' && 'Welcome back! Sign in to continue'}
            {currentView === 'signup' && 'Create your account to find local service providers'}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {currentView === 'choice' && renderChoice()}
          {currentView === 'login' && renderLogin()}
          {currentView === 'signup' && renderSignup()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
