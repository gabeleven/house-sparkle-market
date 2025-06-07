
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Image } from "lucide-react";
import { useChat } from "@/hooks/useChat";

interface ChatInputProps {
  conversationId: string;
}

export const ChatInput = ({ conversationId }: ChatInputProps) => {
  const { sendMessage } = useChat();
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = async () => {
    if (!messageText.trim() || isSending) return;

    setIsSending(true);
    try {
      await sendMessage(conversationId, messageText);
      setMessageText('');
    } catch (error) {
      console.error('Error sending message:', error);
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

    // In a real app, you would upload to Supabase Storage here
    // For now, we'll just show a placeholder
    try {
      setIsSending(true);
      // TODO: Implement actual image upload to Supabase Storage
      await sendMessage(conversationId, '/placeholder.svg', 'image');
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsSending(false);
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
          className="rounded-full bg-purple-600 hover:bg-purple-700"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
