import { EnhancedScientificCalculator } from '@/components/tools/EnhancedScientificCalculator';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const ScientificCalculator = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <EnhancedScientificCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default ScientificCalculator;