
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { ChatMessage } from "@/hooks/useChat";
import { useAuth } from "@/hooks/useAuth";

interface ChatBubbleProps {
  message: ChatMessage;
  isOwnMessage: boolean;
  showAvatar?: boolean;
}

export const ChatBubble = ({ message, isOwnMessage, showAvatar = true }: ChatBubbleProps) => {
  const { user } = useAuth();

  return (
    <div className={`flex gap-2 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} mb-4`}>
      {showAvatar && !isOwnMessage && (
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={message.sender_avatar} />
          <AvatarFallback className="text-xs">
            {message.sender_name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-[70%] ${isOwnMessage ? 'text-right' : 'text-left'}`}>
        <div
          className={`inline-block px-4 py-2 rounded-2xl ${
            isOwnMessage
              ? 'bg-purple-600 text-white rounded-br-md'
              : 'bg-gray-100 text-gray-900 rounded-bl-md'
          }`}
        >
          {message.message_type === 'text' ? (
            <p className="break-words">{message.message_content}</p>
          ) : (
            <img
              src={message.image_url || ''}
              alt="Shared image"
              className="max-w-full h-auto rounded-lg"
            />
          )}
        </div>
        
        <div className={`text-xs text-gray-500 mt-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
          {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
          {isOwnMessage && (
            <span className="ml-1">
              {message.is_read ? '✓✓' : '✓'}
            </span>
          )}
        </div>
      </div>
      
      {showAvatar && isOwnMessage && (
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={user?.user_metadata?.avatar_url} />
          <AvatarFallback className="text-xs">
            {user?.user_metadata?.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
