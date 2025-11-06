import { TimeZoneConverter as TimeZoneTool } from '@/components/tools/TimeZoneConverter';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const TimeZoneConverter = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <TimeZoneTool />
      </main>
      <Footer />
    </div>
  );
};

export default TimeZoneConverter;