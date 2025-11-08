import { Hero } from "@/components/Hero";
import { ToolsGrid } from "@/components/ToolsGrid";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { QuickConverter } from "@/components/QuickConverter";
import { AIQuickQuery } from "@/components/AIQuickQuery";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Free Unit Converter - Convert Length, Weight, Temperature & More</title>
        <meta name="description" content="Free online unit converter for length, weight, temperature, volume, area, speed, time, data storage, energy, and pressure. Fast, accurate, and easy-to-use conversion tool for all your needs." />
        <meta name="keywords" content="unit converter, length converter, weight converter, temperature converter, volume converter, area converter, speed converter, time converter, metric converter, imperial converter, conversion calculator, online converter" />
        <link rel="canonical" href="https://yourdomain.com/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Free Unit Converter - Convert Length, Weight, Temperature & More" />
        <meta property="og:description" content="Free online unit converter for length, weight, temperature, volume, area, speed, time, data storage, energy, and pressure." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Unit Converter - Convert Length, Weight, Temperature & More" />
        <meta name="twitter:description" content="Free online unit converter for length, weight, temperature, volume, area, speed, time, data storage, energy, and pressure." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navigation />
        <Hero />
        <QuickConverter />
        <AIQuickQuery />
        <ToolsGrid />
        <Footer />
      </div>
    </>
  );
};

export default Index;
