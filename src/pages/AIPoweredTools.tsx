
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Brain, Wand2, FileText, Image, Code, MessageSquare, Search, Lightbulb } from "lucide-react";

const AIPoweredTools = () => {
  const aiTools = [
    {
      id: "ai-text-generator",
      title: "AI Text Generator",
      description: "Generate high-quality content using advanced AI",
      icon: FileText,
      features: ["Content creation", "Blog posts", "Marketing copy", "Creative writing"],
      popular: true
    },
    {
      id: "ai-image-generator",
      title: "AI Image Generator", 
      description: "Create stunning images from text descriptions",
      icon: Image,
      features: ["Text to image", "Style transfer", "Image editing", "Art generation"],
      popular: true
    },
    {
      id: "ai-code-assistant",
      title: "AI Code Assistant",
      description: "Get help with coding, debugging, and optimization",
      icon: Code,
      features: ["Code generation", "Bug fixing", "Code review", "Documentation"]
    },
    {
      id: "ai-chatbot",
      title: "AI Chat Assistant",
      description: "Intelligent conversation and question answering",
      icon: MessageSquare,
      features: ["Q&A support", "Conversation", "Problem solving", "Learning aid"]
    },
    {
      id: "ai-research",
      title: "AI Research Tool",
      description: "Conduct research and gather information efficiently",
      icon: Search,
      features: ["Data analysis", "Research", "Summarization", "Fact checking"]
    },
    {
      id: "ai-brainstorm",
      title: "AI Brainstorming",
      description: "Generate creative ideas and solutions",
      icon: Lightbulb,
      features: ["Idea generation", "Creative solutions", "Innovation", "Problem solving"]
    },
    {
      id: "ai-optimizer",
      title: "AI Content Optimizer",
      description: "Enhance and optimize your content with AI",
      icon: Wand2,
      features: ["SEO optimization", "Content improvement", "Grammar check", "Style enhancement"]
    },
    {
      id: "ai-analyzer",
      title: "AI Data Analyzer",
      description: "Analyze data and extract insights using AI",
      icon: Brain,
      features: ["Pattern recognition", "Data insights", "Trend analysis", "Predictions"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">AI-Powered Tools</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Harness the power of artificial intelligence to enhance your productivity and creativity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card key={tool.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer relative">
                {tool.popular && (
                  <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                    Popular
                  </Badge>
                )}
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{tool.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">AI Capabilities:</h4>
                    <div className="space-y-1">
                      {tool.features.map((feature, index) => (
                        <div key={index} className="text-xs bg-muted/50 rounded px-2 py-1">
                          🤖 {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Try AI Tool
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* AI Formulas Section */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Brain className="w-6 h-6" />
                AI Formulas & Algorithms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Code className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Mathematical Formulas</h3>
                  <p className="text-sm text-muted-foreground">
                    AI-powered mathematical formula solver and calculator
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Algorithm Generator</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate and optimize algorithms using AI assistance
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Wand2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Smart Calculations</h3>
                  <p className="text-sm text-muted-foreground">
                    Intelligent calculation with context and explanation
                  </p>
                </div>
              </div>
              <div className="text-center mt-6">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Explore AI Formulas
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AIPoweredTools;
