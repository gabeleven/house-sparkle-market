
import { useEffect, useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { useChat, Conversation } from "@/hooks/useChat";
import { usePresence } from "@/hooks/usePresence";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface ConversationsListProps {
  onSelectConversation: (conversation: Conversation) => void;
  selectedConversationId?: string;
}

export const ConversationsList = ({ onSelectConversation, selectedConversationId }: ConversationsListProps) => {
  const { user } = useAuth();
  const { conversations, loadConversations } = useChat();
  const { isUserOnline, getPresence } = usePresence();
  const channelRef = useRef<any>(null);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    // Get presence for all conversation participants
    const userIds = conversations.map(conv => conv.other_user_id);
    if (userIds.length > 0) {
      getPresence(userIds);
    }
  }, [conversations]);

  // Set up real-time subscription for conversation updates
  useEffect(() => {
    if (!user) return;

    // Clean up existing subscription
    if (channelRef.current) {
      console.log('Removing existing conversations subscription');
      supabase.removeChannel(channelRef.current);
    }

    console.log('Setting up real-time subscription for conversations');

    const channel = supabase
      .channel(`conversations-list-${user.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages'
      }, (payload) => {
        console.log('New message received, refreshing conversations list:', payload);
        // Reload conversations to update last message and unread counts
        loadConversations();
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'conversations'
      }, (payload) => {
        console.log('Conversation updated, refreshing list:', payload);
        loadConversations();
      })
      .subscribe((status) => {
        console.log('Conversations list subscription status:', status);
      });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        console.log('Cleaning up conversations subscription');
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [user, loadConversations]);

  if (conversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground bg-background">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">No conversations yet</p>
          <p className="text-sm">Start a conversation with a cleaner to see it here.</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full bg-card">
      <div className="space-y-1 p-2">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
              selectedConversationId === conversation.id
                ? 'bg-primary/10 border-l-4 border-primary'
                : 'hover:bg-muted'
            }`}
          >
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src={conversation.other_user_avatar} />
                <AvatarFallback>
                  {conversation.other_user_name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isUserOnline(conversation.other_user_id) && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-foreground truncate">
                  {conversation.other_user_name}
                </h4>
                <div className="flex items-center gap-2">
                  {conversation.unread_count > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {conversation.unread_count}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: true })}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground truncate">
                {conversation.last_message || 'No messages yet'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
