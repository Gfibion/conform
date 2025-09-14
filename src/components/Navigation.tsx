
import { Button } from "@/components/ui/button";
import { Moon, Sun, Zap, Menu, X, FileCode, Globe, Calculator, Brain, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthButton } from "@/components/AuthButton";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    setIsDark(theme === "dark");
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-2 md:px-4 py-2 md:py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1 md:space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="w-3 h-3 md:w-5 md:h-5 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Conform
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1">
                Tools
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 10 6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 p-4 bg-background border border-border shadow-lg z-50">
                <div className="grid grid-cols-2 gap-3">
                  <Link 
                    to="/file-conversion" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <FileCode className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">File Conversion</div>
                      <div className="text-xs text-muted-foreground">PDF, Images, Videos</div>
                    </div>
                  </Link>
                  
                  <Link 
                    to="/language-translation" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Globe className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Language Translation</div>
                      <div className="text-xs text-muted-foreground">Text, Voice, Documents</div>
                    </div>
                  </Link>
                  
                  <Link 
                    to="/unit-conversion" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Calculator className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Unit Conversion</div>
                      <div className="text-xs text-muted-foreground">Length, Weight, Temperature</div>
                    </div>
                  </Link>
                  
                  <Link 
                    to="/ai-powered-tools" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Brain className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">AI-Powered Tools</div>
                      <div className="text-xs text-muted-foreground">Smart Conversions</div>
                    </div>
                  </Link>
                </div>
                
                <div className="mt-3 pt-3 border-t border-border">
                  <Link 
                    to="/formulas" 
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group w-full"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <BookOpen className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Formulas & Calculators</div>
                      <div className="text-xs text-muted-foreground">Mathematical formulas and calculations</div>
                    </div>
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              About
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Pricing
            </a>
          </div>

          {/* Desktop Auth & Theme */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-9 h-9"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <AuthButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-7 h-7 md:w-9 md:h-9"
            >
              {isDark ? <Sun className="w-3 h-3 md:w-4 md:h-4" /> : <Moon className="w-3 h-3 md:w-4 md:h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-7 h-7 md:w-9 md:h-9"
            >
              {isMobileMenuOpen ? <X className="w-3 h-3 md:w-4 md:h-4" /> : <Menu className="w-3 h-3 md:w-4 md:h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 md:mt-4 pb-2 md:pb-4 border-t border-border">
            <div className="flex flex-col space-y-2 md:space-y-4 pt-2 md:pt-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground mb-2">Tools</div>
                <div className="grid grid-cols-1 gap-2 ml-3">
                  <Link to="/file-conversion" className="text-muted-foreground hover:text-foreground transition-colors text-sm py-1">
                    File Conversion
                  </Link>
                  <Link to="/language-translation" className="text-muted-foreground hover:text-foreground transition-colors text-sm py-1">
                    Language Translation
                  </Link>
                  <Link to="/unit-conversion" className="text-muted-foreground hover:text-foreground transition-colors text-sm py-1">
                    Unit Conversion
                  </Link>
                  <Link to="/ai-powered-tools" className="text-muted-foreground hover:text-foreground transition-colors text-sm py-1">
                    AI-Powered Tools
                  </Link>
                  <Link to="/formulas" className="text-muted-foreground hover:text-foreground transition-colors text-sm py-1">
                    Formulas
                  </Link>
                </div>
              </div>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                About
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Pricing
              </a>
              <div className="pt-1 md:pt-2">
                <AuthButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
