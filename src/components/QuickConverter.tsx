
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, RefreshCw } from "lucide-react";

const conversionCategories = {
  length: {
    name: "Length",
    units: ["meter", "kilometer", "centimeter", "millimeter", "inch", "foot", "yard", "mile"]
  },
  weight: {
    name: "Weight",
    units: ["kilogram", "gram", "pound", "ounce", "stone", "ton"]
  },
  temperature: {
    name: "Temperature", 
    units: ["celsius", "fahrenheit", "kelvin", "rankine"]
  },
  volume: {
    name: "Volume",
    units: ["liter", "milliliter", "gallon", "quart", "pint", "cup", "fluid ounce"]
  },
  time: {
    name: "Time",
    units: ["second", "minute", "hour", "day", "week", "month", "year"]
  },
  currency: {
    name: "Currency",
    units: ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY"]
  }
};

export const QuickConverter = () => {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [category, setCategory] = useState("");

  const handleConvert = () => {
    if (!fromValue || !fromUnit || !toUnit) return;
    
    const inputValue = parseFloat(fromValue);
    if (isNaN(inputValue)) return;

    let result = inputValue;
    
    // Example conversions for demonstration
    if (fromUnit === "meter" && toUnit === "foot") {
      result = inputValue * 3.28084;
    } else if (fromUnit === "foot" && toUnit === "meter") {
      result = inputValue / 3.28084;
    } else if (fromUnit === "celsius" && toUnit === "fahrenheit") {
      result = (inputValue * 9/5) + 32;
    } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
      result = (inputValue - 32) * 5/9;
    } else if (fromUnit === "kilogram" && toUnit === "pound") {
      result = inputValue * 2.20462;
    } else if (fromUnit === "pound" && toUnit === "kilogram") {
      result = inputValue / 2.20462;
    }
    
    setToValue(result.toFixed(4));
  };

  const handleSwap = () => {
    setFromValue(toValue);
    setToValue(fromValue);
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const getUnitsForCategory = () => {
    if (!category) return [];
    return conversionCategories[category as keyof typeof conversionCategories]?.units || [];
  };

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-lg">Quick Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Single row layout for compact design */}
        <div className="flex items-center gap-4">
          {/* Category Selection */}
          <div className="flex-1">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(conversionCategories).map(([key, cat]) => (
                  <SelectItem key={key} value={key}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* From Section */}
          <div className="flex items-center gap-2 flex-1">
            <Input
              type="number"
              placeholder="Value"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              className="h-9"
            />
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger className="h-9 min-w-[120px]">
                <SelectValue placeholder="From" />
              </SelectTrigger>
              <SelectContent>
                {getUnitsForCategory().map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Swap Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleSwap}
            className="h-9 w-9"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>

          {/* To Section */}
          <div className="flex items-center gap-2 flex-1">
            <Input
              type="number"
              placeholder="Result"
              value={toValue}
              readOnly
              className="bg-muted h-9"
            />
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger className="h-9 min-w-[120px]">
                <SelectValue placeholder="To" />
              </SelectTrigger>
              <SelectContent>
                {getUnitsForCategory().map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Convert Button */}
          <Button onClick={handleConvert} className="h-9">
            Convert
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
