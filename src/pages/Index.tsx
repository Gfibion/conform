
import { Hero } from "@/components/Hero";
import { ToolsGrid } from "@/components/ToolsGrid";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { QuickConverter } from "@/components/QuickConverter";
import { AIQuickQuery } from "@/components/AIQuickQuery";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <QuickConverter />
      <AIQuickQuery />
      <ToolsGrid />
      <Footer />
    </div>
  );
};

export default Index;
