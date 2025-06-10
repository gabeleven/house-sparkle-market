
import React, { useState } from 'react';
import { X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useServicePricing } from '@/hooks/useServicePricing';
import { ServiceTypeSelector } from './ServiceTypeSelector';
import { DateTimeSelector } from './DateTimeSelector';
import { CustomerDetailsForm } from './CustomerDetailsForm';
import { BookingSummary } from './BookingSummary';
import { PaymentSection } from './PaymentSection';

interface BookingSlideOutProps {
  isOpen: boolean;
  onClose: () => void;
  cleaner: {
    id: string;
    full_name: string;
    business_name?: string;
    profile_photo_url?: string;
  };
}

const serviceTypeLabels = {
  deep_clean: 'Deep Clean',
  regular_clean: 'Regular Clean',
  move_in_out: 'Move-in/Move-out Clean',
  post_construction: 'Post-construction Cleanup',
  office_cleaning: 'Office Cleaning'
};

export const BookingSlideOut: React.FC<BookingSlideOutProps> = ({ isOpen, onClose, cleaner }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { servicePricing } = useServicePricing();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [serviceType, setServiceType] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedServicePricing = servicePricing.find(sp => sp.service_type === serviceType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to make a booking",
        variant: "destructive"
      });
      return;
    }

    if (!selectedDate || !selectedTime || !serviceType || !customerAddress || !customerPhone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          customer_id: user.id,
          cleaner_id: cleaner.id,
          service_type: serviceType,
          service_date: selectedDate.toISOString().split('T')[0],
          service_time: selectedTime,
          estimated_duration: selectedServicePricing?.duration_minutes || 120,
          estimated_price: selectedServicePricing?.base_price || 0,
          additional_notes: additionalNotes,
          customer_address: customerAddress,
          customer_phone: customerPhone,
          status: 'pending'
        });

      if (error) throw error;

      // Send notification email to cleaner
      try {
        await supabase.functions.invoke('send-booking-notification', {
          body: {
            cleanerId: cleaner.id,
            customerName: user.email?.split('@')[0] || 'Customer',
            serviceType: serviceTypeLabels[serviceType as keyof typeof serviceTypeLabels],
            serviceDate: format(selectedDate, 'PPP'),
            serviceTime: selectedTime,
            customerAddress,
            customerPhone,
            additionalNotes
          }
        });
      } catch (notificationError) {
        console.error('Error sending notification:', notificationError);
        // Don't fail the booking if notification fails
      }

      toast({
        title: "Booking request sent!",
        description: "The cleaner will receive your booking request and respond soon."
      });

      onClose();
      
      // Reset form
      setSelectedDate(undefined);
      setSelectedTime('');
      setServiceType('');
      setAdditionalNotes('');
      setCustomerAddress('');
      setCustomerPhone('');

    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Booking failed",
        description: "There was an error creating your booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Slide-out Panel */}
      <div className={`fixed right-0 top-0 h-full bg-background border-l shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } w-full md:w-[400px]`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-green-700 rounded-full flex items-center justify-center">
              {cleaner.profile_photo_url ? (
                <img 
                  src={cleaner.profile_photo_url} 
                  alt={cleaner.full_name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <User className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold">Book with</h2>
              <p className="text-sm text-muted-foreground">
                {cleaner.business_name || cleaner.full_name}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto h-[calc(100vh-80px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <ServiceTypeSelector
              value={serviceType}
              onValueChange={setServiceType}
              servicePricing={servicePricing}
            />

            <DateTimeSelector
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
              selectedTime={selectedTime}
              onTimeSelect={setSelectedTime}
            />

            <CustomerDetailsForm
              customerAddress={customerAddress}
              onAddressChange={setCustomerAddress}
              customerPhone={customerPhone}
              onPhoneChange={setCustomerPhone}
              additionalNotes={additionalNotes}
              onNotesChange={setAdditionalNotes}
            />

            <BookingSummary
              selectedServicePricing={selectedServicePricing}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              serviceType={serviceType}
            />

            <PaymentSection />

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending request...' : 'Send booking request'}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
