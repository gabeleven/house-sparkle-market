
import { useState } from 'react';
import { ConversationsList } from './ConversationsList';
import { ChatInterface } from './ChatInterface';
import { Conversation } from '@/hooks/useChat';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

export const ChatPage = () => {
  const { t } = useLanguage();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [showChat, setShowChat] = useState(false);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setShowChat(true);
  };

  const handleBackToList = () => {
    setShowChat(false);
    setSelectedConversation(null);
  };

  return (
    <div className="h-screen flex bg-background">
      {/* Conversations List - Desktop always visible, Mobile hidden when chat open */}
      <div className={`${
        showChat ? 'hidden md:flex' : 'flex'
      } w-full md:w-80 border-r border-border bg-card`}>
        <div className="w-full">
          <div className="p-4 border-b border-border bg-card">
            <h2 className="text-xl font-bold text-foreground">{t('messages.title')}</h2>
          </div>
          <ConversationsList
            onSelectConversation={handleSelectConversation}
            selectedConversationId={selectedConversation?.id}
          />
        </div>
      </div>

      {/* Chat Interface */}
      <div className={`${
        showChat ? 'flex' : 'hidden md:flex'
      } flex-1 bg-background`}>
        {selectedConversation ? (
          <ChatInterface
            conversationId={selectedConversation.id}
            otherUserId={selectedConversation.other_user_id}
          />
        ) : (
          <div className="flex items-center justify-center w-full bg-background">
            <div className="text-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {t('messages.welcomeTitle') || 'Welcome to Housie Messages'}
              </h3>
              <p className="text-muted-foreground">
                {t('messages.selectConversation') || 'Select a conversation to start messaging'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
