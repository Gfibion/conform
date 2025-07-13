import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowRightLeft } from "lucide-react";

const unitCategories = {
  Length: {
    meter: { name: "Meter", symbol: "m", toMeter: 1 },
    kilometer: { name: "Kilometer", symbol: "km", toMeter: 1000 },
    centimeter: { name: "Centimeter", symbol: "cm", toMeter: 0.01 },
    millimeter: { name: "Millimeter", symbol: "mm", toMeter: 0.001 },
    inch: { name: "Inch", symbol: "in", toMeter: 0.0254 },
    foot: { name: "Foot", symbol: "ft", toMeter: 0.3048 },
    yard: { name: "Yard", symbol: "yd", toMeter: 0.9144 },
    mile: { name: "Mile", symbol: "mi", toMeter: 1609.34 }
  },
  Weight: {
    kilogram: { name: "Kilogram", symbol: "kg", toKg: 1 },
    gram: { name: "Gram", symbol: "g", toKg: 0.001 },
    pound: { name: "Pound", symbol: "lb", toKg: 0.453592 },
    ounce: { name: "Ounce", symbol: "oz", toKg: 0.0283495 },
    ton: { name: "Ton", symbol: "t", toKg: 1000 }
  },
  Temperature: {
    celsius: { name: "Celsius", symbol: "°C" },
    fahrenheit: { name: "Fahrenheit", symbol: "°F" },
    kelvin: { name: "Kelvin", symbol: "K" }
  },
  Volume: {
    liter: { name: "Liter", symbol: "L", toLiter: 1 },
    milliliter: { name: "Milliliter", symbol: "mL", toLiter: 0.001 },
    gallon: { name: "Gallon (US)", symbol: "gal", toLiter: 3.78541 },
    quart: { name: "Quart", symbol: "qt", toLiter: 0.946353 },
    pint: { name: "Pint", symbol: "pt", toLiter: 0.473176 },
    cup: { name: "Cup", symbol: "cup", toLiter: 0.236588 }
  }
};

export const UnitConverter = () => {
  const [category, setCategory] = useState("Length");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");
  const [fromValue, setFromValue] = useState("1");
  const [toValue, setToValue] = useState("");

  const convert = (value: string, from: string, to: string, cat: string) => {
    if (!value || isNaN(Number(value))) return "";
    
    const num = Number(value);
    const units = unitCategories[cat as keyof typeof unitCategories];
    
    if (cat === "Temperature") {
      return convertTemperature(num, from, to).toFixed(4);
    }
    
    const baseKey = cat === "Length" ? "toMeter" : cat === "Weight" ? "toKg" : "toLiter";
    const fromBase = (units as any)[from][baseKey];
    const toBase = (units as any)[to][baseKey];
    
    const result = (num * fromBase) / toBase;
    return result.toFixed(6).replace(/\.?0+$/, "");
  };

  const convertTemperature = (value: number, from: string, to: string) => {
    if (from === to) return value;
    
    // Convert to Celsius first
    let celsius = value;
    if (from === "fahrenheit") celsius = (value - 32) * 5/9;
    if (from === "kelvin") celsius = value - 273.15;
    
    // Convert from Celsius to target
    if (to === "fahrenheit") return celsius * 9/5 + 32;
    if (to === "kelvin") return celsius + 273.15;
    return celsius;
  };

  const handleFromValueChange = (value: string) => {
    setFromValue(value);
    const result = convert(value, fromUnit, toUnit, category);
    setToValue(result);
  };

  const handleToValueChange = (value: string) => {
    setToValue(value);
    const result = convert(value, toUnit, fromUnit, category);
    setFromValue(result);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  const getCurrentUnits = () => unitCategories[category as keyof typeof unitCategories];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Unit Converter
            <Badge variant="secondary">Live</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(unitCategories).map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Conversion Interface */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* From */}
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(getCurrentUnits()).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name} ({unit.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input 
                type="number"
                value={fromValue}
                onChange={(e) => handleFromValueChange(e.target.value)}
                placeholder="Enter value"
              />
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={swapUnits}
                className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* To */}
            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(getCurrentUnits()).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name} ({unit.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input 
                type="number"
                value={toValue}
                onChange={(e) => handleToValueChange(e.target.value)}
                placeholder="Result"
              />
            </div>
          </div>

          {/* Reference Info */}
          {fromValue && toValue && (
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">{fromValue} {(getCurrentUnits() as any)[fromUnit]?.symbol}</span>
                {" = "}
                <span className="font-medium">{toValue} {(getCurrentUnits() as any)[toUnit]?.symbol}</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick References */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="text-lg">Quick References</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {category === "Length" && (
              <>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 meter =</div>
                  <div className="text-muted-foreground">100 cm</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 kilometer =</div>
                  <div className="text-muted-foreground">1000 m</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 foot =</div>
                  <div className="text-muted-foreground">12 inches</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 mile =</div>
                  <div className="text-muted-foreground">5280 ft</div>
                </div>
              </>
            )}
            {category === "Weight" && (
              <>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 kg =</div>
                  <div className="text-muted-foreground">1000 g</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 pound =</div>
                  <div className="text-muted-foreground">16 oz</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 ton =</div>
                  <div className="text-muted-foreground">1000 kg</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 kg =</div>
                  <div className="text-muted-foreground">2.20 lbs</div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};