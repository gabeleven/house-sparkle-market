
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send, Clock, User, Bot } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface ChatMessage {
  id: string;
  sender: 'user' | 'support' | 'bot';
  message: string;
  timestamp: Date;
}

export const LiveChatWidget: React.FC = () => {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [estimatedWait, setEstimatedWait] = useState(3);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleStartChat = () => {
    setConnectionStatus('connecting');
    
    // Simulate connection process
    setTimeout(() => {
      setConnectionStatus('connected');
      setIsConnected(true);
      
      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: '1',
        sender: 'bot',
        message: `Hi ${user?.user_metadata?.full_name || 'there'}! 👋 Welcome to Housie support. A member of our team will be with you shortly. How can we help you today?`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }, 2000);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate support response (in real app, this would be WebSocket/real-time)
    setTimeout(() => {
      const supportMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'support',
        message: "Thanks for reaching out! I'm reviewing your message and will respond shortly. Is this urgent or can I take a moment to look into this for you?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, supportMessage]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-xl">Live Chat Support</CardTitle>
            <p className="text-muted-foreground">
              Get instant help from our friendly support team
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-medium mb-2">What to expect:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Average response time: 2-3 minutes</li>
                <li>• Available Monday-Friday, 9 AM - 6 PM EST</li>
                <li>• We speak English and French</li>
                <li>• Screenshots and links can be shared</li>
              </ul>
            </div>

            <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Support Team Online</span>
              </div>
              <Badge variant="outline" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                ~{estimatedWait} min wait
              </Badge>
            </div>

            {connectionStatus === 'connecting' ? (
              <div className="text-center space-y-3">
                <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                <p className="text-sm text-muted-foreground">Connecting you to our support team...</p>
              </div>
            ) : (
              <Button 
                onClick={handleStartChat} 
                className="w-full"
                size="lg"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Live Chat
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <CardTitle className="text-lg">Live Chat</CardTitle>
            </div>
            <Badge variant="outline" className="text-xs">
              Connected
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : message.sender === 'support' ? (
                      <MessageCircle className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.message}</p>
                    <p className={`text-xs mt-1 opacity-70 ${
                      message.sender === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="min-h-[40px] max-h-[120px] resize-none"
                rows={1}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!newMessage.trim()}
                size="sm"
                className="shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
