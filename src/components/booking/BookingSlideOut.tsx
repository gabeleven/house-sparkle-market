import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

interface ServicePricing {
  service_type: string;
  base_price: number;
  duration_minutes: number;
  description: string;
}

const serviceTypeLabels = {
  deep_clean: 'Deep Clean',
  regular_clean: 'Regular Clean',
  move_in_out: 'Move-in/Move-out Clean',
  post_construction: 'Post-construction Cleanup',
  office_cleaning: 'Office Cleaning'
};

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

export const BookingSlideOut: React.FC<BookingSlideOutProps> = ({ isOpen, onClose, cleaner }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [serviceType, setServiceType] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [servicePricing, setServicePricing] = useState<ServicePricing[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchServicePricing();
    }
  }, [isOpen]);

  const fetchServicePricing = async () => {
    try {
      // Try to use RPC function first
      const { data: rpcData, error: rpcError } = await supabase
        .rpc('get_service_pricing');
      
      if (!rpcError && rpcData) {
        setServicePricing(rpcData);
      } else {
        console.log('Service pricing RPC not available, using fallback data');
        // Use fallback pricing
        setServicePricing([
          { service_type: 'deep_clean', base_price: 150, duration_minutes: 180, description: 'Comprehensive deep cleaning service' },
          { service_type: 'regular_clean', base_price: 80, duration_minutes: 120, description: 'Standard house cleaning' },
          { service_type: 'move_in_out', base_price: 200, duration_minutes: 240, description: 'Move-in or move-out cleaning' },
          { service_type: 'post_construction', base_price: 300, duration_minutes: 300, description: 'Post-construction cleanup' },
          { service_type: 'office_cleaning', base_price: 100, duration_minutes: 90, description: 'Office space cleaning' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching service pricing:', error);
      // Use fallback pricing
      setServicePricing([
        { service_type: 'deep_clean', base_price: 150, duration_minutes: 180, description: 'Comprehensive deep cleaning service' },
        { service_type: 'regular_clean', base_price: 80, duration_minutes: 120, description: 'Standard house cleaning' },
        { service_type: 'move_in_out', base_price: 200, duration_minutes: 240, description: 'Move-in or move-out cleaning' },
        { service_type: 'post_construction', base_price: 300, duration_minutes: 300, description: 'Post-construction cleanup' },
        { service_type: 'office_cleaning', base_price: 100, duration_minutes: 90, description: 'Office space cleaning' }
      ]);
    }
  };

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
            
            {/* Service Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select a type of service *</label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose service type" />
                </SelectTrigger>
                <SelectContent>
                  {servicePricing.map((pricing) => (
                    <SelectItem key={pricing.service_type} value={pricing.service_type}>
                      <div className="flex justify-between w-full">
                        <span>{serviceTypeLabels[pricing.service_type as keyof typeof serviceTypeLabels]}</span>
                        <span className="ml-4 text-muted-foreground">${pricing.base_price}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedServicePricing && (
                <p className="text-xs text-muted-foreground">
                  {selectedServicePricing.description} • {selectedServicePricing.duration_minutes} mins
                </p>
              )}
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select date *</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Select time *</label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {time}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Customer Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Service address *</label>
              <Input
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="Enter your address"
              />
            </div>

            {/* Customer Phone */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone number *</label>
              <Input
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Your phone number"
                type="tel"
              />
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Additional notes</label>
              <Textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Any special requests or instructions..."
                rows={3}
              />
            </div>

            {/* Booking Summary */}
            {selectedServicePricing && selectedDate && selectedTime && (
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
            )}

            {/* Payment Section */}
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <h3 className="font-medium text-blue-900 dark:text-blue-100">Payment</h3>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Secure payment with Stripe integration coming soon. 
                For now, payment will be arranged directly with your cleaner.
              </p>
            </div>

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
