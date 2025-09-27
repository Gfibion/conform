import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AITextTools as AITextToolsComponent } from "@/components/tools/AITextTools";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import { Helmet } from "react-helmet-async";

const AITextToolsPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AI Text Tools",
    "description": "AI-powered text enhancement, summarization, paraphrasing, and translation tools. Improve your writing with artificial intelligence assistance.",
    "url": "https://your-domain.com/tools/ai-text-tools",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "AI text enhancement",
      "Text summarization",
      "Content paraphrasing", 
      "Language translation",
      "Writing improvement",
      "Text optimization"
    ]
  };

  return (
    <>
      <Helmet>
        <title>AI Text Tools - Enhance, Summarize, Paraphrase Text | Free AI Writing</title>
        <meta name="description" content="Free AI-powered text tools. Enhance writing, summarize content, paraphrase text, and translate languages instantly. AI writing assistant for content creation." />
        <meta name="keywords" content="AI text tools, text enhancement, AI writing, summarization, paraphrasing, translation, content creation, writing assistant, AI editor" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://your-domain.com/tools/ai-text-tools" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI Text Tools - Enhance, Summarize, Paraphrase Text" />
        <meta property="og:description" content="Free AI-powered text tools. Enhance writing, summarize content, paraphrase text instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-domain.com/tools/ai-text-tools" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="AI Text Tools - Enhance, Summarize, Paraphrase Text" />
        <meta name="twitter:description" content="Free AI-powered text tools. Enhance writing, summarize content, paraphrase text instantly." />
        
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
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground/80">AI-Powered Text Enhancement</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                AI Text Tools
              </h1>
              
              <p className="text-lg text-foreground/80 leading-relaxed">
                Enhance your writing with AI-powered tools. Summarize content, paraphrase text, improve writing quality, and translate between languages instantly.
              </p>
            </div>
          </div>
        </section>

        {/* AI Text Tools */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto mobile-px-compact">
            <div className="max-w-4xl mx-auto">
              <AITextToolsComponent />
            </div>
            
            {/* SEO Content */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-6">AI Text Enhancement Features</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Text Enhancement Tools</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>Text Enhancement:</strong> Improve clarity, grammar, and style</li>
                      <li>• <strong>Summarization:</strong> Create concise summaries of long content</li>
                      <li>• <strong>Paraphrasing:</strong> Rewrite text while preserving meaning</li>
                      <li>• <strong>Translation:</strong> Convert text between multiple languages</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Supported Languages</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <ul className="space-y-1">
                        <li>• English</li>
                        <li>• Spanish</li>
                        <li>• French</li>
                        <li>• German</li>
                        <li>• Italian</li>
                      </ul>
                      <ul className="space-y-1">
                        <li>• Portuguese</li>
                        <li>• Chinese</li>
                        <li>• Japanese</li>
                        <li>• Korean</li>
                        <li>• And more...</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Use Cases for AI Text Tools</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-card p-4 rounded-lg border">
                      <h4 className="font-semibold mb-2">Content Creation</h4>
                      <p className="text-sm text-muted-foreground">Enhance blog posts, articles, and marketing copy with AI assistance.</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                      <h4 className="font-semibold mb-2">Academic Writing</h4>
                      <p className="text-sm text-muted-foreground">Improve essays, research papers, and academic documents.</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                      <h4 className="font-semibold mb-2">Business Communication</h4>
                      <p className="text-sm text-muted-foreground">Enhance emails, reports, and professional documents.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">How to Use AI Text Tools</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Select the AI tool you want to use (Enhance, Summarize, Paraphrase, or Translate)</li>
                    <li>Paste or type your text in the input field</li>
                    <li>For translation, select your target language</li>
                    <li>Click "Convert with AI" to process your text</li>
                    <li>Copy the enhanced result or download it as a text file</li>
                  </ol>
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

export default AITextToolsPage;