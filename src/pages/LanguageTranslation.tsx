
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Globe, Languages, MessageCircle, FileText, Mic, Camera, Mail, Phone, Users, BookOpen } from "lucide-react";

const LanguageTranslation = () => {
  const translationTools = [
    {
      id: "document-translation",
      title: "Document Translation",
      description: "Professional document translation with formatting preservation",
      icon: FileText,
      features: ["Legal Documents", "Technical Manuals", "Academic Papers", "Business Reports"],
      popular: true,
      category: "Business Documents"
    },
    {
      id: "live-interpretation",
      title: "Live Interpretation", 
      description: "Real-time interpretation for meetings and conferences",
      icon: Users,
      features: ["Conference Calls", "Business Meetings", "Medical Consultations", "Legal Proceedings"],
      category: "Professional Services"
    },
    {
      id: "website-localization",
      title: "Website Localization",
      description: "Complete website translation and cultural adaptation",
      icon: Globe,
      features: ["E-commerce Sites", "Corporate Websites", "Mobile Apps", "SEO Optimization"],
      category: "Digital Marketing"
    },
    {
      id: "voice-translation",
      title: "Audio Translation",
      description: "Transcribe and translate audio content",
      icon: Mic,
      features: ["Podcast Translation", "Video Subtitles", "Voice-over Services", "Audio Transcription"],
      category: "Media & Graphics"
    },
    {
      id: "image-text-translation",
      title: "Visual Content Translation",
      description: "Extract and translate text from images and graphics",
      icon: Camera,
      features: ["Document Scanning", "Sign Translation", "Menu Translation", "Infographic Localization"],
      category: "Media & Graphics"
    },
    {
      id: "conversation-mode",
      title: "Conversational AI",
      description: "AI-powered conversation translation",
      icon: MessageCircle,
      features: ["Chat Translation", "Customer Support", "Social Media", "Instant Messaging"],
      category: "Digital Marketing"
    },
    {
      id: "academic-translation",
      title: "Academic Translation",
      description: "Specialized translation for educational content",
      icon: BookOpen,
      features: ["Research Papers", "Thesis Translation", "Educational Materials", "Scientific Journals"],
      category: "Professional Services"
    },
    {
      id: "multilingual-seo",
      title: "SEO Translation",
      description: "Search engine optimized translations",
      icon: Languages,
      features: ["Keyword Research", "Meta Translations", "Content Optimization", "Local SEO"],
      category: "Digital Marketing"
    }
  ];

  const categories = [...new Set(translationTools.map(tool => tool.category))];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Language Translation Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional translation services powered by AI and human expertise with consultation available
          </p>
        </div>

        {/* Contact Options */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 mb-8">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold mb-2">Need Professional Translation?</h2>
            <p className="text-muted-foreground">Get personalized quotes for certified translations and localization</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
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
              {translationTools.filter(tool => tool.category === category).map((tool) => {
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
                        <h4 className="font-medium text-sm">Specializations:</h4>
                        <div className="space-y-1">
                          {tool.features.map((feature, index) => (
                            <div key={index} className="text-xs bg-muted/50 rounded px-2 py-1">
                              • {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button className="flex-1" variant="outline">
                          Start Translation
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      <Footer />
    </div>
  );
};

export default LanguageTranslation;
