
import Auth from "@/pages/Auth";
import Index from "@/pages/Index";
import History from "@/pages/History";
import NotFound from "@/pages/NotFound";
import FileConversion from "@/pages/FileConversion";
import LanguageTranslation from "@/pages/LanguageTranslation";
import UnitConversion from "@/pages/UnitConversion";
import AIPoweredTools from "@/pages/AIPoweredTools";
import Formulas from "@/pages/Formulas";
import Calculator from "@/pages/Calculator";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"
import { UnitConverter } from "@/components/tools/UnitConverter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

// Individual tool pages
import LengthConverterPage from "@/pages/tools/LengthConverter";
import WeightConverterPage from "@/pages/tools/WeightConverter";
import TemperatureConverterPage from "@/pages/tools/TemperatureConverter";
import TimeConverterPage from "@/pages/tools/TimeConverter";
import CurrencyConverterPage from "@/pages/tools/CurrencyConverter";
import AITextToolsPage from "@/pages/tools/AITextTools";
import AICodeToolsPage from "@/pages/tools/AICodeTools";
import JSONFormatterPage from "@/pages/tools/JSONFormatter";
import PasswordGeneratorPage from "@/pages/tools/PasswordGenerator";
import ColorToolsPage from "@/pages/tools/ColorTools";
import TimeZoneConverterPage from "@/pages/tools/TimeZoneConverter";
import ScientificCalculatorPage from "@/pages/tools/ScientificCalculator";
import RegexTesterPage from "@/pages/tools/RegexTester";
import QRCodeGeneratorPage from "@/pages/tools/QRCodeGenerator";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
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
              <Route path="/calculator" element={<Calculator />} />
              <Route
                path="/unit-converter"
                element={
                  <ProtectedRoute>
                    <UnitConverter />
                  </ProtectedRoute>
                }
              />
              
              {/* Individual Tool Routes */}
              <Route path="/tools/length-converter" element={<LengthConverterPage />} />
              <Route path="/tools/weight-converter" element={<WeightConverterPage />} />
              <Route path="/tools/temperature-converter" element={<TemperatureConverterPage />} />
              <Route path="/tools/time-converter" element={<TimeConverterPage />} />
              <Route path="/tools/currency-converter" element={<CurrencyConverterPage />} />
              <Route path="/tools/ai-text-tools" element={<AITextToolsPage />} />
              <Route path="/tools/ai-code-tools" element={<AICodeToolsPage />} />
              <Route path="/tools/json-formatter" element={<JSONFormatterPage />} />
              <Route path="/tools/password-generator" element={<PasswordGeneratorPage />} />
              <Route path="/tools/color-tools" element={<ColorToolsPage />} />
              <Route path="/tools/timezone-converter" element={<TimeZoneConverterPage />} />
              <Route path="/tools/scientific-calculator" element={<ScientificCalculatorPage />} />
            <Route path="/tools/regex-tester" element={<RegexTesterPage />} />
            <Route path="/tools/qr-code-generator" element={<QRCodeGeneratorPage />} />
            
            {/* Catch all route - must be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
