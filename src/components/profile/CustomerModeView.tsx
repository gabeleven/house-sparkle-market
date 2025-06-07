
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Heart, CreditCard, Search, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CustomerModeView = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Main CTA */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-8 text-center">
          <Search className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Book a Cleaner</h2>
          <p className="text-muted-foreground mb-6">Find trusted cleaning professionals in your area</p>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate('/browse-cleaners')}
          >
            <Search className="w-4 h-4 mr-2" />
            Find Cleaners Near Me
          </Button>
        </CardContent>
      </Card>

      {/* Customer Dashboard */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Booking History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No bookings yet</p>
              <p className="text-sm">Your cleaning appointments will appear here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Favorite Cleaners
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Heart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No favorites yet</p>
              <p className="text-sm">Save your preferred cleaners for easy rebooking</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No payment methods</p>
              <p className="text-sm">Add a payment method for faster checkout</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              My Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No reviews yet</p>
              <p className="text-sm">Reviews you've given will appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col" onClick={() => navigate('/browse-cleaners')}>
              <Search className="w-6 h-6 mb-2" />
              <span className="text-sm">Find Cleaners</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col" disabled>
              <Clock className="w-6 h-6 mb-2" />
              <span className="text-sm">Schedule Recurring</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col" disabled>
              <Heart className="w-6 h-6 mb-2" />
              <span className="text-sm">Rebook Favorite</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col" disabled>
              <Star className="w-6 h-6 mb-2" />
              <span className="text-sm">Leave Review</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
