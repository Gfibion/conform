
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Calculator, Sigma, Target, Zap, Brain, BookOpen } from "lucide-react";
import { useState } from "react";

const Formulas = () => {
  const [selectedCategory, setSelectedCategory] = useState("mathematics");

  const formulaCategories = {
    mathematics: [
      { name: "Quadratic Formula", formula: "x = (-b ± √(b²-4ac)) / 2a", description: "Solve quadratic equations" },
      { name: "Pythagorean Theorem", formula: "a² + b² = c²", description: "Right triangle relationships" },
      { name: "Area of Circle", formula: "A = πr²", description: "Calculate circle area" },
      { name: "Volume of Sphere", formula: "V = (4/3)πr³", description: "Calculate sphere volume" }
    ],
    physics: [
      { name: "Force", formula: "F = ma", description: "Newton's second law" },
      { name: "Kinetic Energy", formula: "KE = ½mv²", description: "Energy of motion" },
      { name: "Ohm's Law", formula: "V = IR", description: "Electrical resistance" },
      { name: "Wave Speed", formula: "v = fλ", description: "Speed of waves" }
    ],
    chemistry: [
      { name: "Ideal Gas Law", formula: "PV = nRT", description: "Gas behavior" },
      { name: "Density", formula: "ρ = m/V", description: "Mass per unit volume" },
      { name: "Molarity", formula: "M = n/V", description: "Solution concentration" },
      { name: "pH Formula", formula: "pH = -log[H⁺]", description: "Acidity measurement" }
    ],
    engineering: [
      { name: "Stress", formula: "σ = F/A", description: "Force per unit area" },
      { name: "Power", formula: "P = VI", description: "Electrical power" },
      { name: "Efficiency", formula: "η = Pout/Pin × 100%", description: "Energy efficiency" },
      { name: "Moment", formula: "M = F × d", description: "Rotational force" }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Formula Calculator & Reference</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive collection of formulas with built-in calculator and step-by-step solutions
          </p>
        </div>

        {/* Formula Calculator */}
        <Card className="mb-8 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-6 h-6" />
              Smart Formula Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Input placeholder="Enter your equation..." className="md:col-span-2" />
              <Button className="w-full">
                <Brain className="w-4 h-4 mr-2" />
                Calculate
              </Button>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Enter any mathematical expression or select from the formulas below
            </p>
          </CardContent>
        </Card>

        {/* Category Selection */}
        <div className="mb-6">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mathematics">Mathematics</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Formula Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {formulaCategories[selectedCategory as keyof typeof formulaCategories].map((formula, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sigma className="w-5 h-5 text-primary" />
                  {formula.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-4 mb-3 text-center">
                  <code className="font-mono text-lg font-semibold text-primary">
                    {formula.formula}
                  </code>
                </div>
                <p className="text-muted-foreground text-sm mb-3">{formula.description}</p>
                <Button variant="outline" className="w-full">
                  Use Formula
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Access Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Formula Solver</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Step-by-step solutions for complex formulas
              </p>
              <Button variant="outline" className="w-full">
                Open Solver
              </Button>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Formula Library</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Browse our comprehensive formula database
              </p>
              <Button variant="outline" className="w-full">
                Browse Library
              </Button>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Quick Calculator</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Fast calculations with common formulas
              </p>
              <Button variant="outline" className="w-full">
                Open Calculator
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Formulas;
