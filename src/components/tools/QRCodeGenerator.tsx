import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Upload, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QRCode from "qrcode";

export default function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState("256");
  const [errorCorrection, setErrorCorrection] = useState("M");
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [logo, setLogo] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    generateQRCode();
  }, [text, size, errorCorrection, foregroundColor, backgroundColor, logo]);

  const generateQRCode = async () => {
    if (!text) {
      setQrCodeUrl("");
      return;
    }

    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      await QRCode.toCanvas(canvas, text, {
        width: parseInt(size),
        margin: 2,
        color: {
          dark: foregroundColor,
          light: backgroundColor,
        },
        errorCorrectionLevel: errorCorrection as "L" | "M" | "Q" | "H",
      });

      // Add logo if present
      if (logo) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const img = new Image();
          img.onload = () => {
            const logoSize = parseInt(size) * 0.2;
            const x = (parseInt(size) - logoSize) / 2;
            const y = (parseInt(size) - logoSize) / 2;
            
            // Draw white background for logo
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(x - 5, y - 5, logoSize + 10, logoSize + 10);
            
            ctx.drawImage(img, x, y, logoSize, logoSize);
            setQrCodeUrl(canvas.toDataURL());
          };
          img.src = logo;
        }
      } else {
        setQrCodeUrl(canvas.toDataURL());
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrCodeUrl;
    link.click();
    toast({
      title: "Downloaded",
      description: "QR code saved successfully",
    });
  };

  const handleCopy = async () => {
    if (!qrCodeUrl) return;
    try {
      const blob = await (await fetch(qrCodeUrl)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      toast({
        title: "Copied",
        description: "QR code copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy QR code",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">QR Code Generator</h1>
          <p className="text-muted-foreground">
            Create customizable QR codes with logo support
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="text">Text or URL</Label>
                <Input
                  id="text"
                  placeholder="Enter text or URL to encode"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="size">Size (px)</Label>
                <Select value={size} onValueChange={setSize}>
                  <SelectTrigger id="size">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="128">128 x 128</SelectItem>
                    <SelectItem value="256">256 x 256</SelectItem>
                    <SelectItem value="512">512 x 512</SelectItem>
                    <SelectItem value="1024">1024 x 1024</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="errorCorrection">Error Correction</Label>
                <Select value={errorCorrection} onValueChange={setErrorCorrection}>
                  <SelectTrigger id="errorCorrection">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Low (7%)</SelectItem>
                    <SelectItem value="M">Medium (15%)</SelectItem>
                    <SelectItem value="Q">Quartile (25%)</SelectItem>
                    <SelectItem value="H">High (30%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="foreground">Foreground</Label>
                  <div className="flex gap-2">
                    <Input
                      id="foreground"
                      type="color"
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="h-10 w-20 cursor-pointer"
                    />
                    <Input
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="background">Background</Label>
                  <div className="flex gap-2">
                    <Input
                      id="background"
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="h-10 w-20 cursor-pointer"
                    />
                    <Input
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">Logo (optional)</Label>
                <div className="flex gap-2">
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="flex-1"
                  />
                  {logo && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setLogo(null)}
                    >
                      ×
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center min-h-[300px] bg-muted rounded-lg p-8">
                {text ? (
                  <canvas ref={canvasRef} className="max-w-full" />
                ) : (
                  <p className="text-muted-foreground">
                    Enter text to generate QR code
                  </p>
                )}
              </div>

              {qrCodeUrl && (
                <div className="flex gap-2">
                  <Button onClick={handleDownload} className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button onClick={handleCopy} variant="outline" className="flex-1">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Error Correction</h3>
              <p className="text-sm text-muted-foreground">
                Higher levels allow QR codes to be readable even if partially damaged
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Logo Support</h3>
              <p className="text-sm text-muted-foreground">
                Add your brand logo to the center of the QR code
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Custom Colors</h3>
              <p className="text-sm text-muted-foreground">
                Personalize with any foreground and background colors
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
