
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface ChatbotContextType {
  isOpen: boolean;
  mode: 'support' | 'homepage' | 'how-it-works';
  openChatbot: (mode?: 'support' | 'homepage' | 'how-it-works') => void;
  closeChatbot: () => void;
  navigateToHowItWorks: () => void;
  navigateToSupport: () => void;
  showGoodbyeMessage: boolean;
  setShowGoodbyeMessage: (show: boolean) => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'support' | 'homepage' | 'how-it-works'>('homepage');
  const [showGoodbyeMessage, setShowGoodbyeMessage] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const openChatbot = useCallback((newMode?: 'support' | 'homepage' | 'how-it-works') => {
    if (newMode) {
      setMode(newMode);
    } else {
      // Auto-detect mode based on current page
      if (location.pathname === '/support') {
        setMode('support');
      } else if (location.pathname === '/comment-ca-marche') {
        setMode('how-it-works');
      } else {
        setMode('homepage');
      }
    }
    setIsOpen(true);
  }, [location.pathname]);

  const closeChatbot = useCallback(() => {
    setIsOpen(false);
    setShowGoodbyeMessage(false);
  }, []);

  const navigateToHowItWorks = useCallback(() => {
    navigate('/comment-ca-marche?chatbot=open');
    setMode('how-it-works');
  }, [navigate]);

  const navigateToSupport = useCallback(() => {
    navigate('/support?section=contact&chatbot=goodbye');
    setShowGoodbyeMessage(true);
  }, [navigate]);

  return (
    <ChatbotContext.Provider value={{
      isOpen,
      mode,
      openChatbot,
      closeChatbot,
      navigateToHowItWorks,
      navigateToSupport,
      showGoodbyeMessage,
      setShowGoodbyeMessage
    }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};
