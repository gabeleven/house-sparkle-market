
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChatPage } from '@/components/chat/ChatPage';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { useAuth } from '@/hooks/useAuth';
import { useChat } from '@/hooks/useChat';
import { supabase } from '@/integrations/supabase/client';

const Chat = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const conversationId = searchParams.get('conversation');
  const [conversationData, setConversationData] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      return;
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (conversationId && user) {
      // Load conversation data
      const loadConversation = async () => {
        const { data, error } = await supabase
          .from('conversations')
          .select(`
            *,
            customer:profiles!conversations_customer_id_fkey(id, full_name, profile_photo_url),
            cleaner:profiles!conversations_cleaner_id_fkey(id, full_name, profile_photo_url)
          `)
          .eq('id', conversationId)
          .single();

        if (data && !error) {
          const isCustomer = data.customer_id === user.id;
          const otherUser = isCustomer ? data.cleaner : data.customer;
          
          setConversationData({
            id: data.id,
            otherUserId: otherUser?.id || '',
            otherUserName: otherUser?.full_name || 'Unknown User',
            otherUserAvatar: otherUser?.profile_photo_url
          });
        }
      };

      loadConversation();
    }
  }, [conversationId, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-[calc(100vh-4rem)]">
        {conversationId && conversationData ? (
          <ChatInterface
            conversationId={conversationId}
            otherUserId={conversationData.otherUserId}
            otherUserName={conversationData.otherUserName}
            otherUserAvatar={conversationData.otherUserAvatar}
            onBack={() => navigate('/chat')}
          />
        ) : (
          <ChatPage />
        )}
      </div>
    </div>
  );
};

export default Chat;
