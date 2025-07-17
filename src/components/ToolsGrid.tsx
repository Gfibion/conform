import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, Calculator, Globe, Code, DollarSign, Wrench, FileImage, Camera, Zap, Smartphone, Palette, Clock,
  Archive, Scissors, FileEdit, Eye, Signature, FileSearch, Ruler, Weight, Thermometer, Waves,
  Target, RotateCw, Gauge, Wind, Sun, Snowflake, Magnet, FlaskConical, Battery, Lightbulb, HardDrive,
  Music, Video, Hash, Binary, Code2, BarChart, PieChart, FileSpreadsheet, Database, Cloud, Shield,
  Lock, Key, Cpu, Radio, Microscope, Volume2, Mic, Headphones, Bluetooth, Wifi, Laptop, Package,
  Truck, Scale, Fuel, ChevronRight, MapPin, Compass, GitBranch, Layers, Box
} from "lucide-react";
import { useState } from "react";
import { UnitConverter } from "./tools/UnitConverter";
import { EnhancedUnitConverter } from "./tools/EnhancedUnitConverter";
import { CurrencyConverter } from "./tools/CurrencyConverter";

const tools = [
  // PDF Tools
  {
    id: "pdf-merge",
    title: "PDF Merge",
    description: "Combine multiple PDF files into one document",
    icon: FileText,
    category: "PDF Tools",
    popular: true
  },
  {
    id: "pdf-compress",
    title: "PDF Compress",
    description: "Reduce PDF file size while maintaining quality",
    icon: Archive,
    category: "PDF Tools",
    popular: true
  },
  {
    id: "pdf-split",
    title: "PDF Split",
    description: "Split PDF into separate pages or sections",
    icon: Scissors,
    category: "PDF Tools",
    popular: true
  },
  {
    id: "pdf-to-word",
    title: "PDF to Word",
    description: "Convert PDF documents to editable Word format",
    icon: FileEdit,
    category: "PDF Tools",
    popular: true
  },
  {
    id: "pdf-to-image",
    title: "PDF to Image",
    description: "Convert PDF pages to JPG, PNG images",
    icon: FileImage,
    category: "PDF Tools",
    popular: false
  },
  {
    id: "pdf-ocr",
    title: "PDF OCR",
    description: "Extract text from scanned PDF documents",
    icon: Eye,
    category: "PDF Tools",
    popular: false
  },
  {
    id: "pdf-sign",
    title: "PDF Sign",
    description: "Add digital signatures to PDF documents",
    icon: Signature,
    category: "PDF Tools",
    popular: false
  },
  {
    id: "pdf-annotate",
    title: "PDF Annotate",
    description: "Add comments and annotations to PDFs",
    icon: FileEdit,
    category: "PDF Tools",
    popular: false
  },
  {
    id: "request-signatures",
    title: "Request Signatures",
    description: "Send documents for digital signatures",
    icon: FileSearch,
    category: "PDF Tools",
    popular: false
  },

  // Unit Converters - Common
  {
    id: "enhanced-unit-converter",
    title: "Enhanced Unit Converter",
    description: "Intelligent unit converter with database and history",
    icon: Calculator,
    category: "Unit Converters",
    popular: true,
    component: EnhancedUnitConverter
  },
  {
    id: "unit-converter",
    title: "Length Converter",
    description: "Convert meters, feet, inches, centimeters",
    icon: Ruler,
    category: "Unit Converters",
    popular: true,
    component: UnitConverter
  },
  {
    id: "weight-converter",
    title: "Weight & Mass Converter",
    description: "Convert kilograms, pounds, ounces, grams",
    icon: Weight,
    category: "Unit Converters",
    popular: true
  },
  {
    id: "temperature-converter",
    title: "Temperature Converter",
    description: "Convert Celsius, Fahrenheit, Kelvin",
    icon: Thermometer,
    category: "Unit Converters",
    popular: true
  },
  {
    id: "volume-converter",
    title: "Volume Converter",
    description: "Convert liters, gallons, cups, milliliters",
    icon: Waves,
    category: "Unit Converters",
    popular: true
  },
  {
    id: "area-converter",
    title: "Area Converter",
    description: "Convert square meters, acres, hectares",
    icon: Target,
    category: "Unit Converters",
    popular: false
  },
  {
    id: "time-converter",
    title: "Time Converter",
    description: "Convert seconds, minutes, hours, days",
    icon: Clock,
    category: "Unit Converters",
    popular: false
  },
  {
    id: "speed-converter",
    title: "Speed Converter",
    description: "Convert mph, km/h, m/s, knots",
    icon: Gauge,
    category: "Unit Converters",
    popular: false
  },
  {
    id: "angle-converter",
    title: "Angle Converter",
    description: "Convert degrees, radians, gradians",
    icon: RotateCw,
    category: "Unit Converters",
    popular: false
  },

  // Engineering Converters
  {
    id: "pressure-converter",
    title: "Pressure Converter",
    description: "Convert PSI, bar, pascal, atmosphere",
    icon: Gauge,
    category: "Engineering",
    popular: false
  },
  {
    id: "force-converter",
    title: "Force Converter",
    description: "Convert newtons, pounds-force, dynes",
    icon: Zap,
    category: "Engineering",
    popular: false
  },
  {
    id: "energy-converter",
    title: "Energy Converter",
    description: "Convert joules, calories, BTU, kWh",
    icon: Battery,
    category: "Engineering",
    popular: false
  },
  {
    id: "power-converter",
    title: "Power Converter",
    description: "Convert watts, horsepower, BTU/hr",
    icon: Zap,
    category: "Engineering",
    popular: false
  },
  {
    id: "torque-converter",
    title: "Torque Converter",
    description: "Convert newton-meters, foot-pounds",
    icon: RotateCw,
    category: "Engineering",
    popular: false
  },

  // Electricity Converters
  {
    id: "voltage-converter",
    title: "Voltage Converter",
    description: "Convert volts, millivolts, kilovolts",
    icon: Zap,
    category: "Electricity",
    popular: false
  },
  {
    id: "current-converter",
    title: "Current Converter",
    description: "Convert amperes, milliamps, microamps",
    icon: Zap,
    category: "Electricity",
    popular: false
  },
  {
    id: "resistance-converter",
    title: "Resistance Converter",
    description: "Convert ohms, kiloohms, megohms",
    icon: Zap,
    category: "Electricity",
    popular: false
  },
  {
    id: "capacitance-converter",
    title: "Capacitance Converter",
    description: "Convert farads, microfarads, picofarads",
    icon: Battery,
    category: "Electricity",
    popular: false
  },
  {
    id: "inductance-converter",
    title: "Inductance Converter",
    description: "Convert henries, millihenries, microhenries",
    icon: Magnet,
    category: "Electricity",
    popular: false
  },

  // Heat Converters
  {
    id: "thermal-resistance-converter",
    title: "Thermal Resistance Converter",
    description: "Convert thermal resistance units",
    icon: Thermometer,
    category: "Heat",
    popular: false
  },
  {
    id: "heat-density-converter",
    title: "Heat Density Converter",
    description: "Convert heat density units",
    icon: Sun,
    category: "Heat",
    popular: false
  },
  {
    id: "fuel-efficiency-converter",
    title: "Fuel Efficiency Converter",
    description: "Convert MPG, L/100km, km/L",
    icon: Fuel,
    category: "Heat",
    popular: false
  },

  // Magnetism Converters
  {
    id: "magnetic-field-converter",
    title: "Magnetic Field Converter",
    description: "Convert tesla, gauss, weber",
    icon: Magnet,
    category: "Magnetism",
    popular: false
  },
  {
    id: "magnetic-flux-converter",
    title: "Magnetic Flux Converter",
    description: "Convert weber, maxwell units",
    icon: Magnet,
    category: "Magnetism",
    popular: false
  },

  // Fluids Converters
  {
    id: "flow-converter",
    title: "Flow Converter",
    description: "Convert flow rates - m³/s, L/min, GPM",
    icon: Waves,
    category: "Fluids",
    popular: false
  },
  {
    id: "viscosity-converter",
    title: "Viscosity Converter",
    description: "Convert dynamic, kinematic viscosity",
    icon: Waves,
    category: "Fluids",
    popular: false
  },

  // Light Converters
  {
    id: "luminance-converter",
    title: "Luminance Converter",
    description: "Convert candela, lumen, lux units",
    icon: Lightbulb,
    category: "Light",
    popular: false
  },
  {
    id: "illumination-converter",
    title: "Illumination Converter",
    description: "Convert lux, foot-candle, phot",
    icon: Lightbulb,
    category: "Light",
    popular: false
  },

  // Radiology Converters
  {
    id: "radiation-converter",
    title: "Radiation Converter",
    description: "Convert becquerel, curie, gray, sievert",
    icon: Radio,
    category: "Radiology",
    popular: false
  },
  {
    id: "radiation-dose-converter",
    title: "Radiation Dose Converter",
    description: "Convert absorbed dose units",
    icon: Radio,
    category: "Radiology",
    popular: false
  },

  // Currency & Financial
  {
    id: "currency-converter",
    title: "Currency Converter",
    description: "Real-time exchange rates for 150+ currencies",
    icon: DollarSign,
    category: "Financial",
    popular: true,
    component: CurrencyConverter
  },

  // File & Document Tools
  {
    id: "excel-converter",
    title: "Excel Converter",
    description: "Convert Excel to CSV, PDF, JSON formats",
    icon: FileSpreadsheet,
    category: "Files",
    popular: true
  },
  {
    id: "image-converter",
    title: "Image Converter",
    description: "Convert PNG, JPG, WEBP, GIF, SVG formats",
    icon: FileImage,
    category: "Files",
    popular: true
  },
  {
    id: "audio-converter",
    title: "Audio Converter",
    description: "Convert MP3, WAV, FLAC, AAC, OGG formats",
    icon: Music,
    category: "Files",
    popular: false
  },
  {
    id: "video-converter",
    title: "Video Converter",
    description: "Convert MP4, AVI, MOV, MKV, WEBM formats",
    icon: Video,
    category: "Files",
    popular: false
  },
  {
    id: "file-compressor",
    title: "File Compressor",
    description: "Compress files and folders to save space",
    icon: Archive,
    category: "Files",
    popular: true
  },

  // Text & Language
  {
    id: "text-case-converter",
    title: "Text Case Converter",
    description: "Convert to uppercase, lowercase, title case",
    icon: FileText,
    category: "Text",
    popular: false
  },
  {
    id: "language-translator",
    title: "Language Translator",
    description: "Translate text between 100+ languages",
    icon: Globe,
    category: "Text",
    popular: true
  },
  {
    id: "markdown-converter",
    title: "Markdown Converter",
    description: "Convert between Markdown and HTML",
    icon: Code,
    category: "Text",
    popular: false
  },

  // Developer Tools
  {
    id: "code-translator",
    title: "Code Translator",
    description: "Convert code between programming languages",
    icon: Code,
    category: "Developer",
    popular: true
  },
  {
    id: "base-converter",
    title: "Number Base Converter",
    description: "Convert binary, decimal, hex, octal",
    icon: Binary,
    category: "Developer",
    popular: false
  },
  {
    id: "hash-generator",
    title: "Hash Generator",
    description: "Generate MD5, SHA1, SHA256 hashes",
    icon: Hash,
    category: "Developer",
    popular: false
  },
  {
    id: "json-formatter",
    title: "JSON Formatter",
    description: "Format, validate, and minify JSON",
    icon: Code2,
    category: "Developer",
    popular: false
  },
  {
    id: "sql-formatter",
    title: "SQL Formatter",
    description: "Format and beautify SQL queries",
    icon: Database,
    category: "Developer",
    popular: false
  },

  // Mathematical & Science
  {
    id: "scientific-calculator",
    title: "Scientific Calculator",
    description: "Advanced mathematical calculations",
    icon: Calculator,
    category: "Mathematical",
    popular: false
  },
  {
    id: "statistics-calculator",
    title: "Statistics Calculator",
    description: "Mean, median, standard deviation",
    icon: BarChart,
    category: "Mathematical",
    popular: false
  },
  {
    id: "physics-calculator",
    title: "Physics Calculator",
    description: "Physics formulas and constants",
    icon: FlaskConical,
    category: "Science",
    popular: false
  },
  {
    id: "chemistry-converter",
    title: "Chemistry Converter",
    description: "Convert moles, molarity, molecular mass",
    icon: FlaskConical,
    category: "Science",
    popular: false
  },

  // Design & Color
  {
    id: "color-converter",
    title: "Color Converter",
    description: "Convert RGB, HEX, HSL, CMYK, LAB",
    icon: Palette,
    category: "Design",
    popular: false
  },
  {
    id: "css-unit-converter",
    title: "CSS Unit Converter",
    description: "Convert px, em, rem, vh, vw, %",
    icon: Code,
    category: "Design",
    popular: false
  },

  // Digital & Data
  {
    id: "data-storage-converter",
    title: "Data Storage Converter",
    description: "Convert bytes, KB, MB, GB, TB, PB",
    icon: HardDrive,
    category: "Digital",
    popular: false
  },
  {
    id: "internet-speed-converter",
    title: "Internet Speed Converter",
    description: "Convert Mbps, Gbps, KB/s, MB/s",
    icon: Wifi,
    category: "Digital",
    popular: false
  },

  // Utilities
  {
    id: "qr-generator",
    title: "QR Code Generator",
    description: "Generate QR codes for text, URLs, contacts",
    icon: Smartphone,
    category: "Utilities",
    popular: false
  },
  {
    id: "barcode-generator",
    title: "Barcode Generator",
    description: "Generate various barcode formats",
    icon: Package,
    category: "Utilities",
    popular: false
  },
  {
    id: "document-scanner",
    title: "Document Scanner",
    description: "Scan and digitize physical documents",
    icon: Camera,
    category: "Utilities",
    popular: false
  },
  {
    id: "file-repair",
    title: "File Repair",
    description: "Fix corrupted or damaged files",
    icon: Wrench,
    category: "Utilities",
    popular: false
  },

  // AI Tools
  {
    id: "ai-assistant",
    title: "AI Assistant",
    description: "Get help with conversions and formatting",
    icon: Zap,
    category: "AI Tools",
    popular: false
  }
];

