import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  FileText,
  Image,
  Video,
  Music,
  Calculator,
  Palette,
  Code,
  Hash,
  QrCode,
  Type,
  Globe,
  Zap,
  Brain,
  Wrench,
  Settings,
  Package,
  Database,
  Smartphone,
  Monitor,
  Printer,
  HardDrive,
  Wifi,
  Bluetooth,
  Battery,
  Thermometer,
  Gauge,
  Ruler,
  Weight,
  Clock,
  Calendar,
  MapPin,
  Compass,
  Activity,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  Scissors,
  Archive,
  Merge,
  Split,
  Eye,
  PenTool,
  Crop,
  RotateCw,
  FlipHorizontal,
  Layers,
  Filter,
  Contrast,
  Sun,
  Moon,
  Droplet,
  Brush,
  Pencil,
  Eraser,
  Move,
  MousePointer,
  Hand,
  ZoomIn,
  ZoomOut,
  Focus,
  Aperture,
  Camera,
  Film,
  PlayCircle,
  PauseCircle,
  StopCircle,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Headphones,
  Speaker,
  Radio,
  Tv,
  Gamepad2,
  Joystick,
  Target,
  Trophy,
  Award,
  Medal,
  Star,
  Heart,
  ThumbsUp,
  MessageCircle,
  Mail,
  Phone,
  Send,
  Share,
  Download,
  Upload,
  Save,
  FolderOpen,
  File,
  FileImage,
  FileVideo,
  FileAudio,
  FileSpreadsheet,
  FileBarChart,
  Presentation,
} from "lucide-react";
import { ConversionDialog } from "./ConversionDialog";

interface Tool {
  title: string;
  description: string;
  icon: any;
  category: string;
  isPopular?: boolean;
}

