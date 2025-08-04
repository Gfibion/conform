
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Brain, Wand2, FileText, Image, Code, MessageSquare, Search, Lightbulb, Mail, Phone, Users, BookOpen } from "lucide-react";
import { AITextTools } from "@/components/tools/AITextTools";
import { AICodeTools } from "@/components/tools/AICodeTools";
import { useState } from "react";

const AIPoweredTools = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const aiTools = [
    {
      id: "ai-text-generator",
      title: "AI Content Writer",
      description: "Create, enhance, and optimize written content",
      icon: FileText,
      features: ["Blog Writing", "Social Media", "Email Marketing", "SEO Content"],
      popular: true,
      component: "text",
      category: "Digital Marketing"
    },
    {
      id: "ai-code-assistant",
      title: "AI Code Assistant", 
      description: "Advanced coding help and development tools",
      icon: Code,
      features: ["Code Generation", "Bug Detection", "Code Review", "Documentation"],
      component: "code",
      category: "Developer Tools"
    },
    {
      id: "ai-image-generator",
      title: "AI Image Creator",
      description: "Generate and edit images using artificial intelligence",
      icon: Image,
      features: ["Logo Design", "Social Media Graphics", "Product Images", "Art Generation"],
      popular: true,
      category: "Media & Graphics"
    },
    {
      id: "ai-business-consultant",
      title: "AI Business Advisor",
      description: "Strategic business insights and planning assistance",
      icon: Users,
      features: ["Market Analysis", "Business Plans", "Strategy Development", "Financial Planning"],
      category: "Professional Services"
    },
    {
      id: "ai-research-assistant",
      title: "AI Research Tool",
      description: "Comprehensive research and data analysis",
      icon: Search,
      features: ["Market Research", "Academic Research", "Competitive Analysis", "Trend Analysis"],
      category: "Professional Services"
    },
    {
      id: "ai-chatbot",
      title: "AI Customer Support",
      description: "Intelligent customer service and support automation",
      icon: MessageSquare,
      features: ["24/7 Support", "Multi-language", "Integration Ready", "Analytics"],
      category: "Business Tools"
    },
    {
      id: "ai-learning-assistant",
      title: "AI Learning Tutor",
      description: "Personalized learning and educational support",
      icon: BookOpen,
      features: ["Course Creation", "Quiz Generation", "Progress Tracking", "Skill Assessment"],
      category: "Professional Services"
    },
    {
      id: "ai-optimizer",
      title: "AI Performance Optimizer",
      description: "Optimize processes and improve efficiency",
      icon: Wand2,
      features: ["Workflow Automation", "Process Optimization", "Resource Planning", "Performance Analytics"],
      category: "Business Tools"
    },
    {
      id: "ai-brainstorm",
      title: "AI Innovation Lab",
      description: "Generate creative ideas and innovative solutions",
      icon: Lightbulb,
      features: ["Idea Generation", "Product Innovation", "Creative Solutions", "Design Thinking"],
      category: "Business Tools"
    },
    {
      id: "ai-analyzer",
      title: "AI Data Scientist",
      description: "Advanced data analysis and predictive modeling",
      icon: Brain,
      features: ["Predictive Analytics", "Data Visualization", "Machine Learning", "Statistical Analysis"],
      category: "Developer Tools"
    }
  ];

  const categories = [...new Set(aiTools.map(tool => tool.category))];

  if (selectedTool === "text") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setSelectedTool(null)}
              className="mb-4"
            >
              ← Back to AI Tools
            </Button>
            <h1 className="text-3xl font-bold">AI Text Tools</h1>
          </div>
          <AITextTools />
        </div>
        <Footer />
      </div>
    );
  }

  if (selectedTool === "code") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setSelectedTool(null)}
              className="mb-4"
            >
              ← Back to AI Tools
            </Button>
            <h1 className="text-3xl font-bold">AI Code Tools</h1>
          </div>
          <AICodeTools />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">AI-Powered Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced AI solutions with expert consultation and custom implementation
          </p>
        </div>

        {/* Contact Options */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 mb-8">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold mb-2">Need AI Consultation?</h2>
            <p className="text-muted-foreground">Get expert guidance on AI implementation and custom solutions</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Live Chat
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Quote
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Schedule Call
            </Button>
          </div>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiTools.filter(tool => tool.category === category).map((tool) => {
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
                      <div className="flex gap-2 mt-4">
                        <Button 
                          className="flex-1" 
                          variant="outline"
                          onClick={() => tool.component && setSelectedTool(tool.component)}
                          disabled={!tool.component}
                        >
                          {tool.component ? "Try AI Tool" : "Coming Soon"}
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}

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
