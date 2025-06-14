
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ModernProfileSwitcher } from '@/components/profile/ModernProfileSwitcher';
import { ServiceOfferings } from '@/components/profile/ServiceOfferings';
import { CustomerModeView } from '@/components/profile/CustomerModeView';
import { CleanerModeView } from '@/components/profile/CleanerModeView';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Star } from 'lucide-react';
import { useReviews } from '@/hooks/useReviews';
import { ReviewSummary } from '@/components/reviews/ReviewSummary';
import { ServiceType } from '@/utils/serviceTypes';
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
  const { reviews } = useReviews({ cleanerId: user?.id });

  // Mock services data - in a real app, this would come from the user's profile
  const [userServices] = useState<ServiceType[]>([
    'residential_cleaning',
    'deep_cleaning',
    'commercial_cleaning'
  ]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

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

  const handleManageServices = () => {
    // Navigate to services management or open modal
    console.log('Manage services clicked');
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
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
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
          {/* Modern Profile Mode Switcher */}
          <ModernProfileSwitcher
            currentMode={currentMode}
            onModeChange={handleModeChange}
            loading={switcherLoading}
          />

          {/* Services Offered - Now at the top */}
          <ServiceOfferings
            services={userServices}
            isProvider={currentMode === 'cleaner'}
            onManageServices={handleManageServices}
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
