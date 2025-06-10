
import React from 'react';
import { format } from 'date-fns';
import { ServicePricing } from '@/hooks/useServicePricing';

interface BookingSummaryProps {
  selectedServicePricing: ServicePricing | undefined;
  selectedDate: Date | undefined;
  selectedTime: string;
  serviceType: string;
}

const serviceTypeLabels = {
  deep_clean: 'Deep Clean',
  regular_clean: 'Regular Clean',
  move_in_out: 'Move-in/Move-out Clean',
  post_construction: 'Post-construction Cleanup',
  office_cleaning: 'Office Cleaning'
};

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  selectedServicePricing,
  selectedDate,
  selectedTime,
  serviceType
}) => {
  if (!selectedServicePricing || !selectedDate || !selectedTime) {
    return null;
  }

  return (
    <div className="bg-muted p-4 rounded-lg space-y-2">
      <h3 className="font-medium">Booking Summary</h3>
      <div className="text-sm space-y-1">
        <div className="flex justify-between">
          <span>Service:</span>
          <span>{serviceTypeLabels[serviceType as keyof typeof serviceTypeLabels]}</span>
        </div>
        <div className="flex justify-between">
          <span>Date:</span>
          <span>{format(selectedDate, 'PPP')}</span>
        </div>
        <div className="flex justify-between">
          <span>Time:</span>
          <span>{selectedTime}</span>
        </div>
        <div className="flex justify-between">
          <span>Duration:</span>
          <span>{selectedServicePricing.duration_minutes} mins</span>
        </div>
        <div className="flex justify-between font-medium border-t pt-2">
          <span>Estimated Price:</span>
          <span>${selectedServicePricing.base_price}</span>
        </div>
      </div>
    </div>
  );
};
