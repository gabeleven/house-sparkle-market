
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, X, MessageCircle, ArrowRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatbot } from '@/contexts/ChatbotContext';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  options?: string[];
  isTyping?: boolean;
}

interface DualModeChatbotProps {
  onHandoffToHuman?: (context: string) => void;
}

const getWelcomeMessage = (mode: 'support' | 'homepage' | 'how-it-works') => {
  switch (mode) {
    case 'support':
      return {
        content: 'Hello! I\'m here to help you with any questions about Housie. What can I assist you with today?',
        options: [
          'How do I book a cleaner?',
          'I can\'t find my booking confirmation',
          'How do I change my subscription?',
          'What if I\'m not satisfied with the cleaning?',
          'Talk to human support'
        ]
      };
    case 'how-it-works':
      return {
        content: 'Welcome to the "How Housie Works" guide! I can explain each step in detail. Which one interests you most?',
        options: [
          'Step 1: Finding cleaners in your area',
          'Step 2: Comparing profiles and reviews', 
          'Step 3: Booking and scheduling',
          'Step 4: Rating your experience',
          'How do pricing and payments work?'
        ]
      };
    default: // homepage
      return {
        content: 'Welcome to Housie! 👋 I\'m your personal assistant. How can I help you get started with finding the perfect cleaner?',
        options: [
          'How does Housie work?',
          'Find cleaners near me',
          'What services are available?',
          'How much does it cost?',
          'Is my area covered?',
          'Talk to support'
        ]
      };
  }
};

const getStepDetails = (step: string) => {
  switch (step) {
    case 'Step 1: Finding cleaners in your area':
      return `**Finding cleaners is super easy!** 🔍

• **Location-based search**: We automatically detect your location or you can enter your postal code
• **Verified professionals**: All cleaners are background-checked and verified
• **Real-time availability**: See who's available when you need them
• **Distance radius**: Adjust how far you want to search (5km to 50km)
• **Service filters**: Filter by specific services like deep cleaning, regular maintenance, or specialized tasks

Pro tip: Our map view shows cleaner locations and lets you see their service areas visually!`;

    case 'Step 2: Comparing profiles and reviews':
      return `**Make informed decisions with detailed profiles!** ⭐

• **Real customer reviews**: Read authentic feedback from previous clients
• **Photo galleries**: See before/after photos of their work
• **Service specialties**: Each cleaner lists their expertise (apartments, houses, offices, etc.)
• **Pricing transparency**: Clear hourly rates with no hidden fees
• **Response times**: See how quickly they typically respond to messages
• **Verification badges**: Insurance, background checks, and ID verification status

The star rating system helps you quickly identify top-performing cleaners in your area!`;

    case 'Step 3: Booking and scheduling':
      return `**Seamless booking in just a few clicks!** 📅

• **Real-time calendar**: See actual availability, no back-and-forth
• **Instant confirmation**: Most bookings are confirmed within minutes
• **Flexible scheduling**: One-time, weekly, bi-weekly, or monthly services
• **Custom instructions**: Add specific requests or access instructions
• **Secure payments**: Pay safely through the platform
• **Automatic reminders**: Get notifications before your appointment

You can also message your cleaner directly to discuss any special requirements!`;

    case 'Step 4: Rating your experience':
      return `**Help build our community of excellence!** 🌟

• **Easy rating system**: Rate your experience with just a few taps
• **Photo reviews**: Upload before/after photos to help other customers
• **Detailed feedback**: Share what went well and areas for improvement
• **Tip your cleaner**: Add a tip directly through the app if you're happy
• **Rebook easily**: One-click rebooking with cleaners you love
• **Support guarantee**: If something's not right, our team will help resolve it

Your reviews help other customers find great cleaners and help cleaners improve their services!`;

    case 'How do pricing and payments work?':
      return `**Transparent and fair pricing!** 💰

• **Clear hourly rates**: No hidden fees or surprise charges
• **Secure payments**: All transactions processed safely through Stripe
• **Flexible options**: Pay per session or set up recurring payments
• **Cancellation policy**: Free cancellation up to 24 hours before
• **Tip included**: Option to add gratuity for exceptional service
• **Business receipts**: Get proper invoices for tax purposes

Most cleaners charge between $25-$45/hour depending on services and location.`;

    default:
      return 'I\'d be happy to help with more details! What specific aspect would you like to know more about?';
  }
};

