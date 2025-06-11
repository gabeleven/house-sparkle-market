
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Bot, Users, Clock } from 'lucide-react';
import { useChatbot } from '@/contexts/ChatbotContext';

export const LiveChatWidget = () => {
  const { openChatbot } = useChatbot();
  const [showHumanChat, setShowHumanChat] = useState(false);

  const handleChatbotClick = () => {
    openChatbot('live-chat-widget');
  };

  const handleChatbotHandoff = (context: string) => {
    console.log('Handing off to human support with context:', context);
    setShowHumanChat(true);
    // In a real implementation, this would send the context to your human support system
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* AI Assistant Card */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleChatbotClick}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">AI Assistant</CardTitle>
                <p className="text-sm text-muted-foreground">Instant answers to common questions</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                Available 24/7
              </div>
              <p className="text-sm">
                Get immediate help with booking, payments, account issues, and more. Our AI assistant can resolve most questions instantly in English or French.
              </p>
              <Button className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Chat
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Human Support Card */}
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowHumanChat(true)}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Human Support</CardTitle>
                <p className="text-sm text-muted-foreground">Talk to our support team</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                Mon-Fri 9AM-6PM EST
              </div>
              <p className="text-sm">
                For complex issues or when you need personalized assistance, connect directly with our support team who can provide detailed help.
              </p>
              <Button variant="outline" className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Live Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How it Works */}
      <Card>
        <CardHeader>
          <CardTitle>How Our Support Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bot className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">1. Start with AI</h3>
              <p className="text-sm text-muted-foreground">
                Our AI assistant handles 80% of questions instantly - from booking help to account issues.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">2. Escalate if Needed</h3>
              <p className="text-sm text-muted-foreground">
                If the AI can't help, you'll be seamlessly connected to our human support team.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">3. Get Resolution</h3>
              <p className="text-sm text-muted-foreground">
                Our team has the full context of your conversation and can provide personalized solutions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Common Questions */}
      <Card>
        <CardHeader>
          <CardTitle>Common Questions Our AI Can Help With</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'How do I book a cleaner?',
              'I can\'t find my booking confirmation',
              'How do I cancel or reschedule?',
              'Payment and billing questions',
              'Account settings and profile updates',
              'What if I\'m not satisfied with the cleaning?',
              'How to contact my cleaner',
              'Subscription and plan changes'
            ].map((question, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm">{question}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Human Chat Placeholder */}
      {showHumanChat && (
        <Card className="fixed bottom-4 right-4 w-96 h-[600px] shadow-xl z-50">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle>Live Support Chat</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowHumanChat(false)}>
                ×
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold">Connect with Human Support</h3>
              <p className="text-sm text-muted-foreground">
                This would integrate with your live chat system (Intercom, Zendesk, etc.) to connect users with human agents.
              </p>
              <Button className="w-full">
                Start Live Chat Session
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
