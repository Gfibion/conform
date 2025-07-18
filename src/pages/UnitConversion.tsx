
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { UnitConverter } from "@/components/tools/UnitConverter";
import { EnhancedUnitConverter } from "@/components/tools/EnhancedUnitConverter";
import { Calculator, Thermometer, Ruler, Scale, Clock, Zap, Gauge, Target } from "lucide-react";

const UnitConversion = () => {
  const unitCategories = [
    {
      id: "temperature",
      title: "Temperature",
      description: "Convert between Celsius, Fahrenheit, Kelvin, and more",
      icon: Thermometer,
      units: ["Celsius", "Fahrenheit", "Kelvin", "Rankine", "Réaumur"]
    },
    {
      id: "length", 
      title: "Length & Distance",
      description: "Convert meters, feet, inches, miles, and more",
      icon: Ruler,
      units: ["Meters", "Feet", "Inches", "Miles", "Kilometers"]
    },
    {
      id: "weight",
      title: "Weight & Mass", 
      description: "Convert kilograms, pounds, ounces, and more",
      icon: Scale,
      units: ["Kilograms", "Pounds", "Ounces", "Grams", "Stones"]
    },
    {
      id: "time",
      title: "Time",
      description: "Convert seconds, minutes, hours, days, and more",
      icon: Clock,
      units: ["Seconds", "Minutes", "Hours", "Days", "Years"]
    },
    {
      id: "energy",
      title: "Energy & Power",
      description: "Convert joules, calories, watts, and more",
      icon: Zap,
      units: ["Joules", "Calories", "Watts", "BTU", "kWh"]
    },
    {
      id: "speed",
      title: "Speed & Velocity",
      description: "Convert mph, km/h, m/s, and more",
      icon: Gauge,
      units: ["MPH", "KM/H", "M/S", "Knots", "Mach"]
    },
    {
      id: "area",
      title: "Area",
      description: "Convert square meters, acres, hectares, and more", 
      icon: Target,
      units: ["Sq Meters", "Acres", "Hectares", "Sq Feet", "Sq Miles"]
    },
    {
      id: "volume",
      title: "Volume & Capacity",
      description: "Convert liters, gallons, cups, and more",
      icon: Calculator,
      units: ["Liters", "Gallons", "Cups", "Milliliters", "Pints"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Unit Conversion Tools</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert between different units of measurement with precision and ease
          </p>
        </div>

        {/* Enhanced Unit Converter */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Universal Unit Converter</h2>
          <EnhancedUnitConverter />
        </div>

        {/* Category Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Conversion Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {unitCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 text-center">{category.description}</p>
                    <div className="space-y-1">
                      {category.units.slice(0, 3).map((unit, index) => (
                        <div key={index} className="text-xs bg-muted/50 rounded px-2 py-1 text-center">
                          {unit}
                        </div>
                      ))}
                      <div className="text-xs text-muted-foreground text-center">
                        +{category.units.length - 3} more
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Standard Unit Converter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Quick Converter</h2>
          <UnitConverter />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UnitConversion;
