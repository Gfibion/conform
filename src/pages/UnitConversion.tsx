
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { QuickConverter } from "@/components/QuickConverter";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const UnitConversion = () => {

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="p-2 h-auto hover:bg-accent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Unit Conversion Tools</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert between different units quickly and accurately with our comprehensive conversion tool
          </p>
        </div>

        {/* Quick Converter Section */}
        <div className="mb-12">
          <QuickConverter />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UnitConversion;
