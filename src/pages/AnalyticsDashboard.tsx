import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, PieChart, BarChart3, Brain, Lock } from 'lucide-react';
import Header from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from 'recharts';

const AnalyticsDashboard = () => {
  const { user } = useAuth();
  
  // Mock tier - in real app this would come from user subscription
  const currentTier = 'professional'; // This should come from context/props
  
  const hasAccess = ['professional', 'premium'].includes(currentTier);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Mock data for charts
  const revenueData = [
    { month: 'Jun', revenue: 1200 },
    { month: 'Jul', revenue: 1800 },
    { month: 'Aug', revenue: 2100 },
    { month: 'Sep', revenue: 1950 },
    { month: 'Oct', revenue: 2340 },
    { month: 'Nov', revenue: 2890 }
  ];

  const serviceTypeData = [
    { name: 'Ménage résidentiel', value: 45, color: '#8884d8' },
    { name: 'Nettoyage bureaux', value: 30, color: '#82ca9d' },
    { name: 'Grand ménage', value: 15, color: '#ffc658' },
    { name: 'Autres services', value: 10, color: '#ff7c7c' }
  ];

  const monthlyBookingsData = [
    { month: 'Jun', bookings: 12 },
    { month: 'Jul', bookings: 18 },
    { month: 'Aug', bookings: 21 },
    { month: 'Sep', bookings: 19 },
    { month: 'Oct', bookings: 25 },
    { month: 'Nov', bookings: 28 }
  ];

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="p-4 rounded-full bg-muted">
              <Lock className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Analytiques Avancées</h1>
              <p className="text-muted-foreground max-w-md">
                Cette fonctionnalité est disponible avec les plans Professional et Premium.
              </p>
            </div>
            <Button>
              Passer au plan Professional
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Analytiques</h1>
              <p className="text-muted-foreground">Analysez vos performances et tendances</p>
            </div>
            
            {currentTier === 'premium' && (
              <Badge variant="secondary" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Intelligence Marché: Active
              </Badge>
            )}
          </div>

          {/* Performance Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23.5%</div>
                <p className="text-xs text-muted-foreground">+2.1% ce mois</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Valeur moyenne</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95$</div>
                <p className="text-xs text-muted-foreground">+5.2% ce mois</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clients récurrents</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">+12% ce mois</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Note moyenne</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8/5</div>
                <p className="text-xs text-muted-foreground">Stable</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Tendance des revenus</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Service Types */}
            <Card>
              <CardHeader>
                <CardTitle>Répartition des services</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={serviceTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {serviceTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Réservations mensuelles</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyBookingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Premium Features */}
          {currentTier === 'premium' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Intelligence Marché (Premium)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border bg-muted/50">
                    <h4 className="font-medium">Analyse concurrentielle</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Vous êtes 15% au-dessus de la moyenne du marché
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border bg-muted/50">
                    <h4 className="font-medium">Prédictions saisonnières</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      +25% de demande prévue en décembre
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border bg-muted/50">
                    <h4 className="font-medium">Opportunités de tarification</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Augmentation recommandée: +8%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
