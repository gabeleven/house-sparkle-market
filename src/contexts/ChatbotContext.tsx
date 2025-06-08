
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
  
  // Add error boundary for navigation
  let navigate: ReturnType<typeof useNavigate>;
  let location: ReturnType<typeof useLocation>;
  
  try {
    navigate = useNavigate();
    location = useLocation();
  } catch (error) {
    console.error('Navigation hooks failed:', error);
    // Provide fallback functions
    navigate = () => {};
    location = { pathname: '/' } as any;
  }

  const openChatbot = useCallback((newMode?: 'support' | 'homepage' | 'how-it-works') => {
    try {
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
    } catch (error) {
      console.error('Error opening chatbot:', error);
      // Fallback to homepage mode
      setMode('homepage');
      setIsOpen(true);
    }
  }, [location.pathname]);

  const closeChatbot = useCallback(() => {
    try {
      setIsOpen(false);
      setShowGoodbyeMessage(false);
    } catch (error) {
      console.error('Error closing chatbot:', error);
    }
  }, []);

  const navigateToHowItWorks = useCallback(() => {
    try {
      navigate('/comment-ca-marche?chatbot=open');
      setMode('how-it-works');
    } catch (error) {
      console.error('Error navigating to how-it-works:', error);
      // Fallback: just change mode without navigation
      setMode('how-it-works');
    }
  }, [navigate]);

  const navigateToSupport = useCallback(() => {
    try {
      navigate('/support?section=contact&chatbot=goodbye');
      setShowGoodbyeMessage(true);
    } catch (error) {
      console.error('Error navigating to support:', error);
      // Fallback: just show goodbye message
      setShowGoodbyeMessage(true);
    }
  }, [navigate]);

  const contextValue = {
    isOpen,
    mode,
    openChatbot,
    closeChatbot,
    navigateToHowItWorks,
    navigateToSupport,
    showGoodbyeMessage,
    setShowGoodbyeMessage
  };

  return (
    <ChatbotContext.Provider value={contextValue}>
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
