
import { useEffect } from 'react';
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { useChat } from "@/hooks/useChat";

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
  const { messages, loadMessages, isLoading } = useChat();

  useEffect(() => {
    if (conversationId) {
      loadMessages(conversationId);
    }
  }, [conversationId]);

  return (
    <div className="flex flex-col h-full bg-white">
      <ChatHeader
        otherUserId={otherUserId}
        otherUserName={otherUserName}
        otherUserAvatar={otherUserAvatar}
        onBack={onBack}
      />

      <ChatMessages messages={messages} isLoading={isLoading} />

      <ChatInput conversationId={conversationId} />
    </div>
  );
};
