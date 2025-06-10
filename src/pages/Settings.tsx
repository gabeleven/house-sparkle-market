
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
import { SubscriptionTier } from '@/types/subscription';

const Settings = () => {
  const { user } = useAuth();
  
  // Mock tier - in real app this would come from subscription simulator context
  const currentTier = SubscriptionTier.PROFESSIONAL;
  
  // Form states
  const [firstName, setFirstName] = useState('Jean');
  const [lastName, setLastName] = useState('Dupont');
  const [businessName, setBusinessName] = useState('Services de Ménage Pro');
  const [phone, setPhone] = useState('+1 (514) 555-0123');
  const [notifications, setNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const getTierBadge = (tier: SubscriptionTier) => {
    const configs = {
      [SubscriptionTier.FREE]: { label: 'CRA Ready', color: 'secondary' },
      [SubscriptionTier.STARTER]: { label: 'Tax Basics', color: 'default' },
      [SubscriptionTier.PROFESSIONAL]: { label: 'Most Popular', color: 'default' },
      [SubscriptionTier.PREMIUM]: { label: 'Business Intelligence', color: 'destructive' }
    };
    
    const config = configs[tier];
    return <Badge variant={config.color as any}>{config.label}</Badge>;
  };

  const getUsageMetrics = (tier: SubscriptionTier) => {
    const metrics = {
      [SubscriptionTier.FREE]: { bookings: '7/10', storage: '0.5/2 GB' },
      [SubscriptionTier.STARTER]: { bookings: '28/∞', storage: '2.1/10 GB' },
      [SubscriptionTier.PROFESSIONAL]: { bookings: '45/∞', storage: '8.5/50 GB' },
      [SubscriptionTier.PREMIUM]: { bookings: '67/∞', storage: '15.2/100 GB' }
    };
    return metrics[tier];
  };

  const isPremium = currentTier === SubscriptionTier.PREMIUM;
  const isStarterPlus = currentTier !== SubscriptionTier.FREE;
  const isProfessionalPlus = [SubscriptionTier.PROFESSIONAL, SubscriptionTier.PREMIUM].includes(currentTier);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Paramètres</h1>
            <p className="text-muted-foreground">Gérez votre compte et vos préférences</p>
          </div>

          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
              <TabsTrigger value="account">Compte</TabsTrigger>
              <TabsTrigger value="subscription">Abonnement</TabsTrigger>
              <TabsTrigger value="integrations">Intégrations</TabsTrigger>
              {isStarterPlus && <TabsTrigger value="business">Entreprise</TabsTrigger>}
              {isPremium && <TabsTrigger value="intelligence">Intelligence</TabsTrigger>}
            </TabsList>

            {/* Account Settings */}
            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Informations du Profil
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

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Langue</Label>
                      <p className="text-sm text-muted-foreground">Français (Canada)</p>
                    </div>
                    <Button variant="outline" size="sm">Changer</Button>
                  </div>

                  <Separator />
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Annuler</Button>
                    <Button>Sauvegarder</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Préférences de Notification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Notifications par email</Label>
                      <p className="text-sm text-muted-foreground">Recevoir les mises à jour importantes</p>
                    </div>
                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Emails marketing</Label>
                      <p className="text-sm text-muted-foreground">Conseils et promotions</p>
                    </div>
                    <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Subscription Management */}
            <TabsContent value="subscription" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Plan Actuel
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{currentTier.toUpperCase()}</h3>
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
                          <span>Réservations</span>
                          <span>{getUsageMetrics(currentTier).bookings}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: currentTier === SubscriptionTier.FREE ? '70%' : '45%' }}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Stockage</span>
                          <span>{getUsageMetrics(currentTier).storage}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '25%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Passer à un plan supérieur</p>
                      <p className="text-sm text-muted-foreground">Débloquez plus de fonctionnalités</p>
                    </div>
                    <Button>Voir les plans</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Integration Settings */}
            <TabsContent value="integrations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plug className="w-5 h-5" />
                    Intégrations Disponibles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-6 h-6" />
                      <div>
                        <h4 className="font-medium">Google Calendar</h4>
                        <p className="text-sm text-muted-foreground">
                          {isStarterPlus ? 'Synchronisation bidirectionnelle' : 'Synchronisation basique'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">Connecté</Badge>
                      <Button variant="outline" size="sm">Configurer</Button>
                    </div>
                  </div>

                  {isProfessionalPlus && (
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-6 h-6" />
                        <div>
                          <h4 className="font-medium">QuickBooks</h4>
                          <p className="text-sm text-muted-foreground">Synchronisation comptable automatique</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">Non connecté</Badge>
                        <Button variant="outline" size="sm">Connecter</Button>
                      </div>
                    </div>
                  )}

                  {isPremium && (
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Brain className="w-6 h-6" />
                        <div>
                          <h4 className="font-medium">Intelligence Marché IA</h4>
                          <p className="text-sm text-muted-foreground">Analyse prédictive et recommandations</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
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
                      <Building2 className="w-5 h-5" />
                      Informations d'Entreprise
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
                          <div className="flex items-center justify-between">
                            <Label>Calcul automatique TPS/TVQ</Label>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>Rapports mensuels automatiques</Label>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Annuler</Button>
                      <Button>Sauvegarder</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Market Intelligence */}
            {isPremium && (
              <TabsContent value="intelligence" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      Intelligence Marché
                      <Crown className="w-4 h-4 text-yellow-500" />
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
                <Shield className="w-5 h-5" />
                Confidentialité et Données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Partage de données anonymes</Label>
                  <p className="text-sm text-muted-foreground">
                    Aider à améliorer nos services avec des données anonymisées
                  </p>
                </div>
                <Switch checked={dataSharing} onCheckedChange={setDataSharing} />
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-medium">Conformité RGPD</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <Globe className="w-4 h-4 mr-2" />
                    Télécharger mes données
                  </Button>
                  <Button variant="outline" className="justify-start text-destructive">
                    <Shield className="w-4 h-4 mr-2" />
                    Supprimer mon compte
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
