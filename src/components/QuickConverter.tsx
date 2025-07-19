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
  }
};

export const QuickConverter = () => {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [category, setCategory] = useState("");

  const handleConvert = () => {
    // Basic conversion logic - this would be expanded with actual conversion formulas
    if (!fromValue || !fromUnit || !toUnit) return;
    
    const inputValue = parseFloat(fromValue);
    if (isNaN(inputValue)) return;

    // Simple placeholder conversion (would need actual conversion logic)
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
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Quick Converter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category Selection */}
        <div>
          <label className="text-sm font-medium mb-2 block">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select conversion category" />
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

        {/* Conversion Inputs */}
        <div className="grid grid-cols-2 gap-4 items-end">
          {/* From Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">From</label>
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Enter value"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
              />
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
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
          </div>

          {/* To Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">To</label>
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Result"
                value={toValue}
                readOnly
                className="bg-muted"
              />
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
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
          </div>
        </div>

        {/* Convert and Swap Buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handleSwap}
            className="rounded-full"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button onClick={handleConvert} className="min-w-[120px]">
            Convert
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
