
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChatbotContextType {
  isOpen: boolean;
  openChatbot: (source?: string) => void;
  closeChatbot: () => void;
  toggleChatbot: () => void;
  setShowGoodbyeMessage: (show: boolean) => void;
  showGoodbyeMessage: boolean;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

interface ChatbotProviderProps {
  children: ReactNode;
}

export const ChatbotProvider: React.FC<ChatbotProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGoodbyeMessage, setShowGoodbyeMessage] = useState(false);

  const openChatbot = (source?: string) => {
    console.log('Opening chatbot', source ? `from ${source}` : '');
    setIsOpen(true);
  };

  const closeChatbot = () => {
    console.log('Closing chatbot');
    setIsOpen(false);
  };

  const toggleChatbot = () => {
    console.log('Toggling chatbot');
    setIsOpen(!isOpen);
  };

  const value = {
    isOpen,
    openChatbot,
    closeChatbot,
    toggleChatbot,
    setShowGoodbyeMessage,
    showGoodbyeMessage,
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = (): ChatbotContextType => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};
