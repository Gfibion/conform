
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Ruler } from "lucide-react";

const lengthUnits = [
  { value: "meter", label: "Meter", symbol: "m", factor: 1 },
  { value: "kilometer", label: "Kilometer", symbol: "km", factor: 1000 },
  { value: "centimeter", label: "Centimeter", symbol: "cm", factor: 0.01 },
  { value: "millimeter", label: "Millimeter", symbol: "mm", factor: 0.001 },
  { value: "inch", label: "Inch", symbol: "in", factor: 0.0254 },
  { value: "foot", label: "Foot", symbol: "ft", factor: 0.3048 },
  { value: "yard", label: "Yard", symbol: "yd", factor: 0.9144 },
  { value: "mile", label: "Mile", symbol: "mi", factor: 1609.34 }
];

export const LengthConverter = () => {
  const [fromValue, setFromValue] = useState("1");
  const [toValue, setToValue] = useState("");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("foot");

  const convert = () => {
    const inputValue = parseFloat(fromValue);
    if (isNaN(inputValue)) return;

    const fromUnitData = lengthUnits.find(u => u.value === fromUnit);
    const toUnitData = lengthUnits.find(u => u.value === toUnit);
    
    if (fromUnitData && toUnitData) {
      const result = (inputValue * fromUnitData.factor) / toUnitData.factor;
      setToValue(result.toFixed(6).replace(/\.?0+$/, ""));
    }
  };

  useEffect(() => {
    if (fromValue && fromUnit && toUnit) {
      convert();
    }
  }, [fromValue, fromUnit, toUnit]);

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ruler className="w-5 h-5" />
          Length Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* From */}
          <div className="space-y-2">
            <label className="text-sm font-medium">From</label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {lengthUnits.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label} ({unit.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              placeholder="Enter value"
            />
          </div>

          {/* Swap */}
          <div className="flex justify-center">
            <Button onClick={handleSwap} variant="outline" size="icon">
              <ArrowRightLeft className="w-4 h-4" />
            </Button>
          </div>

          {/* To */}
          <div className="space-y-2">
            <label className="text-sm font-medium">To</label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {lengthUnits.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label} ({unit.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              value={toValue}
              readOnly
              className="bg-muted"
              placeholder="Result"
            />
          </div>
        </div>

        {/* Result Display */}
        {fromValue && toValue && (
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-lg font-medium text-center">
              {fromValue} {lengthUnits.find(u => u.value === fromUnit)?.symbol} = {toValue} {lengthUnits.find(u => u.value === toUnit)?.symbol}
            </p>
          </div>
        )}

        {/* Common Conversions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            ["meter", "foot"], ["kilometer", "mile"], ["inch", "centimeter"], ["yard", "meter"]
          ].map(([from, to]) => (
            <Button
              key={`${from}-${to}`}
              variant="ghost"
              size="sm"
              onClick={() => {
                setFromUnit(from);
                setToUnit(to);
              }}
              className="text-xs"
            >
              {from} → {to}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
