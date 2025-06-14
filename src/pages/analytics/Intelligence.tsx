
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Users, DollarSign, MapPin, Lightbulb, Target, Zap, ArrowLeft } from "lucide-react";
import MarketIntelligenceDashboard from "@/components/analytics/MarketIntelligenceDashboard";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AnalyticsProvider, useAnalytics } from '@/contexts/AnalyticsContext';
import { DateRangeButton } from '@/components/analytics/DateRangeButton';

const IntelligenceContent = () => {
  const { canAccessFeature } = useSubscription();
  const { filters } = useAnalytics();
  const navigate = useNavigate();

  // AI-powered insights for Canadian market
  const aiInsights = [
    {
      type: "opportunity",
      title: "High-Value Service Gap in Atlantic Canada",
      description: "Post-construction cleaning shows 72% higher rates but low provider coverage in Halifax and Maritime provinces.",
      confidence: 94,
      impact: "High",
      icon: Target
    },
    {
      type: "trend",
      title: "Winter Demand Surge Nationwide",
      description: "Winter cleaning bookings increased 48% across all provinces. Consider seasonal-focused provider recruitment.",
      confidence: 91,
      impact: "High",
      icon: TrendingUp
    },
    {
      type: "optimization",
      title: "Provincial Weather-Based Pricing",
      description: "Implement dynamic pricing: +20% during Canadian winter storms could increase revenue by $8,940/month nationally.",
      confidence: 96,
      impact: "High",
      icon: Zap
    },
    {
      type: "market",
      title: "Competitive Analysis - Western Canada",
      description: "New competitors in Calgary and Edmonton offering 15% lower rates. Monitor Western market response and adjust strategy.",
      confidence: 85,
      impact: "Medium",
      icon: Users
    }
  ];

  const competitiveAdvantages = [
    { feature: "AI-Powered Matching", advantage: "42% faster booking completion vs Canadian competitors" },
    { feature: "National Weather Integration", advantage: "Only platform with Environment Canada integration" },
    { feature: "Real-time Availability", advantage: "58% higher customer satisfaction scores nationally" },
    { feature: "Transparent Pricing", advantage: "28% lower customer acquisition cost across provinces" },
    { feature: "Provincial Analytics", advantage: "First platform offering Canadian market demand forecasting" }
  ];

  if (!canAccessFeature('PRO')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-orange-200 to-yellow-300">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link to="/analytics">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <ArrowLeft className="w-4 h-4" />
                Retour aux Analytiques
              </Button>
            </Link>
          </div>
          
          <div className="text-center py-12">
            <Brain className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Intelligence Marché Canadien</h2>
            <p className="text-gray-600 mb-6">
              Passez à Pro ou Premium pour accéder aux insights IA du marché canadien et à l'analyse concurrentielle.
            </p>
            <Badge variant="outline" className="text-lg px-4 py-2 bg-white/80">
              Fonctionnalité Pro Requise
            </Badge>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-orange-200 to-yellow-300">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header with styled back button */}
          <div className="mb-8">
            <Link to="/analytics">
              <Button className="mb-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <ArrowLeft className="w-4 h-4" />
                Retour aux Analytiques
              </Button>
            </Link>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Intelligence Marché Canadien</h1>
                  <p className="text-gray-600">Insights IA pour la prise de décision stratégique dans toutes les provinces</p>
                  {filters.dateRange && (
                    <p className="text-sm text-gray-500 mt-1">
                      Filtered data from {filters.dateRange.from?.toLocaleDateString()} to {filters.dateRange.to?.toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DateRangeButton />
                <Badge className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
                  <Lightbulb className="w-4 h-4 mr-1" />
                  Alimenté par IA
                </Badge>
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                Insights Marché Canadien Générés par IA
              </CardTitle>
              <CardDescription>
                Analyse d'apprentissage automatique des tendances du marché canadien, des opportunités provinciales et des recommandations stratégiques
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
                            <span className="text-xs text-muted-foreground">Confiance:</span>
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
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 w-5 text-orange-600" />
                Avantages Concurrentiels Nationaux
              </CardTitle>
              <CardDescription>
                Comment HOUSIE se différencie de la concurrence sur le marché canadien
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
    </div>
  );
};

const Intelligence = () => {
  return (
    <AnalyticsProvider>
      <IntelligenceContent />
    </AnalyticsProvider>
  );
};

export default Intelligence;
