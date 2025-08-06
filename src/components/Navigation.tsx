
import { Button } from "@/components/ui/button";
import { Moon, Sun, Zap, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthButton } from "@/components/AuthButton";

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
          <div className="flex items-center space-x-1 md:space-x-2">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="w-3 h-3 md:w-5 md:h-5 text-white" />
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Conform
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#tools" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
              Tools
            </a>
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
              <a href="#tools" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Tools
              </a>
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
