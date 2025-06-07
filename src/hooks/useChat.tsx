
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

export const useChat = () => {
  const { user, session } = useAuth();
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());

  // Validate session before database operations
  const validateSession = useCallback(async () => {
    if (!session) {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        return currentSession;
      } catch (error) {
        console.error('Session validation failed:', error);
        return null;
      }
    }
    return session;
  }, [session]);

  // Load conversations for current user
  const loadConversations = useCallback(async () => {
    const validSession = await validateSession();
    if (!validSession || !user) return;

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
          .eq('is_read', false as any)
          .neq('sender_id', user.id as any);

        // Get last message
        const { data: lastMsg } = await supabase
          .from('chat_messages')
          .select('message_content, message_type')
          .eq('conversation_id', conv.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        let lastMessageText = '';
        if (lastMsg && lastMsg.message_type && lastMsg.message_content) {
          lastMessageText = lastMsg.message_type === 'image' ? '📷 Image' : lastMsg.message_content;
        }

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
          last_message: lastMessageText
        };
      })
    );

    setConversations(processedConversations);
  }, [user, validateSession]);

  // Load messages for a conversation
  const loadMessages = useCallback(async (conversationId: string) => {
    const validSession = await validateSession();
    if (!validSession) return;
    
    setIsLoading(true);
    
    const { data, error } = await supabase
      .from('chat_messages')
      .select(`
        *,
        sender:profiles!chat_messages_sender_id_fkey(full_name, profile_photo_url)
      `)
      .eq('conversation_id', conversationId as any)
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
  }, [validateSession]);

  // Create or get conversation
  const getOrCreateConversation = async (cleanerId: string, customerId: string) => {
    const validSession = await validateSession();
    if (!validSession) throw new Error('No valid session');

    // Try to find existing conversation
    const { data: existing } = await supabase
      .from('conversations')
      .select('*')
      .eq('customer_id', customerId as any)
      .eq('cleaner_id', cleanerId as any)
      .maybeSingle();

    if (existing && existing.id) {
      return existing.id;
    }

    // Create new conversation
    const { data: newConv, error } = await supabase
      .from('conversations')
      .insert({
        customer_id: customerId,
        cleaner_id: cleanerId
      } as any)
      .select()
      .single();

    if (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }

    if (newConv && newConv.id) {
      return newConv.id;
    }

    throw new Error('Failed to create conversation');
  };

  // Send a message
  const sendMessage = async (conversationId: string, content: string, type: 'text' | 'image' = 'text') => {
    const validSession = await validateSession();
    if (!validSession || !user) return;

    const messageData = {
      conversation_id: conversationId,
      sender_id: user.id,
      message_type: type,
      ...(type === 'text' ? { message_content: content } : { image_url: content })
    };

    const { data, error } = await supabase
      .from('chat_messages')
      .insert(messageData as any)
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

    return data;
  };

  // Mark messages as read
  const markMessagesAsRead = async (conversationId: string) => {
    const validSession = await validateSession();
    if (!validSession || !user) return;

    await supabase
      .from('chat_messages')
      .update({ is_read: true } as any)
      .eq('conversation_id', conversationId as any)
      .neq('sender_id', user.id as any);
  };

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
