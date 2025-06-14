
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useProviderProfile } from '@/hooks/useProviderProfile';
import { ServiceTypesSelector } from '@/components/profile/ServiceTypesSelector';
import { serviceTypeLabels, serviceTypeIcons } from '@/utils/serviceTypes';
import { Briefcase, DollarSign, Clock, Award, Star, MapPin, Settings } from 'lucide-react';

export const CleanerModeView = () => {
  const { user } = useAuth();
  const { provider, updateProvider } = useProviderProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    business_name: '',
    bio: '',
    address: '',
    service_radius_km: 25,
    years_experience: 0,
    hourly_rate: 0
  });

  // Update form data when provider data loads
  React.useEffect(() => {
    if (provider) {
      setFormData({
        business_name: provider.business_name || '',
        bio: provider.bio || '',
        address: provider.address || '',
        service_radius_km: provider.service_radius_km || 25,
        years_experience: provider.years_experience || 0,
        hourly_rate: provider.hourly_rate || 0
      });
    }
  }, [provider]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    updateProvider.mutate(formData);
    setIsEditing(false);
  };

  // Get services from provider data
  const providerServices = provider?.services || [];

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
                  value={formData.business_name}
                  onChange={(e) => handleInputChange('business_name', e.target.value)}
                  placeholder="Your Cleaning Service"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="hourly-rate">Hourly Rate ($)</Label>
                <Input
                  id="hourly-rate"
                  type="number"
                  value={formData.hourly_rate}
                  onChange={(e) => handleInputChange('hourly_rate', parseFloat(e.target.value) || 0)}
                  placeholder="25.00"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="service-radius">Service Radius (km)</Label>
                <Input
                  id="service-radius"
                  type="number"
                  value={formData.service_radius_km}
                  onChange={(e) => handleInputChange('service_radius_km', parseInt(e.target.value) || 25)}
                  placeholder="25"
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
                  value={formData.years_experience}
                  onChange={(e) => handleInputChange('years_experience', parseInt(e.target.value) || 0)}
                  placeholder="2"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="service-area">Service Area</Label>
                <Input
                  id="service-area"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Montreal, QC"
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Label htmlFor="description">Service Description</Label>
            <Textarea
              id="description"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Describe your cleaning services..."
              disabled={!isEditing}
              rows={3}
            />
          </div>

          {/* Display current profile information when not editing */}
          {!isEditing && provider && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-3">Current Profile Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  {provider.business_name && (
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span className="font-medium">{provider.business_name}</span>
                    </div>
                  )}
                  {provider.address && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{provider.address} • {provider.service_radius_km}km radius</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  {provider.hourly_rate && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span>${provider.hourly_rate}/hour</span>
                    </div>
                  )}
                  {provider.years_experience > 0 && (
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>{provider.years_experience} years experience</span>
                    </div>
                  )}
                </div>
              </div>
              {provider.bio && (
                <div className="mt-3">
                  <p className="text-muted-foreground">{provider.bio}</p>
                </div>
              )}
            </div>
          )}

          {isEditing && (
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSaveProfile} disabled={updateProvider.isPending}>
                {updateProvider.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Services Offered Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Services Offered
          </CardTitle>
        </CardHeader>
        <CardContent>
          {providerServices.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-4">
              {providerServices.map((service) => {
                const categoryName = service.service_category?.name;
                // Map service category names to our service type system for icons
                const serviceTypeKey = categoryName?.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z_]/g, '');
                const IconComponent = serviceTypeKey && serviceTypeIcons[serviceTypeKey as keyof typeof serviceTypeIcons] 
                  ? serviceTypeIcons[serviceTypeKey as keyof typeof serviceTypeIcons] 
                  : Settings;
                
                return (
                  <Badge key={service.id} variant="secondary" className="flex items-center gap-1">
                    <IconComponent className="w-3 h-3" />
                    {service.service_category?.name || 'Service'}
                    {service.base_price && (
                      <span className="ml-1 text-green-600">
                        ${service.base_price}/{service.price_unit}
                      </span>
                    )}
                  </Badge>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No services configured yet</p>
              <p className="text-sm">Add your cleaning services below to attract customers</p>
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
              <div className="text-2xl font-bold">
                {provider?.average_rating ? provider.average_rating.toFixed(1) : '4.8'}
              </div>
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
