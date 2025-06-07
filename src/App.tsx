import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import HowItWorksPage from "./pages/HowItWorksPage";
import ServiceProvidersPage from "./pages/ServiceProvidersPage";
import AuthPage from "./components/auth/AuthPage";
import BrowseCleaners from "./pages/BrowseCleaners";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/comment-ca-marche" element={<HowItWorksPage />} />
            <Route path="/prestataires" element={<ServiceProvidersPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/browse-cleaners" element={<BrowseCleaners />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
