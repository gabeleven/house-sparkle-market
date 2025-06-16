
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
import Support from './pages/Support';
import ProviderReviews from './pages/ProviderReviews';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import NotFound from './pages/NotFound';
import { BookingsPage } from './pages/BookingsPage';
import { TabbedChatbot } from '@/components/support/TabbedChatbot';
import { FloatingChatButton } from '@/components/support/FloatingChatButton';
import Auth from './pages/Auth';
import MyProfile from './pages/MyProfile';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';
import BrowseProviders from './pages/BrowseProviders';
import Roadmap from './pages/Roadmap';
import CalendarDashboard from './pages/CalendarDashboard';
import GrowthDashboard from './pages/GrowthDashboard';
import Settings from './pages/Settings';
import TaxCompliancePage from './pages/TaxCompliancePage';
import ServiceProvidersPage from './pages/ServiceProvidersPage';
import ProviderDashboard from './pages/ProviderDashboard';
import Performance from './pages/analytics/Performance';
import Intelligence from './pages/analytics/Intelligence';
import Insights from './pages/analytics/Insights';
import Reports from './pages/analytics/Reports';
import Chat from './pages/Chat';

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
                            <Route path="/browse-providers" element={<BrowseProviders />} />
                            <Route path="/browse-services" element={<Navigate to="/browse-providers" replace />} />
                            <Route path="/roadmap" element={<Roadmap />} />
                            <Route path="/provider/:providerId/reviews" element={<ProviderReviews />} />
                            <Route path="/calendar" element={<CalendarDashboard />} />
                            <Route path="/dashboard" element={<ProviderDashboard />} />
                            <Route path="/growth-dashboard" element={<GrowthDashboard />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="/tax-compliance" element={<TaxCompliancePage />} />
                            <Route path="/pricing" element={<ServiceProvidersPage />} />
                            <Route path="/support" element={<Support />} />
                            <Route path="/chat" element={<Chat />} />
                            <Route path="/analytics" element={<AnalyticsDashboard />} />
                            <Route path="/analytics/performance" element={<Performance />} />
                            <Route path="/analytics/intelligence" element={<Intelligence />} />
                            <Route path="/analytics/insights" element={<Insights />} />
                            <Route path="/analytics/reports" element={<Reports />} />
                            <Route path="/bookings" element={<BookingsPage />} />
                            
                            {/* Redirect old routes to unified browse providers */}
                            <Route path="/browse-cleaners" element={<Navigate to="/browse-providers" replace />} />
                            <Route path="/cleaner/:cleanerId/reviews" element={<Navigate to="/provider/:cleanerId/reviews" replace />} />
                            
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
  );
}

export default App;
