import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, RefreshCw } from "lucide-react";
import { convertUnit } from "@/lib/mathUtils";

const conversionCategories = {
  length: {
    name: "Length",
    units: {
      meter: { name: "Meter", factor: 1 },
      kilometer: { name: "Kilometer", factor: 1000 },
      centimeter: { name: "Centimeter", factor: 0.01 },
      millimeter: { name: "Millimeter", factor: 0.001 },
      inch: { name: "Inch", factor: 0.0254 },
      foot: { name: "Foot", factor: 0.3048 },
      yard: { name: "Yard", factor: 0.9144 },
      mile: { name: "Mile", factor: 1609.34 }
    }
  },
  weight: {
    name: "Weight",
    units: {
      kilogram: { name: "Kilogram", factor: 1 },
      gram: { name: "Gram", factor: 0.001 },
      milligram: { name: "Milligram", factor: 0.000001 },
      pound: { name: "Pound", factor: 0.453592 },
      ounce: { name: "Ounce", factor: 0.0283495 },
      stone: { name: "Stone", factor: 6.35029 },
      ton: { name: "Ton", factor: 1000 }
    }
  },
  temperature: {
    name: "Temperature",
    units: {
      celsius: { name: "Celsius" },
      fahrenheit: { name: "Fahrenheit" },
      kelvin: { name: "Kelvin" },
      rankine: { name: "Rankine" }
    }
  },
  volume: {
    name: "Volume",
    units: {
      liter: { name: "Liter", factor: 1 },
      milliliter: { name: "Milliliter", factor: 0.001 },
      gallon: { name: "Gallon (US)", factor: 3.78541 },
      quart: { name: "Quart", factor: 0.946353 },
      pint: { name: "Pint", factor: 0.473176 },
      cup: { name: "Cup (US)", factor: 0.236588 },
      "fluid ounce": { name: "Fluid Ounce", factor: 0.0295735 },
      "cubic meter": { name: "Cubic Meter", factor: 1000 },
      "cubic foot": { name: "Cubic Foot", factor: 28.3168 }
    }
  },
  time: {
    name: "Time",
    units: {
      second: { name: "Second", factor: 1 },
      minute: { name: "Minute", factor: 60 },
      hour: { name: "Hour", factor: 3600 },
      day: { name: "Day", factor: 86400 },
      week: { name: "Week", factor: 604800 },
      month: { name: "Month", factor: 2592000 },
      year: { name: "Year", factor: 31536000 }
    }
  },
  area: {
    name: "Area",
    units: {
      "square meter": { name: "Square Meter", factor: 1 },
      "square kilometer": { name: "Square Kilometer", factor: 1000000 },
      "square centimeter": { name: "Square Centimeter", factor: 0.0001 },
      "square millimeter": { name: "Square Millimeter", factor: 0.000001 },
      "square inch": { name: "Square Inch", factor: 0.00064516 },
      "square foot": { name: "Square Foot", factor: 0.092903 },
      "square yard": { name: "Square Yard", factor: 0.836127 },
      "square mile": { name: "Square Mile", factor: 2589988.11 },
      acre: { name: "Acre", factor: 4046.86 },
      hectare: { name: "Hectare", factor: 10000 }
    }
  },
  speed: {
    name: "Speed",
    units: {
      "meter per second": { name: "Meter/Second", factor: 1 },
      "kilometer per hour": { name: "Kilometer/Hour", factor: 0.277778 },
      "mile per hour": { name: "Mile/Hour", factor: 0.44704 },
      "foot per second": { name: "Foot/Second", factor: 0.3048 },
      knot: { name: "Knot", factor: 0.514444 }
    }
  },
  "data storage": {
    name: "Data Storage",
    units: {
      byte: { name: "Byte", factor: 1 },
      kilobyte: { name: "Kilobyte (KB)", factor: 1024 },
      megabyte: { name: "Megabyte (MB)", factor: 1048576 },
      gigabyte: { name: "Gigabyte (GB)", factor: 1073741824 },
      terabyte: { name: "Terabyte (TB)", factor: 1099511627776 },
      bit: { name: "Bit", factor: 0.125 },
      kilobit: { name: "Kilobit (Kb)", factor: 128 },
      megabit: { name: "Megabit (Mb)", factor: 131072 },
      gigabit: { name: "Gigabit (Gb)", factor: 134217728 }
    }
  },
  energy: {
    name: "Energy",
    units: {
      joule: { name: "Joule", factor: 1 },
      kilojoule: { name: "Kilojoule", factor: 1000 },
      calorie: { name: "Calorie", factor: 4.184 },
      kilocalorie: { name: "Kilocalorie", factor: 4184 },
      "watt hour": { name: "Watt Hour", factor: 3600 },
      "kilowatt hour": { name: "Kilowatt Hour", factor: 3600000 },
      electronvolt: { name: "Electronvolt", factor: 1.60218e-19 },
      btu: { name: "BTU", factor: 1055.06 }
    }
  },
  pressure: {
    name: "Pressure",
    units: {
      pascal: { name: "Pascal", factor: 1 },
      kilopascal: { name: "Kilopascal", factor: 1000 },
      bar: { name: "Bar", factor: 100000 },
      psi: { name: "PSI", factor: 6894.76 },
      atmosphere: { name: "Atmosphere", factor: 101325 },
      torr: { name: "Torr", factor: 133.322 },
      "millimeter of mercury": { name: "mmHg", factor: 133.322 }
    }
  }
};