export const DualModeChatbot: React.FC<DualModeChatbotProps> = ({
  onHandoffToHuman
}) => {
  const { isOpen, mode, closeChatbot, navigateToHowItWorks, navigateToSupport, showGoodbyeMessage, setShowGoodbyeMessage } = useChatbot();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize messages when mode changes or chatbot opens
  useEffect(() => {
    if (isOpen) {
      if (showGoodbyeMessage) {
        setMessages([{
          id: '1',
          type: 'bot',
          content: 'Perfect! I\'ve brought you to our support team. They\'ll take great care of you from here. Thanks for using Housie! 😊',
          timestamp: new Date()
        }]);
        // Auto-close after showing goodbye message
        setTimeout(() => {
          closeChatbot();
        }, 3000);
      } else {
        const welcomeMsg = getWelcomeMessage(mode);
        setMessages([{
          id: '1',
          type: 'bot',
          content: welcomeMsg.content,
          timestamp: new Date(),
          options: welcomeMsg.options
        }]);
      }
    }
  }, [isOpen, mode, showGoodbyeMessage, closeChatbot]);

  const simulateTyping = (message: string): Promise<void> => {
    return new Promise((resolve) => {
      setIsTyping(true);
      const typingTime = Math.min(message.length * 30, 2000);
      setTimeout(() => {
        setIsTyping(false);
        resolve();
      }, typingTime);
    });
  };

  const getBotResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();
    
    // Homepage mode responses
    if (mode === 'homepage') {
      if (lower.includes('how does housie work') || lower === 'How does Housie work?') {
        navigateToHowItWorks();
        return 'Let me show you how Housie works! Taking you to our step-by-step guide...';
      }
      if (lower.includes('find cleaners') || lower.includes('near me')) {
        return 'Great! You can find cleaners by clicking "Trouver des ménagers près de moi" on the homepage, or I can guide you through what to expect when searching for cleaners in your area.';
      }
      if (lower.includes('services')) {
        return 'We offer a wide range of cleaning services! Our cleaners provide regular house cleaning, deep cleaning, apartment cleaning, office cleaning, move-in/move-out cleaning, and specialized services. Each cleaner lists their specific expertise on their profile.';
      }
      if (lower.includes('cost') || lower.includes('price')) {
        return 'Pricing is transparent and varies by cleaner and service type. Most charge between $25-45/hour. You can see exact rates on each cleaner\'s profile before booking. No hidden fees!';
      }
      if (lower.includes('area') || lower.includes('covered')) {
        return 'We cover most major Canadian cities! You can check availability in your area by entering your postal code on the homepage. If we don\'t serve your area yet, you can join our waitlist.';
      }
    }

    // How-it-works mode responses
    if (mode === 'how-it-works') {
      if (lower.includes('step 1') || lower.includes('finding cleaners')) {
        return getStepDetails('Step 1: Finding cleaners in your area');
      }
      if (lower.includes('step 2') || lower.includes('comparing')) {
        return getStepDetails('Step 2: Comparing profiles and reviews');
      }
      if (lower.includes('step 3') || lower.includes('booking')) {
        return getStepDetails('Step 3: Booking and scheduling');
      }
      if (lower.includes('step 4') || lower.includes('rating')) {
        return getStepDetails('Step 4: Rating your experience');
      }
      if (lower.includes('pricing') || lower.includes('payments')) {
        return getStepDetails('How do pricing and payments work?');
      }
    }

    // Support mode responses (existing logic)
    if (lower.includes('book') || lower.includes('réserver')) {
      return `**Here's how to book a cleaner on Housie:**

1. **Browse Cleaners**: Click "Find Cleaners Near Me" on the homepage
2. **Choose Your Cleaner**: Look at profiles, ratings, and reviews  
3. **Select Services**: Choose what type of cleaning you need
4. **Pick Your Date**: Select when you'd like the cleaning
5. **Confirm & Pay**: Review details and complete payment

Would you like help with any specific part of the booking process?`;
    }

    // Common responses for all modes
    if (lower.includes('talk to support') || lower.includes('human support') || lower === 'Talk to support') {
      navigateToSupport();
      return 'Connecting you with our human support team...';
    }

    return 'I\'d be happy to help with that! Could you provide a bit more detail about what you\'re looking for?';
  };

  const handleSendMessage = async (messageText?: string) => {
    const userMessage = messageText || input.trim();
    if (!userMessage) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate bot typing
    await simulateTyping(userMessage);

    // Get bot response
    const botResponse = getBotResponse(userMessage);
    
    // Add bot response
    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: botResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  if (!isOpen) return null;

  const getModeTitle = () => {
    switch (mode) {
      case 'support': return 'Housie Support';
      case 'how-it-works': return 'How Housie Works';
      default: return 'Housie Assistant';
    }
  };

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[600px] shadow-xl z-50 flex flex-col">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <CardTitle className="text-lg">{getModeTitle()}</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={closeChatbot}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0 flex flex-col">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-blue-500' : 'bg-primary'}`}>
                      {message.type === 'user' ? <User className="w-3 h-3 text-white" /> : <Bot className="w-3 h-3 text-white" />}
                    </div>
                    <div className={`rounded-lg p-3 ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-muted'}`}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                  </div>
                </div>
                
                {message.options && (
                  <div className="flex flex-wrap gap-2 ml-8">
                    {message.options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {!showGoodbyeMessage && (
          <div className="border-t p-4">
            <div className="flex items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button size="sm" onClick={() => handleSendMessage()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
