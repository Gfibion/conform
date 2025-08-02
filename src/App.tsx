
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FileConversion from "./pages/FileConversion";
import LanguageTranslation from "./pages/LanguageTranslation";
import UnitConversion from "./pages/UnitConversion";
import AIPoweredTools from "./pages/AIPoweredTools";
import Formulas from "./pages/Formulas";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/file-conversion" element={<FileConversion />} />
          <Route path="/language-translation" element={<LanguageTranslation />} />
          <Route path="/unit-conversion" element={<UnitConversion />} />
          <Route path="/ai-powered-tools" element={<AIPoweredTools />} />
          <Route path="/formulas" element={<Formulas />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
