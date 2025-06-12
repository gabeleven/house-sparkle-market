
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, MapPin, Brain, RefreshCw } from 'lucide-react';
import { WeatherDemandChart } from '@/components/analytics/WeatherDemandChart';
import { supabase } from '@/integrations/supabase/client';

const Intelligence = () => {
  const collectWeatherData = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('weather-data-collector');
      if (error) throw error;
      console.log('Weather data collection triggered:', data);
      // Refresh the page to show updated data
      window.location.reload();
    } catch (error) {
      console.error('Error collecting weather data:', error);
    }
  };

  // Auto-collect weather data on component mount
  useEffect(() => {
    const checkAndCollectWeatherData = async () => {
      try {
        // Check if we have today's weather data
        const today = new Date().toISOString().split('T')[0];
        const { data: existingData } = await supabase
          .from('weather_data')
          .select('id')
          .eq('date', today)
          .eq('city', 'Montreal')
          .single();

        // If no data for today, collect it
        if (!existingData) {
          await collectWeatherData();
        }
      } catch (error) {
        console.log('Weather data check completed');
      }
    };

    checkAndCollectWeatherData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Market Intelligence</h1>
          <p className="text-muted-foreground mt-2">
            AI-powered insights and market analysis for the Quebec cleaning services market
          </p>
        </div>
        <Button onClick={collectWeatherData} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Update Weather Data
        </Button>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Market Size</p>
                <p className="text-2xl font-bold">$2.4M</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Quebec cleaning market</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Providers</p>
                <p className="text-2xl font-bold">347</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">+12% this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Coverage Areas</p>
                <p className="text-2xl font-bold">23</p>
              </div>
              <MapPin className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Cities in Quebec</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI Insights</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
              <Brain className="w-8 h-8 text-orange-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Prediction accuracy</p>
          </CardContent>
        </Card>
      </div>

      {/* Weather Impact Analysis - The breakthrough AI feature */}
      <WeatherDemandChart />

      {/* Additional Intelligence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Demand Prediction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Next 7 Days</span>
                <span className="text-sm text-green-600">+23% increase</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Peak Hours</span>
                <span className="text-sm">9 AM - 2 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">High Demand Areas</span>
                <span className="text-sm">Plateau, Westmount</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Competitive Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Market Share</span>
                <span className="text-sm text-blue-600">34% HOUSIE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Avg. Service Price</span>
                <span className="text-sm">$85/hour</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Customer Retention</span>
                <span className="text-sm text-green-600">87%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI-Generated Market Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Weather Correlation</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Rainy days show 25-35% higher demand for cleaning services, especially in residential areas.
              </p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Seasonal Trends</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Spring cleaning drives 40% of annual bookings, with peak demand in March-April.
              </p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg">
              <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Geographic Patterns</h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Urban areas prefer frequent light cleaning, while suburbs book deeper monthly services.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Intelligence;
