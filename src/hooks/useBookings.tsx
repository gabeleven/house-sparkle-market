
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Booking {
  id: string;
  customer_id: string;
  cleaner_id: string;
  service_type: string;
  service_date: string;
  service_time: string;
  estimated_duration: number;
  estimated_price: number;
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
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .or(`customer_id.eq.${user.id},cleaner_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
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
