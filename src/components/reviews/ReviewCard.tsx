
import React, { useState } from 'react';
import { Review } from '@/types/reviews';
import { StarRating } from './StarRating';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useReviews } from '@/hooks/useReviews';
import { formatDistanceToNow } from 'date-fns';
import { CheckCircle, MessageSquare } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
  showResponse?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ 
  review, 
  showResponse = true 
}) => {
  const { user } = useAuth();
  const { addCleanerResponse } = useReviews();
  const [isResponding, setIsResponding] = useState(false);
  const [responseText, setResponseText] = useState('');

  const isCleanerResponse = user?.id === review.reviewee_id && review.reviewer_type === 'customer';
  const canRespond = isCleanerResponse && !review.cleaner_response && showResponse;

  const handleSubmitResponse = async () => {
    if (!responseText.trim()) return;
    
    await addCleanerResponse.mutateAsync({
      reviewId: review.id,
      response: responseText.trim(),
    });
    
    setIsResponding(false);
    setResponseText('');
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={review.reviewer_profile?.profile_photo_url || undefined} />
            <AvatarFallback>
              {review.reviewer_profile?.full_name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-medium text-foreground">
                {review.reviewer_profile?.full_name || 'Anonymous'}
              </h4>
              {review.is_verified && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
              <Badge variant="secondary" className="capitalize">
                {review.reviewer_type}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <StarRating rating={review.rating} size="sm" />
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
              </span>
            </div>
            
            {review.title && (
              <h5 className="font-medium text-foreground mb-2">{review.title}</h5>
            )}
            
            {review.comment && (
              <p className="text-muted-foreground mb-3 leading-relaxed">
                {review.comment}
              </p>
            )}
            
            {review.photos && review.photos.length > 0 && (
              <div className="flex gap-2 mb-3 overflow-x-auto">
                {review.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Review photo ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}
            
            {review.cleaner_response && (
              <div className="mt-4 bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span className="font-medium text-sm text-foreground">
                    Response from cleaner
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(review.cleaner_response_date!), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {review.cleaner_response}
                </p>
              </div>
            )}
            
            {canRespond && (
              <div className="mt-4">
                {!isResponding ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsResponding(true)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Respond to review
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Write a professional response to this review..."
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleSubmitResponse}
                        disabled={!responseText.trim() || addCleanerResponse.isPending}
                      >
                        {addCleanerResponse.isPending ? 'Submitting...' : 'Submit Response'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsResponding(false);
                          setResponseText('');
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
