
import React from 'react';
import { ChatBubble } from './ChatBubble';
import { ChatMessage } from '@/hooks/useChat';
import { useAuth } from '@/hooks/useAuth';

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export const ChatMessages = ({ messages, isLoading }: ChatMessagesProps) => {
  const { user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <p>No messages yet.</p>
        <p className="text-sm">Start the conversation!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          message={message}
          isOwnMessage={message.sender_id === user?.id}
        />
      ))}
    </div>
  );
};
