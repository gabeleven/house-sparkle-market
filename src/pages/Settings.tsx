
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  CreditCard, 
  Plug, 
  Building2, 
  Shield, 
  Globe, 
  Bell, 
  Brain,
  Calendar,
  FileText,
  Zap,
  Crown
} from 'lucide-react';
import Header from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { SubscriptionTier, SUBSCRIPTION_PLANS, hasStarterOrHigher, hasProOrHigher, isPremium } from '@/types/subscription';

const Settings = () => {
  const { user } = useAuth();
  
  // Mock tier - in real app this would come from subscription hook
  const currentTier: SubscriptionTier = 'PRO';
  
  // Form states
  const [firstName, setFirstName] = useState('Jean');
  const [lastName, setLastName] = useState('Services de Ménage Pro');
  const [businessName, setBusinessName] = useState('Services de Ménage Pro');
  const [phone, setPhone] = useState('+1 (514) 555-0123');
  const [notifications, setNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const getTierBadge = (tier: SubscriptionTier) => {
    const plan = SUBSCRIPTION_PLANS[tier];
    const config = {
      'FREE': { color: 'secondary' },
      'STARTER': { color: 'default' },
      'PRO': { color: 'default' },
      'PREMIUM': { color: 'destructive' }
    };
    
    const tierConfig = config[tier];
    return <Badge variant={tierConfig.color as any} className="whitespace-nowrap">{plan.name}</Badge>;
  };

  const getUsageMetrics = (tier: SubscriptionTier) => {
    const metrics = {
      'FREE': { bookings: '7/10', storage: '0.5/2 GB' },
      'STARTER': { bookings: '28/∞', storage: '2.1/10 GB' },
      'PRO': { bookings: '45/∞', storage: '8.5/50 GB' },
      'PREMIUM': { bookings: '67/∞', storage: '15.2/100 GB' }
    };
    return metrics[tier];
  };

  const isStarterPlus = hasStarterOrHigher(currentTier);
  const isProfessionalPlus = hasProOrHigher(currentTier);
  const isPremiumTier = isPremium(currentTier);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Paramètres</h1>
            <p className="text-muted-foreground">Gérez votre compte et vos préférences</p>
          </div>

          <Tabs defaultValue="account" className="space-y-6">
            <div className="overflow-x-auto">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 min-w-max lg:min-w-0">
                <TabsTrigger value="account" className="whitespace-nowrap">Compte</TabsTrigger>
                <TabsTrigger value="subscription" className="whitespace-nowrap">Abonnement</TabsTrigger>
                <TabsTrigger value="integrations" className="whitespace-nowrap">Intégrations</TabsTrigger>
                {isStarterPlus && <TabsTrigger value="business" className="whitespace-nowrap">Entreprise</TabsTrigger>}
                {isPremiumTier && <TabsTrigger value="intelligence" className="whitespace-nowrap">Intelligence</TabsTrigger>}
              </TabsList>
            </div>

            {/* Account Settings */}
            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate">Informations du Profil</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input 
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input 
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      value={user.email || ''}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input 
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <Label>Langue</Label>
                      <p className="text-sm text-muted-foreground">Français (Canada)</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">Changer</Button>
                  </div>

                  <Separator />
                  
                  <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button variant="outline" className="w-full sm:w-auto">Annuler</Button>
                    <Button className="w-full sm:w-auto">Sauvegarder</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate">Préférences de Notification</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1 min-w-0 flex-1">
                      <Label>Notifications par email</Label>
                      <p className="text-sm text-muted-foreground">Recevoir les mises à jour importantes</p>
                    </div>
                    <Switch checked={notifications} onCheckedChange={setNotifications} className="flex-shrink-0" />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1 min-w-0 flex-1">
                      <Label>Emails marketing</Label>
                      <p className="text-sm text-muted-foreground">Conseils et promotions</p>
                    </div>
                    <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} className="flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Subscription Management */}
            <TabsContent value="subscription" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate">Plan Actuel</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-medium truncate">{currentTier}</h3>
                      <p className="text-sm text-muted-foreground">Plan actuel</p>
                    </div>
                    {getTierBadge(currentTier)}
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Utilisation ce mois</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="truncate">Réservations</span>
                          <span className="flex-shrink-0">{getUsageMetrics(currentTier).bookings}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: currentTier === 'FREE' ? '70%' : '45%' }}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="truncate">Stockage</span>
                          <span className="flex-shrink-0">{getUsageMetrics(currentTier).storage}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '25%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-medium truncate">Passer à un plan supérieur</p>
                      <p className="text-sm text-muted-foreground">Débloquez plus de fonctionnalités</p>
                    </div>
                    <Button className="w-full sm:w-auto">Voir les plans</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Integration Settings */}
            <TabsContent value="integrations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plug className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate">Intégrations Disponibles</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border rounded-lg gap-4">
                    <div className="flex items-center space-x-3 min-w-0 flex-1">
                      <Calendar className="w-6 h-6 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium truncate">Google Calendar</h4>
                        <p className="text-sm text-muted-foreground truncate">
                          {isStarterPlus ? 'Synchronisation bidirectionnelle' : 'Synchronisation basique'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <Badge variant="secondary">Connecté</Badge>
                      <Button variant="outline" size="sm">Configurer</Button>
                    </div>
                  </div>

                  {isProfessionalPlus && (
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border rounded-lg gap-4">
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <FileText className="w-6 h-6 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium truncate">QuickBooks</h4>
                          <p className="text-sm text-muted-foreground truncate">Synchronisation comptable automatique</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <Badge variant="outline">Non connecté</Badge>
                        <Button variant="outline" size="sm">Connecter</Button>
                      </div>
                    </div>
                  )}

                  {isPremiumTier && (
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border rounded-lg gap-4">
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <Brain className="w-6 h-6 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium truncate">Intelligence Marché IA</h4>
                          <p className="text-sm text-muted-foreground truncate">Analyse prédictive et recommandations</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <Badge variant="default">Actif</Badge>
                        <Button variant="outline" size="sm">Paramètres IA</Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Business Preferences */}
            {isStarterPlus && (
              <TabsContent value="business" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 flex-shrink-0" />
                      <span className="truncate">Informations d'Entreprise</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Nom de l'entreprise</Label>
                      <Input 
                        id="businessName"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="businessNumber">Numéro d'entreprise</Label>
                        <Input id="businessNumber" placeholder="123456789 RC 0001" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gstNumber">Numéro de TPS/TVH</Label>
                        <Input id="gstNumber" placeholder="123456789 RT 0001" />
                      </div>
                    </div>

                    {isProfessionalPlus && (
                      <div className="space-y-3">
                        <Separator />
                        <h4 className="font-medium">Préférences Fiscales Avancées</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <Label className="truncate">Calcul automatique TPS/TVQ</Label>
                            <Switch defaultChecked className="flex-shrink-0" />
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <Label className="truncate">Rapports mensuels automatiques</Label>
                            <Switch defaultChecked className="flex-shrink-0" />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                      <Button variant="outline" className="w-full sm:w-auto">Annuler</Button>
                      <Button className="w-full sm:w-auto">Sauvegarder</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Market Intelligence */}
            {isPremiumTier && (
              <TabsContent value="intelligence" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 flex-shrink-0" />
                      <span className="truncate">Intelligence Marché</span>
                      <Crown className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center py-12">
                      <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Fonctionnalité à Venir</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        L'intelligence marché alimentée par l'IA sera bientôt disponible pour analyser 
                        les tendances du marché et optimiser vos prix automatiquement.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>

          {/* Privacy & Data Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">Confidentialité et Données</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1 min-w-0 flex-1">
                  <Label>Partage de données anonymes</Label>
                  <p className="text-sm text-muted-foreground">
                    Aider à améliorer nos services avec des données anonymisées
                  </p>
                </div>
                <Switch checked={dataSharing} onCheckedChange={setDataSharing} className="flex-shrink-0" />
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-medium">Conformité RGPD</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Télécharger mes données</span>
                  </Button>
                  <Button variant="outline" className="justify-start text-destructive">
                    <Shield className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Supprimer mon compte</span>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Conformément au RGPD, vous avez le droit d'accéder, de modifier ou de supprimer vos données personnelles.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
