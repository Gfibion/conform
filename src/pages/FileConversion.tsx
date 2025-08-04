
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FileCode, FileImage, FileText, FileVideo, FileAudio, Archive, File, MessageCircle, Mail, Phone } from "lucide-react";

const FileConversion = () => {
  const fileTools = [
    {
      id: "document-conversion",
      title: "Document Conversion",
      description: "Convert between various document formats with precision",
      icon: FileText,
      formats: ["PDF ↔ Word", "Excel ↔ CSV", "PowerPoint ↔ PDF", "ODT ↔ DOCX"],
      popular: true,
      category: "Business Documents"
    },
    {
      id: "image-conversion", 
      title: "Image Processing",
      description: "Transform images between formats and optimize them",
      icon: FileImage,
      formats: ["JPG ↔ PNG", "WebP ↔ AVIF", "SVG ↔ Vector", "RAW ↔ Standard"],
      category: "Media & Graphics"
    },
    {
      id: "video-conversion",
      title: "Video Processing", 
      description: "Convert and compress video files efficiently",
      icon: FileVideo,
      formats: ["MP4 ↔ AVI", "MOV ↔ WebM", "4K ↔ HD", "Compression"],
      category: "Media & Graphics"
    },
    {
      id: "audio-conversion",
      title: "Audio Processing",
      description: "Convert audio files and enhance quality", 
      icon: FileAudio,
      formats: ["MP3 ↔ FLAC", "WAV ↔ AAC", "Podcast ↔ Music", "Quality Enhancement"],
      category: "Media & Graphics"
    },
    {
      id: "archive-tools",
      title: "Archive Management",
      description: "Create, extract, and manage compressed files",
      icon: Archive,
      formats: ["ZIP ↔ RAR", "7Z ↔ TAR", "Batch Extract", "Encryption"],
      category: "File Management"
    },
    {
      id: "code-conversion",
      title: "Code & Data Formats",
      description: "Convert between programming and data formats",
      icon: FileCode,
      formats: ["JSON ↔ XML", "CSV ↔ Database", "API ↔ Schema", "Config Files"],
      category: "Developer Tools"
    },
    {
      id: "ebook-conversion",
      title: "E-book Formats",
      description: "Convert between digital book formats",
      icon: File,
      formats: ["EPUB ↔ PDF", "MOBI ↔ AZW", "Kindle ↔ Standard", "Formatting"],
      category: "Publishing"
    },
    {
      id: "cad-conversion",
      title: "CAD & Engineering",
      description: "Convert engineering and design files",
      icon: FileCode,
      formats: ["DWG ↔ PDF", "STL ↔ OBJ", "3D Models", "Technical Drawings"],
      category: "Engineering"
    }
  ];

  const categories = [...new Set(fileTools.map(tool => tool.category))];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">File Conversion Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional file conversion services across all formats with expert consultation available
          </p>
        </div>

        {/* Contact Options */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 mb-8">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold mb-2">Need Custom Solutions?</h2>
            <p className="text-muted-foreground">Get personalized quotes and expert consultation</p>
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
              {fileTools.filter(tool => tool.category === category).map((tool) => {
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
                        <h4 className="font-medium text-sm">Supported Formats:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {tool.formats.map((format, index) => (
                            <div key={index} className="text-xs bg-muted/50 rounded px-2 py-1 text-center">
                              {format}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button className="flex-1" variant="outline">
                          Convert Now
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

export default FileConversion;
