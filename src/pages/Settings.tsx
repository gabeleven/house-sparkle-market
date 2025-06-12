
import React from 'react';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Bell, Shield, User, CreditCard, Moon, Sun, Globe, Mail, Phone } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';

const Settings = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Paramètres</h1>
            <p className="text-muted-foreground mt-2">
              Gérez vos préférences de compte et de confidentialité
            </p>
          </div>

          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-primary" />
                <CardTitle>Profil</CardTitle>
              </div>
              <CardDescription>
                Gérez vos informations personnelles et vos préférences de profil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  placeholder="Votre nom complet"
                />
              </div>
              <Button>Sauvegarder les modifications</Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-primary" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>
                Choisissez comment vous souhaitez être notifié
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Notifications par email</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevez des emails pour les nouvelles réservations et messages
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Notifications push</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications instantanées dans votre navigateur
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Notifications SMS</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevez des SMS pour les réservations urgentes
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Moon className="w-5 h-5 text-primary" />
                <CardTitle>Apparence</CardTitle>
              </div>
              <CardDescription>
                Personnalisez l'apparence de l'application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Thème</Label>
                  <p className="text-sm text-muted-foreground">
                    Basculer entre le mode clair et sombre
                  </p>
                </div>
                <ThemeToggle />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Langue</Label>
                  <p className="text-sm text-muted-foreground">
                    Choisir la langue de l'interface
                  </p>
                </div>
                <LanguageToggle />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <CardTitle>Confidentialité et sécurité</CardTitle>
              </div>
              <CardDescription>
                Gérez vos paramètres de confidentialité et de sécurité
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Profil public</Label>
                  <p className="text-sm text-muted-foreground">
                    Permettre aux autres utilisateurs de voir votre profil
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Données d'utilisation</Label>
                  <p className="text-sm text-muted-foreground">
                    Partager des données anonymes pour améliorer le service
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-3">
                <Label className="text-base">Authentification à deux facteurs</Label>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    Non configuré
                  </Badge>
                  <Button variant="outline" size="sm">
                    Activer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <CardTitle>Facturation</CardTitle>
              </div>
              <CardDescription>
                Gérez votre abonnement et vos méthodes de paiement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Plan actuel</p>
                  <p className="text-sm text-muted-foreground">Plan Gratuit</p>
                </div>
                <Badge>Gratuit</Badge>
              </div>
              <Separator />
              <div className="space-y-2">
                <Button className="w-full">Mettre à niveau vers Pro</Button>
                <Button variant="outline" className="w-full">
                  Gérer les méthodes de paiement
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader>
              <CardTitle>Support</CardTitle>
              <CardDescription>
                Besoin d'aide ? Contactez notre équipe support
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <div className="text-left">
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-muted-foreground">support@housie.ca</p>
                    </div>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto p-4">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <div className="text-left">
                      <p className="font-medium">Téléphone</p>
                      <p className="text-sm text-muted-foreground">1-800-HOUSIE-1</p>
                    </div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Zone de danger</CardTitle>
              <CardDescription>
                Actions irréversibles concernant votre compte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
                  Désactiver le compte
                </Button>
                <p className="text-sm text-muted-foreground">
                  Votre compte sera désactivé temporairement
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Button variant="destructive">
                  Supprimer le compte
                </Button>
                <p className="text-sm text-muted-foreground">
                  Cette action est irréversible et supprimera toutes vos données
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;
