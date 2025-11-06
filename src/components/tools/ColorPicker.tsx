import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ColorPicker = () => {
  const [hex, setHex] = useState('#3b82f6');
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });
  const [copiedValue, setCopiedValue] = useState('');
  const { toast } = useToast();

  // Convert HEX to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : rgb;
  };

  // Convert RGB to HEX
  const rgbToHex = (r: number, g: number, b: number) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  // Convert RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  // Convert HSL to RGB
  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  const updateFromHex = (newHex: string) => {
    setHex(newHex);
    const newRgb = hexToRgb(newHex);
    setRgb(newRgb);
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
  };

  const updateFromRgb = (newRgb: { r: number, g: number, b: number }) => {
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
  };

  const updateFromHsl = (newHsl: { h: number, s: number, l: number }) => {
    setHsl(newHsl);
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    setCopiedValue(value);
    setTimeout(() => setCopiedValue(''), 2000);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`
    });
  };

  const generatePalette = (type: 'complementary' | 'analogous' | 'triadic' | 'monochrome') => {
    const baseH = hsl.h;
    const colors: string[] = [hex];

    switch (type) {
      case 'complementary': {
        const comp = hslToRgb((baseH + 180) % 360, hsl.s, hsl.l);
        colors.push(rgbToHex(comp.r, comp.g, comp.b));
        break;
      }
      case 'analogous': {
        const ana1 = hslToRgb((baseH + 30) % 360, hsl.s, hsl.l);
        const ana2 = hslToRgb((baseH - 30 + 360) % 360, hsl.s, hsl.l);
        colors.push(rgbToHex(ana1.r, ana1.g, ana1.b), rgbToHex(ana2.r, ana2.g, ana2.b));
        break;
      }
      case 'triadic': {
        const tri1 = hslToRgb((baseH + 120) % 360, hsl.s, hsl.l);
        const tri2 = hslToRgb((baseH + 240) % 360, hsl.s, hsl.l);
        colors.push(rgbToHex(tri1.r, tri1.g, tri1.b), rgbToHex(tri2.r, tri2.g, tri2.b));
        break;
      }
      case 'monochrome':
        [20, 40, 60, 80].forEach(lightness => {
          const mono = hslToRgb(baseH, hsl.s, lightness);
          colors.push(rgbToHex(mono.r, mono.g, mono.b));
        });
        break;
    }

    return colors;
  };

  const paletteTypes = [
    { type: 'complementary' as const, label: 'Complementary' },
    { type: 'analogous' as const, label: 'Analogous' },
    { type: 'triadic' as const, label: 'Triadic' },
    { type: 'monochrome' as const, label: 'Monochrome' }
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Color Tools
        </CardTitle>
        <CardDescription>
          Pick colors, generate palettes, and create gradients
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Color Preview */}
        <div className="flex items-center gap-4">
          <div 
            className="w-32 h-32 rounded-lg border-4 border-border shadow-lg"
            style={{ backgroundColor: hex }}
          />
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Label>HEX</Label>
              <div className="flex gap-2">
                <Input
                  value={hex}
                  onChange={(e) => updateFromHex(e.target.value)}
                  className="font-mono"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(hex, 'HEX')}
                >
                  {copiedValue === hex ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-2">
                <Label>R</Label>
                <Input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.r}
                  onChange={(e) => updateFromRgb({ ...rgb, r: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label>G</Label>
                <Input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.g}
                  onChange={(e) => updateFromRgb({ ...rgb, g: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label>B</Label>
                <Input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb.b}
                  onChange={(e) => updateFromRgb({ ...rgb, b: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'RGB')}
            >
              Copy RGB
            </Button>
          </div>
        </div>

        {/* Native Color Picker */}
        <div className="space-y-2">
          <Label>Pick Color</Label>
          <input
            type="color"
            value={hex}
            onChange={(e) => updateFromHex(e.target.value)}
            className="w-full h-12 rounded-lg cursor-pointer"
          />
        </div>

        {/* Palette Generator */}
        <div className="space-y-4">
          <h3 className="font-medium">Palette Generator</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {paletteTypes.map(({ type, label }) => (
              <div key={type} className="space-y-2">
                <Label className="text-xs">{label}</Label>
                <div className="flex gap-1">
                  {generatePalette(type).map((color, idx) => (
                    <button
                      key={idx}
                      className="flex-1 h-12 rounded border-2 border-border hover:scale-105 transition-transform cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => updateFromHex(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HSL Sliders */}
        <div className="space-y-4">
          <h3 className="font-medium">HSL Adjustments</h3>
          <div className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Hue</Label>
                <span className="text-sm text-muted-foreground">{hsl.h}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={hsl.h}
                onChange={(e) => updateFromHsl({ ...hsl, h: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Saturation</Label>
                <span className="text-sm text-muted-foreground">{hsl.s}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={hsl.s}
                onChange={(e) => updateFromHsl({ ...hsl, s: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Lightness</Label>
                <span className="text-sm text-muted-foreground">{hsl.l}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={hsl.l}
                onChange={(e) => updateFromHsl({ ...hsl, l: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};