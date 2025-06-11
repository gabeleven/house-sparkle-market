
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

const commonQuestions = [
  'How do I book a cleaner?',
  'I can\'t find my booking confirmation',
  'How do I change my subscription?',
  'What if I\'m not satisfied with the cleaning?',
  'How do I cancel my booking?',
  'Payment issues'
];

const responses = {
  'how do i book': {
    en: `Great question! Here's how to book a cleaner on Housie:

1. **Browse Cleaners**: Click "Find Cleaners Near Me" on the homepage
2. **Choose Your Cleaner**: Look at profiles, ratings, and reviews
3. **Select Services**: Choose what type of cleaning you need
4. **Pick Your Date**: Select when you'd like the cleaning
5. **Confirm & Pay**: Review details and complete payment

Would you like help with any specific part of the booking process?`,
    fr: `Excellente question! Voici comment réserver un ménager sur Housie :

1. **Parcourir les ménagers**: Cliquez sur "Trouver des ménagers près de moi"
2. **Choisir votre ménager**: Regardez les profils, notes et avis
3. **Sélectionner les services**: Choisissez le type de ménage
4. **Choisir la date**: Sélectionnez quand vous voulez le ménage
5. **Confirmer et payer**: Vérifiez les détails et payez

Avez-vous besoin d'aide pour une étape spécifique?`
  },
  'booking confirmation': {
    en: `I can help you find your booking confirmation! Here are a few ways to locate it:

1. **Check your email**: Look for an email from support@housie.ca with your booking details
2. **My Profile**: Go to "My Profile" → "Booking History" to see all your bookings
3. **Messages**: Check your messages with the cleaner for booking details

If you still can't find it, I can help you get in touch with our support team. What's your email address associated with the booking?`,
    fr: `Je peux vous aider à trouver votre confirmation de réservation! Voici quelques façons de la localiser :

1. **Vérifiez vos emails**: Cherchez un email de support@housie.ca avec vos détails
2. **Mon Profil**: Allez à "Mon Profil" → "Historique des réservations"
3. **Messages**: Vérifiez vos messages avec le ménager

Si vous ne la trouvez toujours pas, je peux vous aider à contacter notre équipe. Quelle est votre adresse email?`
  },
  'change subscription': {
    en: `I can help you with subscription changes! Here's what you can do:

**To Upgrade**: Go to "HOUSIE Pro" in the navigation and select a higher tier plan
**To Downgrade**: This requires contacting our support team to ensure you don't lose data
**To Cancel**: You can cancel anytime from your profile settings

Which type of change are you looking to make? I can provide more specific guidance.`,
    fr: `Je peux vous aider avec les changements d'abonnement! Voici ce que vous pouvez faire :

**Pour mettre à niveau**: Allez à "HOUSIE Pro" et sélectionnez un plan supérieur
**Pour rétrograder**: Contactez notre équipe pour ne pas perdre de données
**Pour annuler**: Vous pouvez annuler depuis les paramètres de profil

Quel type de changement voulez-vous faire? Je peux vous donner des conseils plus spécifiques.`
  },
  'not satisfied': {
    en: `I understand your concern about the cleaning quality. Here's what we can do:

**Immediate Steps**:
1. Contact your cleaner directly through the app first
2. Take photos of any specific areas of concern
3. Try to resolve directly - most cleaners want to make it right

**If Not Resolved**:
1. Contact Housie support within 24 hours
2. We'll work with you and the cleaner to find a solution
3. Our satisfaction guarantee covers unsatisfactory work

Would you like me to connect you with our support team right away, or do you want to try contacting the cleaner first?`,
    fr: `Je comprends votre préoccupation concernant la qualité du ménage. Voici ce que nous pouvons faire :

**Étapes immédiates**:
1. Contactez d'abord votre ménager directement via l'app
2. Prenez des photos des zones problématiques
3. Essayez de résoudre directement - la plupart veulent bien faire

**Si pas résolu**:
1. Contactez le support Housie dans les 24h
2. Nous travaillerons avec vous pour une solution
3. Notre garantie satisfaction couvre le travail insatisfaisant

Voulez-vous que je vous connecte au support maintenant, ou préférez-vous d'abord contacter le ménager?`
  }
};

