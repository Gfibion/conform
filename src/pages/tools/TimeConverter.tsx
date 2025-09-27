import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TimeConverter as TimeConverterComponent } from "@/components/tools/TimeConverter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { Helmet } from "react-helmet-async";

const TimeConverterPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Time Converter Tool",
    "description": "Convert between different units of time including seconds, minutes, hours, days, weeks, months, and years. Free online time conversion calculator.",
    "url": "https://your-domain.com/tools/time-converter",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert hours to minutes",
      "Convert days to seconds",
      "Convert weeks to hours",
      "Convert years to days",
      "Time duration calculator",
      "Multiple time units"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Time Converter - Convert Hours, Minutes, Days, Seconds | Free Tool</title>
        <meta name="description" content="Free online time converter. Convert between seconds, minutes, hours, days, weeks, months, years instantly. Accurate time duration conversion calculator." />
        <meta name="keywords" content="time converter, hours to minutes, days to seconds, time calculator, duration converter, time units, seconds converter" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://your-domain.com/tools/time-converter" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Time Converter - Convert Hours, Minutes, Days, Seconds" />
        <meta property="og:description" content="Free online time converter. Convert between seconds, minutes, hours, days instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://your-domain.com/tools/time-converter" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Time Converter - Convert Hours, Minutes, Days, Seconds" />
        <meta name="twitter:description" content="Free online time converter. Convert between seconds, minutes, hours, days instantly." />
        
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
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground/80">Time Duration Converter</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Time Converter
              </h1>
              
              <p className="text-lg text-foreground/80 leading-relaxed">
                Convert between different units of time and duration. Supports seconds, minutes, hours, days, weeks, months, years, and more.
              </p>
            </div>
          </div>
        </section>

        {/* Converter Tool */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto mobile-px-compact">
            <div className="max-w-4xl mx-auto">
              <TimeConverterComponent />
            </div>
            
            {/* SEO Content */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-6">Time Conversion Reference</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Common Time Conversions</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• 1 minute = 60 seconds</li>
                      <li>• 1 hour = 60 minutes = 3,600 seconds</li>
                      <li>• 1 day = 24 hours = 1,440 minutes</li>
                      <li>• 1 week = 7 days = 168 hours</li>
                      <li>• 1 month ≈ 30.44 days (average)</li>
                      <li>• 1 year = 365.25 days (average)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Time Unit Categories</h3>
                    <div className="space-y-4">
                      <div>
                        <strong className="block mb-1">Short Duration:</strong>
                        <p className="text-sm text-muted-foreground">Seconds, minutes, hours</p>
                      </div>
                      <div>
                        <strong className="block mb-1">Medium Duration:</strong>
                        <p className="text-sm text-muted-foreground">Days, weeks, months</p>
                      </div>
                      <div>
                        <strong className="block mb-1">Long Duration:</strong>
                        <p className="text-sm text-muted-foreground">Years, decades, centuries</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Practical Time Conversion Examples</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-card p-4 rounded-lg border">
                      <h4 className="font-semibold mb-2">Work & Productivity</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 8-hour workday = 480 minutes</li>
                        <li>• 40-hour work week</li>
                        <li>• 2,080 work hours per year</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                      <h4 className="font-semibold mb-2">Cooking & Timers</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 3 minutes = 180 seconds</li>
                        <li>• 1.5 hours = 90 minutes</li>
                        <li>• 45 minutes = 2,700 seconds</li>
                      </ul>
                    </div>
                    <div className="bg-card p-4 rounded-lg border">
                      <h4 className="font-semibold mb-2">Travel & Planning</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 2-week vacation = 14 days</li>
                        <li>• 6-month project = ~183 days</li>
                        <li>• Weekend = 48 hours</li>
                      </ul>
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

export default TimeConverterPage;