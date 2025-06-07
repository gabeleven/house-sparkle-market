
import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  message_content: string | null;
  image_url: string | null;
  message_type: 'text' | 'image';
  is_read: boolean;
  created_at: string;
  sender_name: string;
  sender_avatar?: string;
}

export interface Conversation {
  id: string;
  customer_id: string;
  cleaner_id: string;
  created_at: string;
  last_message_at: string;
  other_user_id: string;
  other_user_name: string;
  other_user_avatar?: string;
  unread_count: number;
  last_message?: string;
}

// Global subscription manager to prevent duplicate subscriptions
let globalSubscriptions: {
  messageSubscription?: any;
  conversationSubscription?: any;
} = {};

let isGloballySubscribed = false;
let subscriberCount = 0;

export const useChat = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  
  // Track if this instance has subscribed
  const hasSubscribedRef = useRef(false);
  const instanceIdRef = useRef(Math.random().toString(36).substr(2, 9));

  // Load conversations for current user
  const loadConversations = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        customer:profiles!conversations_customer_id_fkey(id, full_name, profile_photo_url),
        cleaner:profiles!conversations_cleaner_id_fkey(id, full_name, profile_photo_url)
      `)
      .or(`customer_id.eq.${user.id},cleaner_id.eq.${user.id}`)
      .order('last_message_at', { ascending: false });

    if (error) {
      console.error('Error loading conversations:', error);
      return;
    }

    const processedConversations: Conversation[] = await Promise.all(
      (data || []).map(async (conv: any) => {
        const isCustomer = conv.customer_id === user.id;
        const otherUser = isCustomer ? conv.cleaner : conv.customer;

        // Get unread count
        const { count } = await supabase
          .from('chat_messages')
          .select('*', { count: 'exact', head: true })
          .eq('conversation_id', conv.id)
          .eq('is_read', false)
          .neq('sender_id', user.id);

        // Get last message
        const { data: lastMsg } = await supabase
          .from('chat_messages')
          .select('message_content, message_type')
          .eq('conversation_id', conv.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        return {
          id: conv.id,
          customer_id: conv.customer_id,
          cleaner_id: conv.cleaner_id,
          created_at: conv.created_at,
          last_message_at: conv.last_message_at,
          other_user_id: otherUser?.id || '',
          other_user_name: otherUser?.full_name || 'Unknown User',
          other_user_avatar: otherUser?.profile_photo_url,
          unread_count: count || 0,
          last_message: lastMsg?.message_type === 'image' ? '📷 Image' : lastMsg?.message_content
        };
      })
    );

    setConversations(processedConversations);
  }, [user]);

  // Load messages for a conversation
  const loadMessages = useCallback(async (conversationId: string) => {
    setIsLoading(true);
    
    const { data, error } = await supabase
      .from('chat_messages')
      .select(`
        *,
        sender:profiles!chat_messages_sender_id_fkey(full_name, profile_photo_url)
      `)
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error loading messages:', error);
      setIsLoading(false);
      return;
    }

    const processedMessages: ChatMessage[] = (data || []).map((msg: any) => ({
      id: msg.id,
      conversation_id: msg.conversation_id,
      sender_id: msg.sender_id,
      message_content: msg.message_content,
      image_url: msg.image_url,
      message_type: msg.message_type,
      is_read: msg.is_read,
      created_at: msg.created_at,
      sender_name: msg.sender?.full_name || 'Unknown User',
      sender_avatar: msg.sender?.profile_photo_url
    }));

    setMessages(processedMessages);
    setCurrentConversationId(conversationId);
    setIsLoading(false);

    // Mark messages as read
    await markMessagesAsRead(conversationId);
  }, []);

  // Create or get conversation
  const getOrCreateConversation = async (cleanerId: string, customerId: string) => {
    // Try to find existing conversation
    const { data: existing } = await supabase
      .from('conversations')
      .select('*')
      .eq('customer_id', customerId)
      .eq('cleaner_id', cleanerId)
      .single();

    if (existing) {
      return existing.id;
    }

    // Create new conversation
    const { data: newConv, error } = await supabase
      .from('conversations')
      .insert({
        customer_id: customerId,
        cleaner_id: cleanerId
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }

    return newConv.id;
  };

  // Send a message
  const sendMessage = async (conversationId: string, content: string, type: 'text' | 'image' = 'text') => {
    if (!user) return;

    const messageData = {
      conversation_id: conversationId,
      sender_id: user.id,
      message_type: type,
      ...(type === 'text' ? { message_content: content } : { image_url: content })
    };

    const { data, error } = await supabase
      .from('chat_messages')
      .insert(messageData)
      .select()
      .single();

    if (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
      return;
    }

    // Get conversation details for notification
    const { data: conversation } = await supabase
      .from('conversations')
      .select('customer_id, cleaner_id')
      .eq('id', conversationId)
      .single();

    if (conversation) {
      const recipientId = conversation.customer_id === user.id ? conversation.cleaner_id : conversation.customer_id;
      
      // Send email notification
      try {
        await supabase.functions.invoke('send-chat-notification', {
          body: {
            recipientId,
            senderName: user.user_metadata?.full_name || user.email,
            messagePreview: type === 'text' ? content : '📷 Sent an image',
            conversationId
          }
        });
      } catch (notificationError) {
        console.error('Error sending notification:', notificationError);
      }
    }

    return data;
  };

  // Mark messages as read
  const markMessagesAsRead = async (conversationId: string) => {
    if (!user) return;

    await supabase
      .from('chat_messages')
      .update({ is_read: true })
      .eq('conversation_id', conversationId)
      .neq('sender_id', user.id);
  };

  // Clean up global subscriptions
  const cleanupGlobalSubscriptions = useCallback(() => {
    if (globalSubscriptions.messageSubscription) {
      console.log('Cleaning up global message subscription');
      supabase.removeChannel(globalSubscriptions.messageSubscription);
      globalSubscriptions.messageSubscription = null;
    }
    if (globalSubscriptions.conversationSubscription) {
      console.log('Cleaning up global conversation subscription');
      supabase.removeChannel(globalSubscriptions.conversationSubscription);
      globalSubscriptions.conversationSubscription = null;
    }
    isGloballySubscribed = false;
  }, []);

  // Set up real-time subscriptions (globally managed)
  useEffect(() => {
    if (!user || hasSubscribedRef.current) return;

    // Increment subscriber count
    subscriberCount++;
    hasSubscribedRef.current = true;

    console.log(`Setting up real-time subscriptions for user: ${user.id} (instance: ${instanceIdRef.current}, count: ${subscriberCount})`);

    // Only set up subscriptions if not already done globally
    if (!isGloballySubscribed) {
      // Clean up any existing subscriptions first
      cleanupGlobalSubscriptions();

      // Create unique channel names
      const timestamp = Date.now();
      const messageChannelName = `chat-messages-global-${user.id}-${timestamp}`;
      const conversationChannelName = `conversations-global-${user.id}-${timestamp}`;

      // Subscribe to new messages
      const messageSubscription = supabase
        .channel(messageChannelName)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages'
        }, (payload) => {
          console.log('New message received:', payload);
          const newMessage = payload.new as any;
          
          // Add sender info (we'll need to fetch this)
          supabase
            .from('profiles')
            .select('full_name, profile_photo_url')
            .eq('id', newMessage.sender_id)
            .single()
            .then(({ data: sender }) => {
              const messageWithSender: ChatMessage = {
                ...newMessage,
                sender_name: sender?.full_name || 'Unknown',
                sender_avatar: sender?.profile_photo_url
              };

              // Only add to current conversation
              if (newMessage.conversation_id === currentConversationId) {
                setMessages(prev => [...prev, messageWithSender]);
              }

              // Update conversations list
              loadConversations();

              // Show browser notification if not from current user
              if (newMessage.sender_id !== user.id && 'Notification' in window && Notification.permission === 'granted') {
                new Notification(`New message from ${messageWithSender.sender_name}`, {
                  body: newMessage.message_type === 'text' ? newMessage.message_content : '📷 Sent an image',
                  icon: messageWithSender.sender_avatar || '/placeholder.svg'
                });
              }
            });
        })
        .subscribe();

      // Subscribe to conversation updates
      const conversationSubscription = supabase
        .channel(conversationChannelName)
        .on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'conversations'
        }, () => {
          console.log('Conversation updated');
          loadConversations();
        })
        .subscribe();

      // Store subscriptions globally
      globalSubscriptions = {
        messageSubscription,
        conversationSubscription
      };
      isGloballySubscribed = true;
    }

    return () => {
      // Decrement subscriber count and cleanup if last subscriber
      subscriberCount--;
      hasSubscribedRef.current = false;
      
      console.log(`Cleaning up subscription for instance: ${instanceIdRef.current} (remaining: ${subscriberCount})`);
      
      if (subscriberCount <= 0) {
        cleanupGlobalSubscriptions();
        subscriberCount = 0;
      }
    };
  }, [user, currentConversationId, loadConversations, cleanupGlobalSubscriptions]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return {
    conversations,
    messages,
    currentConversationId,
    isLoading,
    typingUsers,
    loadConversations,
    loadMessages,
    getOrCreateConversation,
    sendMessage,
    markMessagesAsRead
  };
};
