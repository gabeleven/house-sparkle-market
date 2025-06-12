
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Users, DollarSign, MapPin, Lightbulb, Target, Zap } from "lucide-react";
import { MarketIntelligenceDashboard } from "@/components/analytics/MarketIntelligenceDashboard";
import { useSubscription } from "@/hooks/useSubscription";

const Intelligence = () => {
  const { canAccessFeature } = useSubscription();

  // AI-powered insights
  const aiInsights = [
    {
      type: "opportunity",
      title: "High-Value Service Gap",
      description: "Post-construction cleaning shows 67% higher rates but low provider coverage in Laval area.",
      confidence: 92,
      impact: "High",
      icon: Target
    },
    {
      type: "trend",
      title: "Weekend Demand Surge",
      description: "Saturday bookings increased 34% this month. Consider weekend-focused providers.",
      confidence: 87,
      impact: "Medium",
      icon: TrendingUp
    },
    {
      type: "optimization",
      title: "Weather-Based Pricing",
      description: "Implement dynamic pricing: +15% during rain forecasts could increase revenue by $2,340/month.",
      confidence: 95,
      impact: "High",
      icon: Zap
    },
    {
      type: "market",
      title: "Competitor Analysis",
      description: "New competitor in Gatineau offering 20% lower rates. Monitor market response.",
      confidence: 78,
      impact: "Medium",
      icon: Users
    }
  ];

  const competitiveAdvantages = [
    { feature: "AI-Powered Matching", advantage: "35% faster booking completion vs competitors" },
    { feature: "Weather Integration", advantage: "Unique in Quebec market - no direct competitors" },
    { feature: "Real-time Availability", advantage: "50% higher customer satisfaction scores" },
    { feature: "Transparent Pricing", advantage: "22% lower customer acquisition cost" },
    { feature: "Provider Analytics", advantage: "First platform offering demand forecasting" }
  ];

  if (!canAccessFeature('PRO')) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Market Intelligence</h2>
            <p className="text-muted-foreground mb-6">
              Upgrade to Pro or Premium to access AI-powered market insights and competitive analysis.
            </p>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Pro Feature Required
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Market Intelligence</h1>
              <p className="text-muted-foreground">AI-powered insights for strategic decision making</p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
            <Lightbulb className="w-4 h-4 mr-1" />
            AI-Powered
          </Badge>
        </div>

        {/* AI Insights */}
        <Card className="pop-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-intensity-secondary" />
              AI-Generated Insights
            </CardTitle>
            <CardDescription>
              Machine learning analysis of market trends, opportunities, and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {aiInsights.map((insight, index) => {
                const IconComponent = insight.icon;
                return (
                  <div key={index} className="p-4 border border-border rounded-lg bg-card hover:bg-muted transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        insight.type === 'opportunity' ? 'bg-green-100 dark:bg-green-900/20' :
                        insight.type === 'trend' ? 'bg-blue-100 dark:bg-blue-900/20' :
                        insight.type === 'optimization' ? 'bg-purple-100 dark:bg-purple-900/20' :
                        'bg-orange-100 dark:bg-orange-900/20'
                      }`}>
                        <IconComponent className={`w-4 h-4 ${
                          insight.type === 'opportunity' ? 'text-green-600 dark:text-green-400' :
                          insight.type === 'trend' ? 'text-blue-600 dark:text-blue-400' :
                          insight.type === 'optimization' ? 'text-purple-600 dark:text-purple-400' :
                          'text-orange-600 dark:text-orange-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm">{insight.title}</h4>
                          <Badge variant={insight.impact === 'High' ? 'default' : 'secondary'} className="text-xs">
                            {insight.impact}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">Confidence:</span>
                          <div className="flex-1 bg-muted rounded-full h-1.5">
                            <div 
                              className="bg-primary h-1.5 rounded-full" 
                              style={{ width: `${insight.confidence}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium">{insight.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Market Intelligence Dashboard */}
        <MarketIntelligenceDashboard />

        {/* Competitive Analysis */}
        <Card className="pop-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-intensity-accent" />
              Competitive Advantages
            </CardTitle>
            <CardDescription>
              How HOUSIE differentiates from competitors in the Quebec market
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {competitiveAdvantages.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="font-medium">{item.feature}</div>
                  <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                    {item.advantage}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Intelligence;
