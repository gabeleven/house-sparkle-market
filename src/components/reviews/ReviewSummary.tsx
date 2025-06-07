
import React from 'react';
import { StarRating } from './StarRating';
import { Badge } from '@/components/ui/badge';

interface ReviewSummaryProps {
  averageRating: number;
  totalReviews: number;
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
}

export const ReviewSummary: React.FC<ReviewSummaryProps> = ({
  averageRating,
  totalReviews,
  size = 'md',
  showBadge = true,
}) => {
  if (totalReviews === 0) {
    return (
      <div className="flex items-center gap-2">
        <StarRating rating={0} size={size} />
        <span className="text-sm text-muted-foreground">No reviews yet</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <StarRating rating={averageRating} size={size} showNumber />
      <span className="text-sm text-muted-foreground">
        ({totalReviews} review{totalReviews !== 1 ? 's' : ''})
      </span>
      {showBadge && averageRating >= 4.5 && (
        <Badge variant="secondary" className="text-yellow-700 bg-yellow-100">
          Excellent
        </Badge>
      )}
    </div>
  );
};
