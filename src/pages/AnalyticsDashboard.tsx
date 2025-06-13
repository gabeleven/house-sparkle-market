
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, PieChart, BarChart3, Brain, Lock, FileText, LineChart, Target } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from 'recharts';
import { AnalyticsLoadingSkeleton } from '@/components/analytics/AnalyticsLoadingSkeleton';
import { NavigationTooltip } from '@/components/navigation/NavigationTooltip';

const AnalyticsDashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock tier - in real app this would come from user subscription
  const currentTier = 'professional';
  
  const hasAccess = ['professional', 'premium'].includes(currentTier as string);

  // Simulate loading for smooth transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (isLoading) {
    return <AnalyticsLoadingSkeleton />;
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
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-fade-in">
          <div className="p-4 rounded-full bg-muted/50">
            <Lock className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Business Analytics</h1>
            <p className="text-muted-foreground max-w-md">
              Cette fonctionnalité est disponible avec les plans Professional et Premium.
            </p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Passer au plan Professional
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 lg:py-8 animate-fade-in">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Business Analytics</h1>
            <p className="text-muted-foreground text-sm lg:text-base">Comprehensive business intelligence and performance insights</p>
          </div>
          
          {(currentTier as string) === 'premium' && (
            <Badge variant="secondary" className="flex items-center gap-2 w-fit">
              <Brain className="w-4 h-4" />
              <span className="text-xs lg:text-sm">Intelligence Marché: Active</span>
            </Badge>
          )}
        </div>

        {/* Analytics Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <NavigationTooltip content="View detailed business insights and analytics">
            <Link to="/analytics/insights" className="block h-full">
              <Card className="h-full hover:shadow-lg transition-all duration-200 hover-scale cursor-pointer border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-foreground">Business Insights</CardTitle>
                  <LineChart className="h-5 w-5 text-blue-600 flex-shrink-0" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-2">Revenue trends, service analytics, and customer insights</p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80">
                    View Insights →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </NavigationTooltip>

          <NavigationTooltip content="Monitor KPIs and performance metrics">
            <Link to="/analytics/performance" className="block h-full">
              <Card className="h-full hover:shadow-lg transition-all duration-200 hover-scale cursor-pointer border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-foreground">Performance</CardTitle>
                  <Target className="h-5 w-5 text-orange-600 flex-shrink-0" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-2">KPIs, efficiency metrics, and goal tracking</p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80">
                    View Performance →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </NavigationTooltip>

          <NavigationTooltip content="Access tax documents and compliance reports">
            <Link to="/analytics/reports" className="block h-full">
              <Card className="h-full hover:shadow-lg transition-all duration-200 hover-scale cursor-pointer border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-foreground">Tax & Reports</CardTitle>
                  <FileText className="h-5 w-5 text-green-600 flex-shrink-0" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-2">Tax compliance, earnings reports, and official documents</p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80">
                    View Reports →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </NavigationTooltip>

          <NavigationTooltip content="AI-powered market analysis (Premium feature)">
            <Link to="/analytics/intelligence" className="block h-full">
              <Card className="h-full hover:shadow-lg transition-all duration-200 hover-scale cursor-pointer border-border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-foreground">Market Intelligence</CardTitle>
                  <Brain className="h-5 w-5 text-purple-600 flex-shrink-0" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-2">AI-powered market analysis and competitive insights</p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80">
                    View Intelligence →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </NavigationTooltip>
        </div>

        {/* Performance Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground truncate">Taux de conversion</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-foreground">23.5%</div>
              <p className="text-xs text-muted-foreground">+2.1% ce mois</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground truncate">Valeur moyenne</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-foreground">95$</div>
              <p className="text-xs text-muted-foreground">+5.2% ce mois</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground truncate">Clients récurrents</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-foreground">68%</div>
              <p className="text-xs text-muted-foreground">+12% ce mois</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground truncate">Note moyenne</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold text-foreground">4.8/5</div>
              <p className="text-xs text-muted-foreground">Stable</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Tendance des revenus</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }} 
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Service Types */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Répartition des services</CardTitle>
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
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }} 
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Bookings */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Réservations mensuelles</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyBookingsData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }} 
                />
                <Bar dataKey="bookings" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Premium Features */}
        {(currentTier as string) === 'premium' && (
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Brain className="w-5 h-5" />
                Intelligence Marché (Premium)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border border-border bg-muted/50">
                  <h4 className="font-medium text-foreground">Analyse concurrentielle</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Vous êtes 15% au-dessus de la moyenne du marché
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-muted/50">
                  <h4 className="font-medium text-foreground">Prédictions saisonnières</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    +25% de demande prévue en décembre
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-muted/50">
                  <h4 className="font-medium text-foreground">Opportunités de tarification</h4>
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
  );
};

export default AnalyticsDashboard;
