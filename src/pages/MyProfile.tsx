
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UnifiedProfileToggle } from '@/components/profile/UnifiedProfileToggle';
import { CustomerModeView } from '@/components/profile/CustomerModeView';
import { CleanerModeView } from '@/components/profile/CleanerModeView';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Star } from 'lucide-react';
import { useReviews } from '@/hooks/useReviews';
import { ReviewSummary } from '@/components/reviews/ReviewSummary';
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
  const { reviews } = useReviews({ cleanerId: user?.id });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleModeChange = (mode: 'customer' | 'cleaner') => {
    setCurrentMode(mode);
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="min-h-screen bg-background">
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
            <Button variant="outline" onClick={() => navigate(`/profile/${user.id}`)}>
              <Eye className="w-4 h-4 mr-2" />
              View Public Profile
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          <UnifiedProfileToggle onModeChange={handleModeChange} />
          
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
