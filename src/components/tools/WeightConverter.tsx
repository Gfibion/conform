
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Weight } from "lucide-react";

const weightUnits = [
  { value: "kilogram", label: "Kilogram", symbol: "kg", factor: 1 },
  { value: "gram", label: "Gram", symbol: "g", factor: 0.001 },
  { value: "pound", label: "Pound", symbol: "lb", factor: 0.453592 },
  { value: "ounce", label: "Ounce", symbol: "oz", factor: 0.0283495 },
  { value: "stone", label: "Stone", symbol: "st", factor: 6.35029 },
  { value: "ton", label: "Metric Ton", symbol: "t", factor: 1000 }
];

export const WeightConverter = () => {
  const [fromValue, setFromValue] = useState("1");
  const [toValue, setToValue] = useState("");
  const [fromUnit, setFromUnit] = useState("kilogram");
  const [toUnit, setToUnit] = useState("pound");

  const convert = () => {
    const inputValue = parseFloat(fromValue);
    if (isNaN(inputValue)) return;

    const fromUnitData = weightUnits.find(u => u.value === fromUnit);
    const toUnitData = weightUnits.find(u => u.value === toUnit);
    
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
          <Weight className="w-5 h-5" />
          Weight Converter
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
                {weightUnits.map((unit) => (
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
              placeholder="Enter weight"
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
                {weightUnits.map((unit) => (
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
              {fromValue} {weightUnits.find(u => u.value === fromUnit)?.symbol} = {toValue} {weightUnits.find(u => u.value === toUnit)?.symbol}
            </p>
          </div>
        )}

        {/* Common Conversions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            ["kilogram", "pound"], ["gram", "ounce"], ["pound", "kilogram"], ["stone", "kilogram"]
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
