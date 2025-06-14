
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useChat } from '@/hooks/useChat';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { ChatMessages } from './ChatMessages';
import { ChatHeader } from './ChatHeader';
import { isValidProfileData } from '@/utils/typeGuards';
import { useLanguage } from '@/contexts/LanguageContext';

interface ChatInterfaceProps {
  conversationId: string;
  otherUserId: string;
  otherUserName?: string;
  otherUserAvatar?: string;
  onBack?: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  conversationId,
  otherUserId,
  otherUserName,
  otherUserAvatar,
  onBack
}) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { messages, loadMessages, sendMessage, markMessagesAsRead } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const [otherUserInfo, setOtherUserInfo] = useState<{
    full_name: string;
    profile_photo_url?: string;
  } | null>(null);
  const [sending, setSending] = useState(false);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversationId) {
      loadMessages(conversationId);
      if (!otherUserName || !otherUserAvatar) {
        loadOtherUserInfo();
      } else {
        setOtherUserInfo({
          full_name: otherUserName,
          profile_photo_url: otherUserAvatar
        });
      }
      // Only scroll to bottom when initially loading a conversation
      setShouldScrollToBottom(true);
    }
  }, [conversationId, loadMessages, otherUserName, otherUserAvatar]);

  useEffect(() => {
    // Only scroll to bottom if we should (initial load or new message sent)
    if (shouldScrollToBottom && messages.length > 0) {
      scrollToBottomSmooth();
      setShouldScrollToBottom(false);
    }
  }, [messages, shouldScrollToBottom]);

  useEffect(() => {
    // Mark messages as read when viewing conversation
    if (conversationId) {
      markMessagesAsRead(conversationId);
    }
  }, [conversationId, markMessagesAsRead]);

  const loadOtherUserInfo = async () => {
    if (!otherUserId) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, profile_photo_url')
        .eq('id', otherUserId as any)
        .maybeSingle();

      if (error) {
        console.error('Error loading other user info:', error);
        return;
      }

      if (data && isValidProfileData(data)) {
        setOtherUserInfo({
          full_name: data.full_name || 'Unknown User',
          profile_photo_url: data.profile_photo_url || undefined
        });
      } else {
        // Fallback for invalid or missing data
        setOtherUserInfo({
          full_name: 'Unknown User',
          profile_photo_url: undefined
        });
      }
    } catch (error) {
      console.error('Error loading other user info:', error);
      setOtherUserInfo({
        full_name: 'Unknown User',
        profile_photo_url: undefined
      });
    }
  };

  // Smooth scroll to bottom for better UX
  const scrollToBottomSmooth = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !conversationId || sending) return;

    setSending(true);
    const messageToSend = newMessage.trim();
    setNewMessage('');
    setShouldScrollToBottom(true); // Scroll to bottom when sending a new message

    // Refocus input immediately after clearing
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);

    try {
      await sendMessage(conversationId, messageToSend);
      // Reload messages to get the latest
      loadMessages(conversationId);
    } catch (error) {
      console.error('Error sending message:', error);
      // Restore message if failed
      setNewMessage(messageToSend);
    } finally {
      setSending(false);
      // Ensure input stays focused
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full bg-background text-foreground">
        <p>{t('messages.loginRequired') || 'Please log in to view messages.'}</p>
      </div>
    );
  }

  const displayName = otherUserInfo?.full_name || otherUserName || t('messages.unknownUser') || 'Unknown User';
  const displayAvatar = otherUserInfo?.profile_photo_url || otherUserAvatar;

  return (
    <Card className="flex flex-col h-full bg-card text-card-foreground border-border">
      <ChatHeader 
        otherUserId={otherUserId}
        otherUserName={displayName}
        otherUserAvatar={displayAvatar}
        onBack={onBack}
      />
      
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 bg-background"
        style={{ 
          overscrollBehavior: 'none'
        }}
      >
        <ChatMessages messages={messages} isLoading={false} />
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border bg-card p-4">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('messages.typeMessage') || 'Type a message...'}
            disabled={sending}
            className="flex-1 bg-background border-input text-foreground placeholder:text-muted-foreground"
            autoFocus
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || sending}
            size="icon"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
