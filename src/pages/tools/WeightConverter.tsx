import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WeightConverter as WeightConverterComponent } from "@/components/tools/WeightConverter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Weight } from "lucide-react";
import { Helmet } from "react-helmet-async";

const WeightConverterPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Weight Converter Tool",
    "description": "Convert between different units of weight and mass including kilograms, pounds, ounces, grams, tons, and stones. Free online weight conversion calculator.",
    "url": "https://your-domain.com/tools/weight-converter",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert kilograms to pounds",
      "Convert ounces to grams",
      "Convert stones to kilograms",
      "Convert tons to pounds",
      "Precise weight calculations",
      "Multiple weight units"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Weight Converter - Convert Kg to Lbs, Ounces to Grams | Free Tool</title>
        <meta name="description" content="Free online weight converter. Convert between kilograms, pounds, ounces, grams, tons, stones instantly. Accurate weight and mass conversion calculator." />
        <meta name="keywords" content="weight converter, kg to lbs, pounds to kg, ounces to grams, mass converter, weight calculator, unit converter, stones to kg" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://your-domain.com/tools/weight-converter" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Weight Converter - Convert Kg to Lbs, Ounces to Grams" />
        <meta property="og:description" content="Free online weight converter. Convert between kilograms, pounds, ounces, grams instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-domain.com/tools/weight-converter" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Weight Converter - Convert Kg to Lbs, Ounces to Grams" />
        <meta name="twitter:description" content="Free online weight converter. Convert between kilograms, pounds, ounces, grams instantly." />
        
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
                <Weight className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground/80">Weight & Mass Converter</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Weight Converter
              </h1>
              
              <p className="text-lg text-foreground/80 leading-relaxed">
                Convert between different units of weight and mass. Supports kilograms, pounds, ounces, grams, tons, stones, and more.
              </p>
            </div>
          </div>
        </section>

        {/* Converter Tool */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto mobile-px-compact">
            <div className="max-w-4xl mx-auto">
              <WeightConverterComponent />
            </div>
            
            {/* SEO Content */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-6">About Weight Conversion</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Common Weight Conversions</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• 1 kilogram = 2.20462 pounds</li>
                      <li>• 1 pound = 16 ounces</li>
                      <li>• 1 ounce = 28.3495 grams</li>
                      <li>• 1 stone = 14 pounds</li>
                      <li>• 1 ton = 1000 kilograms</li>
                      <li>• 1 pound = 453.592 grams</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Supported Units</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <strong>Metric:</strong>
                        <ul className="mt-1">
                          <li>• Milligrams (mg)</li>
                          <li>• Grams (g)</li>
                          <li>• Kilograms (kg)</li>
                          <li>• Tons (t)</li>
                        </ul>
                      </div>
                      <div>
                        <strong>Imperial:</strong>
                        <ul className="mt-1">
                          <li>• Ounces (oz)</li>
                          <li>• Pounds (lbs)</li>
                          <li>• Stones (st)</li>
                          <li>• US Tons</li>
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

export default WeightConverterPage;