const tools: Tool[] = [
  // AI Tools
  {
    title: "AI Chatbot",
    description: "Engage in conversations with an AI-powered chatbot",
    icon: MessageCircle,
    category: "AI Tools",
    isPopular: true
  },
  {
    title: "AI Image Generator",
    description: "Generate unique images from text prompts",
    icon: Image,
    category: "AI Tools"
  },
  {
    title: "AI Text Summarizer",
    description: "Summarize long articles and documents quickly",
    icon: FileText,
    category: "AI Tools"
  },
  {
    title: "AI Code Generator",
    description: "Generate code snippets in various programming languages",
    icon: Code,
    category: "AI Tools"
  },
  {
    title: "AI Paraphraser",
    description: "Rewrite text to improve clarity and style",
    icon: PenTool,
    category: "AI Tools"
  },
  {
    title: "AI Grammar Checker",
    description: "Check and correct grammar and spelling errors",
    icon: Type,
    category: "AI Tools"
  },

  // PDF Tools
  {
    title: "PDF Compress",
    description: "Reduce PDF file size while maintaining quality",
    icon: Archive,
    category: "PDF Tools",
    isPopular: true
  },
  {
    title: "PDF Merge",
    description: "Combine multiple PDF files into one document",
    icon: Merge,
    category: "PDF Tools",
    isPopular: true
  },
  {
    title: "PDF Split",
    description: "Split PDF into multiple files by pages or ranges",
    icon: Split,
    category: "PDF Tools"
  },
  {
    title: "PDF to Word",
    description: "Convert PDF documents to editable Word files",
    icon: FileText,
    category: "PDF Tools",
    isPopular: true
  },
  {
    title: "PDF to Excel",
    description: "Extract tables from PDF to Excel spreadsheets",
    icon: FileSpreadsheet,
    category: "PDF Tools"
  },
  {
    title: "PDF to PowerPoint",
    description: "Convert PDF pages to PowerPoint slides",
    icon: Presentation,
    category: "PDF Tools"
  },
  {
    title: "PDF to Image",
    description: "Convert PDF pages to PNG, JPG, or other image formats",
    icon: FileImage,
    category: "PDF Tools"
  },
  {
    title: "Word to PDF",
    description: "Convert Word documents to PDF format",
    icon: FileText,
    category: "PDF Tools"
  },
  {
    title: "Excel to PDF",
    description: "Convert Excel spreadsheets to PDF documents",
    icon: FileSpreadsheet,
    category: "PDF Tools"
  },
  {
    title: "PowerPoint to PDF",
    description: "Convert PowerPoint presentations to PDF format",
    icon: Presentation,
    category: "PDF Tools"
  },

  // Unit Converters
  {
    title: "Length Converter",
    description: "Convert between meters, feet, inches, kilometers, etc.",
    icon: Ruler,
    category: "Unit Converters",
    isPopular: true
  },
  {
    title: "Weight Converter",
    description: "Convert between kilograms, pounds, ounces, etc.",
    icon: Weight,
    category: "Unit Converters"
  },
  {
    title: "Temperature Converter",
    description: "Convert between Celsius, Fahrenheit, and Kelvin",
    icon: Thermometer,
    category: "Unit Converters"
  },
  {
    title: "Currency Converter",
    description: "Convert between different currencies with live rates",
    icon: TrendingUp,
    category: "Unit Converters",
    isPopular: true
  },
  {
    title: "Time Zone Converter",
    description: "Convert time between different time zones",
    icon: Clock,
    category: "Unit Converters"
  },
  {
    title: "Area Converter",
    description: "Convert between square meters, acres, hectares, etc.",
    icon: MapPin,
    category: "Unit Converters"
  },
  {
    title: "Volume Converter",
    description: "Convert between liters, gallons, cups, etc.",
    icon: Droplet,
    category: "Unit Converters"
  },
  {
    title: "Speed Converter",
    description: "Convert between km/h, mph, m/s, etc.",
    icon: Gauge,
    category: "Unit Converters"
  },

  // Text Tools  
  {
    title: "Text Case Converter",
    description: "Convert text to uppercase, lowercase, title case, etc.",
    icon: Type,
    category: "Text Tools",
    isPopular: true
  },
  {
    title: "Word Counter",
    description: "Count words, characters, sentences, and paragraphs",
    icon: Calculator,
    category: "Text Tools",
    isPopular: true
  },
  {
    title: "Text Difference Checker",
    description: "Compare two texts and highlight differences",
    icon: Eye,
    category: "Text Tools"
  },
  {
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder text for design and development",
    icon: FileText,
    category: "Text Tools"
  },
  {
    title: "Text to Speech",
    description: "Convert text to audio using text-to-speech technology",
    icon: Volume2,
    category: "Text Tools"
  },
  {
    title: "Markdown to HTML",
    description: "Convert Markdown text to HTML format",
    icon: Code,
    category: "Text Tools"
  },

  // Developer Tools
  {
    title: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings",
    icon: Code,
    category: "Developer Tools",
    isPopular: true
  },
  {
    title: "URL Encoder/Decoder",
    description: "Encode and decode URLs for web applications",
    icon: Globe,
    category: "Developer Tools"
  },
  {
    title: "JSON Formatter",
    description: "Format, validate, and minify JSON data",
    icon: Database,
    category: "Developer Tools",
    isPopular: true
  },
  {
    title: "Hash Generator",
    description: "Generate MD5, SHA-1, SHA-256, and other hashes",
    icon: Hash,
    category: "Developer Tools"
  },
  {
    title: "QR Code Generator",
    description: "Generate QR codes for text, URLs, and other data",
    icon: QrCode,
    category: "Developer Tools",
    isPopular: true
  },
  {
    title: "Password Generator",
    description: "Generate secure passwords with custom criteria",
    icon: Settings,
    category: "Developer Tools"
  },
  {
    title: "Regular Expression Tester",
    description: "Test and debug regular expressions",
    icon: Target,
    category: "Developer Tools"
  },
  {
    title: "CSS Minifier",
    description: "Minify CSS code to reduce file size",
    icon: Scissors,
    category: "Developer Tools"
  },
  {
    title: "JavaScript Minifier",
    description: "Minify JavaScript code to reduce file size",
    icon: Scissors,
    category: "Developer Tools"
  },
  {
    title: "HTML Encoder/Decoder",
    description: "Encode and decode HTML entities",
    icon: Code,
    category: "Developer Tools"
  },

  // Image Tools
  {
    title: "Image Compressor",
    description: "Reduce image file size while maintaining quality",
    icon: Archive,
    category: "Image Tools",
    isPopular: true
  },
  {
    title: "Image Resizer",
    description: "Resize images to specific dimensions",
    icon: Crop,
    category: "Image Tools",
    isPopular: true
  },
  {
    title: "Image Format Converter",
    description: "Convert between JPG, PNG, WebP, GIF, and other formats",
    icon: Image,
    category: "Image Tools"
  },
  {
    title: "Image Cropper",
    description: "Crop images to specific dimensions or aspect ratios",
    icon: Crop,
    category: "Image Tools"
  },
  {
    title: "Image Rotator",
    description: "Rotate images by any angle",
    icon: RotateCw,
    category: "Image Tools"
  },
  {
    title: "Image Flipper",
    description: "Flip images horizontally or vertically",
    icon: FlipHorizontal,
    category: "Image Tools"
  },
  {
    title: "Watermark Adder",
    description: "Add text or image watermarks to photos",
    icon: Layers,
    category: "Image Tools"
  },
  {
    title: "Background Remover",
    description: "Remove backgrounds from images automatically",
    icon: Eraser,
    category: "Image Tools",
    isPopular: true
  },

  // Color Tools
  {
    title: "Color Picker",
    description: "Pick colors from images or color wheels",
    icon: Palette,
    category: "Color Tools"
  },
  {
    title: "Color Converter",
    description: "Convert between HEX, RGB, HSL, and other color formats",
    icon: Palette,
    category: "Color Tools",
    isPopular: true
  },
  {
    title: "Color Palette Generator",
    description: "Generate color palettes and schemes",
    icon: Brush,
    category: "Color Tools"
  },
  {
    title: "Gradient Generator",
    description: "Create CSS gradients with visual editor",
    icon: Droplet,
    category: "Color Tools"
  }
];

