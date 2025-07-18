
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FileCode, FileImage, FileText, FileVideo, FileAudio, Archive, File } from "lucide-react";

const FileConversion = () => {
  const fileTools = [
    {
      id: "pdf-converter",
      title: "PDF Converter",
      description: "Convert documents to/from PDF format",
      icon: FileText,
      formats: ["Word to PDF", "Excel to PDF", "PPT to PDF", "Images to PDF"]
    },
    {
      id: "image-converter", 
      title: "Image Converter",
      description: "Convert between image formats",
      icon: FileImage,
      formats: ["JPG to PNG", "PNG to WebP", "SVG to PNG", "HEIC to JPG"]
    },
    {
      id: "video-converter",
      title: "Video Converter", 
      description: "Convert video files between formats",
      icon: FileVideo,
      formats: ["MP4 to AVI", "MOV to MP4", "MKV to MP4", "WebM to MP4"]
    },
    {
      id: "audio-converter",
      title: "Audio Converter",
      description: "Convert audio files between formats", 
      icon: FileAudio,
      formats: ["MP3 to WAV", "FLAC to MP3", "AAC to MP3", "OGG to MP3"]
    },
    {
      id: "archive-converter",
      title: "Archive Tools",
      description: "Create and extract archive files",
      icon: Archive,
      formats: ["ZIP Creator", "RAR Extractor", "7Z Tools", "TAR Tools"]
    },
    {
      id: "code-converter",
      title: "Code Converter",
      description: "Convert between programming formats",
      icon: FileCode,
      formats: ["JSON to XML", "CSV to JSON", "YAML to JSON", "SQL to CSV"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">File Conversion Tools</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert files between different formats with our comprehensive suite of conversion tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fileTools.map((tool) => {
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
                    <h4 className="font-medium text-sm">Supported Conversions:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {tool.formats.map((format, index) => (
                        <div key={index} className="text-xs bg-muted/50 rounded px-2 py-1 text-center">
                          {format}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Start Converting
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

export default FileConversion;
