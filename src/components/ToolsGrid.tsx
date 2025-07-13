import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, Calculator, Globe, Code, DollarSign, Wrench,
  FileImage, Camera, Zap, Smartphone, Palette, Clock
} from "lucide-react";
import { useState } from "react";
import { UnitConverter } from "./tools/UnitConverter";
import { CurrencyConverter } from "./tools/CurrencyConverter";

const tools = [
  {
    id: "unit-converter",
    title: "Unit Converter",
    description: "Convert between different units of measurement",
    icon: Calculator,
    category: "Conversion",
    popular: true,
    component: UnitConverter
  },
  {
    id: "currency-converter", 
    title: "Currency Converter",
    description: "Real-time currency exchange rates",
    icon: DollarSign,
    category: "Conversion",
    popular: true,
    component: CurrencyConverter
  },
  {
    id: "file-converter",
    title: "File Converter",
    description: "Convert between PDF, Word, Excel, and more",
    icon: FileText,
    category: "Files",
    popular: true
  },
  {
    id: "language-translator",
    title: "Language Translator", 
    description: "Translate text between 100+ languages",
    icon: Globe,
    category: "Language"
  },
  {
    id: "code-translator",
    title: "Code Translator",
    description: "Convert code between programming languages",
    icon: Code,
    category: "Development"
  },
  {
    id: "image-converter",
    title: "Image Converter",
    description: "Convert images between different formats",
    icon: FileImage,
    category: "Files"
  },
  {
    id: "file-repair",
    title: "File Repair",
    description: "Fix corrupted or damaged files",
    icon: Wrench,
    category: "Utilities"
  },
  {
    id: "document-scanner",
    title: "Document Scanner",
    description: "Scan and digitize physical documents",
    icon: Camera,
    category: "Utilities"
  },
  {
    id: "color-converter",
    title: "Color Converter",
    description: "Convert between HEX, RGB, HSL color formats",
    icon: Palette,
    category: "Design"
  },
  {
    id: "time-converter",
    title: "Time Zone Converter",
    description: "Convert time across different time zones",
    icon: Clock,
    category: "Conversion"
  },
  {
    id: "qr-generator",
    title: "QR Code Generator",
    description: "Generate QR codes for text, URLs, and more",
    icon: Smartphone,
    category: "Utilities"
  },
  {
    id: "ai-assistant",
    title: "AI Assistant",
    description: "Get help with conversions and formatting",
    icon: Zap,
    category: "AI Tools"
  }
];

export const ToolsGrid = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Conversion", "Files", "Language", "Development", "Utilities", "Design", "AI Tools"];
  
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
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <button
              onClick={() => setSelectedTool(null)}
              className="text-primary hover:text-primary-glow transition-colors mb-4"
            >
              ← Back to Tools
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedToolData.title}</h2>
            <p className="text-muted-foreground">{selectedToolData.description}</p>
          </div>
          <ToolComponent />
        </div>
      </section>
    );
  }

  return (
    <section id="tools" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Conversion Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our comprehensive suite of conversion tools. 
            Start converting for free, no registration required.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                filter === category
                  ? "bg-primary text-primary-foreground shadow-primary"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Card 
                key={tool.id}
                className={`group cursor-pointer transition-all duration-300 hover:shadow-card hover:-translate-y-1 bg-gradient-card border-border/50 ${
                  tool.component ? 'hover:shadow-glow' : ''
                }`}
                onClick={() => handleToolClick(tool.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    {tool.popular && (
                      <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                        Popular
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {tool.description}
                  </p>
                  
                  <Badge variant="outline" className="text-xs">
                    {tool.category}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};