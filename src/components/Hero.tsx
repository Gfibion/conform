import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, FileCode, Globe, Calculator, Zap, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CalculatorDialog } from "./CalculatorDialog";

export const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryClick = (category: string) => {
    switch (category) {
      case 'file-conversion':
        navigate('/file-conversion');
        break;
      case 'language-translation':
        navigate('/language-translation');
        break;
      case 'unit-conversion':
        navigate('/unit-conversion');
        break;
      case 'ai-tools':
        navigate('/ai-powered-tools');
        break;
      default:
        break;
    }
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    if (query.includes('file') || query.includes('convert') || query.includes('pdf')) {
      navigate('/file-conversion');
    } else if (query.includes('language') || query.includes('translate')) {
      navigate('/language-translation');
    } else if (query.includes('unit') || query.includes('meter') || query.includes('temperature')) {
      navigate('/unit-conversion');
    } else if (query.includes('ai') || query.includes('smart')) {
      navigate('/ai-powered-tools');
    } else if (query.includes('formula')) {
      navigate('/formulas');
    } else {
      navigate('/unit-conversion');
    }
  };

  return (
    <section className="relative py-3 md:py-8 overflow-hidden bg-gradient-hero">
      <div className="container mx-auto mobile-px-compact relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-1 bg-primary/10 border border-primary/20 rounded-full px-2 py-1 mb-2 md:px-3 md:py-1.5 md:mb-3">
            <Zap className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" />
            <span className="text-xs md:text-xs text-foreground/80">Converting the World, One Format at a Time</span>
          </div>
          
          <h1 className="text-2xl md:text-5xl font-bold mb-2 md:mb-3 text-foreground leading-tight px-2">
            Universal Conversion
            <br />
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>
          
          <p className="text-sm md:text-base text-foreground/80 mb-3 md:mb-4 max-w-2xl mx-auto leading-relaxed px-3 md:px-4">
            Transform files, translate code, convert units, and repair documents with our intelligent, 
            AI-powered conversion platform. No registration required to get started.
          </p>

          {/* Search Function - More compact on mobile */}
          <div className="max-w-xs md:max-w-md mx-auto mb-3 md:mb-4 px-3 md:px-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search conversions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-16 py-2 md:pl-10 md:pr-20 md:py-3 text-xs md:text-sm h-8 md:h-auto"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Search className="absolute left-2.5 md:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3 md:w-4 md:h-4" />
              <Button 
                size="sm" 
                className="absolute right-0.5 md:right-1 top-1/2 transform -translate-y-1/2 h-7 px-2 text-xs md:h-auto md:px-auto md:text-sm"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center mb-3 md:mb-4 px-3 md:px-4">
            <Button 
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-all duration-300 hover:scale-105 h-8 md:h-10 text-xs md:text-sm"
            >
              Start Converting Free
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
            </Button>
            <Button 
              size="sm"
              variant="outline" 
              className="border-border hover:bg-accent h-8 md:h-10 text-xs md:text-sm"
              onClick={() => navigate('/formulas')}
            >
              View Formulas
            </Button>
          </div>

          {/* Calculator Button */}
          <div className="flex justify-center mb-3 md:mb-4 px-3 md:px-4">
            <CalculatorDialog 
              variant="outline"
              size="sm"
              className="border-primary/20 text-primary hover:bg-primary/10 h-8 md:h-10 text-xs md:text-sm"
            />
          </div>
          
          {/* Feature icons - Much more compact on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-4 md:mt-6 px-3 md:px-4">
            <div 
              className="text-center cursor-pointer group hover:scale-105 transition-transform duration-200"
              onClick={() => handleCategoryClick('file-conversion')}
            >
              <div className="w-8 h-8 md:w-12 md:h-12 bg-primary/10 rounded-lg mx-auto mb-1.5 md:mb-3 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <FileCode className="w-4 h-4 md:w-6 md:h-6 text-primary" />
              </div>
              <p className="text-xs md:text-sm text-foreground/70 group-hover:text-primary transition-colors">File Conversion</p>
            </div>
            <div 
              className="text-center cursor-pointer group hover:scale-105 transition-transform duration-200"
              onClick={() => handleCategoryClick('language-translation')}
            >
              <div className="w-8 h-8 md:w-12 md:h-12 bg-primary/10 rounded-lg mx-auto mb-1.5 md:mb-3 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Globe className="w-4 h-4 md:w-6 md:h-6 text-primary" />
              </div>
              <p className="text-xs md:text-sm text-foreground/70 group-hover:text-primary transition-colors">Language Translation</p>
            </div>
            <div 
              className="text-center cursor-pointer group hover:scale-105 transition-transform duration-200"
              onClick={() => handleCategoryClick('unit-conversion')}
            >
              <div className="w-8 h-8 md:w-12 md:h-12 bg-primary/10 rounded-lg mx-auto mb-1.5 md:mb-3 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Calculator className="w-4 h-4 md:w-6 md:h-6 text-primary" />
              </div>
              <p className="text-xs md:text-sm text-foreground/70 group-hover:text-primary transition-colors">Unit Conversion</p>
            </div>
            <div 
              className="text-center cursor-pointer group hover:scale-105 transition-transform duration-200"
              onClick={() => handleCategoryClick('ai-tools')}
            >
              <div className="w-8 h-8 md:w-12 md:h-12 bg-primary/10 rounded-lg mx-auto mb-1.5 md:mb-3 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Zap className="w-4 h-4 md:w-6 md:h-6 text-primary" />
              </div>
              <p className="text-xs md:text-sm text-foreground/70 group-hover:text-primary transition-colors">AI-Powered Tools</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
