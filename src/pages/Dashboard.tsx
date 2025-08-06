
import { Hero } from "@/components/Hero";
import { ToolsGrid } from "@/components/ToolsGrid";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { QuickConverter } from "@/components/QuickConverter";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <QuickConverter />
      <ToolsGrid />
      <Footer />
    </div>
  );
}
