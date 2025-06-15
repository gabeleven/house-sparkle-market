
import React from 'react';
import { Calendar, Clock, MapPin, Phone, User, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBookings } from '@/hooks/useBookings';
import { useAuth } from '@/hooks/useAuth';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const serviceTypeLabels = {
  deep_clean: 'Deep Clean',
  regular_clean: 'Regular Clean',
  move_in_out: 'Move-in/Move-out Clean',
  post_construction: 'Post-construction Cleanup',
  office_cleaning: 'Office Cleaning'
};

const Bookings = () => {
  const { user } = useAuth();
  const { bookings, loading, updateBookingStatus } = useBookings();
  const { toast } = useToast();

  const handleStatusUpdate = async (bookingId: string, status: 'confirmed' | 'cancelled') => {
    const success = await updateBookingStatus(bookingId, status);
    if (success) {
      toast({
        title: "Booking updated",
        description: `Booking has been ${status}`,
      });
    } else {
      toast({
        title: "Update failed",
        description: "Could not update booking status",
        variant: "destructive"
      });
    }
  };

  // Separate bookings by status
  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  const completedBookings = bookings.filter(b => b.status === 'completed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  const BookingCard = ({ booking }: { booking: any }) => (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            {serviceTypeLabels[booking.service_type as keyof typeof serviceTypeLabels]}
          </CardTitle>
          <Badge variant={
            booking.status === 'pending' ? 'outline' :
            booking.status === 'confirmed' ? 'default' :
            booking.status === 'completed' ? 'secondary' : 'destructive'
          }>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{format(new Date(booking.service_date), 'PPP')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{booking.service_time}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{booking.customer_address}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <span>{booking.customer_phone}</span>
          </div>
        </div>
        
        {booking.additional_notes && (
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm">
              <strong>Notes:</strong> {booking.additional_notes}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Duration: {booking.estimated_duration} mins • Price: ${booking.estimated_price}
          </div>
          
          {booking.status === 'pending' && booking.provider_id === user?.id && (
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
              >
                <X className="w-4 h-4 mr-1" />
                Decline
              </Button>
              <Button 
                size="sm"
                onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
              >
                <Check className="w-4 h-4 mr-1" />
                Accept
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading bookings...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground">Manage your service bookings and schedule</p>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">
              Pending ({pendingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="confirmed">
              Confirmed ({confirmedBookings.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedBookings.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({cancelledBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            {pendingBookings.length > 0 ? (
              pendingBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No pending bookings</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="confirmed">
            {confirmedBookings.length > 0 ? (
              confirmedBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No confirmed bookings</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completedBookings.length > 0 ? (
              completedBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Check className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No completed bookings yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cancelled">
            {cancelledBookings.length > 0 ? (
              cancelledBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <X className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No cancelled bookings</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Bookings;
