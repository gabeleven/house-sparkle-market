
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { ChatMessage } from "@/hooks/useChat";
import { useAuth } from "@/hooks/useAuth";

interface CompactChatBubbleProps {
  message: ChatMessage;
  isOwnMessage: boolean;
}

export const CompactChatBubble = ({ message, isOwnMessage }: CompactChatBubbleProps) => {
  const { user } = useAuth();

  return (
    <div className={`flex gap-2 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} mb-2`}>
      <Avatar className="w-6 h-6 flex-shrink-0">
        <AvatarImage src={isOwnMessage ? user?.user_metadata?.avatar_url : message.sender_avatar} />
        <AvatarFallback className="text-xs">
          {isOwnMessage 
            ? (user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || '?').toUpperCase()
            : message.sender_name.charAt(0).toUpperCase()
          }
        </AvatarFallback>
      </Avatar>
      
      <div className={`max-w-[70%] ${isOwnMessage ? 'text-right' : 'text-left'}`}>
        <div
          className={`inline-block px-3 py-2 rounded-lg text-sm ${
            isOwnMessage
              ? 'bg-primary text-primary-foreground rounded-br-sm'
              : 'bg-muted text-muted-foreground rounded-bl-sm'
          }`}
        >
          {message.message_type === 'text' ? (
            <p className="break-words">{message.message_content}</p>
          ) : (
            <img
              src={message.image_url || ''}
              alt="Shared image"
              className="max-w-full h-auto rounded"
            />
          )}
        </div>
        
        <div className={`text-xs text-muted-foreground mt-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
          {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
          {isOwnMessage && (
            <span className="ml-1">
              {message.is_read ? '✓✓' : '✓'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
