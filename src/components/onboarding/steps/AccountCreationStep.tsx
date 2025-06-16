
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, User, Mail, Lock } from 'lucide-react';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const AccountCreationStep: React.FC = () => {
  const { completeOnboarding, userIntent } = useOnboarding();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const createUserProfiles = async (userId: string) => {
    try {
      // Create base profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: formData.email,
          full_name: formData.name,
          user_role: userIntent === 'find_help' ? 'customer' : 'cleaner'
        });

      if (profileError) throw profileError;

      // Create role-specific profile
      if (userIntent === 'find_help') {
        const { error: customerError } = await supabase
          .from('customer_profiles')
          .insert({
            id: userId,
            preferred_contact_method: 'email',
            looking_for_cleaning: true
          });
        if (customerError) throw customerError;
      } else {
        const { error: providerError } = await supabase
          .from('providers')
          .insert({
            user_id: userId,
            business_name: formData.name,
            service_radius_km: 25,
            is_profile_complete: false
          });
        if (providerError) throw providerError;
      }

      console.log('All profiles created successfully');
    } catch (error) {
      console.error('Profile creation failed:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setIsLoading(true);
    
    try {
      const userData = {
        full_name: formData.name,
        user_role: userIntent === 'find_help' ? 'customer' : 'cleaner'
      };
      
      const { error: signUpError } = await signUp(formData.email, formData.password, userData);
      
      if (signUpError) throw signUpError;
      
      // Wait for user creation
      let attempts = 0;
      const maxAttempts = 10;
      
      const waitForUser = async (): Promise<string> => {
        return new Promise((resolve, reject) => {
          const checkUser = async () => {
            attempts++;
            const { data: { user } } = await supabase.auth.getUser();
            
            if (user) {
              resolve(user.id);
            } else if (attempts < maxAttempts) {
              setTimeout(checkUser, 500);
            } else {
              reject(new Error('Timeout waiting for user creation'));
            }
          };
          checkUser();
        });
      };
      
      const userId = await waitForUser();
      await createUserProfiles(userId);
      
      toast({
        title: "Account created successfully!",
        description: "Redirecting to your profile...",
        duration: 3000
      });
      
      setTimeout(() => {
        completeOnboarding();
      }, 2000);
      
    } catch (error) {
      console.error('Account creation failed:', error);
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.password.length >= 6;

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Create your account</h2>
          <p className="text-gray-600">
            {userIntent === 'find_help' 
              ? 'Find the best services near you'
              : 'Join our network of service providers'
            }
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Full Name
          </Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="password" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Minimum 6 characters"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="mt-1"
            required
            minLength={6}
          />
        </div>

        <Button 
          type="submit"
          disabled={!isFormValid || isLoading}
          className="w-full mt-6"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      <p className="text-xs text-center text-gray-500 mt-4">
        By creating an account, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
};
