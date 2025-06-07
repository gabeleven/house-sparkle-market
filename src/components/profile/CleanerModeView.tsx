
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Calendar, DollarSign, BarChart3, Star, Users, Settings, Plus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ProfileEditor } from './ProfileEditor';

export const CleanerModeView = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Main CTA */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
        <CardContent className="p-8 text-center">
          <Briefcase className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">My Cleaning Business</h2>
          <p className="text-muted-foreground mb-6">Manage your services, bookings, and grow your business</p>
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          >
            <Settings className="w-4 h-4 mr-2" />
            Complete Your Profile
          </Button>
        </CardContent>
      </Card>

      {/* Business Dashboard */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">0 bookings</p>
              <p className="text-sm">Your appointments will appear here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">$0.00</p>
              <p className="text-sm">This month's earnings</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">No reviews yet</p>
              <p className="text-sm">Customer reviews will appear here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">0 customers</p>
              <p className="text-sm">Your customer base will grow here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">Coming soon</p>
              <p className="text-sm">Business insights and metrics</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">Set up services</p>
              <p className="text-sm">Configure your cleaning offerings</p>
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
            <Button variant="outline" className="h-20 flex-col" disabled>
              <Plus className="w-6 h-6 mb-2" />
              <span className="text-sm">Add Availability</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col" disabled>
              <DollarSign className="w-6 h-6 mb-2" />
              <span className="text-sm">Update Rates</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col" disabled>
              <BarChart3 className="w-6 h-6 mb-2" />
              <span className="text-sm">View Analytics</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col" disabled>
              <Star className="w-6 h-6 mb-2" />
              <span className="text-sm">Promote Profile</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Editor for Cleaners */}
      <div id="profile-editor">
        <ProfileEditor />
      </div>
    </div>
  );
};
