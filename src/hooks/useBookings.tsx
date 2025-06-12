
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Booking {
  id: string;
  customer_id: string;
  cleaner_id: string; // Keeping for backward compatibility
  provider_id?: string;
  service_category_id?: string;
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
  total_amount?: number;
}

export const useBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Query bookings with provider information
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          providers(
            user_id,
            business_name
          ),
          service_categories(
            name
          )
        `)
        .or(`customer_id.eq.${user.id},cleaner_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedBookings: Booking[] = (data || []).map((booking: any) => ({
        id: booking.id,
        customer_id: booking.customer_id,
        cleaner_id: booking.cleaner_id || booking.providers?.user_id,
        provider_id: booking.provider_id,
        service_category_id: booking.service_category_id,
        service_type: booking.service_categories?.name || 'cleaning',
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
        cancelled_at: booking.cancelled_at,
        total_amount: booking.total_amount
      }));
      
      setBookings(transformedBookings);
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
