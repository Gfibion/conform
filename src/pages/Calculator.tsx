import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScientificCalculator } from "@/components/ScientificCalculator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Calculator } from "lucide-react";

const CalculatorPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="py-8 md:py-12 bg-gradient-subtle">
        <div className="container mx-auto mobile-px-compact">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
          
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
              <Calculator className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground/80">Advanced Scientific Calculator</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Scientific Calculator
            </h1>
            
            <p className="text-lg text-foreground/80 leading-relaxed">
              Perform complex mathematical calculations with our advanced scientific calculator.
              Supports trigonometric functions, logarithms, exponentials, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto mobile-px-compact">
          <div className="flex justify-center">
            <ScientificCalculator />
          </div>
          
          {/* Features */}
          <div className="mt-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
              Calculator Features
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2 text-foreground">Basic Operations</h3>
                <p className="text-sm text-muted-foreground">
                  Addition, subtraction, multiplication, division, and percentages
                </p>
              </div>
              
              <div className="text-center p-6 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2 text-foreground">Scientific Functions</h3>
                <p className="text-sm text-muted-foreground">
                  Trigonometric functions (sin, cos, tan), logarithms, and exponentials
                </p>
              </div>
              
              <div className="text-center p-6 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2 text-foreground">Memory Functions</h3>
                <p className="text-sm text-muted-foreground">
                  Store, recall, add to memory, and clear memory operations
                </p>
              </div>
              
              <div className="text-center p-6 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2 text-foreground">Constants</h3>
                <p className="text-sm text-muted-foreground">
                  Mathematical constants like π (pi) and e (Euler's number)
                </p>
              </div>
              
              <div className="text-center p-6 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2 text-foreground">Advanced Operations</h3>
                <p className="text-sm text-muted-foreground">
                  Square root, power functions, absolute values, and factorials
                </p>
              </div>
              
              <div className="text-center p-6 bg-card rounded-lg border">
                <h3 className="font-semibold mb-2 text-foreground">Error Handling</h3>
                <p className="text-sm text-muted-foreground">
                  Robust error detection and recovery for invalid expressions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CalculatorPage;