export const IntelligentChatbot: React.FC = () => {
  const { isOpen, closeChatbot } = useChatbot();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m here to help you with any questions about Housie. What can I assist you with today?',
      timestamp: new Date(),
      options: commonQuestions
    }
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  console.log('IntelligentChatbot render - isOpen:', isOpen);

  const detectLanguage = (text: string): 'en' | 'fr' => {
    const frenchWords = ['bonjour', 'salut', 'merci', 'comment', 'aide', 'problème', 'réservation'];
    const lowerText = text.toLowerCase();
    return frenchWords.some(word => lowerText.includes(word)) ? 'fr' : 'en';
  };

  const getBotResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();
    
    if (lower.includes('book') || lower.includes('réserver')) {
      return responses['how do i book'][language];
    }
    if (lower.includes('confirmation') || lower.includes('booking') || lower.includes('réservation')) {
      return responses['booking confirmation'][language];
    }
    if (lower.includes('subscription') || lower.includes('abonnement') || lower.includes('plan')) {
      return responses['change subscription'][language];
    }
    if (lower.includes('satisfied') || lower.includes('quality') || lower.includes('insatisfait') || lower.includes('qualité')) {
      return responses['not satisfied'][language];
    }
    if (lower.includes('cancel') || lower.includes('annuler')) {
      return language === 'fr' 
        ? 'Pour annuler une réservation, allez dans "Mon Profil" → "Historique des réservations" et cliquez sur "Annuler". Notez que les annulations moins de 24h avant peuvent avoir des frais.'
        : 'To cancel a booking, go to "My Profile" → "Booking History" and click "Cancel". Note that cancellations less than 24 hours before may have fees.';
    }
    if (lower.includes('payment') || lower.includes('paiement')) {
      return language === 'fr'
        ? 'Pour les problèmes de paiement, vérifiez que votre carte est valide et qu\'il y a suffisamment de fonds. Si le problème persiste, je peux vous connecter à notre équipe support.'
        : 'For payment issues, check that your card is valid and has sufficient funds. If the problem persists, I can connect you with our support team.';
    }
    
    // Default response for unrecognized queries
    return language === 'fr'
      ? 'Je ne suis pas sûr de pouvoir aider avec cette question spécifique. Voulez-vous que je vous connecte avec notre équipe support humaine qui pourra mieux vous aider?'
      : 'I\'m not sure I can help with that specific question. Would you like me to connect you with our human support team who can better assist you?';
  };

  const simulateTyping = (message: string): Promise<void> => {
    return new Promise((resolve) => {
      setIsTyping(true);
      // Simulate typing time based on message length
      const typingTime = Math.min(message.length * 30, 3000);
      setTimeout(() => {
        setIsTyping(false);
        resolve();
      }, typingTime);
    });
  };

  const handleSendMessage = async (messageText?: string) => {
    const userMessage = messageText || input.trim();
    if (!userMessage) return;

    // Detect language from user input
    const detectedLang = detectLanguage(userMessage);
    setLanguage(detectedLang);

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
      timestamp: new Date(),
      options: botResponse.includes('connect you with our') || botResponse.includes('connecter avec notre') 
        ? ['Yes, connect me to human support', 'No, I\'ll try something else'] 
        : undefined
    };

    setMessages(prev => [...prev, botMsg]);
  };

  const handleOptionClick = (option: string) => {
    if (option.includes('human support') || option.includes('support humaine')) {
      const context = messages.map(m => `${m.type}: ${m.content}`).join('\n');
      console.log('Handing off to human support with context:', context);
      return;
    }
    handleSendMessage(option);
  };

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[600px] shadow-xl z-50 flex flex-col">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <CardTitle className="text-lg">Housie Assistant</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {language === 'fr' ? 'Français' : 'English'}
            </Badge>
            <Button variant="ghost" size="sm" onClick={closeChatbot}>
              <X className="w-4 h-4" />
            </Button>
          </div>
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

        <div className="border-t p-4">
          <div className="flex items-center space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={language === 'fr' ? 'Tapez votre message...' : 'Type your message...'}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button size="sm" onClick={() => handleSendMessage()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs"
              onClick={() => console.log('Connect to human support')}
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              {language === 'fr' ? 'Parler à un humain' : 'Talk to human'}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs"
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            >
              {language === 'en' ? 'Français' : 'English'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
