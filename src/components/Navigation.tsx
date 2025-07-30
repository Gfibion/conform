import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export const Navigation = () => {
  const [isDark, setIsDark] = useState(false);

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
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg md:text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Conform
          </span>
        </div>
        
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

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-8 h-8 md:w-9 md:h-9"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button variant="outline" className="hidden md:flex text-xs px-3">
            Sign In
          </Button>
          <Button className="bg-gradient-primary text-primary-foreground border-0 hover:shadow-glow transition-all text-xs md:text-sm px-3 md:px-4">
            Get Started
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden w-8 h-8">
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};