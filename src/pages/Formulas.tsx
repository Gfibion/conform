
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Calculator, Sigma, Target, Zap, Brain, BookOpen, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Formulas = () => {
  const [selectedCategory, setSelectedCategory] = useState("arithmetic");

  const formulaCategories = {
    arithmetic: [
      { name: "Area of a Rectangle", formula: "A = l × w", description: "Calculate rectangle area" },
      { name: "Perimeter of a Rectangle", formula: "P = 2(l + w)", description: "Calculate rectangle perimeter" },
      { name: "Area of a Triangle", formula: "A = 0.5 × b × h", description: "Calculate triangle area" },
      { name: "Area of a Circle", formula: "A = π × r²", description: "Calculate circle area" },
      { name: "Circumference of a Circle", formula: "C = 2 × π × r", description: "Calculate circle circumference" }
    ],
    algebra: [
      { name: "Quadratic Formula", formula: "x = [-b ± √(b² - 4ac)] / 2a", description: "Solve quadratic equations" },
      { name: "Binomial Theorem", formula: "(a + b)ⁿ = Σ [nCk × a^(n-k) × b^k]", description: "Expand binomial expressions" },
      { name: "Difference of Squares", formula: "a² - b² = (a - b)(a + b)", description: "Factor difference of squares" },
      { name: "Cubic Equation", formula: "ax³ + bx² + cx + d = 0", description: "General cubic equation form" }
    ],
    geometry: [
      { name: "Pythagorean Theorem", formula: "a² + b² = c²", description: "Right triangle relationship" },
      { name: "Volume of a Sphere", formula: "V = (4/3)πr³", description: "Calculate sphere volume" },
      { name: "Surface Area of a Sphere", formula: "A = 4πr²", description: "Calculate sphere surface area" },
      { name: "Volume of a Cylinder", formula: "V = πr²h", description: "Calculate cylinder volume" },
      { name: "Surface Area of a Cylinder", formula: "A = 2πr(h + r)", description: "Calculate cylinder surface area" }
    ],
    calculus: [
      { name: "Derivative Definition", formula: "f'(x) = lim(h→0) [f(x + h) - f(x)] / h", description: "Definition of derivative" },
      { name: "Chain Rule", formula: "d/dx[f(g(x))] = f'(g(x)) × g'(x)", description: "Derivative of composite functions" },
      { name: "Product Rule", formula: "d(uv)/dx = u'v + uv'", description: "Derivative of products" },
      { name: "Quotient Rule", formula: "d(u/v)/dx = (v×u' - u×v') / v²", description: "Derivative of quotients" },
      { name: "Integration by Parts", formula: "∫u dv = uv - ∫v du", description: "Integration technique" }
    ],
    mechanics: [
      { name: "Newton's Second Law", formula: "F = m × a", description: "Force equals mass times acceleration" },
      { name: "Gravitational Force", formula: "F = G(m₁ × m₂) / r²", description: "Universal gravitation" },
      { name: "Kinetic Energy", formula: "KE = 0.5 × m × v²", description: "Energy of motion" },
      { name: "Potential Energy", formula: "PE = m × g × h", description: "Gravitational potential energy" },
      { name: "Momentum", formula: "p = m × v", description: "Linear momentum" }
    ],
    electricity: [
      { name: "Ohm's Law", formula: "V = I × R", description: "Voltage, current, resistance relationship" },
      { name: "Power", formula: "P = V × I", description: "Electrical power" },
      { name: "Coulomb's Law", formula: "F = k(q₁ × q₂) / r²", description: "Electrostatic force" },
      { name: "Electric Field", formula: "E = F / q", description: "Electric field strength" },
      { name: "Magnetic Force", formula: "F = qvB sin(θ)", description: "Force on moving charge" }
    ],
    chemistry: [
      { name: "Ideal Gas Law", formula: "PV = nRT", description: "Gas behavior equation" },
      { name: "Molarity", formula: "M = moles of solute / liters of solution", description: "Solution concentration" },
      { name: "Dilution", formula: "M₁V₁ = M₂V₂", description: "Dilution calculation" },
      { name: "Avogadro's Law", formula: "V/n = k", description: "Volume-mole relationship" },
      { name: "Boyle's Law", formula: "P₁V₁ = P₂V₂", description: "Pressure-volume relationship" }
    ],
    investment: [
      { name: "Simple Interest", formula: "SI = (P × R × T) / 100", description: "Calculate simple interest" },
      { name: "Compound Interest", formula: "A = P(1 + r/n)^(nt)", description: "Calculate compound interest" },
      { name: "Present Value", formula: "PV = FV / (1 + r)^t", description: "Present value calculation" },
      { name: "Future Value", formula: "FV = PV × (1 + r)^t", description: "Future value calculation" },
      { name: "Return on Investment", formula: "ROI = (Gain - Cost) / Cost × 100%", description: "Investment return percentage" }
    ],
    accounting: [
      { name: "Break-even Point", formula: "BEP = Fixed Costs / (Selling Price - Variable Cost)", description: "Break-even analysis" },
      { name: "Net Present Value", formula: "NPV = Σ [Rt / (1 + i)^t] - Initial Investment", description: "Investment evaluation" },
      { name: "Depreciation - Straight Line", formula: "D = (Cost - Salvage Value) / Useful Life", description: "Asset depreciation" },
      { name: "Cost of Goods Sold", formula: "COGS = Opening Stock + Purchases - Closing Stock", description: "Cost calculation" }
    ],
    statistics: [
      { name: "Mean", formula: "μ = (Σx) / n", description: "Average value" },
      { name: "Median", formula: "Middle value when data is sorted", description: "Middle value in dataset" },
      { name: "Mode", formula: "Most frequent value", description: "Most common value" },
      { name: "Variance", formula: "σ² = Σ(x - μ)² / n", description: "Data spread measure" },
      { name: "Standard Deviation", formula: "σ = √(σ²)", description: "Data dispersion measure" }
    ]
  };

  const categoryDisplayNames = {
    arithmetic: "Arithmetic",
    algebra: "Algebra", 
    geometry: "Geometry",
    calculus: "Calculus",
    mechanics: "Physics - Mechanics",
    electricity: "Physics - Electricity & Magnetism",
    chemistry: "Chemistry",
    investment: "Finance - Investment & Economics",
    accounting: "Finance - Costing & Accounting",
    statistics: "Statistics"
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" className="p-2 h-auto hover:bg-accent" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

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
            <SelectTrigger className="w-full md:w-80">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(categoryDisplayNames).map(([key, displayName]) => (
                <SelectItem key={key} value={key}>{displayName}</SelectItem>
              ))}
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
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/calculator">Use Formula</Link>
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
              <Button variant="outline" className="w-full" asChild>
                <Link to="/calculator">Open Solver</Link>
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
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
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
              <Button variant="outline" className="w-full" asChild>
                <Link to="/calculator">Open Calculator</Link>
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
