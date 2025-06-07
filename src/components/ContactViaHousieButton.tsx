
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ContactViaHousieButtonProps {
  cleanerId: string;
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export const ContactViaHousieButton = ({ cleanerId, size = "default", className }: ContactViaHousieButtonProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Only initialize chat hook when user is authenticated
  const { getOrCreateConversation } = user ? useChat() : { getOrCreateConversation: null };

  const handleContact = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to contact cleaners",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    if (user.id === cleanerId) {
      toast({
        title: "Cannot contact yourself",
        description: "You cannot start a conversation with yourself",
        variant: "destructive"
      });
      return;
    }

    if (!getOrCreateConversation) {
      toast({
        title: "Error",
        description: "Chat functionality not available. Please try again.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const conversationId = await getOrCreateConversation(cleanerId, user.id);
      navigate(`/chat?conversation=${conversationId}`);
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast({
        title: "Error",
        description: "Failed to start conversation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleContact}
      disabled={isLoading}
      size={size}
      className={`bg-purple-600 hover:bg-purple-700 text-white ${className}`}
    >
      <MessageCircle className="w-4 h-4 mr-2" />
      {isLoading ? 'Starting chat...' : 'Contact via Housie'}
    </Button>
  );
};
