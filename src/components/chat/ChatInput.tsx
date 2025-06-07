
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Image } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { useToast } from "@/hooks/use-toast";

interface ChatInputProps {
  conversationId: string;
}

export const ChatInput = ({ conversationId }: ChatInputProps) => {
  const { sendMessage } = useChat();
  const { toast } = useToast();
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = async () => {
    if (!messageText.trim() || isSending) return;

    const tempMessage = messageText;
    setMessageText(''); // Clear input immediately for better UX
    setIsSending(true);

    try {
      await sendMessage(conversationId, tempMessage);
      console.log('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
      setMessageText(tempMessage); // Restore message on error
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);
    try {
      // For now, we'll send a placeholder image URL
      // In a real implementation, you would upload to Supabase Storage first
      await sendMessage(conversationId, '/placeholder.svg', 'image');
      
      toast({
        title: "Image sent",
        description: "Your image has been sent"
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to send image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="p-4 border-t bg-white">
      <div className="flex items-end gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          className="hidden"
        />
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          disabled={isSending}
          className="flex-shrink-0"
        >
          <Image className="w-5 h-5" />
        </Button>

        <div className="flex-1">
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={isSending}
            className="rounded-full border-gray-300 focus:border-purple-500"
          />
        </div>

        <Button
          onClick={handleSendMessage}
          disabled={!messageText.trim() || isSending}
          size="icon"
          className="rounded-full bg-purple-600 hover:bg-purple-700 flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