export const ToolsGrid = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = [
    "All", "PDF Tools", "Unit Converters", "Engineering", "Electricity", "Heat", 
    "Magnetism", "Fluids", "Light", "Radiology", "Financial", "Files", "Text", 
    "Developer", "Mathematical", "Science", "Design", "Digital", "Utilities", "AI Tools"
  ];
  
  const filteredTools = filter === "All" 
    ? tools 
    : tools.filter(tool => tool.category === filter);

  const selectedToolData = tools.find(tool => tool.id === selectedTool);

  const handleToolClick = (toolId: string) => {
    const tool = tools.find(t => t.id === toolId);
    if (tool?.component) {
      setSelectedTool(toolId);
    }
  };

  if (selectedTool && selectedToolData?.component) {
    const ToolComponent = selectedToolData.component;
    return (
      <section className="py-8 md:py-16 bg-background min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <button
              onClick={() => setSelectedTool(null)}
              className="text-primary hover:text-primary-glow transition-colors mb-4 flex items-center gap-2"
            >
              ← Back to Tools
            </button>
            <h2 className="text-xl md:text-2xl font-bold mb-2">{selectedToolData.title}</h2>
            <p className="text-muted-foreground text-sm md:text-base">{selectedToolData.description}</p>
          </div>
          <ToolComponent />
        </div>
      </section>
    );
  }

  return (
    <section id="tools" className="py-6 md:py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-3xl font-bold mb-4">
            Powerful Conversion Tools
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Choose from our comprehensive suite of conversion tools. 
            Start converting for free, no registration required.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex overflow-x-auto gap-2 mb-6 px-4 scrollbar-hide pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                filter === category
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-3 gap-4 px-4">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card 
                key={tool.id}
                className={`group cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] bg-card border-border ${
                  tool.component ? 'hover:shadow-glow' : ''
                }`}
                onClick={() => handleToolClick(tool.id)}
              >
                <CardContent className="p-4 h-full flex flex-col">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-foreground text-base leading-tight group-hover:text-primary transition-colors">
                          {tool.title}
                        </h3>
                        {tool.popular && (
                          <Badge 
                            variant="default" 
                            className="text-xs px-2 py-1 bg-primary text-primary-foreground ml-2 flex-shrink-0"
                          >
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-3 border-t border-border">
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="secondary" 
                        className="text-xs px-3 py-1 bg-secondary/50"
                      >
                        {tool.category}
                      </Badge>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tools found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};