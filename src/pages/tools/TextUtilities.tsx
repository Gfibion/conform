import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TextUtilities as TextUtilitiesComponent } from "@/components/tools/TextUtilities";
import { Helmet } from "react-helmet-async";

const TextUtilities = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Text Utilities - Case Converter, Base64, URL Encoder, Hash Generator | ConvertHub</title>
        <meta
          name="description"
          content="Free online text utilities including case converter (uppercase, lowercase, title case), Base64 encoder/decoder, URL encoder/decoder, hash generator (MD5, SHA-1, SHA-256, SHA-512), and markdown to HTML converter."
        />
        <meta
          name="keywords"
          content="text utilities, case converter, base64 encode, base64 decode, url encode, url decode, hash generator, md5, sha256, markdown to html, text tools"
        />
      </Helmet>
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Text Utilities</h1>
            <p className="text-muted-foreground text-lg">
              Transform and manipulate text with various encoding, formatting, and hashing tools
            </p>
          </div>
          <TextUtilitiesComponent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TextUtilities;
