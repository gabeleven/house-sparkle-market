
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { ServiceTypesSelector } from '@/components/profile/ServiceTypesSelector';
import { Briefcase, DollarSign, Clock, Award, Star } from 'lucide-react';

export const CleanerModeView = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save profile logic would go here
  };

  return (
    <div className="space-y-6">
      {/* Profile Information Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Profile Information
            </CardTitle>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="business-name">Business Name</Label>
                <Input
                  id="business-name"
                  placeholder="Your Cleaning Service"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="hourly-rate">Hourly Rate ($)</Label>
                <Input
                  id="hourly-rate"
                  type="number"
                  placeholder="25.00"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="service-radius">Service Radius (km)</Label>
                <Input
                  id="service-radius"
                  type="number"
                  placeholder="10"
                  disabled={!isEditing}
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  placeholder="2"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="description">Service Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your cleaning services..."
                  disabled={!isEditing}
                  rows={3}
                />
              </div>
            </div>
          </div>
          {isEditing && (
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSaveProfile}>
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Service Types Selector */}
      {user && (
        <ServiceTypesSelector cleanerId={user.id} />
      )}

      {/* Business Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Business Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Briefcase className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">47</div>
              <div className="text-sm text-muted-foreground">Jobs Completed</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm text-muted-foreground">On-time Rate</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <DollarSign className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">$2,340</div>
              <div className="text-sm text-muted-foreground">This Month</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
