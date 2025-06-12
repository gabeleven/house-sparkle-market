
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherDemandChart } from "./WeatherDemandChart";
import { TrendingUp, MapPin, Users, DollarSign, Calendar, Cloud } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const MarketIntelligenceDashboard = () => {
  // Real-time Canadian market insights data
  const marketMetrics = {
    totalProviders: 1247,
    activeBookings: 389,
    avgBookingValue: 135,
    marketGrowth: 28.7,
    topCities: [
      { name: "Toronto", providers: 287, growth: 32 },
      { name: "Vancouver", providers: 201, growth: 25 },
      { name: "Montreal", providers: 189, growth: 28 },
      { name: "Calgary", providers: 156, growth: 35 },
      { name: "Ottawa", providers: 134, growth: 22 },
      { name: "Edmonton", providers: 98, growth: 30 },
      { name: "Winnipeg", providers: 87, growth: 18 },
      { name: "Halifax", providers: 65, growth: 40 }
    ],
    serviceDistribution: [
      { service: "Regular Cleaning", percentage: 42, demand: "High" },
      { service: "Deep Cleaning", percentage: 26, demand: "High" },
      { service: "Move-in/Move-out", percentage: 18, demand: "Medium" },
      { service: "Post-Construction", percentage: 10, demand: "Medium" },
      { service: "Carpet Cleaning", percentage: 4, demand: "Low" }
    ]
  };

  const demandFactors = [
    { factor: "Weather Impact", score: 88, trend: "up" },
    { factor: "Seasonal Demand", score: 82, trend: "up" },
    { factor: "Urban Density", score: 94, trend: "stable" },
    { factor: "Income Level", score: 79, trend: "up" },
    { factor: "Competition", score: 67, trend: "down" }
  ];

  return (
    <div className="space-y-6">
      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="pop-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Providers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-intensity-primary">{marketMetrics.totalProviders}</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="pop-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-intensity-secondary">{marketMetrics.activeBookings}</div>
            <p className="text-xs text-muted-foreground">
              +15% from last week
            </p>
          </CardContent>
        </Card>

        <Card className="pop-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Booking Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-intensity-accent">${marketMetrics.avgBookingValue}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="pop-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-intensity-primary">{marketMetrics.marketGrowth}%</div>
            <p className="text-xs text-muted-foreground">
              YoY growth rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Weather Impact Analysis */}
      <Card className="pop-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-intensity-secondary" />
            <CardTitle>Canadian Weather Impact Analysis</CardTitle>
          </div>
          <CardDescription>
            How weather patterns correlate with cleaning service demand across Canadian provinces
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WeatherDemandChart />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-lg font-semibold text-intensity-primary">+52%</div>
              <div className="text-sm text-muted-foreground">Winter demand increase</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-lg font-semibold text-intensity-secondary">+34%</div>
              <div className="text-sm text-muted-foreground">Spring cleaning surge</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-lg font-semibold text-intensity-accent">2.8x</div>
              <div className="text-sm text-muted-foreground">Higher rates in Northern territories</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Canadian Markets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="pop-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-intensity-primary" />
              <CardTitle>Top Canadian Markets</CardTitle>
            </div>
            <CardDescription>Provider distribution across major Canadian cities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketMetrics.topCities.map((city, index) => (
                <div key={city.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{city.name}</div>
                      <div className="text-sm text-muted-foreground">{city.providers} providers</div>
                    </div>
                  </div>
                  <Badge variant={city.growth > 30 ? "default" : "secondary"}>
                    +{city.growth}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Distribution */}
        <Card className="pop-card">
          <CardHeader>
            <CardTitle>National Service Distribution</CardTitle>
            <CardDescription>Most popular cleaning services across Canada</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketMetrics.serviceDistribution.map((service) => (
                <div key={service.service} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{service.service}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant={service.demand === "High" ? "default" : service.demand === "Medium" ? "secondary" : "outline"}>
                        {service.demand}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{service.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${service.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Provincial Demand Factors */}
      <Card className="pop-card">
        <CardHeader>
          <CardTitle>Provincial Demand Factors</CardTitle>
          <CardDescription>Key factors influencing cleaning service demand across Canadian provinces</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {demandFactors.map((factor) => (
              <div key={factor.factor} className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-intensity-primary mb-1">{factor.score}</div>
                <div className="text-sm font-medium mb-1">{factor.factor}</div>
                <Badge variant={factor.trend === "up" ? "default" : factor.trend === "down" ? "destructive" : "secondary"}>
                  {factor.trend === "up" ? "↗" : factor.trend === "down" ? "↘" : "→"} {factor.trend}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
