
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { QuickConverter } from "@/components/QuickConverter";
import { EnhancedCurrencyConverter } from "@/components/tools/EnhancedCurrencyConverter";
import { LengthConverter } from "@/components/tools/LengthConverter";
import { WeightConverter } from "@/components/tools/WeightConverter";
import { TemperatureConverter } from "@/components/tools/TemperatureConverter";
import { TimeConverter } from "@/components/tools/TimeConverter";
import { Calculator, Ruler, Weight, Thermometer, Clock, TrendingUp } from "lucide-react";

const UnitConversion = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const converterTools = [
    {
      id: "length-converter",
      title: "Length Converter",
      description: "Convert between meters, feet, inches, and more",
      icon: Ruler,
      examples: ["Meters to Feet", "Inches to Centimeters", "Miles to Kilometers"],
      component: LengthConverter
    },
    {
      id: "weight-converter", 
      title: "Weight Converter",
      description: "Convert between kilograms, pounds, ounces, and more",
      icon: Weight,
      examples: ["Kilograms to Pounds", "Ounces to Grams", "Tons to Kilograms"],
      component: WeightConverter
    },
    {
      id: "temperature-converter",
      title: "Temperature Converter",
      description: "Convert between Celsius, Fahrenheit, and Kelvin",
      icon: Thermometer,
      examples: ["Celsius to Fahrenheit", "Kelvin to Celsius", "Fahrenheit to Kelvin"],
      component: TemperatureConverter
    },
    {
      id: "time-converter",
      title: "Time Converter",
      description: "Convert between seconds, minutes, hours, and more",
      icon: Clock,
      examples: ["Hours to Minutes", "Days to Seconds", "Weeks to Hours"],
      component: TimeConverter
    }
  ];

  const renderSelectedTool = () => {
    const tool = converterTools.find(t => t.id === selectedTool);
    if (!tool) return null;
    
    const Component = tool.component;
    return (
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setSelectedTool(null)}
            className="text-primary hover:text-primary/80"
          >
            ← Back to all tools
          </button>
          <h2 className="text-2xl font-bold">{tool.title}</h2>
        </div>
        <Component />
      </div>
    );
  };

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

        {/* Selected Tool View */}
        {selectedTool && renderSelectedTool()}

        {/* Tools Overview */}
        {!selectedTool && (
          <>
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
              <h2 className="text-2xl font-bold text-center mb-6">Specialized Conversion Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {converterTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Card 
                      key={tool.id} 
                      className="group hover:shadow-lg transition-all duration-200 cursor-pointer"
                      onClick={() => setSelectedTool(tool.id)}
                    >
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
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default UnitConversion;
