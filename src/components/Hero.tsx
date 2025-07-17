import { Button } from "@/components/ui/button";
import { ArrowRight, FileCode, Globe, Calculator, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative py-8 md:py-12 lg:py-20 overflow-hidden bg-gradient-hero">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5 mb-4">
            <Zap className="w-3 h-3 text-primary" />
            <span className="text-xs text-foreground/80">Converting the World, One Format at a Time</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 text-foreground leading-tight">
            Universal Conversion
            <br />
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>
          
          <p className="text-sm md:text-lg text-foreground/80 mb-6 max-w-2xl mx-auto leading-relaxed px-4">
            Transform files, translate code, convert units, and repair documents with our intelligent, 
            AI-powered conversion platform. No registration required to get started.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8 px-4">
            <Button 
              size="default" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              Start Converting Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              size="default" 
              variant="outline" 
              className="border-border hover:bg-accent w-full sm:w-auto"
            >
              View All Tools
            </Button>
          </div>
          
          {/* Feature icons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 px-4">
            <div className="text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <FileCode className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs text-foreground/70">File Conversion</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs text-foreground/70">Language Translation</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs text-foreground/70">Unit Conversion</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs text-foreground/70">AI-Powered Tools</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};