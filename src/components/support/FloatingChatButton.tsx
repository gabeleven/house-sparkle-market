
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useChatbot } from '@/contexts/ChatbotContext';
import { useUnreadCounts } from '@/hooks/useUnreadCounts';

export const FloatingChatButton: React.FC = () => {
  const { isOpen, openChatbot } = useChatbot();
  const { messages: unreadCount } = useUnreadCounts();

  console.log('FloatingChatButton render - isOpen:', isOpen, 'unread:', unreadCount);

  const handleClick = () => {
    console.log('FloatingChatButton clicked');
    openChatbot('floating-button');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={handleClick}
        className="relative w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
        size="icon"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-6 w-6 p-0 flex items-center justify-center text-xs"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Button>
    </div>
  );
};
