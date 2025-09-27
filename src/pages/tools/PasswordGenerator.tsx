import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PasswordGenerator as PasswordGeneratorComponent } from "@/components/tools/PasswordGenerator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import { Helmet } from "react-helmet-async";

const PasswordGeneratorPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Password Generator Tool",
    "description": "Generate secure, strong passwords with custom length and character sets. Free online password generator with strength analysis and security features.",
    "url": "https://your-domain.com/tools/password-generator",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Secure password generation",
      "Customizable password length",
      "Multiple character sets",
      "Password strength analysis",
      "Copy to clipboard",
      "No password storage"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Password Generator - Create Strong, Secure Passwords | Free Tool</title>
        <meta name="description" content="Generate strong, secure passwords online. Customizable length, character sets, and strength analysis. Free password generator with no data storage for maximum security." />
        <meta name="keywords" content="password generator, strong passwords, secure passwords, random password, password creator, security tool, password strength" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://your-domain.com/tools/password-generator" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Password Generator - Create Strong, Secure Passwords" />
        <meta property="og:description" content="Generate strong, secure passwords online. Customizable length, character sets, and strength analysis." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-domain.com/tools/password-generator" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Password Generator - Create Strong, Secure Passwords" />
        <meta name="twitter:description" content="Generate strong, secure passwords online. Customizable length, character sets, and strength analysis." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Header */}
        <section className="py-8 md:py-12 bg-gradient-subtle">
          <div className="container mx-auto mobile-px-compact">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" size="sm" asChild>
                <Link to="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
            
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground/80">Security & Privacy Tool</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Password Generator
              </h1>
              
              <p className="text-lg text-foreground/80 leading-relaxed">
                Generate strong, secure passwords with customizable length and character sets. Protect your accounts with randomly generated passwords that are impossible to guess.
              </p>
            </div>
          </div>
        </section>

        {/* Password Generator Tool */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto mobile-px-compact">
            <div className="max-w-4xl mx-auto">
              <PasswordGeneratorComponent />
            </div>
            
            {/* SEO Content */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-6">Password Security Guidelines</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Strong Password Features</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>Length:</strong> At least 12 characters for good security</li>
                      <li>• <strong>Uppercase Letters:</strong> Include A-Z for complexity</li>
                      <li>• <strong>Lowercase Letters:</strong> Include a-z for variety</li>
                      <li>• <strong>Numbers:</strong> Add 0-9 for additional entropy</li>
                      <li>• <strong>Symbols:</strong> Use special characters for maximum security</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Password Strength Levels</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>Weak:</strong> Under 8 characters, limited character types</li>
                      <li>• <strong>Fair:</strong> 8-10 characters, some variety</li>
                      <li>• <strong>Good:</strong> 11-15 characters, multiple character types</li>
                      <li>• <strong>Strong:</strong> 16+ characters, all character types</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Password Security Best Practices</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card p-4 rounded-lg border">
                      <h4 className="font-semibold mb-2 text-green-600">✓ Do This</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Use unique passwords for each account</li>
                        <li>• Enable two-factor authentication</li>
                        <li>• Use a password manager</li>
                        <li>• Generate random passwords</li>
                        <li>• Update passwords regularly</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                      <h4 className="font-semibold mb-2 text-red-600">✗ Avoid This</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Using personal information</li>
                        <li>• Reusing passwords across sites</li>
                        <li>• Using common passwords</li>
                        <li>• Sharing passwords with others</li>
                        <li>• Writing passwords down unsecurely</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">How to Use the Password Generator</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Set your desired password length (12+ characters recommended)</li>
                    <li>Select character types: uppercase, lowercase, numbers, symbols</li>
                    <li>Choose whether to exclude similar characters (0, O, l, I)</li>
                    <li>Click "Generate Password" to create a secure password</li>
                    <li>Copy the password to your clipboard and use it immediately</li>
                  </ol>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Why Use Random Passwords?</h3>
                  <div className="bg-card p-6 rounded-lg border">
                    <p className="text-sm mb-4">Random passwords are essential for security because they:</p>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>Resist Brute Force Attacks:</strong> Take millions of years to crack with current technology</li>
                      <li>• <strong>Prevent Dictionary Attacks:</strong> Don't contain common words or patterns</li>
                      <li>• <strong>Avoid Personal Information:</strong> Can't be guessed from social media or public records</li>
                      <li>• <strong>Provide Maximum Entropy:</strong> Use the full character space for security</li>
                      <li>• <strong>Protect Multiple Accounts:</strong> Unique passwords prevent credential stuffing</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Privacy & Security</h3>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <strong>🔒 Your passwords are never stored or transmitted.</strong> This password generator runs entirely in your browser, ensuring complete privacy and security. Generated passwords exist only in your browser's memory and are never saved to any server.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default PasswordGeneratorPage;