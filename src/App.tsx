
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FileConversion from "./pages/FileConversion";
import LanguageTranslation from "./pages/LanguageTranslation";
import UnitConversion from "./pages/UnitConversion";
import AIPoweredTools from "./pages/AIPoweredTools";
import Formulas from "./pages/Formulas";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";

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
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/file-conversion" 
              element={
                <ProtectedRoute>
                  <FileConversion />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/language-translation" 
              element={
                <ProtectedRoute>
                  <LanguageTranslation />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/unit-conversion" 
              element={
                <ProtectedRoute>
                  <UnitConversion />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/ai-powered-tools" 
              element={
                <ProtectedRoute>
                  <AIPoweredTools />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/formulas" 
              element={
                <ProtectedRoute>
                  <Formulas />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
