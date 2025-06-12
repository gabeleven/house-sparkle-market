
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { Cloud, Thermometer, TrendingUp } from 'lucide-react';
import { useEnvironmentCanadaWeather } from '@/hooks/useEnvironmentCanadaWeather';
import { Skeleton } from '@/components/ui/skeleton';

const chartConfig = {
  bookings: {
    label: "Bookings",
    color: "hsl(var(--chart-1))",
  },
  temperature: {
    label: "Temperature (°C)",
    color: "hsl(var(--chart-2))",
  },
  correlation: {
    label: "Correlation Score",
    color: "hsl(var(--chart-3))",
  },
};

export const WeatherDemandChart = () => {
  const { weatherData, correlationData, isLoading, error, refetch } = useEnvironmentCanadaWeather();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Cloud className="w-5 h-5" />
            Weather Data Error
          </CardTitle>
          <CardDescription>
            Unable to fetch Environment Canada weather data. Showing demo data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <button 
            onClick={refetch}
            className="text-sm text-primary hover:underline"
          >
            Try again
          </button>
        </CardContent>
      </Card>
    );
  }

  // Prepare data for correlation scatter plot
  const scatterData = correlationData.map(item => ({
    temperature: item.temperature,
    bookings: item.booking_count,
    city: item.city,
    correlation: item.correlation_score
  }));

  // Prepare city-wise booking data
  const cityBookingData = correlationData.reduce((acc, item) => {
    const existing = acc.find(city => city.name === item.city);
    if (existing) {
      existing.bookings += item.booking_count;
    } else {
      acc.push({
        name: item.city,
        bookings: item.booking_count,
        temperature: item.temperature,
        condition: item.weather_condition
      });
    }
    return acc;
  }, [] as any[]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Weather-Booking Correlation Scatter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-blue-500" />
            Temperature vs Booking Demand
          </CardTitle>
          <CardDescription>
            Real-time correlation between Environment Canada weather data and cleaning service bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <ScatterChart data={scatterData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="temperature" 
                type="number" 
                domain={['dataMin - 5', 'dataMax + 5']}
                label={{ value: 'Temperature (°C)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                dataKey="bookings"
                label={{ value: 'Bookings', angle: -90, position: 'insideLeft' }}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value, name, props) => {
                  if (name === 'bookings') {
                    return [`${value} bookings`, props.payload?.city || 'City'];
                  }
                  return [value, name];
                }}
              />
              <Scatter 
                dataKey="bookings" 
                fill="#3b82f6" 
                fillOpacity={0.7}
                stroke="#1d4ed8"
                strokeWidth={1}
              />
            </ScatterChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* City-wise Booking Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            Current Booking Activity by City
          </CardTitle>
          <CardDescription>
            Live booking demand across major Canadian cities based on current weather conditions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <LineChart data={cityBookingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                formatter={(value, name, props) => {
                  const payload = props.payload;
                  return [
                    `${value} bookings`,
                    `${payload?.name} (${payload?.temperature}°C, ${payload?.condition})`
                  ];
                }}
              />
              <Line 
                type="monotone" 
                dataKey="bookings" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#10b981', strokeWidth: 2 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Real-time Weather Summary */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-blue-600" />
            Live Canadian Weather Conditions
          </CardTitle>
          <CardDescription>
            Current weather data from Environment Canada stations across major cities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {weatherData.slice(0, 8).map((weather, index) => (
              <div key={index} className="p-3 bg-muted rounded-lg">
                <div className="font-medium text-sm">{weather.city}</div>
                <div className="text-xs text-muted-foreground mb-2">{weather.province}</div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">{weather.temperature}°C</span>
                  <span className="text-xs">{weather.conditions}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {weather.humidity}% humidity • {weather.wind_speed} km/h wind
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-muted-foreground text-center">
            Last updated: {weatherData[0]?.timestamp ? new Date(weatherData[0].timestamp).toLocaleString() : 'N/A'} • 
            Data source: Environment Canada
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
