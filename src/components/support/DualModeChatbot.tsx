
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, User } from 'lucide-react';
import { useChatbot } from '@/contexts/ChatbotContext';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  options?: string[];
}

const getWelcomeMessage = (mode: 'support' | 'homepage') => {
  switch (mode) {
    case 'support':
      return {
        content: 'Hello! I\'m here to help you with any questions about Housie. What can I assist you with today?',
        options: [
          'How do I book a provider?',
          'I can\'t find my booking confirmation',
          'How do I change my subscription?',
          'What if I\'m not satisfied with the service?',
          'Talk to support'
        ]
      };
    default:
      return {
        content: 'Welcome to Housie! 👋 I\'m your personal assistant. How can I help you get started with finding the perfect service provider?',
        options: [
          'How does Housie work?',
          'Find providers near me',
          'What services are available?',
          'How much does it cost?',
          'Is my area covered?',
          'Talk to support'
        ]
      };
  }
};

export const DualModeChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { mode, showGoodbyeMessage, navigateToSupport } = useChatbot();

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize messages when component mounts or mode changes
  useEffect(() => {
    if (showGoodbyeMessage) {
      setMessages([{
        id: '1',
        type: 'bot',
        content: 'Perfect! I\'ve brought you to our support team. They\'ll take great care of you from here. Thanks for using Housie! 😊',
        timestamp: new Date()
      }]);
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
  }, [mode, showGoodbyeMessage]);

  const getBotResponse = (userMessage: string): string => {
    try {
      const lower = userMessage.toLowerCase();
      
      // Homepage mode responses
      if (mode === 'homepage') {
        if (lower.includes('how does housie work') || lower === 'How does Housie work?') {
          return 'Housie connects you with verified service providers in your area. You can browse profiles, read reviews, compare prices, and book services directly through our platform. It\'s simple, secure, and convenient!';
        }
        if (lower.includes('find providers') || lower.includes('near me')) {
          return 'Great! You can find providers by clicking "Browse Services" on the homepage, or I can guide you through what to expect when searching for providers in your area.';
        }
        if (lower.includes('services')) {
          return 'We offer a wide range of services! Our providers offer cleaning, maintenance, repairs, and specialized services. Each provider lists their specific expertise on their profile.';
        }
        if (lower.includes('cost') || lower.includes('price')) {
          return 'Pricing is transparent and varies by provider and service type. Most charge between $25-45/hour. You can see exact rates on each provider\'s profile before booking. No hidden fees!';
        }
        if (lower.includes('area') || lower.includes('covered')) {
          return 'We cover most major Canadian cities! You can check availability in your area by entering your postal code on the homepage. If we don\'t serve your area yet, you can join our waitlist.';
        }
      }

      // Support mode responses
      if (lower.includes('book') || lower.includes('réserver')) {
        return `**Here's how to book a provider on Housie:**

1. **Browse Providers**: Click "Find Providers Near Me" on the homepage
2. **Choose Your Provider**: Look at profiles, ratings, and reviews  
3. **Select Services**: Choose what type of service you need
4. **Pick Your Date**: Select when you'd like the service
5. **Confirm & Pay**: Review details and complete payment

Would you like help with any specific part of the booking process?`;
      }

      // Common responses for all modes
      if (lower.includes('talk to support') || lower.includes('human support') || lower === 'Talk to support') {
        // Show goodbye message and navigate
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            type: 'bot',
            content: 'Perfect! I\'ve brought you to our support team. They\'ll take great care of you from here. Thanks for using Housie! 😊',
            timestamp: new Date()
          }]);
          setTimeout(() => {
            navigateToSupport();
          }, 2000);
        }, 1000);
        return 'Connecting you with our human support team...';
      }

      return 'I\'d be happy to help with that! Could you provide a bit more detail about what you\'re looking for?';
    } catch (error) {
      console.error('Error getting bot response:', error);
      return 'I apologize, but I\'m having trouble processing your request right now. Please try again.';
    }
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
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      const botResponse = getBotResponse(userMessage);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  return (
    <div className="flex flex-col h-full">
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0"
        style={{ 
          overscrollBehavior: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-blue-500' : 'bg-primary'}`}>
                    {message.type === 'user' ? <User className="w-3 h-3 text-white" /> : <Bot className="w-3 h-3 text-white" />}
                  </div>
                  <div className={`rounded-lg p-3 text-sm ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-muted'}`}>
                    <p className="whitespace-pre-line">{message.content}</p>
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
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
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
        </div>
        <div ref={messagesEndRef} />
      </div>

      {!showGoodbyeMessage && (
        <div className="border-t p-4 bg-card">
          <div className="flex items-center space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 h-8 text-sm"
            />
            <Button size="sm" onClick={() => handleSendMessage()} className="h-8 w-8 p-0">
              <Send className="w-3 h-3" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