export const ToolsGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const categories = Array.from(new Set(tools.map(tool => tool.category)));
  const popularTools = tools.filter(tool => tool.isPopular);

  const filteredTools = (category?: string) => {
    let filtered = category ? tools.filter(tool => tool.category === category) : tools;
    
    if (searchTerm) {
      filtered = filtered.filter(tool => 
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const handleToolClick = (tool: Tool) => {
    setSelectedTool(tool);
    setIsDialogOpen(true);
  };

  const ToolCard = ({ tool }: { tool: Tool }) => {
    const Icon = tool.icon;
    
    return (
      <Card 
        className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-border bg-gradient-card h-full flex flex-col"
        onClick={() => handleToolClick(tool)}
      >
        <CardHeader className="pb-2 flex-shrink-0">
          <div className="flex items-start justify-between mb-2">
            <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 w-fit">
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            {tool.isPopular && (
              <Badge variant="secondary" className="text-[10px] sm:text-xs px-1.5 py-0.5">
                Popular
              </Badge>
            )}
          </div>
          <CardTitle className="text-sm sm:text-base lg:text-lg group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {tool.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex-grow flex flex-col justify-between">
          <CardDescription className="text-muted-foreground text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 leading-tight">
            {tool.description}
          </CardDescription>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-4 sm:py-6 md:py-8 bg-gradient-section">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-1 sm:mb-2">
            All-in-One Conversion Tools
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-3xl mx-auto px-2">
            Transform, convert, and optimize your files with our comprehensive suite of tools
          </p>
        </div>

        <div className="mb-4 sm:mb-6">
          <div className="relative max-w-md mx-auto px-2 sm:px-0">
            <Search className="absolute left-5 sm:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 sm:pl-10 text-sm"
            />
          </div>
        </div>

        <Tabs defaultValue="popular" className="w-full">
          <div className="mb-4 sm:mb-6">
            <div className="overflow-x-auto px-2 sm:px-0">
              <TabsList className="inline-flex w-full md:w-auto min-w-full md:min-w-0 justify-start">
                <TabsTrigger value="popular" className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-3">Popular</TabsTrigger>
                <TabsTrigger value="all" className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-3">All Tools</TabsTrigger>
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="text-xs sm:text-sm whitespace-nowrap px-2 sm:px-3">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>

          <TabsContent value="popular">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
              {filteredTools().filter(tool => tool.isPopular).map((tool) => (
                <ToolCard key={tool.title} tool={tool} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
              {filteredTools().map((tool) => (
                <ToolCard key={tool.title} tool={tool} />
              ))}
            </div>
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
                {filteredTools(category).map((tool) => (
                  <ToolCard key={tool.title} tool={tool} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {selectedTool && (
          <ConversionDialog
            isOpen={isDialogOpen}
            onClose={() => {
              setIsDialogOpen(false);
              setSelectedTool(null);
            }}
            tool={selectedTool}
          />
        )}
      </div>
    </section>
  );
};
