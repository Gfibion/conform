import { Button } from "@/components/ui/button";
import { ArrowRight, FileCode, Globe, Calculator, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-95"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 border border-secondary/20 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-secondary" />
            <span className="text-sm text-muted-foreground">Converting the World, One Format at a Time</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent leading-tight">
            Universal Conversion
            <br />
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform files, translate code, convert units, and repair documents with our intelligent, 
            AI-powered conversion platform. No registration required to get started.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 shadow-glow transition-all duration-300 hover:scale-105"
            >
              Start Converting Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              View All Tools
            </Button>
          </div>
          
          {/* Feature icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-lg mx-auto mb-3 flex items-center justify-center backdrop-blur-sm">
                <FileCode className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-white/70">File Conversion</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-lg mx-auto mb-3 flex items-center justify-center backdrop-blur-sm">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-white/70">Language Translation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-lg mx-auto mb-3 flex items-center justify-center backdrop-blur-sm">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-white/70">Unit Conversion</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 rounded-lg mx-auto mb-3 flex items-center justify-center backdrop-blur-sm">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-white/70">AI-Powered Tools</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};