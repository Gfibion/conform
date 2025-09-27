import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { JSONFormatter as JSONFormatterComponent } from "@/components/tools/JSONFormatter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, FileCode } from "lucide-react";
import { Helmet } from "react-helmet-async";

const JSONFormatterPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JSON Formatter Tool",
    "description": "Format, validate, and minify JSON data online. Free JSON formatter and validator with syntax highlighting and error detection.",
    "url": "https://your-domain.com/tools/json-formatter",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "JSON formatting and beautification",
      "JSON validation and error detection",
      "JSON minification",
      "Syntax highlighting",
      "Copy to clipboard",
      "Real-time validation"
    ]
  };

  return (
    <>
      <Helmet>
        <title>JSON Formatter - Format, Validate, Minify JSON Online | Free Tool</title>
        <meta name="description" content="Free online JSON formatter and validator. Format, beautify, validate, and minify JSON data instantly. Fix JSON syntax errors with our JSON formatting tool." />
        <meta name="keywords" content="JSON formatter, JSON validator, JSON beautifier, JSON minifier, format JSON, validate JSON, JSON syntax checker, JSON tool" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://your-domain.com/tools/json-formatter" />
        
        {/* Open Graph */}
        <meta property="og:title" content="JSON Formatter - Format, Validate, Minify JSON Online" />
        <meta property="og:description" content="Free online JSON formatter and validator. Format, beautify, validate, and minify JSON data instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-domain.com/tools/json-formatter" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="JSON Formatter - Format, Validate, Minify JSON Online" />
        <meta name="twitter:description" content="Free online JSON formatter and validator. Format, beautify, validate, and minify JSON data instantly." />
        
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
                <FileCode className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground/80">JSON Processing Tool</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                JSON Formatter & Validator
              </h1>
              
              <p className="text-lg text-foreground/80 leading-relaxed">
                Format, validate, and minify JSON data online. Perfect for developers working with APIs, configuration files, and data processing.
              </p>
            </div>
          </div>
        </section>

        {/* JSON Formatter Tool */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto mobile-px-compact">
            <div className="max-w-6xl mx-auto">
              <JSONFormatterComponent />
            </div>
            
            {/* SEO Content */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-6">JSON Formatter Features</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Formatting Features</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>Beautify JSON:</strong> Format unreadable JSON with proper indentation</li>
                      <li>• <strong>Minify JSON:</strong> Compress JSON by removing whitespace</li>
                      <li>• <strong>Validate JSON:</strong> Check syntax and detect errors</li>
                      <li>• <strong>Real-time Validation:</strong> Instant feedback on JSON validity</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Developer Benefits</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>Error Detection:</strong> Identify and fix JSON syntax errors</li>
                      <li>• <strong>Copy to Clipboard:</strong> Easy copying of formatted results</li>
                      <li>• <strong>Large File Support:</strong> Handle complex JSON structures</li>
                      <li>• <strong>No Data Storage:</strong> Client-side processing for privacy</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Common JSON Use Cases</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-card p-4 rounded-lg border">
                      <h4 className="font-semibold mb-2">API Development</h4>
                      <p className="text-sm text-muted-foreground">Format API responses and request payloads for easier debugging and testing.</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                      <h4 className="font-semibold mb-2">Configuration Files</h4>
                      <p className="text-sm text-muted-foreground">Validate and format JSON configuration files for applications and services.</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                      <h4 className="font-semibold mb-2">Data Processing</h4>
                      <p className="text-sm text-muted-foreground">Clean and structure JSON data for analysis, import, or export operations.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">How to Use the JSON Formatter</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Paste your JSON data into the input field</li>
                    <li>Click "Format JSON" to beautify and validate the data</li>
                    <li>Use "Minify JSON" to compress the JSON for production use</li>
                    <li>Check the validation status to ensure proper JSON syntax</li>
                    <li>Copy the formatted result to your clipboard</li>
                  </ol>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">JSON Validation Rules</h3>
                  <div className="bg-card p-6 rounded-lg border">
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>Proper Syntax:</strong> Correct use of braces, brackets, and commas</li>
                      <li>• <strong>String Quotes:</strong> All strings must be enclosed in double quotes</li>
                      <li>• <strong>Key-Value Pairs:</strong> Objects must have quoted keys and valid values</li>
                      <li>• <strong>Data Types:</strong> Support for strings, numbers, booleans, arrays, objects, and null</li>
                      <li>• <strong>No Trailing Commas:</strong> Commas are not allowed after the last element</li>
                    </ul>
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

export default JSONFormatterPage;