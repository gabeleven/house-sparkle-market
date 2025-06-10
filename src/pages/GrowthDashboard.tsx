
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { TrendingUp, Users, Target, Zap, Brain, Lock, Crown } from 'lucide-react';
import Header from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

const GrowthDashboard = () => {
  const { user } = useAuth();
  const [featuredListing, setFeaturedListing] = useState(false);
  const [premiumPlacement, setPremiumPlacement] = useState(true);
  
  // Mock tier - in real app this would come from user subscription
  const currentTier = 'professional'; // This should come from context/props
  
  const hasAccess = ['professional', 'premium'].includes(currentTier);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

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
              <h1 className="text-2xl font-bold">Outils de Croissance</h1>
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
              <h1 className="text-3xl font-bold">Croissance & Marketing</h1>
              <p className="text-muted-foreground">Développez votre entreprise avec nos outils avancés</p>
            </div>
            
            {currentTier === 'premium' && (
              <Badge variant="secondary" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Marketing Automatisé: Actif
              </Badge>
            )}
          </div>

          {/* Growth Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leads ce mois</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47</div>
                <p className="text-xs text-muted-foreground">+22% vs mois dernier</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">34%</div>
                <p className="text-xs text-muted-foreground">+5% ce mois</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nouveaux clients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">16</div>
                <p className="text-xs text-muted-foreground">+3 cette semaine</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ROI Marketing</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">320%</div>
                <p className="text-xs text-muted-foreground">Excellent retour</p>
              </CardContent>
            </Card>
          </div>

          {/* Premium Placement Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Placement Premium
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">Annonce mise en avant</h4>
                  <p className="text-sm text-muted-foreground">
                    Apparaître en premier dans les résultats de recherche
                  </p>
                </div>
                <Switch 
                  checked={featuredListing} 
                  onCheckedChange={setFeaturedListing} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">Placement premium régional</h4>
                  <p className="text-sm text-muted-foreground">
                    Priorité dans votre zone de service
                  </p>
                </div>
                <Switch 
                  checked={premiumPlacement} 
                  onCheckedChange={setPremiumPlacement} 
                />
              </div>
            </CardContent>
          </Card>

          {/* Referral Program */}
          <Card>
            <CardHeader>
              <CardTitle>Programme de Parrainage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">12</div>
                  <p className="text-sm text-muted-foreground">Parrainages envoyés</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-green-600">8</div>
                  <p className="text-sm text-muted-foreground">Conversions réussies</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-blue-600">240$</div>
                  <p className="text-sm text-muted-foreground">Bonus gagnés</p>
                </div>
              </div>
              <div className="mt-6">
                <Button className="w-full">
                  Partager mon lien de parrainage
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Marketing Campaigns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Campagnes Actives</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <h4 className="font-medium">Promotion Grand Ménage</h4>
                    <p className="text-sm text-muted-foreground">Expire dans 5 jours</p>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <h4 className="font-medium">Offre Nouveaux Clients</h4>
                    <p className="text-sm text-muted-foreground">20% de réduction</p>
                  </div>
                  <Badge variant="secondary">En attente</Badge>
                </div>
                
                <Button variant="outline" className="w-full">
                  Créer nouvelle campagne
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance des Campagnes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Promotion Grand Ménage</span>
                    <span>8 conversions</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Offre Nouveaux Clients</span>
                    <span>3 conversions</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Premium Features */}
          {currentTier === 'premium' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Marketing Automatisé (Premium)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Campagnes Automatiques</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/50">
                        <span className="text-sm">Relance clients inactifs</span>
                        <Badge variant="default">Actif</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/50">
                        <span className="text-sm">Suivi post-service</span>
                        <Badge variant="default">Actif</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Optimisation IA</h4>
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg border bg-muted/50">
                        <span className="text-sm">Meilleur moment d'envoi: Mardi 14h</span>
                      </div>
                      <div className="p-3 rounded-lg border bg-muted/50">
                        <span className="text-sm">Taux d'ouverture optimal: +45%</span>
                      </div>
                    </div>
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

export default GrowthDashboard;
