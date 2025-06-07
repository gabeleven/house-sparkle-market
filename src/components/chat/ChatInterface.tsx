
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

interface ChatInterfaceProps {
  conversationId: string;
  otherUserId: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  conversationId,
  otherUserId
}) => {
  const { user } = useAuth();
  const { messages, loadMessages, sendMessage, markMessagesAsRead } = useChat();
  const [newMessage, setNewMessage] = useState('');
  const [otherUserInfo, setOtherUserInfo] = useState<{
    full_name: string;
    profile_photo_url?: string;
  } | null>(null);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversationId) {
      loadMessages(conversationId);
      loadOtherUserInfo();
    }
  }, [conversationId, loadMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

      if (data) {
        setOtherUserInfo({
          full_name: data.full_name || 'Unknown User',
          profile_photo_url: data.profile_photo_url || undefined
        });
      }
    } catch (error) {
      console.error('Error loading other user info:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !conversationId || sending) return;

    setSending(true);
    try {
      await sendMessage(conversationId, newMessage.trim());
      setNewMessage('');
      // Reload messages to get the latest
      loadMessages(conversationId);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
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
      <div className="flex items-center justify-center h-full">
        <p>Please log in to view messages.</p>
      </div>
    );
  }

  return (
    <Card className="flex flex-col h-full">
      <ChatHeader 
        otherUserId={otherUserId}
        otherUserName={otherUserInfo?.full_name || 'Unknown User'}
        otherUserAvatar={otherUserInfo?.profile_photo_url}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        <ChatMessages messages={messages} isLoading={false} />
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={sending}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || sending}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
