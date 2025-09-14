
import Auth from "@/pages/Auth";
import Index from "@/pages/Index";
import History from "@/pages/History";
import NotFound from "@/pages/NotFound";
import FileConversion from "@/pages/FileConversion";
import LanguageTranslation from "@/pages/LanguageTranslation";
import UnitConversion from "@/pages/UnitConversion";
import AIPoweredTools from "@/pages/AIPoweredTools";
import Formulas from "@/pages/Formulas";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"
import { UnitConverter } from "@/components/tools/UnitConverter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Toaster />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <History />
                  </ProtectedRoute>
                }
              />
              <Route path="/file-conversion" element={<FileConversion />} />
              <Route path="/language-translation" element={<LanguageTranslation />} />
              <Route path="/unit-conversion" element={<UnitConversion />} />
              <Route path="/ai-powered-tools" element={<AIPoweredTools />} />
              <Route path="/formulas" element={<Formulas />} />
              <Route
                path="/unit-converter"
                element={
                  <ProtectedRoute>
                    <UnitConverter />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
