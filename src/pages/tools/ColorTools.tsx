import { ColorPicker } from '@/components/tools/ColorPicker';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const ColorTools = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <ColorPicker />
      </main>
      <Footer />
    </div>
  );
};

export default ColorTools;