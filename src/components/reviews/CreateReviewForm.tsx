
import React, { useState } from 'react';
import { StarRating } from './StarRating';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useReviews } from '@/hooks/useReviews';
import { Camera } from 'lucide-react';

interface CreateReviewFormProps {
  bookingId: string;
  revieweeId: string;
  reviewerType: 'customer' | 'cleaner';
  onSuccess?: () => void;
}

export const CreateReviewForm: React.FC<CreateReviewFormProps> = ({
  bookingId,
  revieweeId,
  reviewerType,
  onSuccess,
}) => {
  const { createReview } = useReviews();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      return;
    }

    await createReview.mutateAsync({
      booking_id: bookingId,
      reviewee_id: revieweeId,
      reviewer_type: reviewerType,
      rating,
      title: title.trim() || undefined,
      comment: comment.trim() || undefined,
      photos,
    });

    // Reset form
    setRating(0);
    setTitle('');
    setComment('');
    setPhotos([]);
    
    onSuccess?.();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Rating *
            </label>
            <StarRating
              rating={rating}
              interactive
              onRatingChange={setRating}
              size="lg"
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title (optional)
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience..."
              maxLength={100}
            />
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              Comment (optional)
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell others about your experience..."
              className="min-h-[100px]"
              maxLength={1000}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Photos (optional)
            </label>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => {
                // TODO: Implement photo upload
                console.log('Photo upload coming soon');
              }}
            >
              <Camera className="w-4 h-4 mr-2" />
              Add Photos
            </Button>
            <p className="text-xs text-muted-foreground mt-1">
              Show before/after photos of the cleaning work
            </p>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={rating === 0 || createReview.isPending}
          >
            {createReview.isPending ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
