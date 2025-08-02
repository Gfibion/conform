
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { QuickConverter } from "@/components/QuickConverter";
import { EnhancedCurrencyConverter } from "@/components/tools/EnhancedCurrencyConverter";
import { Calculator, Ruler, Weight, Thermometer, Clock, TrendingUp } from "lucide-react";

const UnitConversion = () => {
  const converterTools = [
    {
      id: "length-converter",
      title: "Length Converter",
      description: "Convert between meters, feet, inches, and more",
      icon: Ruler,
      examples: ["Meters to Feet", "Inches to Centimeters", "Miles to Kilometers"]
    },
    {
      id: "weight-converter", 
      title: "Weight Converter",
      description: "Convert between kilograms, pounds, ounces, and more",
      icon: Weight,
      examples: ["Kilograms to Pounds", "Ounces to Grams", "Tons to Kilograms"]
    },
    {
      id: "temperature-converter",
      title: "Temperature Converter",
      description: "Convert between Celsius, Fahrenheit, and Kelvin",
      icon: Thermometer,
      examples: ["Celsius to Fahrenheit", "Kelvin to Celsius", "Fahrenheit to Kelvin"]
    },
    {
      id: "currency-converter",
      title: "Currency Converter", 
      description: "Convert between different currencies with live rates",
      icon: TrendingUp,
      examples: ["USD to EUR", "GBP to JPY", "CAD to AUD"]
    },
    {
      id: "time-converter",
      title: "Time Converter",
      description: "Convert between seconds, minutes, hours, and more",
      icon: Clock,
      examples: ["Hours to Minutes", "Days to Seconds", "Weeks to Hours"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Unit Conversion Tools</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert between different units quickly and accurately with our comprehensive conversion tools
          </p>
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

        {/* Converter Tools Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-6">All Conversion Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {converterTools.map((tool) => {
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
                      <h4 className="font-medium text-sm">Common Conversions:</h4>
                      <div className="space-y-1">
                        {tool.examples.map((example, index) => (
                          <div key={index} className="text-xs bg-muted/50 rounded px-2 py-1">
                            • {example}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UnitConversion;
