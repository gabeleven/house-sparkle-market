
import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, CreditCard, User, MapPin, Star, MessageCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

interface FAQSectionProps {
  searchQuery: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'How do I book a cleaner on Housie?',
    answer: `Booking a cleaner is easy! Here's how:

1. **Find Cleaners**: Click "Find Cleaners Near Me" on the homepage or browse cleaners in your area
2. **Choose Your Cleaner**: Look at profiles, ratings, and reviews to find the right fit
3. **Select Services**: Choose what type of cleaning you need (regular, deep clean, etc.)
4. **Pick Your Date**: Select when you'd like the cleaning to happen
5. **Confirm & Pay**: Review your booking details and complete payment
6. **Get Confirmed**: You'll receive confirmation and can chat with your cleaner

💡 **Pro tip**: Check cleaner availability in advance for popular time slots like weekends!`,
    category: 'booking',
    tags: ['booking', 'how to', 'cleaner', 'schedule']
  },
  {
    id: '2',
    question: 'What payment methods does Housie accept?',
    answer: `We accept several secure payment methods:

• **Credit Cards**: Visa, Mastercard, American Express
• **Debit Cards**: Most major debit cards
• **Digital Wallets**: Apple Pay, Google Pay (coming soon)

**Payment Security**: All payments are processed securely through our encrypted payment system. Your payment information is never stored on our servers.

**When You're Charged**: Payment is processed when you confirm your booking. You'll receive an email receipt immediately.`,
    category: 'payment',
    tags: ['payment', 'credit card', 'billing', 'security']
  },
  {
    id: '3',
    question: 'Can I cancel or reschedule my booking?',
    answer: `Yes! We understand plans change. Here's our policy:

**Free Cancellation**: 
• Cancel up to 24 hours before your booking for a full refund
• Cancel 12-24 hours before for a 50% refund
• Cancel less than 12 hours before - no refund (cleaner preparation time)

**How to Cancel**:
1. Go to "My Profile" → "Booking History"
2. Find your booking and click "Cancel"
3. Choose your reason and confirm

**Rescheduling**: You can reschedule up to 12 hours before your booking, subject to cleaner availability.`,
    category: 'booking',
    tags: ['cancel', 'reschedule', 'refund', 'policy']
  },
  {
    id: '4',
    question: 'How do I update my profile information?',
    answer: `Keeping your profile updated helps us serve you better:

**Personal Information**:
1. Click your name in the top right corner
2. Select "My Profile"
3. Click the edit button next to any section
4. Save your changes

**What You Can Update**:
• Name and contact information
• Address and location
• Payment methods
• Notification preferences
• Profile photo

**Important**: Your email address is used for login, so contact support if you need to change it.`,
    category: 'account',
    tags: ['profile', 'edit', 'update', 'personal info']
  },
  {
    id: '5',
    question: 'What if I\'m not satisfied with my cleaning?',
    answer: `Your satisfaction is our priority! Here's what to do:

**Immediate Issues** (during/right after cleaning):
1. Contact your cleaner directly through the app
2. Take photos if there are specific areas of concern
3. Try to resolve directly first - most cleaners want to make it right

**If Not Resolved**:
1. Contact Housie support within 24 hours
2. Provide photos and specific details
3. We'll work with you and the cleaner to find a solution

**Our Guarantee**: If we can't resolve the issue, we'll help you find a replacement cleaner or provide a refund for unsatisfactory work.`,
    category: 'service',
    tags: ['satisfaction', 'complaint', 'quality', 'guarantee']
  },
  {
    id: '6',
    question: 'How do cleaner ratings and reviews work?',
    answer: `Our rating system helps you choose the best cleaners:

**5-Star Rating System**:
• ⭐⭐⭐⭐⭐ Excellent (5 stars)
• ⭐⭐⭐⭐ Good (4 stars)  
• ⭐⭐⭐ Average (3 stars)
• ⭐⭐ Below Average (2 stars)
• ⭐ Poor (1 star)

**Verified Reviews**: Only customers who have completed bookings can leave reviews, ensuring authenticity.

**How to Leave a Review**:
1. After your cleaning is complete, you'll get a review prompt
2. Rate your experience and write a detailed review
3. Be honest and specific - it helps other customers and cleaners improve

**Reading Reviews**: Look for recent reviews and overall patterns rather than just the star rating.`,
    category: 'reviews',
    tags: ['ratings', 'reviews', 'feedback', 'verification']
  }
];

const categories = [
  { id: 'all', name: 'All Categories', icon: Search },
  { id: 'booking', name: 'Booking & Scheduling', icon: BookOpen },
  { id: 'payment', name: 'Payment & Billing', icon: CreditCard },
  { id: 'account', name: 'Account & Profile', icon: User },
  { id: 'service', name: 'Service Issues', icon: MapPin },
  { id: 'reviews', name: 'Reviews & Ratings', icon: Star }
];

export const FAQSection: React.FC<FAQSectionProps> = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFAQs = useMemo(() => {
    let filtered = faqData;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10 p-2 h-auto"
              onClick={() => setSelectedCategory(category.id)}
            >
              <Icon className="w-3 h-3 mr-1" />
              {category.name}
            </Badge>
          );
        })}
      </div>

      {/* FAQ Results */}
      {filteredFAQs.length > 0 ? (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {filteredFAQs.length} article{filteredFAQs.length !== 1 ? 's' : ''} found
          </p>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            {filteredFAQs.map((faq) => (
              <Card key={faq.id}>
                <AccordionItem value={faq.id} className="border-none">
                  <CardHeader className="pb-2">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <CardTitle className="text-base font-medium">
                        {faq.question}
                      </CardTitle>
                    </AccordionTrigger>
                  </CardHeader>
                  <AccordionContent>
                    <CardContent className="pt-0">
                      <div className="prose prose-sm max-w-none">
                        {faq.answer.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-3 last:mb-0 whitespace-pre-line">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </AccordionContent>
                </AccordionItem>
              </Card>
            ))}
          </Accordion>
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? `No results for "${searchQuery}". Try different keywords or browse categories.`
                : 'No articles in this category. Try selecting a different category.'
              }
            </p>
            <Badge 
              variant="outline" 
              className="cursor-pointer"
              onClick={() => {
                setSelectedCategory('all');
              }}
            >
              View All Articles
            </Badge>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
