
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Booking {
  id: string;
  customer_id: string;
  cleaner_id: string;
  service_type?: string;
  service_date: string;
  service_time?: string;
  estimated_duration?: number;
  estimated_price?: number;
  additional_notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  customer_address?: string;
  customer_phone?: string;
  created_at: string;
  updated_at: string;
  confirmed_at?: string;
  cancelled_at?: string;
}

export const useBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Use RPC to get bookings with proper typing
      const { data, error } = await supabase
        .rpc('get_user_bookings', { user_uuid: user.id });

      if (error) {
        // Fallback to direct table query if RPC doesn't exist
        console.log('RPC not available, using direct query');
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('bookings')
          .select('*')
          .or(`customer_id.eq.${user.id},cleaner_id.eq.${user.id}`)
          .order('created_at', { ascending: false });

        if (fallbackError) throw fallbackError;
        
        // Transform fallback data with safe property access
        const transformedBookings: Booking[] = (fallbackData || []).map((booking: any) => ({
          id: booking.id,
          customer_id: booking.customer_id,
          cleaner_id: booking.cleaner_id,
          service_type: booking.service_type || 'regular_clean',
          service_date: booking.service_date,
          service_time: booking.service_time || '09:00',
          estimated_duration: booking.estimated_duration || 120,
          estimated_price: booking.estimated_price || 0,
          additional_notes: booking.additional_notes || '',
          status: booking.status as 'pending' | 'confirmed' | 'cancelled' | 'completed',
          customer_address: booking.customer_address || '',
          customer_phone: booking.customer_phone || '',
          created_at: booking.created_at,
          updated_at: booking.updated_at,
          confirmed_at: booking.confirmed_at,
          cancelled_at: booking.cancelled_at
        }));
        
        setBookings(transformedBookings);
      } else {
        setBookings(data || []);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: 'confirmed' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId);

      if (error) throw error;
      
      // Refresh bookings
      await fetchBookings();
      return true;
    } catch (error) {
      console.error('Error updating booking status:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  return {
    bookings,
    loading,
    fetchBookings,
    updateBookingStatus
  };
};
