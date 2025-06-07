
import { useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatBubble } from "./ChatBubble";
import { ChatMessage } from "@/hooks/useChat";
import { useAuth } from "@/hooks/useAuth";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export const ChatMessages = ({ messages, isLoading }: ChatMessagesProps) => {
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading messages...</div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-1">
        {messages.map((message, index) => {
          const prevMessage = messages[index - 1];
          const showAvatar = !prevMessage || prevMessage.sender_id !== message.sender_id;
          
          return (
            <ChatBubble
              key={message.id}
              message={message}
              showAvatar={showAvatar}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};
