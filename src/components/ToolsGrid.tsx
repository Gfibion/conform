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
  Archive,
  Merge,
  Split,
  Eye,
  PenTool,
  FileSignature,
  Link2,
  Volume2,
  Target,
  RotateCcw,
  Gauge,
  Zap as Lightning,
  Battery,
  Magnet,
  Flame,
  Fuel,
  Waves,
  Activity,
  BarChart3,
  Beaker,
  Database,
  Wifi,
  ScanLine,
  Wrench as Tool,
  Bot,
  FlaskConical,
  RadioIcon as Radio,
  Sun,
  Lightbulb,
  Droplets,
  Wind,
  Aperture,
  Settings,
  Binary,
  FileCode2,
  BookOpen,
  Calculator as Calc
} from "lucide-react";

const tools = [
  // PDF Tools
  {
    title: "PDF Merge",
    description: "Combine multiple PDF files into one document",
    icon: Merge,
    category: "PDF Tools",
    isPopular: true
  },
  {
    title: "PDF Compress",
    description: "Reduce PDF file size while maintaining quality",
    icon: Archive,
    category: "PDF Tools",
    isPopular: true
  },
  {
    title: "PDF Split",
    description: "Split PDF into separate pages or sections",
    icon: Split,
    category: "PDF Tools",
    isPopular: true
  },
  {
    title: "PDF to Word",
    description: "Convert PDF documents to editable Word format",
    icon: FileText,
    category: "PDF Tools",
    isPopular: true
  },
  {
    title: "PDF to Image",
    description: "Convert PDF pages to JPG, PNG images",
    icon: FileImage,
    category: "PDF Tools"
  },
  {
    title: "PDF OCR",
    description: "Extract text from scanned PDF documents",
    icon: Eye,
    category: "PDF Tools"
  },
  {
    title: "PDF Sign",
    description: "Add digital signatures to PDF documents",
    icon: PenTool,
    category: "PDF Tools"
  },
  {
    title: "PDF Annotate",
    description: "Add comments and annotations to PDFs",
    icon: FileSignature,
    category: "PDF Tools"
  },
  {
    title: "Request Signatures",
    description: "Send documents for digital signatures",
    icon: FileSignature,
    category: "PDF Tools"
  },

  // Unit Converters
  {
    title: "Enhanced Unit Converter",
    description: "Intelligent unit converter with database and history",
    icon: Calculator,
    category: "Unit Converters",
    isPopular: true
  },
  {
    title: "Length Converter",
    description: "Convert meters, feet, inches, centimeters",
    icon: Ruler,
    category: "Unit Converters",
    isPopular: true
  },
  {
    title: "Weight & Mass Converter",
    description: "Convert kilograms, pounds, ounces, grams",
    icon: Weight,
    category: "Unit Converters",
    isPopular: true
  },
  {
    title: "Temperature Converter",
    description: "Convert Celsius, Fahrenheit, Kelvin",
    icon: Thermometer,
    category: "Unit Converters",
    isPopular: true
  },
  {
    title: "Volume Converter",
    description: "Convert liters, gallons, cups, milliliters",
    icon: Volume2,
    category: "Unit Converters",
    isPopular: true
  },
  {
    title: "Area Converter",
    description: "Convert square meters, acres, hectares",
    icon: Target,
    category: "Unit Converters"
  },
  {
    title: "Time Converter",
    description: "Convert seconds, minutes, hours, days",
    icon: Clock,
    category: "Unit Converters"
  },
  {
    title: "Speed Converter",
    description: "Convert mph, km/h, m/s, knots",
    icon: Gauge,
    category: "Unit Converters"
  },
  {
    title: "Angle Converter",
    description: "Convert degrees, radians, gradians",
    icon: RotateCcw,
    category: "Unit Converters"
  },

  // Engineering
  {
    title: "Pressure Converter",
    description: "Convert PSI, bar, pascal, atmosphere",
    icon: Gauge,
    category: "Engineering"
  },
  {
    title: "Force Converter",
    description: "Convert newtons, pounds-force, dynes",
    icon: Lightning,
    category: "Engineering"
  },
  {
    title: "Energy Converter",
    description: "Convert joules, calories, BTU, kWh",
    icon: Battery,
    category: "Engineering"
  },
  {
    title: "Power Converter",
    description: "Convert watts, horsepower, BTU/hr",
    icon: Lightning,
    category: "Engineering"
  },
  {
    title: "Torque Converter",
    description: "Convert newton-meters, foot-pounds",
    icon: Settings,
    category: "Engineering"
  },
  {
    title: "Voltage Converter",
    description: "Convert volts, millivolts, kilovolts",
    icon: Lightning,
    category: "Electricity"
  },
  {
    title: "Current Converter",
    description: "Convert amperes, milliamps, microamps",
    icon: Lightning,
    category: "Electricity"
  },
  {
    title: "Resistance Converter",
    description: "Convert ohms, kilohms, megohms",
    icon: Lightning,
    category: "Electricity"
  },
  {
    title: "Capacitance Converter",
    description: "Convert farads, microfarads, picofarads",
    icon: Battery,
    category: "Electricity"
  },
  {
    title: "Inductance Converter",
    description: "Convert henries, millihenries, microhenries",
    icon: Magnet,
    category: "Electricity"
  },
  {
    title: "Thermal Resistance Converter",
    description: "Convert thermal resistance units",
    icon: Thermometer,
    category: "Heat"
  },
  {
    title: "Heat Density Converter",
    description: "Convert heat density units",
    icon: Flame,
    category: "Heat"
  },
  {
    title: "Fuel Efficiency Converter",
    description: "Convert MPG, L/100km, km/L",
    icon: Fuel,
    category: "Heat"
  },
  {
    title: "Magnetic Field Converter",
    description: "Convert tesla, gauss, weber",
    icon: Magnet,
    category: "Magnetism"
  },
  {
    title: "Magnetic Flux Converter",
    description: "Convert weber, maxwell units",
    icon: Magnet,
    category: "Magnetism"
  },

  // Fluids
  {
    title: "Flow Converter",
    description: "Convert flow rates: m³/s, L/min, GPM",
    icon: Waves,
    category: "Fluids"
  },
  {
    title: "Viscosity Converter",
    description: "Convert dynamic, kinematic viscosity",
    icon: Droplets,
    category: "Fluids"
  },
  {
    title: "Luminance Converter",
    description: "Convert candela, lumen, lux units",
    icon: Sun,
    category: "Light"
  },

  // Radiology
  {
    title: "Illumination Converter",
    description: "Convert lux, foot-candle, phot",
    icon: Lightbulb,
    category: "Light"
  },
  {
    title: "Radiation Converter",
    description: "Convert becquerel, curie, gray, sievert",
    icon: Radio,
    category: "Radiology"
  },
  {
    title: "Radiation Dose Converter",
    description: "Convert absorbed dose units",
    icon: Radio,
    category: "Radiology"
  },

  // Financial
  {
    title: "Currency Converter",
    description: "Real-time exchange rates for 150+ currencies",
    icon: DollarSign,
    category: "Financial",
    isPopular: true
  },

  // Files
  {
    title: "Excel Converter",
    description: "Convert Excel to CSV, PDF, JSON formats",
    icon: FileCode2,
    category: "Files"
  },
  {
    title: "Image Converter",
    description: "Convert PNG, JPG, GIF, SVG formats",
    icon: Image,
    category: "Files"
  },
  {
    title: "Audio Converter",
    description: "Convert MP3, WAV, FLAC, AAC, OGG formats",
    icon: Music,
    category: "Files"
  },
  {
    title: "Video Converter",
    description: "Convert MP4, AVI, MOV, MKV, WEBM formats",
    icon: FileVideo,
    category: "Files"
  },
  {
    title: "File Compressor",
    description: "Compress files and folders to save space",
    icon: Archive,
    category: "Files"
  },

  // Text
  {
    title: "Text Case Converter",
    description: "Convert to uppercase, lowercase, title case",
    icon: Type,
    category: "Text"
  },
  {
    title: "Language Translator",
    description: "Translate text between 100+ languages",
    icon: Globe,
    category: "Text"
  },
  {
    title: "Markdown Converter",
    description: "Convert between Markdown and HTML",
    icon: BookOpen,
    category: "Text"
  },

  // Developer
  {
    title: "Code Translator",
    description: "Convert code between programming languages",
    icon: Code,
    category: "Developer"
  },
  {
    title: "Number Base Converter",
    description: "Convert binary, decimal, hex, octal",
    icon: Binary,
    category: "Developer"
  },
  {
    title: "Hash Generator",
    description: "Generate MD5, SHA1, SHA256 hashes",
    icon: Hash,
    category: "Developer"
  },
  {
    title: "JSON Formatter",
    description: "Format, validate and minify JSON",
    icon: FileCode2,
    category: "Developer"
  },
  {
    title: "SQL Formatter",
    description: "Format and beautify SQL queries",
    icon: Database,
    category: "Developer"
  },

  // Mathematical
  {
    title: "Scientific Calculator",
    description: "Advanced mathematical calculations",
    icon: Calc,
    category: "Mathematical"
  },
  {
    title: "Statistics Calculator",
    description: "Calculate median, standard deviation",
    icon: BarChart3,
    category: "Mathematical"
  },
  {
    title: "Physics Calculator",
    description: "Physics formulas and constants",
    icon: Activity,
    category: "Science"
  },
  {
    title: "Chemistry Converter",
    description: "Convert molarity, molecular mass",
    icon: Beaker,
    category: "Science"
  },

  // Design
  {
    title: "Color Converter",
    description: "Convert RGB, HEX, HSL, CMYK, LAB",
    icon: Palette,
    category: "Design"
  },
  {
    title: "CSS Unit Converter",
    description: "Convert px, em, rem, vw, vh, %",
    icon: Code,
    category: "Design"
  },

  // Digital
  {
    title: "Data Storage Converter",
    description: "Convert bytes, KB, MB, GB, TB, PB",
    icon: Database,
    category: "Digital"
  },
  {
    title: "Internet Speed Converter",
    description: "Convert Mbps, Gbps, KB/s, MB/s",
    icon: Wifi,
    category: "Digital"
  },

  // Utilities
  {
    title: "QR Code Generator",
    description: "Generate QR codes for text, URLs, contacts",
    icon: QrCode,
    category: "Utilities"
  },
  {
    title: "Barcode Generator",
    description: "Generate various barcode formats",
    icon: ScanLine,
    category: "Utilities"
  },
  {
    title: "Document Scanner",
    description: "Scan and digitize physical documents",
    icon: ScanLine,
    category: "Utilities"
  },
  {
    title: "File Repair",
    description: "Fix corrupt or damaged files",
    icon: Tool,
    category: "Utilities"
  },

  // AI Tools
  {
    title: "AI Assistant",
    description: "Get help with conversions and formatting",
    icon: Bot,
    category: "AI Tools",
    isNew: true
  }
];

const categories = [
  "All",
  "PDF Tools",
  "Unit Converters", 
  "Engineering",
  "Electricity",
  "Heat",
  "Magnetism",
  "Fluids",
  "Light",
  "Radiology",
  "Financial",
  "Files",
  "Text",
  "Developer",
  "Mathematical",
  "Science",
  "Design",
  "Digital",
  "Utilities",
  "AI Tools"
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
          <TabsList className="grid w-full mb-8 overflow-x-auto" style={{gridTemplateColumns: `repeat(${categories.length}, minmax(120px, 1fr))`}}>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-sm whitespace-nowrap">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-3 gap-6">
                {filteredTools.map((tool, index) => {
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
