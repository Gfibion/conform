import { Hero } from "@/components/Hero";
import { ToolsGrid } from "@/components/ToolsGrid";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ToolsGrid />
      <Footer />
    </div>
  );
};

export default Index;
