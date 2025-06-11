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
    const configs = {
      [SubscriptionTier.FREE]: { label: 'CRA Ready', color: 'pop-blue' },
      [SubscriptionTier.STARTER]: { label: 'Tax Basics', color: 'pop-orange' },
      [SubscriptionTier.PROFESSIONAL]: { label: 'Most Popular', color: 'pop-orange' },
      [SubscriptionTier.PREMIUM]: { label: 'Business Intelligence', color: 'pop-blue' }
    };
    
    const config = configs[tier];
    return <Badge className={`badge-pop-${config.color === 'pop-orange' ? 'orange' : 'blue'}`}>{config.label}</Badge>;
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

  const isPremium = (currentTier as string) === (SubscriptionTier.PREMIUM as string);
  const isStarterPlus = (currentTier as string) !== (SubscriptionTier.FREE as string);
  const isProfessionalPlus = (currentTier as string) === (SubscriptionTier.PROFESSIONAL as string) || (currentTier as string) === (SubscriptionTier.PREMIUM as string);

  return (
    <div className="min-h-screen bg-background dots-pattern-sm">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Paramètres
              <span className="text-pop-orange">.</span>
            </h1>
            <p className="text-foreground/70 text-lg">Gérez votre compte et vos préférences</p>
          </div>

          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 bg-card border-2 border-pop-orange rounded-xl p-1">
              <TabsTrigger value="account" className="data-[state=active]:bg-pop-orange data-[state=active]:text-white">Compte</TabsTrigger>
              <TabsTrigger value="subscription" className="data-[state=active]:bg-pop-blue data-[state=active]:text-pop-dark">Abonnement</TabsTrigger>
              <TabsTrigger value="integrations" className="data-[state=active]:bg-pop-orange data-[state=active]:text-white">Intégrations</TabsTrigger>
              {isStarterPlus && <TabsTrigger value="business" className="data-[state=active]:bg-pop-blue data-[state=active]:text-pop-dark">Entreprise</TabsTrigger>}
              {isPremium && <TabsTrigger value="intelligence" className="data-[state=active]:bg-pop-orange data-[state=active]:text-white">Intelligence</TabsTrigger>}
            </TabsList>

            {/* Account Settings */}
            <TabsContent value="account" className="space-y-6">
              <Card className="card-pop-art border-pop-orange">
                <CardHeader className="border-b border-pop-orange/20">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <User className="w-5 h-5 text-pop-orange" />
                    Informations du Profil
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-foreground font-medium">Prénom</Label>
                      <Input 
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="border-2 border-border focus:border-pop-orange"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-foreground font-medium">Nom</Label>
                      <Input 
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="border-2 border-border focus:border-pop-blue"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
                    <Input 
                      id="email"
                      value={user.email || ''}
                      disabled
                      className="bg-muted border-2 border-muted"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground font-medium">Téléphone</Label>
                    <Input 
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="border-2 border-border focus:border-pop-orange"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-pop-blue/5 rounded-lg border border-pop-blue/20">
                    <div className="space-y-1">
                      <Label className="text-foreground font-medium">Langue</Label>
                      <p className="text-sm text-foreground/70">Français (Canada)</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-pop-blue text-pop-blue hover:bg-pop-blue hover:text-white">
                      Changer
                    </Button>
                  </div>

                  <Separator className="bg-pop-orange/20" />
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" className="border-border hover:bg-muted">Annuler</Button>
                    <Button className="btn-pop-orange">Sauvegarder</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-pop-art border-pop-blue">
                <CardHeader className="border-b border-pop-blue/20">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Bell className="w-5 h-5 text-pop-blue" />
                    Préférences de Notification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center justify-between p-4 bg-pop-orange/5 rounded-lg border border-pop-orange/20">
                    <div className="space-y-1">
                      <Label className="text-foreground font-medium">Notifications par email</Label>
                      <p className="text-sm text-foreground/70">Recevoir les mises à jour importantes</p>
                    </div>
                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-pop-blue/5 rounded-lg border border-pop-blue/20">
                    <div className="space-y-1">
                      <Label className="text-foreground font-medium">Emails marketing</Label>
                      <p className="text-sm text-foreground/70">Conseils et promotions</p>
                    </div>
                    <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Subscription Management */}
            <TabsContent value="subscription" className="space-y-6">
              <Card className="card-pop-art border-pop-orange">
                <CardHeader className="border-b border-pop-orange/20">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <CreditCard className="w-5 h-5 text-pop-orange" />
                    Plan Actuel
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-xl text-foreground">{currentTier.toUpperCase()}</h3>
                      <p className="text-sm text-foreground/70">Plan actuel</p>
                    </div>
                    {getTierBadge(currentTier)}
                  </div>
                  
                  <Separator className="bg-pop-orange/20" />
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Utilisation ce mois</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2 p-4 bg-pop-orange/5 rounded-lg border border-pop-orange/20">
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground font-medium">Réservations</span>
                          <span className="text-pop-orange font-bold">{getUsageMetrics(currentTier).bookings}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3 border">
                          <div 
                            className="bg-gradient-to-r from-pop-orange to-pop-blue h-3 rounded-full transition-all duration-500" 
                            style={{ width: (currentTier as string) === (SubscriptionTier.FREE as string) ? '70%' : '45%' }}
                          />
                        </div>
                      </div>
                      <div className="space-y-2 p-4 bg-pop-blue/5 rounded-lg border border-pop-blue/20">
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground font-medium">Stockage</span>
                          <span className="text-pop-blue font-bold">{getUsageMetrics(currentTier).storage}</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3 border">
                          <div className="bg-gradient-to-r from-pop-blue to-pop-orange h-3 rounded-full transition-all duration-500" style={{ width: '25%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="bg-pop-orange/20" />
                  
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-pop-orange/10 to-pop-blue/10 rounded-lg border-2 border-pop-orange/20">
                    <div>
                      <p className="font-medium text-foreground">Passer à un plan supérieur</p>
                      <p className="text-sm text-foreground/70">Débloquez plus de fonctionnalités</p>
                    </div>
                    <Button className="btn-pop-blue text-pop-dark">Voir les plans</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Integration Settings */}
            <TabsContent value="integrations" className="space-y-6">
              <Card className="card-pop-art border-pop-blue">
                <CardHeader className="border-b border-pop-blue/20">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Plug className="w-5 h-5 text-pop-blue" />
                    Intégrations Disponibles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center justify-between p-4 border-2 border-pop-orange/20 rounded-lg hover:bg-pop-orange/5 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-6 h-6 text-pop-orange" />
                      <div>
                        <h4 className="font-medium text-foreground">Google Calendar</h4>
                        <p className="text-sm text-foreground/70">
                          {isStarterPlus ? 'Synchronisation bidirectionnelle' : 'Synchronisation basique'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="badge-pop-blue">Connecté</Badge>
                      <Button variant="outline" size="sm" className="border-pop-orange text-pop-orange hover:bg-pop-orange hover:text-white">
                        Configurer
                      </Button>
                    </div>
                  </div>

                  {isProfessionalPlus && (
                    <div className="flex items-center justify-between p-4 border-2 border-pop-blue/20 rounded-lg hover:bg-pop-blue/5 transition-colors">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-6 h-6 text-pop-blue" />
                        <div>
                          <h4 className="font-medium text-foreground">QuickBooks</h4>
                          <p className="text-sm text-foreground/70">Synchronisation comptable automatique</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="border-muted text-foreground/60">Non connecté</Badge>
                        <Button variant="outline" size="sm" className="border-pop-blue text-pop-blue hover:bg-pop-blue hover:text-white">
                          Connecter
                        </Button>
                      </div>
                    </div>
                  )}

                  {isPremium && (
                    <div className="flex items-center justify-between p-4 border-2 border-pop-orange/20 rounded-lg hover:bg-pop-orange/5 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Brain className="w-6 h-6 text-pop-orange" />
                        <div>
                          <h4 className="font-medium text-foreground">Intelligence Marché IA</h4>
                          <p className="text-sm text-foreground/70">Analyse prédictive et recommandations</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="badge-pop-orange">Actif</Badge>
                        <Button variant="outline" size="sm" className="border-pop-orange text-pop-orange hover:bg-pop-orange hover:text-white">
                          Paramètres IA
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Business Preferences */}
            {isStarterPlus && (
              <TabsContent value="business" className="space-y-6">
                <Card className="card-pop-art border-pop-orange">
                  <CardHeader className="border-b border-pop-orange/20">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Building2 className="w-5 h-5 text-pop-orange" />
                      Informations d'Entreprise
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
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
                      <Button variant="outline" className="border-border hover:bg-muted">Annuler</Button>
                      <Button className="btn-pop-orange">Sauvegarder</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Market Intelligence */}
            {isPremium && (
              <TabsContent value="intelligence" className="space-y-6">
                <Card className="card-pop-art border-pop-blue">
                  <CardHeader className="border-b border-pop-blue/20">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Brain className="w-5 h-5 text-pop-blue" />
                      Intelligence Marché
                      <Crown className="w-4 h-4 text-pop-orange" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6">
                    <div className="text-center py-12 dots-pattern-md rounded-lg">
                      <Zap className="w-16 h-16 text-pop-orange mx-auto mb-4 animate-pulse" />
                      <h3 className="text-2xl font-bold mb-2 text-foreground">Fonctionnalité à Venir</h3>
                      <p className="text-foreground/70 max-w-md mx-auto text-lg">
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
          <Card className="card-pop-art border-pop-blue">
            <CardHeader className="border-b border-pop-blue/20">
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Shield className="w-5 h-5 text-pop-blue" />
                Confidentialité et Données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between p-4 bg-pop-orange/5 rounded-lg border border-pop-orange/20">
                <div className="space-y-1">
                  <Label className="text-foreground font-medium">Partage de données anonymes</Label>
                  <p className="text-sm text-foreground/70">
                    Aider à améliorer nos services avec des données anonymisées
                  </p>
                </div>
                <Switch checked={dataSharing} onCheckedChange={setDataSharing} />
              </div>
              
              <Separator className="bg-pop-blue/20" />
              
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Conformité RGPD</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start border-pop-blue text-pop-blue hover:bg-pop-blue hover:text-white">
                    <Globe className="w-4 h-4 mr-2" />
                    Télécharger mes données
                  </Button>
                  <Button variant="outline" className="justify-start border-destructive text-destructive hover:bg-destructive hover:text-white">
                    <Shield className="w-4 h-4 mr-2" />
                    Supprimer mon compte
                  </Button>
                </div>
                <p className="text-xs text-foreground/60 p-3 bg-muted/30 rounded-lg">
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

</edits_to_apply>
