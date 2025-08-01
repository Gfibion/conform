
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuickConverter } from "@/components/QuickConverter";
import { 
  FileText, 
  Globe, 
  Calculator, 
  Zap, 
  Palette, 
  Code, 
  Image, 
  Music,
  FileVideo,
  Wrench,
  Hash,
  QrCode,
  DollarSign,
  Thermometer,
  Weight,
  Ruler,
  Clock,
  Type,
  FileImage,
  FileAudio,
  Scissors,
  Compress
} from "lucide-react";

const tools = [
  {
    title: "PDF Converter",
    description: "Convert PDF to Word, Excel, PowerPoint and more",
    icon: FileText,
    category: "File Conversion",
    isPopular: true
  },
  {
    title: "Language Translator",
    description: "Translate text between 100+ languages instantly",
    icon: Globe,
    category: "Translation",
    isPopular: true
  },
  {
    title: "Unit Converter",
    description: "Convert between different units of measurement",
    icon: Calculator,
    category: "Calculation",
    isPopular: true
  },
  {
    title: "Currency Converter",
    description: "Convert between different currencies with live rates",
    icon: DollarSign,
    category: "Calculation",
    isPopular: true
  },
  {
    title: "AI Text Generator",
    description: "Generate content with advanced AI assistance",
    icon: Zap,
    category: "AI Tools",
    isNew: true
  },
  {
    title: "Color Converter",
    description: "Convert between HEX, RGB, HSL color formats",
    icon: Palette,
    category: "Design"
  },
  {
    title: "Code Formatter",
    description: "Format and beautify your code instantly",
    icon: Code,
    category: "Development"
  },
  {
    title: "Image Converter",
    description: "Convert between JPG, PNG, GIF, and more formats",
    icon: Image,
    category: "Media"
  },
  {
    title: "Audio Converter",
    description: "Convert audio files to different formats",
    icon: Music,
    category: "Media"
  },
  {
    title: "Video Converter", 
    description: "Convert video files and compress media",
    icon: FileVideo,
    category: "Media"
  },
  {
    title: "Text Tools",
    description: "Case converter, word counter, and text utilities",
    icon: Wrench,
    category: "Utilities"
  },
  {
    title: "QR Code Generator",
    description: "Create QR codes for URLs, text, and more",
    icon: QrCode,
    category: "Utilities"
  },
  {
    title: "Hash Generator",
    description: "Generate MD5, SHA1, SHA256 hashes",
    icon: Hash,
    category: "Security"
  },
  {
    title: "Temperature Converter",
    description: "Convert between Celsius, Fahrenheit, and Kelvin",
    icon: Thermometer,
    category: "Calculation"
  },
  {
    title: "Weight Converter",
    description: "Convert between kg, lbs, ounces and more",
    icon: Weight,
    category: "Calculation"
  },
  {
    title: "Length Converter",
    description: "Convert between meters, feet, inches and more",
    icon: Ruler,
    category: "Calculation"
  },
  {
    title: "Time Converter",
    description: "Convert between different time formats and zones",
    icon: Clock,
    category: "Calculation"
  },
  {
    title: "Text Case Converter",
    description: "Convert text to uppercase, lowercase, title case",
    icon: Type,
    category: "Text Tools"
  },
  {
    title: "Image Compressor",
    description: "Compress images while maintaining quality",
    icon: FileImage,
    category: "Media"
  },
  {
    title: "Audio Compressor",
    description: "Reduce audio file size without quality loss",
    icon: FileAudio,
    category: "Media"
  },
  {
    title: "URL Shortener",
    description: "Create short URLs for easy sharing",
    icon: Scissors,
    category: "Utilities"
  },
  {
    title: "File Compressor",
    description: "Compress files and folders into ZIP archives",
    icon: Compress,
    category: "File Conversion"
  }
];

const categories = [
  "All",
  "File Conversion", 
  "Translation",
  "Calculation",
  "AI Tools",
  "Design",
  "Development",
  "Media",
  "Utilities",
  "Security",
  "Text Tools"
];

export const ToolsGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTools = activeCategory === "All" 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory);

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Powerful Conversion Tools</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access our comprehensive suite of conversion tools designed to handle all your transformation needs
          </p>
        </div>

        {/* Quick Converter Section */}
        <div className="mb-8">
          <QuickConverter />
        </div>

        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid grid-cols-11 w-full mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-sm">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-3 gap-6">
                {(category === "All" ? tools : tools.filter(tool => tool.category === category)).map((tool, index) => {
                  const Icon = tool.icon;
                  return (
                    <Card key={index} className="group hover:shadow-lg transition-all duration-200 cursor-pointer h-full">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex gap-1">
                            {tool.isPopular && (
                              <Badge variant="secondary" className="text-xs">
                                Popular
                              </Badge>
                            )}
                            {tool.isNew && (
                              <Badge className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div>
                          <CardTitle className="text-xl mb-1">{tool.title}</CardTitle>
                          <div className="text-xs text-muted-foreground mb-2">
                            {tool.category}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-sm">
                          {tool.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
