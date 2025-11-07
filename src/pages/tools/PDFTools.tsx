import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PDFTools as PDFToolsComponent } from "@/components/tools/PDFTools";
import { Helmet } from "react-helmet-async";

const PDFTools = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>PDF Tools - Merge, Split, Compress PDFs Online | ConvertHub</title>
        <meta
          name="description"
          content="Free online PDF tools to merge multiple PDFs, split PDF pages, compress PDF files, add password protection, and reorder pages with drag-and-drop interface."
        />
        <meta
          name="keywords"
          content="pdf merge, pdf split, pdf compress, combine pdf, pdf password, pdf tools, merge pdf online, split pdf pages, compress pdf online"
        />
      </Helmet>
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">PDF Tools</h1>
            <p className="text-muted-foreground text-lg">
              Merge, split, and compress PDF files with password protection and easy drag-and-drop
            </p>
          </div>
          <PDFToolsComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PDFTools;
