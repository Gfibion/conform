import { Zap, Github, Twitter, Mail, Linkedin, Facebook, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        {/* Mobile: 2 column grid, Tablet: 3 column, Desktop: 4 column */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-12">
          {/* Brand - Full width on mobile, spans 2 columns */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 space-y-4 lg:space-y-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-4 h-4 lg:w-6 lg:h-6 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Conform
                  </span>
                  <p className="text-xs text-muted-foreground font-medium">by Gfibion Genesis</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Converting the World, One Format at a Time. Your universal conversion platform for files, code, units, and more.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Follow Us</h4>
              <div className="flex space-x-2 lg:space-x-3">
                <a 
                  href="https://twitter.com/conform" 
                  className="w-8 h-8 lg:w-10 lg:h-10 bg-muted hover:bg-primary/10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                </a>
                <a 
                  href="https://github.com/conform" 
                  className="w-8 h-8 lg:w-10 lg:h-10 bg-muted hover:bg-primary/10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                </a>
                <a 
                  href="https://linkedin.com/company/conform" 
                  className="w-8 h-8 lg:w-10 lg:h-10 bg-muted hover:bg-primary/10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                </a>
                <a 
                  href="mailto:contact@conform.com" 
                  className="w-8 h-8 lg:w-10 lg:h-10 bg-muted hover:bg-primary/10 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
                  aria-label="Email"
                >
                  <Mail className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Tools */}
          <div className="space-y-4 lg:space-y-6">
            <h3 className="text-base lg:text-lg font-semibold text-foreground border-b border-border/50 pb-2">
              Conversion Tools
            </h3>
            <div className="grid grid-cols-1 gap-2 lg:gap-3">
              <a href="/unit-conversion" className="text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                File Converter
              </a>
              <a href="/unit-conversion" className="text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                Unit Converter
              </a>
              <a href="/unit-conversion" className="text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                Currency Converter
              </a>
              <a href="/language-translation" className="text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                Code Translator
              </a>
              <a href="/language-translation" className="text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                Language Translator
              </a>
              <a href="/calculator" className="text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                Scientific Calculator
              </a>
            </div>
          </div>

          {/* Features & Company Combined on Mobile */}
          <div className="space-y-4 lg:space-y-6">
            <h3 className="text-base lg:text-lg font-semibold text-foreground border-b border-border/50 pb-2">
              Features
            </h3>
            <div className="grid grid-cols-1 gap-2 lg:gap-3">
              <a href="/ai-powered-tools" className="text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                AI Assistant
              </a>
              <a href="/file-conversion" className="text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                Batch Processing
              </a>
              <a href="/formulas" className="text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                Formula Library
              </a>
              <a href="/history" className="text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                Conversion History
              </a>
              <a href="#" className="text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                Cloud Storage
              </a>
              <a href="#" className="text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                API Access
              </a>
              <a href="#" className="text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                Coming Soon
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4 lg:space-y-6">
            <h3 className="text-base lg:text-lg font-semibold text-foreground border-b border-border/50 pb-2">
              Company
            </h3>
            <div className="grid grid-cols-2 gap-2 lg:gap-3">
              <a href="#" className="text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                About Us
              </a>
              <a href="#" className="text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                Pricing
              </a>
              <a href="#" className="text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                Privacy Policy
              </a>
              <a href="#" className="text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                Terms of Service
              </a>
              <a href="#" className="text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                Contact
              </a>
              <a href="#" className="text-xs lg:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center group">
                <span className="w-1.5 h-1.5 bg-primary/60 rounded-full mr-2 group-hover:bg-primary transition-colors"></span>
                Support
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                &copy; 2024 <span className="font-semibold text-foreground">Conform</span>. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground/80 mt-1">
                A product of <span className="font-medium">Gfibion Genesis</span>
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground flex items-center justify-center">
                Made with <span className="text-red-500 mx-1">❤️</span> for universal accessibility
              </p>
            </div>
            
            <div className="flex justify-center md:justify-end space-x-6">
              <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Terms
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};