
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, FileCode, Globe, Calculator, Zap, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
    // For now, navigate to the most relevant page based on search query
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
      // Default to unit conversion as it's most common
      navigate('/unit-conversion');
    }
  };

  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-hero">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5 mb-6">
            <Zap className="w-3 h-3 text-primary" />
            <span className="text-xs text-foreground/80">Converting the World, One Format at a Time</span>
          </div>
          
          <h1 className="text-3xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
            Universal Conversion
            <br />
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed px-4">
            Transform files, translate code, convert units, and repair documents with our intelligent, 
            AI-powered conversion platform. No registration required to get started.
          </p>

          {/* Search Function */}
          <div className="max-w-md mx-auto mb-8 px-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search conversions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-20 py-3 text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Button 
                size="sm" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8 px-4">
            <Button 
              size="default" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-all duration-300 hover:scale-105"
            >
              Start Converting Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              size="default" 
              variant="outline" 
              className="border-border hover:bg-accent"
              onClick={() => navigate('/formulas')}
            >
              View Formulas
            </Button>
          </div>
          
          {/* Feature icons - Now functional and mobile responsive */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 px-4">
            <div 
              className="text-center cursor-pointer group hover:scale-105 transition-transform duration-200"
              onClick={() => handleCategoryClick('file-conversion')}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <FileCode className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm text-foreground/70 group-hover:text-primary transition-colors">File Conversion</p>
            </div>
            <div 
              className="text-center cursor-pointer group hover:scale-105 transition-transform duration-200"
              onClick={() => handleCategoryClick('language-translation')}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm text-foreground/70 group-hover:text-primary transition-colors">Language Translation</p>
            </div>
            <div 
              className="text-center cursor-pointer group hover:scale-105 transition-transform duration-200"
              onClick={() => handleCategoryClick('unit-conversion')}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm text-foreground/70 group-hover:text-primary transition-colors">Unit Conversion</p>
            </div>
            <div 
              className="text-center cursor-pointer group hover:scale-105 transition-transform duration-200"
              onClick={() => handleCategoryClick('ai-tools')}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm text-foreground/70 group-hover:text-primary transition-colors">AI-Powered Tools</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
