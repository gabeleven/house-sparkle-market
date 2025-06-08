
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MessageCircle, Mail, Phone, HelpCircle } from 'lucide-react';
import { FAQSection } from '@/components/support/FAQSection';
import { LiveChatWidget } from '@/components/support/LiveChatWidget';
import { ContactForm } from '@/components/support/ContactForm';
import { useChatbot } from '@/contexts/ChatbotContext';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

const Support = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { openChatbot, setShowGoodbyeMessage } = useChatbot();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('faq');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  // Handle chatbot navigation
  useEffect(() => {
    const section = searchParams.get('section');
    const chatbotParam = searchParams.get('chatbot');
    
    if (section === 'contact') {
      setActiveTab('contact');
    }
    
    if (chatbotParam === 'goodbye') {
      setShowGoodbyeMessage(true);
      setTimeout(() => {
        openChatbot('support');
      }, 500);
    }
  }, [searchParams, setActiveTab, openChatbot, setShowGoodbyeMessage]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Support</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">How can we help you?</h1>
          <p className="text-muted-foreground">
            We're here to help you get the most out of Housie. Search our FAQ or get in touch with our support team.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search for help articles, guides, and answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>

        {/* Support Options */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              FAQ & Guides
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Live Chat
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contact Us
            </TabsTrigger>
          </TabsList>

          <TabsContent value="faq">
            <FAQSection searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="chat">
            <LiveChatWidget />
          </TabsContent>

          <TabsContent value="contact">
            <ContactForm />
          </TabsContent>
        </Tabs>

        {/* Quick Contact Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Get help via email within 24 hours
              </p>
              <a href="mailto:support@housie.ca" className="text-primary hover:underline">
                support@housie.ca
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Chat with our team in real-time
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setActiveTab('chat')}
              >
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <HelpCircle className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">FAQ</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Find instant answers to common questions
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setActiveTab('faq')}
              >
                Browse FAQ
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;
