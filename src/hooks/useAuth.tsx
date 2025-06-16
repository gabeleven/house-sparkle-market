
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simplified auth state cleanup utility
const cleanupAuthState = () => {
  console.log('Cleaning up auth state...');
  
  // Only remove specific auth tokens, not all storage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') && key.includes('token')) {
      localStorage.removeItem(key);
    }
  });
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const authSubscriptionRef = useRef<any>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    // Prevent duplicate initialization
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    console.log('Initializing auth provider...');

    // Set up auth state listener
    authSubscriptionRef.current = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id || 'no user');
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Handle successful signup
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('User signed in successfully:', session.user.email);
        }
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id || 'no session');
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Cleanup function
    return () => {
      if (authSubscriptionRef.current) {
        authSubscriptionRef.current.subscription.unsubscribe();
        authSubscriptionRef.current = null;
      }
    };
  }, []);

  const signUp = async (email: string, password: string, userData: any) => {
    const redirectUrl = `${window.location.origin}/my-profile`;
    
    console.log('Starting signup process with userData:', userData);
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: userData
      }
    });

    if (error) {
      console.error('Signup error:', error);
      toast({
        title: "Erreur d'inscription",
        description: error.message,
        variant: "destructive"
      });
    } else {
      console.log('Signup successful, user will be created');
      toast({
        title: "Inscription réussie !",
        description: "Votre compte a été créé avec succès."
      });
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Sign in error:', error);
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "destructive"
      });
    } else {
      console.log('Sign in successful');
    }

    return { error };
  };

  const signOut = async () => {
    console.log('Signing out user...');
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        toast({
          title: "Erreur de déconnexion",
          description: error.message,
          variant: "destructive"
        });
      } else {
        console.log('Sign out successful');
        // Clean up after successful signout
        cleanupAuthState();
      }
      
      // Always redirect to home after signout attempt
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out failed:', error);
      // Force cleanup and redirect even if signout fails
      cleanupAuthState();
      window.location.href = '/';
    }
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    if (error) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Email envoyé",
        description: "Vérifiez votre email pour réinitialiser votre mot de passe."
      });
    }

    return { error };
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signUp,
      signIn,
      signOut,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
