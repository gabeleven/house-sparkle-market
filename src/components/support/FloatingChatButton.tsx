
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useChatbot } from '@/contexts/ChatbotContext';

export const FloatingChatButton: React.FC = () => {
  const { isOpen, openChatbot } = useChatbot();

  console.log('FloatingChatButton render - isOpen:', isOpen);

  const handleClick = () => {
    console.log('FloatingChatButton clicked');
    openChatbot('floating-button');
  };

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50 bg-primary hover:bg-primary/90"
      size="icon"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </Button>
  );
};
