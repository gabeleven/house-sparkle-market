
import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ChevronDown, ChevronUp, Search, Shield, Calculator, FileText, Users, Settings, HelpCircle } from 'lucide-react';
import { TaxComplianceOverview, TaxBenefitsSection, TaxDashboardPreview } from '../tax/TaxComplianceContent';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  // General Questions
  {
    category: 'general',
    question: 'How does HOUSIE work?',
    answer: 'HOUSIE connects service providers with customers across Canada. Providers can create profiles, offer services, and manage bookings while customers can search, book, and pay for services through our secure platform.'
  },
  {
    category: 'general',
    question: 'Which cities does HOUSIE serve?',
    answer: 'HOUSIE operates across Canada, with service providers available in major cities and towns. Use our search function to find providers in your specific location.'
  },
  
  // For Service Providers
  {
    category: 'providers',
    question: 'How do I become a service provider on HOUSIE?',
    answer: 'Sign up for a provider account, complete your profile with services offered, upload verification documents, and start receiving booking requests from customers in your area.'
  },
  {
    category: 'providers',
    question: 'What are the fees for service providers?',
    answer: 'HOUSIE charges a competitive platform fee on completed bookings. View our pricing page for detailed fee structures and subscription options.'
  },
  {
    category: 'providers',
    question: 'How do I get paid?',
    answer: 'Payments are processed securely and transferred to your account according to your selected payment schedule. All transactions are tracked for tax compliance purposes.'
  },
  
  // Account & Settings
  {
    category: 'account',
    question: 'How do I update my profile information?',
    answer: 'Go to your profile page and click "Edit Profile" to update your information, services, pricing, and availability.'
  },
  {
    category: 'account',
    question: 'How do I change my password?',
    answer: 'Navigate to Settings > Security to change your password or enable two-factor authentication for added security.'
  },
  
  // Tax & Compliance
  {
    category: 'tax',
    question: 'Is HOUSIE compliant with CRA requirements?',
    answer: 'Yes, HOUSIE is fully compliant with Canada Revenue Agency (CRA) requirements for Digital Platform Operators. We automatically track and report qualifying transactions as required by federal tax regulations.'
  },
  {
    category: 'tax',
    question: 'What tax documents will I receive?',
    answer: 'Service providers receive automated tax documents including T4A slips, annual income summaries, and detailed transaction reports. All documents are available for download from your provider dashboard.'
  },
  {
    category: 'tax',
    question: 'How does the new 2025 tax law affect me?',
    answer: 'The new 2025 regulations require tracking income for 30+ transactions OR $2,800+ annually. HOUSIE automatically handles this compliance, so you can focus on growing your business.'
  },
  {
    category: 'tax',
    question: 'Can I track my expenses through HOUSIE?',
    answer: 'Yes, our provider dashboard includes expense tracking tools to help you manage deductible business expenses and calculate your net income for tax purposes.'
  }
];

const categories = [
  { id: 'all', label: 'All Questions', icon: HelpCircle },
  { id: 'general', label: 'General', icon: Users },
  { id: 'providers', label: 'For Providers', icon: Settings },
  { id: 'account', label: 'Account & Settings', icon: Settings },
  { id: 'tax', label: 'Tax & Compliance', icon: Shield }
];

interface EnhancedFAQSectionProps {
  searchQuery?: string;
}

export const EnhancedFAQSection: React.FC<EnhancedFAQSectionProps> = ({ searchQuery = '' }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const toggleExpanded = (question: string) => {
    setExpandedItems(prev => 
      prev.includes(question) 
        ? prev.filter(item => item !== question)
        : [...prev, question]
    );
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = !localSearchQuery || 
      faq.question.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(localSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (activeCategory === 'tax') {
    return (
      <div className="space-y-8">
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map(category => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <IconComponent className="w-4 h-4" />
                  {category.label}
                </Button>
              );
            })}
          </div>
          
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search tax and compliance questions..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <TaxComplianceOverview />
        <TaxDashboardPreview />
        <TaxBenefitsSection />

        {/* Tax-specific FAQs */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Tax & Compliance FAQs</h3>
          {filteredFAQs.map((faq, index) => (
            <Card key={index} className="transition-all hover:shadow-md">
              <CardContent className="p-0">
                <Button
                  variant="ghost"
                  className="w-full p-6 text-left justify-between h-auto"
                  onClick={() => toggleExpanded(faq.question)}
                >
                  <span className="font-medium">{faq.question}</span>
                  {expandedItems.includes(faq.question) ? (
                    <ChevronUp className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 flex-shrink-0" />
                  )}
                </Button>
                {expandedItems.includes(faq.question) && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(category => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center gap-2"
              >
                <IconComponent className="w-4 h-4" />
                {category.label}
              </Button>
            );
          })}
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search help articles and guides..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredFAQs.map((faq, index) => (
          <Card key={index} className="transition-all hover:shadow-md">
            <CardContent className="p-0">
              <Button
                variant="ghost"
                className="w-full p-6 text-left justify-between h-auto"
                onClick={() => toggleExpanded(faq.question)}
              >
                <span className="font-medium">{faq.question}</span>
                {expandedItems.includes(faq.question) ? (
                  <ChevronUp className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 flex-shrink-0" />
                )}
              </Button>
              {expandedItems.includes(faq.question) && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <HelpCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse different categories.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
