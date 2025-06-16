
import React from 'react';
import { useParams } from 'react-router-dom';
import { useReviews } from '@/hooks/useReviews';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import { ReviewSummary } from '@/components/reviews/ReviewSummary';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProviderReviews = () => {
  const { providerId } = useParams<{ providerId: string }>();
  const navigate = useNavigate();
  const { reviews, isLoading, error } = useReviews({ providerId });

  if (!providerId) {
    return <div>Provider not found</div>;
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-foreground">Reviews</h1>
            <ReviewSummary
              averageRating={averageRating}
              totalReviews={reviews.length}
              size="lg"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse bg-card/60 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-muted rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-1/4"></div>
                      <div className="h-3 bg-muted rounded w-1/3"></div>
                      <div className="h-3 bg-muted rounded w-full"></div>
                      <div className="h-3 bg-muted rounded w-3/4"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card className="bg-card/60 backdrop-blur">
            <CardContent className="p-6 text-center">
              <p className="text-destructive">Error loading reviews. Please try again.</p>
            </CardContent>
          </Card>
        ) : reviews.length === 0 ? (
          <Card className="bg-card/60 backdrop-blur">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
              <p className="text-muted-foreground">
                This provider hasn't received any reviews yet. Be the first to book and leave a review!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                showResponse={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderReviews;