export const QuickConverter = () => {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [category, setCategory] = useState("");

  const convertTemperature = (value: number, from: string, to: string): number => {
    if (from === to) return value;
    
    let celsius = value;
    if (from === "fahrenheit") celsius = (value - 32) * 5/9;
    else if (from === "kelvin") celsius = value - 273.15;
    else if (from === "rankine") celsius = (value - 491.67) * 5/9;
    
    if (to === "celsius") return celsius;
    else if (to === "fahrenheit") return (celsius * 9/5) + 32;
    else if (to === "kelvin") return celsius + 273.15;
    else if (to === "rankine") return (celsius + 273.15) * 9/5;
    
    return celsius;
  };

  const handleConvert = () => {
    if (!fromValue || !fromUnit || !toUnit || !category) return;

    const inputValue = parseFloat(fromValue);
    if (isNaN(inputValue)) return;

    let result = inputValue;

    // Temperature requires special handling
    if (category === "temperature") {
      result = convertTemperature(inputValue, fromUnit, toUnit);
    } else {
      // General conversion using factors with centralized math utility
      const categoryData = conversionCategories[category as keyof typeof conversionCategories];
      if (categoryData && categoryData.units) {
        const fromUnitData = categoryData.units[fromUnit as keyof typeof categoryData.units] as any;
        const toUnitData = categoryData.units[toUnit as keyof typeof categoryData.units] as any;
        
        if (fromUnitData && toUnitData && fromUnitData.factor && toUnitData.factor) {
          // Use centralized math utility for precise calculations
          result = convertUnit(inputValue, fromUnitData.factor, toUnitData.factor);
        }
      }
    }

    // Format result: remove trailing zeros, keep up to 10 significant digits
    const formattedResult = parseFloat(result.toPrecision(10)).toString();
    setToValue(formattedResult);
  };

  const handleSwap = () => {
    setFromValue(toValue);
    setToValue(fromValue);
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const getUnitsForCategory = () => {
    if (!category) return [];
    const categoryData = conversionCategories[category as keyof typeof conversionCategories];
    return categoryData ? Object.keys(categoryData.units) : [];
  };

  return (
    <section className="py-4 md:py-6 bg-gradient-section" aria-labelledby="unit-converter-heading">
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Quick Unit Converter",
          "description": "Free online unit converter tool for length, weight, temperature, volume, area, speed, time, data storage, energy, and pressure conversions. Convert between metric and imperial units instantly.",
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Length conversion (meters, feet, inches, kilometers, miles)",
            "Weight conversion (kilograms, pounds, ounces, grams)",
            "Temperature conversion (Celsius, Fahrenheit, Kelvin)",
            "Volume conversion (liters, gallons, milliliters)",
            "Area conversion (square meters, acres, hectares)",
            "Speed conversion (mph, km/h, m/s)",
            "Time conversion (seconds, minutes, hours, days)",
            "Data storage conversion (bytes, KB, MB, GB, TB)",
            "Energy conversion (joules, calories, BTU)",
            "Pressure conversion (pascal, bar, PSI, atmosphere)"
          ]
        })}
      </script>

      <div className="max-w-7xl mx-auto mobile-px-compact">
        {/* SEO-friendly header with keyword-rich content */}
        <header className="text-center mb-4 md:mb-6">
          <h2 id="unit-converter-heading" className="text-xl md:text-2xl font-bold mb-2">
            Free Online Unit Converter
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto">
            Convert between units of length, weight, temperature, volume, area, speed, time, data storage, energy, and pressure. 
            Our accurate converter supports metric, imperial, and international unit systems.
          </p>
        </header>

        <Card className="w-full max-w-5xl mx-auto" role="region" aria-label="Unit conversion calculator">
          <CardHeader className="pb-1 md:pb-2">
            <CardTitle className="text-center text-base md:text-lg">Quick Converter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 md:space-y-3 card-micro md:card-compact">
            {/* Mobile: Stack vertically for better usability */}
            <div className="md:hidden space-y-3">
              {/* Category Selection */}
              <Select value={category} onValueChange={(value) => {
                setCategory(value);
                setFromUnit("");
                setToUnit("");
                setFromValue("");
                setToValue("");
              }}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(conversionCategories).map(([key, cat]) => (
                    <SelectItem key={key} value={key}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* From Section */}
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Value"
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                  className="h-8 text-xs flex-1"
                />
                <Select value={fromUnit} onValueChange={setFromUnit}>
                  <SelectTrigger className="h-8 min-w-[80px] text-xs">
                    <SelectValue placeholder="From" />
                  </SelectTrigger>
                  <SelectContent>
                    {getUnitsForCategory().map((unit) => {
                      const categoryData = conversionCategories[category as keyof typeof conversionCategories];
                      const unitData = categoryData?.units[unit as keyof typeof categoryData.units] as any;
                      const unitName = unitData?.name || unit;
                      return (
                        <SelectItem key={unit} value={unit}>
                          {unitName}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSwap}
                  className="h-7 w-7"
                >
                  <RefreshCw className="w-3 h-3" />
                </Button>
              </div>

              {/* To Section */}
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Result"
                  value={toValue}
                  readOnly
                  className="bg-muted h-8 text-xs flex-1"
                />
                <Select value={toUnit} onValueChange={setToUnit}>
                  <SelectTrigger className="h-8 min-w-[80px] text-xs">
                    <SelectValue placeholder="To" />
                  </SelectTrigger>
                  <SelectContent>
                    {getUnitsForCategory().map((unit) => {
                      const categoryData = conversionCategories[category as keyof typeof conversionCategories];
                      const unitData = categoryData?.units[unit as keyof typeof categoryData.units] as any;
                      const unitName = unitData?.name || unit;
                      return (
                        <SelectItem key={unit} value={unit}>
                          {unitName}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Convert Button */}
              <Button
                onClick={handleConvert}
                className="h-8 w-full text-xs"
              >
                Convert
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>

            {/* Desktop: Single row layout */}
            <div className="hidden md:flex items-center gap-4 flex-wrap">
              {/* Category Selection */}
              <div className="flex-1 min-w-[120px]">
                <Select value={category} onValueChange={(value) => {
                  setCategory(value);
                  setFromUnit("");
                  setToUnit("");
                  setFromValue("");
                  setToValue("");
                }}>
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
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
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
                    {getUnitsForCategory().map((unit) => {
                      const categoryData = conversionCategories[category as keyof typeof conversionCategories];
                      const unitData = categoryData?.units[unit as keyof typeof categoryData.units] as any;
                      const unitName = unitData?.name || unit;
                      return (
                        <SelectItem key={unit} value={unit}>
                          {unitName}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Swap Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={handleSwap}
                className="h-9 w-9 flex-shrink-0"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>

              {/* To Section */}
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
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
                    {getUnitsForCategory().map((unit) => {
                      const categoryData = conversionCategories[category as keyof typeof conversionCategories];
                      const unitData = categoryData?.units[unit as keyof typeof categoryData.units] as any;
                      const unitName = unitData?.name || unit;
                      return (
                        <SelectItem key={unit} value={unit}>
                          {unitName}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Convert Button */}
              <Button
                onClick={handleConvert}
                className="h-9 flex-shrink-0"
              >
                Convert
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
