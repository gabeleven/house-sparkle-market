
import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Search, MessageCircle, Mail, HelpCircle } from 'lucide-react';
import { EnhancedFAQSection } from '../components/support/EnhancedFAQSection';
import { ContactForm } from '../components/support/ContactForm';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../components/ui/breadcrumb';

export { Page };

function Page() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('faq');

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Support</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Comment pouvons-nous vous aider?</h1>
          <p className="text-muted-foreground">
            Nous sommes là pour vous aider à tirer le meilleur parti de Housie. Recherchez dans notre FAQ ou contactez notre équipe de support.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Rechercher des articles d'aide, guides et réponses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>

        {/* Support Options */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              FAQ & Guides
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Nous Contacter
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faq">
            <EnhancedFAQSection searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="contact">
            <ContactForm />
          </TabsContent>
        </Tabs>

        {/* Quick Contact Info */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Support par Email</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Obtenez de l'aide par email sous 24 heures
              </p>
              <a href="mailto:support@housie.ca" className="text-primary hover:underline">
                support@housie.ca
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <HelpCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">FAQ</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Trouvez des réponses instantanées aux questions courantes
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setActiveTab('faq')}
              >
                Parcourir FAQ
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
