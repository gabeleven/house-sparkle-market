
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
  const { updateOnboardingData, completeOnboarding, userIntent, onboardingData } = useOnboarding();
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

  const handleNext = async () => {
    if (!isFormValid) return;
    
    setIsLoading(true);
    
    try {
      console.log('Starting account creation process', { userIntent, onboardingData });
      
      // Create account with Supabase
      const userData = {
        full_name: formData.name,
        user_role: userIntent === 'find_help' ? 'customer' : 'cleaner',
        ...onboardingData
      };
      
      const { error: signUpError } = await signUp(formData.email, formData.password, userData);
      
      if (signUpError) {
        toast({
          title: "Erreur lors de la création du compte",
          description: signUpError.message,
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      // Get the newly created user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les informations utilisateur",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      console.log('User created successfully:', user.id);
      
      // Create profile based on user intent
      if (userIntent === 'find_help') {
        // Create customer profile
        const { error: customerError } = await supabase
          .from('customer_profiles')
          .insert({
            id: user.id,
            service_location_address: onboardingData.location || '',
            preferred_contact_method: 'email',
            looking_for_cleaning: true
          });
          
        if (customerError) {
          console.error('Error creating customer profile:', customerError);
        }
      } else {
        // Create provider profile
        const { error: providerError } = await supabase
          .from('providers')
          .insert({
            user_id: user.id,
            business_name: formData.name,
            bio: onboardingData.description || '',
            service_radius_km: 25,
            is_profile_complete: false
          });
          
        if (providerError) {
          console.error('Error creating provider profile:', providerError);
        }
      }
      
      toast({
        title: "Compte créé avec succès !",
        description: "Votre profil a été configuré. Redirection vers votre profil..."
      });
      
      // Complete onboarding and redirect
      setTimeout(() => {
        completeOnboarding();
      }, 2000);
      
    } catch (error) {
      console.error('Account creation failed:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création du compte",
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
          <h2 className="text-2xl font-bold text-foreground">
            Créons votre compte
          </h2>
          <p className="text-muted-foreground">
            {userIntent === 'find_help' 
              ? 'Trouvez les meilleurs services près de chez vous'
              : 'Rejoignez notre réseau de prestataires de services'
            }
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Nom complet
            </Label>
            <Input
              id="name"
              placeholder="Jean Dupont"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Adresse email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="jean@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Mot de passe
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Minimum 6 caractères"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Doit contenir au moins 6 caractères
            </p>
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <Button 
            onClick={handleNext} 
            disabled={!isFormValid || isLoading}
            className="min-w-32"
          >
            {isLoading ? 'Création...' : 'Créer mon compte'}
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          En créant un compte, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialité
        </p>
      </div>
    </div>
  );
};
