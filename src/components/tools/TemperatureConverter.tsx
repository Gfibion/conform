
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Thermometer } from "lucide-react";

const temperatureUnits = [
  { value: "celsius", label: "Celsius", symbol: "°C" },
  { value: "fahrenheit", label: "Fahrenheit", symbol: "°F" },
  { value: "kelvin", label: "Kelvin", symbol: "K" },
  { value: "rankine", label: "Rankine", symbol: "°R" }
];

export const TemperatureConverter = () => {
  const [fromValue, setFromValue] = useState("0");
  const [toValue, setToValue] = useState("");
  const [fromUnit, setFromUnit] = useState("celsius");
  const [toUnit, setToUnit] = useState("fahrenheit");

  const convertTemperature = (value: number, from: string, to: string): number => {
    if (from === to) return value;
    
    // Convert to Celsius first
    let celsius = value;
    switch (from) {
      case "fahrenheit":
        celsius = (value - 32) * 5/9;
        break;
      case "kelvin":
        celsius = value - 273.15;
        break;
      case "rankine":
        celsius = (value - 491.67) * 5/9;
        break;
      default:
        celsius = value; // assume celsius
    }
    
    // Convert from Celsius to target
    switch (to) {
      case "fahrenheit":
        return celsius * 9/5 + 32;
      case "kelvin":
        return celsius + 273.15;
      case "rankine":
        return (celsius + 273.15) * 9/5;
      default:
        return celsius; // assume celsius
    }
  };

  const convert = () => {
    const inputValue = parseFloat(fromValue);
    if (isNaN(inputValue)) return;

    const result = convertTemperature(inputValue, fromUnit, toUnit);
    setToValue(result.toFixed(2));
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
          <Thermometer className="w-5 h-5" />
          Temperature Converter
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
                {temperatureUnits.map((unit) => (
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
              placeholder="Enter temperature"
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
                {temperatureUnits.map((unit) => (
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
              {fromValue}{temperatureUnits.find(u => u.value === fromUnit)?.symbol} = {toValue}{temperatureUnits.find(u => u.value === toUnit)?.symbol}
            </p>
          </div>
        )}

        {/* Common Conversions & Reference Points */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              ["celsius", "fahrenheit"], ["fahrenheit", "celsius"], ["celsius", "kelvin"], ["kelvin", "celsius"]
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

          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-medium mb-2">Reference Points</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Water freezes: 0°C / 32°F / 273.15K</div>
              <div>Water boils: 100°C / 212°F / 373.15K</div>
              <div>Room temperature: ~20°C / 68°F</div>
              <div>Body temperature: 37°C / 98.6°F</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
