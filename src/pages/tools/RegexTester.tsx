import { RegexTester as RegexTool } from '@/components/tools/RegexTester';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const RegexTester = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <RegexTool />
      </main>
      <Footer />
    </div>
  );
};

export default RegexTester;