
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from 'next-themes';
import { ThemeProvider as CustomThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ChatbotProvider } from '@/contexts/ChatbotContext';
import { IntensityThemeProvider } from "./contexts/IntensityThemeContext"
import { AuthProvider } from '@/hooks/useAuth';
import Header from './components/Header';
import Footer from './components/Footer';
import Index from './pages/Index';
import Support from './pages/Support';
import HowItWorksPage from './pages/HowItWorksPage';
import { ChatPage } from './components/chat/ChatPage';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import NotFound from './pages/NotFound';
import { BookingsPage } from './pages/BookingsPage';
import { TabbedChatbot } from '@/components/support/TabbedChatbot';
import { FloatingChatButton } from '@/components/support/FloatingChatButton';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <IntensityThemeProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <CustomThemeProvider>
            <LanguageProvider>
              <AuthProvider>
                <ChatbotProvider>
                  <Toaster />
                  <BrowserRouter>
                    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
                      <Header />
                      <main className="relative z-10">
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/support" element={<Support />} />
                          <Route path="/how-it-works" element={<HowItWorksPage />} />
                          <Route path="/messages" element={<ChatPage />} />
                          <Route path="/analytics" element={<AnalyticsDashboard />} />
                          <Route path="/bookings" element={<BookingsPage />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>
                      <Footer />
                      
                      {/* Floating Chat Components */}
                      <FloatingChatButton />
                      <TabbedChatbot />
                    </div>
                  </BrowserRouter>
                </ChatbotProvider>
              </AuthProvider>
            </LanguageProvider>
          </CustomThemeProvider>
        </ThemeProvider>
      </IntensityThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
