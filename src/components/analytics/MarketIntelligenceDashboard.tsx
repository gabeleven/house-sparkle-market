
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Users, DollarSign, MapPin, Cloud, BarChart3, Activity } from 'lucide-react';
import { WeatherDemandChart } from './WeatherDemandChart';
import { Skeleton } from '@/components/ui/skeleton';

const MarketIntelligenceDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [marketMetrics, setMarketMetrics] = useState<any[]>([]);

  useEffect(() => {
    // Simulate loading time for market data
    const loadMarketData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const metrics = [
        {
          title: "National Market Size",
          value: "$2.8B",
          change: "+12.3%",
          description: "Total Canadian cleaning services market",
          icon: DollarSign,
          trend: "up"
        },
        {
          title: "Active Service Providers",
          value: "24,891",
          change: "+8.7%",
          description: "Registered cleaning professionals nationwide",
          icon: Users,
          trend: "up"
        },
        {
          title: "Monthly Bookings",
          value: "156K",
          change: "+15.2%",
          description: "Total bookings across all provinces",
          icon: TrendingUp,
          trend: "up"
        },
        {
          title: "Geographic Coverage",
          value: "98.5%",
          change: "+2.1%",
          description: "Population coverage across Canada",
          icon: MapPin,
          trend: "up"
        }
      ];
      
      setMarketMetrics(metrics);
      setIsLoading(false);
    };

    loadMarketData();
  }, []);

  const provincialData = [
    { province: "Ontario", bookings: 45234, growth: "+14.2%", providers: 8956 },
    { province: "Quebec", bookings: 32156, growth: "+11.8%", providers: 6234 },
    { province: "British Columbia", bookings: 28945, growth: "+16.7%", providers: 5678 },
    { province: "Alberta", bookings: 19876, growth: "+13.4%", providers: 3892 },
    { province: "Manitoba", bookings: 8734, growth: "+9.2%", providers: 1567 },
    { province: "Saskatchewan", bookings: 6523, growth: "+7.8%", providers: 1234 },
    { province: "Nova Scotia", bookings: 5432, growth: "+8.9%", providers: 987 },
    { province: "New Brunswick", bookings: 3456, growth: "+6.5%", providers: 678 }
  ];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-64" />
          <Skeleton className="h-4 w-96" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Loading metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                      <Skeleton className="h-8 w-8 rounded" />
                    </div>
                    <Skeleton className="h-3 w-24 mt-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Loading spinner */}
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
            <div className="text-center text-muted-foreground">
              Loading Canadian market intelligence data...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary" />
          Canadian Market Intelligence Dashboard
        </CardTitle>
        <CardDescription>
          Real-time market analytics and insights across all Canadian provinces
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Market Overview</TabsTrigger>
            <TabsTrigger value="weather">Weather Correlation</TabsTrigger>
            <TabsTrigger value="provincial">Provincial Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Market Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketMetrics.map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <Card key={index} className="animate-fade-in">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                          <p className="text-2xl font-bold">{metric.value}</p>
                        </div>
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        <Badge variant={metric.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                          {metric.change}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{metric.description}</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Market Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  National Market Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">Winter Demand Surge</h4>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        48% increase in bookings during harsh weather conditions across all provinces
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">Urban Market Growth</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Metropolitan areas showing 23% higher growth rate than rural regions
                      </p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-400 mb-2">Service Innovation</h4>
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        Eco-friendly and specialized services driving 31% of new bookings
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weather" className="space-y-6">
            <WeatherDemandChart />
          </TabsContent>

          <TabsContent value="provincial" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Provincial Market Breakdown</CardTitle>
                <CardDescription>
                  Market performance and growth across Canadian provinces
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {provincialData.map((province, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{province.province}</div>
                        <div className="text-sm text-muted-foreground">
                          {province.bookings.toLocaleString()} bookings • {province.providers.toLocaleString()} providers
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-700 border-green-200">
                        {province.growth}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarketIntelligenceDashboard;
