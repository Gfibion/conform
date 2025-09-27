import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AICodeTools as AICodeToolsComponent } from "@/components/tools/AICodeTools";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Code } from "lucide-react";
import { Helmet } from "react-helmet-async";

const AICodeToolsPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Code Tools",
    "description": "AI-powered code analysis, explanation, optimization, and debugging tools. Get coding help with artificial intelligence assistance for developers.",
    "url": "https://your-domain.com/tools/ai-code-tools",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "AI code explanation",
      "Code optimization",
      "Bug analysis and fixes",
      "Code documentation",
      "Programming assistance",
      "Code review automation"
    ]
  };

  return (
    <>
      <Helmet>
        <title>AI Code Tools - Code Analysis, Optimization, Debugging | Free AI Developer Tools</title>
        <meta name="description" content="Free AI-powered code tools for developers. Get code explanations, optimize algorithms, debug issues, and generate documentation instantly with AI assistance." />
        <meta name="keywords" content="AI code tools, code analysis, code optimization, debugging AI, programming assistant, code explanation, developer tools, AI coding help" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://your-domain.com/tools/ai-code-tools" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI Code Tools - Code Analysis, Optimization, Debugging" />
        <meta property="og:description" content="Free AI-powered code tools for developers. Get code explanations, optimize algorithms, debug issues instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-domain.com/tools/ai-code-tools" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="AI Code Tools - Code Analysis, Optimization, Debugging" />
        <meta name="twitter:description" content="Free AI-powered code tools for developers. Get code explanations, optimize algorithms, debug issues instantly." />
        
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
                <Link to="/ai-powered-tools">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to AI Tools
                </Link>
              </Button>
            </div>
            
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
                <Code className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground/80">AI-Powered Development Tools</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                AI Code Tools
              </h1>
              
              <p className="text-lg text-foreground/80 leading-relaxed">
                Enhance your development workflow with AI-powered code analysis, optimization, debugging, and documentation tools for any programming language.
              </p>
            </div>
          </div>
        </section>

        {/* AI Code Tools */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto mobile-px-compact">
            <div className="max-w-4xl mx-auto">
              <AICodeToolsComponent />
            </div>
            
            {/* SEO Content */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-6">AI Code Analysis Features</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Code Enhancement Tools</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>Code Explanation:</strong> Understand complex code logic and algorithms</li>
                      <li>• <strong>Code Optimization:</strong> Improve performance and efficiency</li>
                      <li>• <strong>Bug Analysis:</strong> Identify and fix potential issues</li>
                      <li>• <strong>Documentation:</strong> Generate comprehensive code documentation</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Supported Languages</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <ul className="space-y-1">
                        <li>• JavaScript/TypeScript</li>
                        <li>• Python</li>
                        <li>• Java</li>
                        <li>• C/C++</li>
                        <li>• C#</li>
                      </ul>
                      <ul className="space-y-1">
                        <li>• Go</li>
                        <li>• Rust</li>
                        <li>• PHP</li>
                        <li>• Ruby</li>
                        <li>• And more...</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Developer Use Cases</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-card p-4 rounded-lg border">
                      <h4 className="font-semibold mb-2">Code Review</h4>
                      <p className="text-sm text-muted-foreground">Get AI-powered code reviews to identify bugs, security issues, and optimization opportunities.</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                      <h4 className="font-semibold mb-2">Learning & Education</h4>
                      <p className="text-sm text-muted-foreground">Understand unfamiliar code, learn new patterns, and improve programming skills.</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                      <h4 className="font-semibold mb-2">Legacy Code</h4>
                      <p className="text-sm text-muted-foreground">Analyze and document legacy codebases for maintenance and refactoring.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">How to Use AI Code Tools</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Select the AI tool you want to use (Explain, Optimize, Debug, or Document)</li>
                    <li>Paste your code snippet in the input field</li>
                    <li>Click "Analyze Code" to process your code with AI</li>
                    <li>Review the AI-generated analysis, suggestions, or documentation</li>
                    <li>Copy the results or download them for future reference</li>
                  </ol>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">AI Code Analysis Benefits</h3>
                  <div className="bg-card p-6 rounded-lg border">
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>Save Time:</strong> Get instant code analysis instead of manual review</li>
                      <li>• <strong>Learn Faster:</strong> Understand complex algorithms and patterns quickly</li>
                      <li>• <strong>Improve Quality:</strong> Identify bugs and optimization opportunities</li>
                      <li>• <strong>Better Documentation:</strong> Generate comprehensive code documentation</li>
                      <li>• <strong>Cross-Language Support:</strong> Work with multiple programming languages</li>
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

export default AICodeToolsPage;