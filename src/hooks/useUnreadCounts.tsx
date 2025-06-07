
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface UnreadCounts {
  messages: number;
  supportTickets: number;
  loading: boolean;
}

export const useUnreadCounts = (): UnreadCounts => {
  const { user } = useAuth();
  const [counts, setCounts] = useState<UnreadCounts>({
    messages: 0,
    supportTickets: 0,
    loading: true
  });

  useEffect(() => {
    if (!user) {
      setCounts({ messages: 0, supportTickets: 0, loading: false });
      return;
    }

    loadUnreadCounts();
  }, [user]);

  const loadUnreadCounts = async () => {
    if (!user) return;

    try {
      // Get unread messages count
      const { data: conversationsData, error: conversationsError } = await supabase
        .from('conversations')
        .select('id')
        .or(`customer_id.eq.${user.id},cleaner_id.eq.${user.id}`);

      if (conversationsError) {
        console.error('Error fetching conversations:', conversationsError);
        setCounts(prev => ({ ...prev, loading: false }));
        return;
      }

      const conversationIds = conversationsData?.map(c => c.id) || [];
      
      let unreadMessagesCount = 0;
      
      if (conversationIds.length > 0) {
        const { count, error: messagesError } = await supabase
          .from('chat_messages')
          .select('*', { count: 'exact', head: true })
          .in('conversation_id', conversationIds)
          .neq('sender_id', user.id)
          .eq('is_read', false);

        if (messagesError) {
          console.error('Error fetching unread messages:', messagesError);
        } else {
          unreadMessagesCount = count || 0;
        }
      }

      // For now, support tickets is 0 since we don't have that feature implemented
      setCounts({
        messages: unreadMessagesCount,
        supportTickets: 0,
        loading: false
      });

    } catch (error) {
      console.error('Error loading unread counts:', error);
      setCounts({ messages: 0, supportTickets: 0, loading: false });
    }
  };

  return counts;
};
