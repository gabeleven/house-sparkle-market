
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ModernProfileSwitcher } from '@/components/profile/ModernProfileSwitcher';
import { CustomerModeView } from '@/components/profile/CustomerModeView';
import { CleanerModeView } from '@/components/profile/CleanerModeView';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Eye, Star } from 'lucide-react';
import { useReviews } from '@/hooks/useReviews';
import { ReviewSummary } from '@/components/reviews/ReviewSummary';
import { supabase } from '@/integrations/supabase/client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

const MyProfile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [currentMode, setCurrentMode] = useState<'customer' | 'cleaner'>('customer');
  const [switcherLoading, setSwitcherLoading] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [profileComplete, setProfileComplete] = useState(false);
  const { reviews } = useReviews({ cleanerId: user?.id });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const checkUserProfile = async () => {
      if (!user) return;

      try {
        // Get user role from profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_role')
          .eq('id', user.id)
          .single();

        if (profile) {
          setUserRole(profile.user_role);
          setCurrentMode(profile.user_role === 'cleaner' ? 'cleaner' : 'customer');
          
          // Check if profile is complete
          if (profile.user_role === 'cleaner') {
            const { data: providerProfile } = await supabase
              .from('providers')
              .select('is_profile_complete')
              .eq('user_id', user.id)
              .single();
              
            setProfileComplete(providerProfile?.is_profile_complete || false);
          } else {
            // For customers, consider profile complete if they have basic info
            const { data: customerProfile } = await supabase
              .from('customer_profiles')
              .select('*')
              .eq('id', user.id)
              .single();
              
            setProfileComplete(!!customerProfile);
          }
        }
      } catch (error) {
        console.error('Error checking user profile:', error);
      }
    };

    if (user) {
      checkUserProfile();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleModeChange = async (mode: 'customer' | 'cleaner') => {
    setSwitcherLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setCurrentMode(mode);
    setSwitcherLoading(false);
  };

  const handleViewPublicProfile = () => {
    navigate(`/public-profile/${user.id}`);
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>My Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mon Profil</h1>
            {!profileComplete && (
              <p className="text-sm text-muted-foreground mt-1">
                Bienvenue ! Complétez votre profil pour commencer.
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {reviews.length > 0 && (
              <div className="flex items-center gap-2">
                <ReviewSummary
                  averageRating={averageRating}
                  totalReviews={reviews.length}
                  size="sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/cleaner/${user.id}/reviews`)}
                >
                  <Star className="w-4 h-4 mr-2" />
                  View All Reviews
                </Button>
              </div>
            )}
            <Button variant="outline" onClick={handleViewPublicProfile}>
              <Eye className="w-4 h-4 mr-2" />
              View Public Profile
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Welcome message for new users */}
          {!profileComplete && (
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-primary mb-2">
                🎉 Bienvenue sur HOUSIE !
              </h2>
              <p className="text-muted-foreground mb-4">
                Votre compte a été créé avec succès. Vous êtes maintenant connecté en tant que{' '}
                <strong>{userRole === 'cleaner' ? 'prestataire de services' : 'client'}</strong>.
              </p>
              <p className="text-sm text-muted-foreground">
                Complétez votre profil ci-dessous pour commencer à utiliser la plateforme.
              </p>
            </div>
          )}
          
          {/* Modern Profile Mode Switcher */}
          <ModernProfileSwitcher
            currentMode={currentMode}
            onModeChange={handleModeChange}
            loading={switcherLoading}
          />
          
          {/* Profile content based on current mode */}
          {currentMode === 'customer' ? (
            <CustomerModeView />
          ) : (
            <CleanerModeView />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
