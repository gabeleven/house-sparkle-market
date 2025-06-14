
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Bot, MessageCircle, X, Minimize2 } from 'lucide-react';
import { useChatbot } from '@/contexts/ChatbotContext';
import { useChat, Conversation } from '@/hooks/useChat';
import { useUnreadCounts } from '@/hooks/useUnreadCounts';
import { Badge } from '@/components/ui/badge';
import { DualModeChatbot } from './DualModeChatbot';
import { CompactConversationsList } from '../chat/CompactConversationsList';
import { CompactChatInterface } from '../chat/CompactChatInterface';

export const TabbedChatbot = () => {
  const { isOpen, closeChatbot, toggleChatbot } = useChatbot();
  const { conversations, loadConversations } = useChat();
  const { messages: unreadCount } = useUnreadCounts();
  const [activeTab, setActiveTab] = useState('ai');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadConversations();
    }
  }, [isOpen, loadConversations]);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  if (!isOpen) return null;

  return (
    <Card className="fixed bottom-20 right-4 w-[400px] h-[500px] z-50 shadow-2xl border border-border bg-card text-card-foreground">
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <span className="font-medium">HOUSIE Chat</span>
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 m-2">
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Messages
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs h-4 w-4 p-0 flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai" className="flex-1 m-0">
            <div className="h-full">
              <DualModeChatbot />
            </div>
          </TabsContent>
          
          <TabsContent value="messages" className="flex-1 m-0">
            <div className="h-full">
              {selectedConversation ? (
                <CompactChatInterface 
                  conversation={selectedConversation}
                  onBack={handleBackToList}
                />
              ) : (
                <div className="p-3">
                  <CompactConversationsList
                    conversations={conversations}
                    onSelectConversation={handleSelectConversation}
                    selectedConversationId={selectedConversation?.id}
                  />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
