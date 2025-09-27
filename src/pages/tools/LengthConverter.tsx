import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LengthConverter as LengthConverterComponent } from "@/components/tools/LengthConverter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Ruler } from "lucide-react";
import { Helmet } from "react-helmet-async";

const LengthConverterPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Length Converter Tool",
    "description": "Convert between different units of length including meters, feet, inches, centimeters, kilometers, miles, yards, and more. Free online length conversion calculator.",
    "url": "https://your-domain.com/tools/length-converter",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert meters to feet",
      "Convert inches to centimeters", 
      "Convert kilometers to miles",
      "Convert yards to meters",
      "Precise length calculations",
      "Multiple unit support"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Length Converter - Convert Meters, Feet, Inches, CM | Free Tool</title>
        <meta name="description" content="Free online length converter. Convert between meters, feet, inches, centimeters, kilometers, miles, yards instantly. Accurate length conversion calculator with common measurements." />
        <meta name="keywords" content="length converter, meters to feet, inches to cm, kilometers to miles, yards converter, distance converter, measurement tool, unit converter" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://your-domain.com/tools/length-converter" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Length Converter - Convert Meters, Feet, Inches" />
        <meta property="og:description" content="Free online length converter. Convert between meters, feet, inches, centimeters instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-domain.com/tools/length-converter" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Length Converter - Convert Meters, Feet, Inches" />
        <meta name="twitter:description" content="Free online length converter. Convert between meters, feet, inches, centimeters instantly." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Header */}
        <section className="py-8 md:py-12 bg-gradient-subtle">
          <div className="container mx-auto mobile-px-compact">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="outline" size="sm" asChild>
                <Link to="/unit-conversion">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Unit Conversion
                </Link>
              </Button>
            </div>
            
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
                <Ruler className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground/80">Length & Distance Converter</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Length Converter
              </h1>
              
              <p className="text-lg text-foreground/80 leading-relaxed">
                Convert between different units of length and distance. Supports meters, feet, inches, centimeters, kilometers, miles, yards, and more.
              </p>
            </div>
          </div>
        </section>

        {/* Converter Tool */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto mobile-px-compact">
            <div className="max-w-4xl mx-auto">
              <LengthConverterComponent />
            </div>
            
            {/* SEO Content */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-6">About Length Conversion</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Common Length Conversions</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• 1 meter = 3.28084 feet</li>
                      <li>• 1 inch = 2.54 centimeters</li>
                      <li>• 1 kilometer = 0.621371 miles</li>
                      <li>• 1 yard = 0.9144 meters</li>
                      <li>• 1 foot = 12 inches</li>
                      <li>• 1 mile = 1.60934 kilometers</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Supported Units</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <strong>Metric:</strong>
                        <ul className="mt-1">
                          <li>• Millimeters (mm)</li>
                          <li>• Centimeters (cm)</li>
                          <li>• Meters (m)</li>
                          <li>• Kilometers (km)</li>
                        </ul>
                      </div>
                      <div>
                        <strong>Imperial:</strong>
                        <ul className="mt-1">
                          <li>• Inches (in)</li>
                          <li>• Feet (ft)</li>
                          <li>• Yards (yd)</li>
                          <li>• Miles (mi)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default LengthConverterPage;