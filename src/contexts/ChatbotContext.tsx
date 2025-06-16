
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ChatMode = 'homepage' | 'support';

interface ChatbotContextType {
  isOpen: boolean;
  mode: ChatMode;
  openChatbot: (source?: string, chatMode?: ChatMode) => void;
  closeChatbot: () => void;
  toggleChatbot: () => void;
  setShowGoodbyeMessage: (show: boolean) => void;
  showGoodbyeMessage: boolean;
  navigateToSupport: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

interface ChatbotProviderProps {
  children: ReactNode;
}

export const ChatbotProvider: React.FC<ChatbotProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ChatMode>('homepage');
  const [showGoodbyeMessage, setShowGoodbyeMessage] = useState(false);

  const openChatbot = (source?: string, chatMode: ChatMode = 'homepage') => {
    console.log('Opening chatbot', source ? `from ${source}` : '', 'mode:', chatMode);
    setMode(chatMode);
    setIsOpen(true);
    setShowGoodbyeMessage(false);
  };

  const closeChatbot = () => {
    console.log('Closing chatbot');
    setIsOpen(false);
    setShowGoodbyeMessage(false);
  };

  const toggleChatbot = () => {
    console.log('Toggling chatbot');
    setIsOpen(!isOpen);
  };

  const navigateToSupport = () => {
    console.log('Navigating to support');
    // In a real app, this would navigate to the support page
    // For now, we'll just show a goodbye message
    setShowGoodbyeMessage(true);
  };

  const value = {
    isOpen,
    mode,
    openChatbot,
    closeChatbot,
    toggleChatbot,
    setShowGoodbyeMessage,
    showGoodbyeMessage,
    navigateToSupport,
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
