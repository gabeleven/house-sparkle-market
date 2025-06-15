
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from 'next-themes';
import { ThemeProvider as CustomThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ChatbotProvider } from '@/contexts/ChatbotContext';
import { IntensityThemeProvider } from "./contexts/IntensityThemeContext"
import { AnalyticsProvider } from '@/contexts/AnalyticsContext';
import { AuthProvider } from '@/hooks/useAuth';
import Header from './components/Header';
import Footer from './components/Footer';
import Index from './pages/Index';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import NotFound from './pages/NotFound';
import { BookingsPage } from './pages/BookingsPage';
import { TabbedChatbot } from '@/components/support/TabbedChatbot';
import { FloatingChatButton } from '@/components/support/FloatingChatButton';
import Auth from './pages/Auth';
import MyProfile from './pages/MyProfile';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';
import BrowseServices from './pages/BrowseServices';
import Roadmap from './pages/Roadmap';
import CleanerReviews from './pages/CleanerReviews';
import CalendarDashboard from './pages/CalendarDashboard';
import Settings from './pages/Settings';
import ServiceProvidersPage from './pages/ServiceProvidersPage';
import Performance from './pages/analytics/Performance';
import Intelligence from './pages/analytics/Intelligence';
import Insights from './pages/analytics/Insights';
import Reports from './pages/analytics/Reports';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Disable queries during SSR for compatibility
        enabled: typeof window !== 'undefined',
      },
    },
  });

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <IntensityThemeProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <CustomThemeProvider>
              <LanguageProvider>
                <AuthProvider>
                  <ChatbotProvider>
                    <AnalyticsProvider>
                      <Toaster />
                      <BrowserRouter>
                        <div className="min-h-screen">
                          <Header />
                          <main className="relative z-10">
                            <Routes>
                              <Route path="/" element={<Index />} />
                              <Route path="/auth" element={<Auth />} />
                              <Route path="/my-profile" element={<MyProfile />} />
                              <Route path="/profile" element={<Profile />} />
                              <Route path="/public-profile/:id" element={<PublicProfile />} />
                              <Route path="/browse-services" element={<BrowseServices />} />
                              <Route path="/roadmap" element={<Roadmap />} />
                              <Route path="/cleaner/:cleanerId/reviews" element={<CleanerReviews />} />
                              <Route path="/calendar" element={<CalendarDashboard />} />
                              <Route path="/settings" element={<Settings />} />
                              <Route path="/pricing" element={<ServiceProvidersPage />} />
                              <Route path="/analytics" element={<AnalyticsDashboard />} />
                              <Route path="/analytics/performance" element={<Performance />} />
                              <Route path="/analytics/intelligence" element={<Intelligence />} />
                              <Route path="/analytics/insights" element={<Insights />} />
                              <Route path="/analytics/reports" element={<Reports />} />
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
                    </AnalyticsProvider>
                  </ChatbotProvider>
                </AuthProvider>
              </LanguageProvider>
            </CustomThemeProvider>
          </ThemeProvider>
        </IntensityThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
