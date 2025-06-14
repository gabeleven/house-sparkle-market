
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, Clock } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">John D.</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Excellent service! Very thorough and professional. Would definitely hire again.
                </p>
                <div className="flex items-center text-gray-400 text-xs mt-1">
                  <Clock className="w-3 h-3 mr-1" />
                  2 weeks ago
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm">More reviews coming soon...</p>
        </div>
      </CardContent>
    </Card>
  );
};
