
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Conversation } from "@/hooks/useChat";
import { usePresence } from "@/hooks/usePresence";

interface CompactConversationsListProps {
  conversations: Conversation[];
  onSelectConversation: (conversation: Conversation) => void;
  selectedConversationId?: string;
}

export const CompactConversationsList = ({ 
  conversations, 
  onSelectConversation, 
  selectedConversationId 
}: CompactConversationsListProps) => {
  const { isUserOnline } = usePresence();

  if (conversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground">
        <div className="text-center">
          <p className="text-sm">No conversations yet</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-64">
      <div className="space-y-1 p-2">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
              selectedConversationId === conversation.id
                ? 'bg-primary/10'
                : 'hover:bg-muted'
            }`}
          >
            <div className="relative">
              <Avatar className="w-8 h-8">
                <AvatarImage src={conversation.other_user_avatar} />
                <AvatarFallback className="text-xs">
                  {conversation.other_user_name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isUserOnline(conversation.other_user_id) && (
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-card"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm truncate">
                  {conversation.other_user_name}
                </h4>
                {conversation.unread_count > 0 && (
                  <Badge variant="destructive" className="text-xs h-4 w-4 p-0 flex items-center justify-center">
                    {conversation.unread_count}
                  </Badge>
                )}
              </div>
              
              <p className="text-xs text-muted-foreground truncate">
                {conversation.last_message || 'No messages yet'}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(conversation.last_message_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
