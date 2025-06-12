
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Send, Bot, User, Minimize2, X } from 'lucide-react';
import { useChatbot } from '@/contexts/ChatbotContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const IntelligentChatbot = () => {
  const { isOpen, toggleChatbot, closeChatbot } = useChatbot();
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t('chatbot.greeting'),
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [userCanScroll, setUserCanScroll] = useState(false);

  console.log('IntelligentChatbot render - isOpen:', isOpen);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: smooth ? 'smooth' : 'auto',
        block: 'end'
      });
    }
  };

  // Check if user is scrolled to bottom
  const isScrolledToBottom = () => {
    if (!messagesContainerRef.current) return true;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    return scrollTop + clientHeight >= scrollHeight - 10; // 10px threshold
  };

  // Handle scroll events
  const handleScroll = () => {
    setUserCanScroll(!isScrolledToBottom());
  };

  useEffect(() => {
    // Auto-scroll to bottom when messages change, but only if user hasn't scrolled up
    if (!userCanScroll) {
      scrollToBottom();
    }
  }, [messages, userCanScroll]);

  useEffect(() => {
    // Force scroll to bottom when chat opens
    if (isOpen) {
      setTimeout(() => scrollToBottom(false), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setUserCanScroll(false); // Auto-scroll for new messages

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('booking') || input.includes('réservation')) {
      return "I can help you with bookings! You can make a booking by going to the 'Find a Service' page and selecting a cleaner in your area. Would you like me to guide you through the process?";
    }
    
    if (input.includes('price') || input.includes('cost') || input.includes('prix') || input.includes('coût')) {
      return "Cleaning prices vary based on location, service type, and duration. Most cleaners charge between $25-45 per hour. You can see exact pricing when you select a specific cleaner on our platform.";
    }
    
    if (input.includes('tax') || input.includes('fiscal')) {
      return "HOUSIE automatically handles tax compliance for Canadian cleaning businesses. We track income, generate tax documents, and ensure you meet CRA reporting requirements. No manual paperwork needed!";
    }
    
    if (input.includes('support') || input.includes('help') || input.includes('aide')) {
      return "I'm here to help! You can ask me about bookings, pricing, tax compliance, or any other questions about using HOUSIE. What specific topic would you like assistance with?";
    }
    
    return "Thank you for your message! I'm constantly learning to better assist you. For complex questions, you can also contact our support team directly. Is there anything specific about HOUSIE I can help you with?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const restartConversation = () => {
    setMessages([{
      id: '1',
      text: t('chatbot.greeting'),
      isUser: false,
      timestamp: new Date()
    }]);
    setUserCanScroll(false);
  };

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-20 right-4 w-80 h-96 z-50 shadow-2xl border border-border bg-card text-card-foreground">
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <span className="font-medium">HOUSIE Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleChatbot}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <Minimize2 className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={closeChatbot}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex flex-col h-full">
        <div 
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-background max-h-72"
          style={{ scrollbarWidth: 'thin' }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!message.isUser && (
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              <div
                className={`max-w-[70%] rounded-lg px-3 py-2 ${
                  message.isUser
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.isUser && (
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-2 justify-start">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Scroll to bottom indicator */}
        {userCanScroll && (
          <div className="px-4 py-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                setUserCanScroll(false);
                scrollToBottom();
              }}
              className="w-full text-xs"
            >
              ↓ Scroll to bottom
            </Button>
          </div>
        )}
        
        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-2 mb-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('chatbot.typeMessage')}
              className="flex-1 bg-background border-input text-foreground placeholder:text-muted-foreground"
              disabled={isTyping}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputValue.trim() || isTyping}
              size="icon"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={restartConversation}
            className="w-full text-xs"
          >
            {t('chatbot.restart')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
