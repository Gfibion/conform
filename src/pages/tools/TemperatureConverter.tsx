import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TemperatureConverter as TemperatureConverterComponent } from "@/components/tools/TemperatureConverter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Thermometer } from "lucide-react";
import { Helmet } from "react-helmet-async";

const TemperatureConverterPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Temperature Converter Tool",
    "description": "Convert between Celsius, Fahrenheit, Kelvin, and Rankine temperature scales. Free online temperature conversion calculator with precise results.",
    "url": "https://your-domain.com/tools/temperature-converter",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Celsius to Fahrenheit conversion",
      "Fahrenheit to Celsius conversion",
      "Kelvin temperature conversion",
      "Rankine temperature conversion",
      "Scientific temperature calculations",
      "Instant temperature conversion"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Temperature Converter - Celsius to Fahrenheit, Kelvin | Free Tool</title>
        <meta name="description" content="Free online temperature converter. Convert between Celsius, Fahrenheit, Kelvin, and Rankine instantly. Accurate temperature conversion calculator for all scales." />
        <meta name="keywords" content="temperature converter, celsius to fahrenheit, fahrenheit to celsius, kelvin converter, temperature calculator, temp converter, weather conversion" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://your-domain.com/tools/temperature-converter" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Temperature Converter - Celsius to Fahrenheit, Kelvin" />
        <meta property="og:description" content="Free online temperature converter. Convert between Celsius, Fahrenheit, Kelvin instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-domain.com/tools/temperature-converter" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Temperature Converter - Celsius to Fahrenheit, Kelvin" />
        <meta name="twitter:description" content="Free online temperature converter. Convert between Celsius, Fahrenheit, Kelvin instantly." />
        
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
                <Thermometer className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground/80">Temperature Scale Converter</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Temperature Converter
              </h1>
              
              <p className="text-lg text-foreground/80 leading-relaxed">
                Convert between different temperature scales including Celsius, Fahrenheit, Kelvin, and Rankine. Perfect for cooking, weather, and scientific calculations.
              </p>
            </div>
          </div>
        </section>

        {/* Converter Tool */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto mobile-px-compact">
            <div className="max-w-4xl mx-auto">
              <TemperatureConverterComponent />
            </div>
            
            {/* SEO Content */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-6">Temperature Conversion Guide</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Temperature Conversion Formulas</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• °F = (°C × 9/5) + 32</li>
                      <li>• °C = (°F - 32) × 5/9</li>
                      <li>• K = °C + 273.15</li>
                      <li>• °R = °F + 459.67</li>
                      <li>• °C = K - 273.15</li>
                      <li>• °F = °R - 459.67</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Common Temperature References</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Water freezes: 0°C, 32°F, 273.15K</li>
                      <li>• Water boils: 100°C, 212°F, 373.15K</li>
                      <li>• Room temperature: ~20°C, ~68°F</li>
                      <li>• Body temperature: 37°C, 98.6°F</li>
                      <li>• Absolute zero: -273.15°C, -459.67°F, 0K</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">When to Use Different Temperature Scales</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-card p-4 rounded-lg border">
                      <h4 className="font-semibold mb-2">Celsius (°C)</h4>
                      <p className="text-sm text-muted-foreground">Worldwide standard for weather, cooking, and everyday use.</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                      <h4 className="font-semibold mb-2">Fahrenheit (°F)</h4>
                      <p className="text-sm text-muted-foreground">Common in the United States for weather and cooking.</p>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                      <h4 className="font-semibold mb-2">Kelvin (K)</h4>
                      <p className="text-sm text-muted-foreground">Scientific standard for physics and chemistry calculations.</p>
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

export default TemperatureConverterPage;