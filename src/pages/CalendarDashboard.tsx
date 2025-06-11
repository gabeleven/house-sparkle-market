
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck, Clock, Zap, Brain } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

const CalendarDashboard = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAvailable, setIsAvailable] = useState(true);

  // Mock tier - in real app this would come from user subscription
  const currentTier = 'professional'; // This should come from context/props

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const getTierFeatures = (tier: string) => {
    const features = {
      free: {
        syncStatus: 'Not Available',
        syncColor: 'destructive',
        hasConflictDetection: false,
        hasAIOptimization: false
      },
      starter: {
        syncStatus: 'Connected',
        syncColor: 'default',
        hasConflictDetection: false,
        hasAIOptimization: false
      },
      professional: {
        syncStatus: 'Connected',
        syncColor: 'default',
        hasConflictDetection: true,
        hasAIOptimization: false
      },
      premium: {
        syncStatus: 'Connected',
        syncColor: 'default',
        hasConflictDetection: true,
        hasAIOptimization: true
      }
    };
    return features[tier as keyof typeof features] || features.free;
  };

  const tierFeatures = getTierFeatures(currentTier);

  // Mock appointments
  const mockAppointments = [
    { date: new Date(2024, 11, 15), client: 'Marie L.', time: '09:00', service: 'Ménage résidentiel' },
    { date: new Date(2024, 11, 16), client: 'Jean D.', time: '14:00', service: 'Nettoyage bureaux' },
    { date: new Date(2024, 11, 18), client: 'Sophie M.', time: '10:30', service: 'Grand ménage' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Calendrier</h1>
              <p className="text-muted-foreground">Gérez vos disponibilités et rendez-vous</p>
            </div>
            
            {/* Status Indicators */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Badge variant={tierFeatures.syncColor as any} className="flex items-center gap-2">
                <CalendarCheck className="w-4 h-4" />
                Google Calendar: {tierFeatures.syncStatus}
              </Badge>
              
              {tierFeatures.hasConflictDetection && (
                <Badge variant="default" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Détection de conflits: Active
                </Badge>
              )}
              
              {tierFeatures.hasAIOptimization && (
                <Badge variant="secondary" className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Optimisation IA: Activée
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Calendrier du mois</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Availability & Appointments */}
            <div className="space-y-6">
              {/* Availability Toggle */}
              <Card>
                <CardHeader>
                  <CardTitle>Disponibilité</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Statut actuel</span>
                    <Badge variant={isAvailable ? 'default' : 'destructive'}>
                      {isAvailable ? 'Disponible' : 'Indisponible'}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant={isAvailable ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setIsAvailable(true)}
                      className="flex-1"
                    >
                      Disponible
                    </Button>
                    <Button 
                      variant={!isAvailable ? 'destructive' : 'outline'}
                      size="sm"
                      onClick={() => setIsAvailable(false)}
                      className="flex-1"
                    >
                      Indisponible
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle>Prochains rendez-vous</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockAppointments.map((appointment, index) => (
                      <div key={index} className="flex flex-col p-3 rounded-lg border bg-muted/50">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{appointment.client}</span>
                          <span className="text-sm text-muted-foreground">{appointment.time}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{appointment.service}</span>
                        <span className="text-xs text-muted-foreground">
                          {appointment.date.toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarDashboard;
