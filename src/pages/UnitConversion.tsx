
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { QuickConverter } from "@/components/QuickConverter";
import { EnhancedCurrencyConverter } from "@/components/tools/EnhancedCurrencyConverter";
import { Calculator, Ruler, Weight, Thermometer, Clock, TrendingUp, MessageCircle, Mail, Phone, Zap, Building } from "lucide-react";

const UnitConversion = () => {
  const converterTools = [
    {
      id: "length-converter",
      title: "Length & Distance",
      description: "Convert between metric and imperial measurements",
      icon: Ruler,
      examples: ["Meters ↔ Feet", "Miles ↔ Kilometers", "Inches ↔ Centimeters", "Nautical Miles"],
      category: "Physical Measurements",
      popular: true
    },
    {
      id: "weight-converter", 
      title: "Mass & Weight",
      description: "Convert between different weight and mass units",
      icon: Weight,
      examples: ["Kilograms ↔ Pounds", "Tons ↔ Tonnes", "Ounces ↔ Grams", "Carats ↔ Grams"],
      category: "Physical Measurements"
    },
    {
      id: "temperature-converter",
      title: "Temperature",
      description: "Convert between temperature scales",
      icon: Thermometer,
      examples: ["Celsius ↔ Fahrenheit", "Kelvin ↔ Celsius", "Rankine Scale", "Scientific Units"],
      category: "Physical Measurements"
    },
    {
      id: "currency-converter",
      title: "Currency Exchange", 
      description: "Real-time currency conversion with live rates",
      icon: TrendingUp,
      examples: ["USD ↔ EUR", "Crypto ↔ Fiat", "Historical Rates", "Market Analysis"],
      category: "Financial",
      popular: true
    },
    {
      id: "time-converter",
      title: "Time & Duration",
      description: "Convert between time units and zones",
      icon: Clock,
      examples: ["Hours ↔ Minutes", "Time Zones", "Unix Timestamps", "Work Hours"],
      category: "Business Tools"
    },
    {
      id: "energy-converter",
      title: "Energy & Power",
      description: "Convert between energy and power units",
      icon: Zap,
      examples: ["Watts ↔ Horsepower", "BTU ↔ Joules", "kWh ↔ Calories", "Solar Energy"],
      category: "Engineering"
    },
    {
      id: "area-converter",
      title: "Area & Volume",
      description: "Convert area and volume measurements",
      icon: Calculator,
      examples: ["Square Feet ↔ Meters", "Gallons ↔ Liters", "Acres ↔ Hectares", "Cubic Units"],
      category: "Engineering"
    },
    {
      id: "construction-converter",
      title: "Construction Units",
      description: "Specialized construction and architecture conversions",
      icon: Building,
      examples: ["Board Feet", "Concrete Volume", "Roofing Squares", "Paint Coverage"],
      category: "Engineering"
    }
  ];

  const categories = [...new Set(converterTools.map(tool => tool.category))];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Unit Conversion Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Accurate unit conversions with professional consultation for complex calculations
          </p>
        </div>

        {/* Contact Options */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 mb-8">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold mb-2">Need Custom Calculations?</h2>
            <p className="text-muted-foreground">Get expert help with complex unit conversions and formulas</p>
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

        {/* Quick Converter Section */}
        <div className="mb-12">
          <QuickConverter />
        </div>

        {/* Enhanced Currency Converter Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">Currency Converter</h2>
          <EnhancedCurrencyConverter />
        </div>

        {/* Converter Tools by Category */}
        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {converterTools.filter(tool => tool.category === category).map((tool) => {
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
                        <h4 className="font-medium text-sm">Common Conversions:</h4>
                        <div className="space-y-1">
                          {tool.examples.map((example, index) => (
                            <div key={index} className="text-xs bg-muted/50 rounded px-2 py-1">
                              • {example}
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

export default UnitConversion;
