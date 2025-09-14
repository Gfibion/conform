
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Globe, Languages, MessageCircle, FileText, Mic, Camera, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const LanguageTranslation = () => {
  const translationTools = [
    {
      id: "text-translator",
      title: "Text Translator",
      description: "Translate text between 100+ languages",
      icon: Languages,
      features: ["Real-time translation", "100+ languages", "Bulk text support", "Context awareness"]
    },
    {
      id: "document-translator",
      title: "Document Translator", 
      description: "Translate entire documents while preserving formatting",
      icon: FileText,
      features: ["PDF translation", "Word documents", "Format preservation", "Batch processing"]
    },
    {
      id: "website-translator",
      title: "Website Translator",
      description: "Translate web pages and websites",
      icon: Globe,
      features: ["URL translation", "HTML support", "CSS preservation", "Link maintenance"]
    },
    {
      id: "conversation-translator",
      title: "Conversation Mode",
      description: "Real-time conversation translation",
      icon: MessageCircle,
      features: ["Voice input", "Live conversation", "Multiple speakers", "Audio output"]
    },
    {
      id: "voice-translator",
      title: "Voice Translator",
      description: "Translate spoken words in real-time",
      icon: Mic,
      features: ["Speech recognition", "Voice synthesis", "Accent detection", "Offline mode"]
    },
    {
      id: "image-translator",
      title: "Image Text Translator",
      description: "Extract and translate text from images",
      icon: Camera,
      features: ["OCR technology", "Image upload", "Camera capture", "Text extraction"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="p-2 h-auto hover:bg-accent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Language Translation Tools</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Break language barriers with our comprehensive translation suite powered by AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {translationTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card key={tool.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
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
                    <h4 className="font-medium text-sm">Key Features:</h4>
                    <div className="space-y-1">
                      {tool.features.map((feature, index) => (
                        <div key={index} className="text-xs bg-muted/50 rounded px-2 py-1">
                          • {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Start Translating
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LanguageTranslation;
