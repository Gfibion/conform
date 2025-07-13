import { Zap, Github, Twitter, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-muted py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">Conform</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Converting the World, One Format at a Time. 
              Your universal conversion platform for files, code, and units.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Conversion Tools</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">File Converter</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Unit Converter</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Currency Converter</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Code Translator</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Language Translator</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Image Converter</a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">File Repair</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Document Scanner</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">AI Assistant</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Batch Processing</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Cloud Storage</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">API Access</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-border my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2024 Conform. All rights reserved.</p>
          <p>Made with ❤️ for universal accessibility</p>
        </div>
      </div>
    </footer>
  );
};