
import { useEffect, useRef, useState } from 'react';
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { useChat, ChatMessage } from "@/hooks/useChat";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';

interface ChatInterfaceProps {
  conversationId: string;
  otherUserId: string;
  otherUserName: string;
  otherUserAvatar?: string;
  onBack?: () => void;
}

export const ChatInterface = ({
  conversationId,
  otherUserId,
  otherUserName,
  otherUserAvatar,
  onBack
}: ChatInterfaceProps) => {
  const { user } = useAuth();
  const { messages, loadMessages, isLoading, markMessagesAsRead } = useChat();
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [isWindowFocused, setIsWindowFocused] = useState(true);
  const channelRef = useRef<any>(null);

  // Track window focus for notification badges
  useEffect(() => {
    const handleFocus = () => {
      setIsWindowFocused(true);
      setNewMessageCount(0);
      if (conversationId) {
        markMessagesAsRead(conversationId);
      }
    };
    const handleBlur = () => setIsWindowFocused(false);

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, [conversationId, markMessagesAsRead]);

  // Load initial messages
  useEffect(() => {
    if (conversationId) {
      loadMessages(conversationId);
    }
  }, [conversationId, loadMessages]);

  // Update local messages when chat messages change
  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  // Set up real-time subscription for new messages in this conversation
  useEffect(() => {
    if (!conversationId || !user) return;

    // Clean up existing subscription
    if (channelRef.current) {
      console.log('Removing existing chat interface subscription');
      supabase.removeChannel(channelRef.current);
    }

    console.log('Setting up real-time subscription for conversation:', conversationId);

    const channel = supabase
      .channel(`chat-messages-${conversationId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `conversation_id=eq.${conversationId}`
      }, async (payload) => {
        console.log('New message received in chat interface:', payload);
        const newMessage = payload.new as any;
        
        // Fetch sender info to complete the message object
        const { data: sender, error: senderError } = await supabase
          .from('profiles')
          .select('full_name, profile_photo_url')
          .eq('id', newMessage.sender_id)
          .maybeSingle();

        let senderName = 'Unknown';
        let senderAvatar: string | undefined = undefined;
        
        if (!senderError && sender) {
          senderName = sender.full_name || 'Unknown';
          senderAvatar = sender.profile_photo_url || undefined;
        }

        const messageWithSender: ChatMessage = {
          ...newMessage,
          sender_name: senderName,
          sender_avatar: senderAvatar
        };

        // Add message to local state immediately for instant display
        setLocalMessages(prev => {
          const exists = prev.some(msg => msg.id === messageWithSender.id);
          if (exists) return prev;
          return [...prev, messageWithSender];
        });

        // Update notification count if window is not focused and message is from other user
        if (!isWindowFocused && newMessage.sender_id !== user.id) {
          setNewMessageCount(prev => prev + 1);
          
          // Show browser notification if permission granted
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(`New message from ${messageWithSender.sender_name}`, {
              body: newMessage.message_type === 'text' ? newMessage.message_content : '📷 Sent an image',
              icon: messageWithSender.sender_avatar || '/placeholder.svg'
            });
          }
        }

        // Auto-mark as read if window is focused
        if (isWindowFocused && newMessage.sender_id !== user.id) {
          markMessagesAsRead(conversationId);
        }
      })
      .subscribe((status) => {
        console.log('Chat interface subscription status:', status);
      });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        console.log('Cleaning up chat interface subscription');
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [conversationId, user, isWindowFocused, markMessagesAsRead]);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* New message notification badge */}
      {newMessageCount > 0 && !isWindowFocused && (
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="destructive" className="animate-pulse">
            {newMessageCount} new message{newMessageCount > 1 ? 's' : ''}
          </Badge>
        </div>
      )}

      <ChatHeader
        otherUserId={otherUserId}
        otherUserName={otherUserName}
        otherUserAvatar={otherUserAvatar}
        onBack={onBack}
      />

      <ChatMessages messages={localMessages} isLoading={isLoading} />

      <ChatInput conversationId={conversationId} />
    </div>
  );
};
