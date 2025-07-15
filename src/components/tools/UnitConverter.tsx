import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowRightLeft } from "lucide-react";

const unitCategories = {
  Temperature: {
    celsius: { name: "Celsius", symbol: "°C" },
    fahrenheit: { name: "Fahrenheit", symbol: "°F" },
    kelvin: { name: "Kelvin", symbol: "K" },
    rankine: { name: "Rankine", symbol: "°R" },
    reaumur: { name: "Réaumur", symbol: "°Ré" }
  },
  Length: {
    // Metric
    nanometer: { name: "Nanometer", symbol: "nm", toMeter: 1e-9 },
    micrometer: { name: "Micrometer", symbol: "µm", toMeter: 1e-6 },
    millimeter: { name: "Millimeter", symbol: "mm", toMeter: 0.001 },
    centimeter: { name: "Centimeter", symbol: "cm", toMeter: 0.01 },
    decimeter: { name: "Decimeter", symbol: "dm", toMeter: 0.1 },
    meter: { name: "Meter", symbol: "m", toMeter: 1 },
    kilometer: { name: "Kilometer", symbol: "km", toMeter: 1000 },
    // Imperial/US
    inch: { name: "Inch", symbol: "in", toMeter: 0.0254 },
    foot: { name: "Foot", symbol: "ft", toMeter: 0.3048 },
    yard: { name: "Yard", symbol: "yd", toMeter: 0.9144 },
    mile: { name: "Mile", symbol: "mi", toMeter: 1609.344 },
    // Other
    angstrom: { name: "Angstrom", symbol: "Å", toMeter: 1e-10 },
    fathom: { name: "Fathom", symbol: "fth", toMeter: 1.8288 },
    nauticalMile: { name: "Nautical Mile", symbol: "nmi", toMeter: 1852 },
    astronomicalUnit: { name: "Astronomical Unit", symbol: "AU", toMeter: 149597870700 },
    lightYear: { name: "Light Year", symbol: "ly", toMeter: 9.461e15 },
    parsec: { name: "Parsec", symbol: "pc", toMeter: 3.086e16 }
  },
  Mass: {
    // Metric
    milligram: { name: "Milligram", symbol: "mg", toKg: 1e-6 },
    gram: { name: "Gram", symbol: "g", toKg: 0.001 },
    kilogram: { name: "Kilogram", symbol: "kg", toKg: 1 },
    tonne: { name: "Tonne", symbol: "t", toKg: 1000 },
    // Imperial/US
    grain: { name: "Grain", symbol: "gr", toKg: 6.479891e-5 },
    ounce: { name: "Ounce", symbol: "oz", toKg: 0.0283495 },
    pound: { name: "Pound", symbol: "lb", toKg: 0.453592 },
    stone: { name: "Stone", symbol: "st", toKg: 6.35029 },
    shortTon: { name: "Short Ton", symbol: "ton (US)", toKg: 907.185 },
    longTon: { name: "Long Ton", symbol: "ton (UK)", toKg: 1016.05 },
    // Other
    carat: { name: "Carat", symbol: "ct", toKg: 0.0002 },
    tola: { name: "Tola", symbol: "tola", toKg: 0.01166 }
  },
  Time: {
    nanosecond: { name: "Nanosecond", symbol: "ns", toSecond: 1e-9 },
    microsecond: { name: "Microsecond", symbol: "µs", toSecond: 1e-6 },
    millisecond: { name: "Millisecond", symbol: "ms", toSecond: 0.001 },
    second: { name: "Second", symbol: "s", toSecond: 1 },
    minute: { name: "Minute", symbol: "min", toSecond: 60 },
    hour: { name: "Hour", symbol: "hr", toSecond: 3600 },
    day: { name: "Day", symbol: "day", toSecond: 86400 },
    week: { name: "Week", symbol: "wk", toSecond: 604800 },
    fortnight: { name: "Fortnight", symbol: "fn", toSecond: 1209600 },
    year: { name: "Year", symbol: "yr", toSecond: 31557600 },
    decade: { name: "Decade", symbol: "decade", toSecond: 315576000 },
    century: { name: "Century", symbol: "century", toSecond: 3155760000 },
    millennium: { name: "Millennium", symbol: "millennium", toSecond: 31557600000 },
    shake: { name: "Shake", symbol: "shake", toSecond: 1e-8 }
  },
  Volume: {
    // Metric
    milliliter: { name: "Milliliter", symbol: "mL", toLiter: 0.001 },
    centiliter: { name: "Centiliter", symbol: "cL", toLiter: 0.01 },
    liter: { name: "Liter", symbol: "L", toLiter: 1 },
    cubicMeter: { name: "Cubic Meter", symbol: "m³", toLiter: 1000 },
    // Imperial/US
    fluidOunce: { name: "Fluid Ounce", symbol: "fl oz", toLiter: 0.0295735 },
    cup: { name: "Cup", symbol: "cup", toLiter: 0.236588 },
    pint: { name: "Pint", symbol: "pt", toLiter: 0.473176 },
    quart: { name: "Quart", symbol: "qt", toLiter: 0.946353 },
    gallon: { name: "Gallon (US)", symbol: "gal", toLiter: 3.78541 },
    cubicInch: { name: "Cubic Inch", symbol: "in³", toLiter: 0.0163871 },
    cubicFoot: { name: "Cubic Foot", symbol: "ft³", toLiter: 28.3168 }
  },
  Energy: {
    joule: { name: "Joule", symbol: "J", toJoule: 1 },
    kilojoule: { name: "Kilojoule", symbol: "kJ", toJoule: 1000 },
    calorie: { name: "Calorie", symbol: "cal", toJoule: 4.184 },
    kilocalorie: { name: "Kilocalorie", symbol: "kcal", toJoule: 4184 },
    wattHour: { name: "Watt Hour", symbol: "Wh", toJoule: 3600 },
    kilowattHour: { name: "Kilowatt Hour", symbol: "kWh", toJoule: 3600000 },
    electronVolt: { name: "Electron Volt", symbol: "eV", toJoule: 1.602e-19 },
    btu: { name: "British Thermal Unit", symbol: "BTU", toJoule: 1055.06 },
    footPound: { name: "Foot-Pound", symbol: "ft·lbf", toJoule: 1.3558 }
  },
  Power: {
    watt: { name: "Watt", symbol: "W", toWatt: 1 },
    kilowatt: { name: "Kilowatt", symbol: "kW", toWatt: 1000 },
    megawatt: { name: "Megawatt", symbol: "MW", toWatt: 1000000 },
    horsepower: { name: "Horsepower", symbol: "hp", toWatt: 745.7 }
  },
  Speed: {
    meterPerSecond: { name: "Meter per Second", symbol: "m/s", toMps: 1 },
    kilometerPerHour: { name: "Kilometer per Hour", symbol: "km/h", toMps: 0.277778 },
    milePerHour: { name: "Mile per Hour", symbol: "mph", toMps: 0.44704 },
    knot: { name: "Knot", symbol: "kn", toMps: 0.514444 },
    footPerSecond: { name: "Foot per Second", symbol: "ft/s", toMps: 0.3048 }
  },
  Pressure: {
    pascal: { name: "Pascal", symbol: "Pa", toPascal: 1 },
    kilopascal: { name: "Kilopascal", symbol: "kPa", toPascal: 1000 },
    atmosphere: { name: "Atmosphere", symbol: "atm", toPascal: 101325 },
    bar: { name: "Bar", symbol: "bar", toPascal: 100000 },
    mmHg: { name: "Millimeter of Mercury", symbol: "mmHg", toPascal: 133.322 },
    psi: { name: "Pounds per Square Inch", symbol: "psi", toPascal: 6894.76 },
    torr: { name: "Torr", symbol: "Torr", toPascal: 133.322 }
  },
  Frequency: {
    hertz: { name: "Hertz", symbol: "Hz", toHertz: 1 },
    kilohertz: { name: "Kilohertz", symbol: "kHz", toHertz: 1000 },
    megahertz: { name: "Megahertz", symbol: "MHz", toHertz: 1000000 },
    gigahertz: { name: "Gigahertz", symbol: "GHz", toHertz: 1000000000 }
  },
  Area: {
    squareMeter: { name: "Square Meter", symbol: "m²", toSqMeter: 1 },
    squareKilometer: { name: "Square Kilometer", symbol: "km²", toSqMeter: 1000000 },
    squareCentimeter: { name: "Square Centimeter", symbol: "cm²", toSqMeter: 0.0001 },
    hectare: { name: "Hectare", symbol: "ha", toSqMeter: 10000 },
    squareFoot: { name: "Square Foot", symbol: "ft²", toSqMeter: 0.092903 },
    squareInch: { name: "Square Inch", symbol: "in²", toSqMeter: 0.00064516 },
    acre: { name: "Acre", symbol: "ac", toSqMeter: 4046.86 },
    squareMile: { name: "Square Mile", symbol: "mi²", toSqMeter: 2589988.11 },
    barn: { name: "Barn", symbol: "b", toSqMeter: 1e-28 }
  },
  Data: {
    bit: { name: "Bit", symbol: "bit", toByte: 0.125 },
    nibble: { name: "Nibble", symbol: "nibble", toByte: 0.5 },
    byte: { name: "Byte", symbol: "B", toByte: 1 },
    kilobyte: { name: "Kilobyte", symbol: "KB", toByte: 1024 },
    megabyte: { name: "Megabyte", symbol: "MB", toByte: 1048576 },
    gigabyte: { name: "Gigabyte", symbol: "GB", toByte: 1073741824 },
    terabyte: { name: "Terabyte", symbol: "TB", toByte: 1099511627776 }
  },
  Angle: {
    degree: { name: "Degree", symbol: "°", toDegree: 1 },
    radian: { name: "Radian", symbol: "rad", toDegree: 57.2958 },
    gradian: { name: "Gradian", symbol: "grad", toDegree: 0.9 },
    revolution: { name: "Revolution", symbol: "rev", toDegree: 360 },
    arcminute: { name: "Arcminute", symbol: "'", toDegree: 0.0166667 },
    arcsecond: { name: "Arcsecond", symbol: '"', toDegree: 0.000277778 }
  }
};

export const UnitConverter = () => {
  const [category, setCategory] = useState("Temperature");
  const [fromUnit, setFromUnit] = useState("celsius");
  const [toUnit, setToUnit] = useState("fahrenheit");
  const [fromValue, setFromValue] = useState("1");
  const [toValue, setToValue] = useState("");

  const convert = (value: string, from: string, to: string, cat: string) => {
    if (!value || isNaN(Number(value))) return "";
    
    const num = Number(value);
    const units = unitCategories[cat as keyof typeof unitCategories];
    
    if (cat === "Temperature") {
      return convertTemperature(num, from, to).toFixed(4);
    }
    
    // Map categories to their base conversion keys
    const baseKeyMap: Record<string, string> = {
      "Length": "toMeter",
      "Mass": "toKg", 
      "Time": "toSecond",
      "Volume": "toLiter",
      "Energy": "toJoule",
      "Power": "toWatt",
      "Speed": "toMps",
      "Pressure": "toPascal",
      "Frequency": "toHertz",
      "Area": "toSqMeter",
      "Data": "toByte",
      "Angle": "toDegree"
    };
    
    const baseKey = baseKeyMap[cat];
    if (!baseKey) return "";
    
    const fromBase = (units as any)[from][baseKey];
    const toBase = (units as any)[to][baseKey];
    
    if (!fromBase || !toBase) return "";
    
    const result = (num * fromBase) / toBase;
    return result.toFixed(6).replace(/\.?0+$/, "");
  };

  const convertTemperature = (value: number, from: string, to: string) => {
    if (from === to) return value;
    
    // Convert everything to Celsius first
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
      case "reaumur":
        celsius = value * 1.25;
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
      case "reaumur":
        return celsius * 0.8;
      default:
        return celsius; // assume celsius
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    const units = unitCategories[newCategory as keyof typeof unitCategories];
    const unitKeys = Object.keys(units);
    setFromUnit(unitKeys[0]);
    setToUnit(unitKeys[1] || unitKeys[0]);
    setFromValue("1");
    setToValue("");
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

  // Initialize conversion on load
  useEffect(() => {
    const result = convert(fromValue, fromUnit, toUnit, category);
    setToValue(result);
  }, []);

  // Update conversion when units change
  useEffect(() => {
    if (fromValue) {
      const result = convert(fromValue, fromUnit, toUnit, category);
      setToValue(result);
    }
  }, [fromUnit, toUnit, category]);

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
            <Select value={category} onValueChange={handleCategoryChange}>
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
            {category === "Temperature" && (
              <>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">Water freezes</div>
                  <div className="text-muted-foreground">0°C / 32°F</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">Water boils</div>
                  <div className="text-muted-foreground">100°C / 212°F</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">Room temp</div>
                  <div className="text-muted-foreground">20°C / 68°F</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">Absolute zero</div>
                  <div className="text-muted-foreground">-273.15°C / 0K</div>
                </div>
              </>
            )}
            {category === "Length" && (
              <>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 meter =</div>
                  <div className="text-muted-foreground">100 cm</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 inch =</div>
                  <div className="text-muted-foreground">2.54 cm</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 foot =</div>
                  <div className="text-muted-foreground">12 inches</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 mile =</div>
                  <div className="text-muted-foreground">1.609 km</div>
                </div>
              </>
            )}
            {category === "Mass" && (
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
                  <div className="font-medium">1 kg =</div>
                  <div className="text-muted-foreground">2.20 lbs</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 stone =</div>
                  <div className="text-muted-foreground">14 lbs</div>
                </div>
              </>
            )}
            {category === "Time" && (
              <>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 hour =</div>
                  <div className="text-muted-foreground">60 minutes</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 day =</div>
                  <div className="text-muted-foreground">24 hours</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 year =</div>
                  <div className="text-muted-foreground">365.25 days</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 week =</div>
                  <div className="text-muted-foreground">7 days</div>
                </div>
              </>
            )}
            {category === "Volume" && (
              <>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 liter =</div>
                  <div className="text-muted-foreground">1000 mL</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 gallon =</div>
                  <div className="text-muted-foreground">3.785 L</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 cup =</div>
                  <div className="text-muted-foreground">8 fl oz</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 quart =</div>
                  <div className="text-muted-foreground">2 pints</div>
                </div>
              </>
            )}
            {category === "Energy" && (
              <>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 cal =</div>
                  <div className="text-muted-foreground">4.184 J</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 kWh =</div>
                  <div className="text-muted-foreground">3.6 MJ</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 BTU =</div>
                  <div className="text-muted-foreground">1055 J</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 kcal =</div>
                  <div className="text-muted-foreground">4184 J</div>
                </div>
              </>
            )}
            {category === "Power" && (
              <>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 kW =</div>
                  <div className="text-muted-foreground">1000 W</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 hp =</div>
                  <div className="text-muted-foreground">745.7 W</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 MW =</div>
                  <div className="text-muted-foreground">1000 kW</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 W =</div>
                  <div className="text-muted-foreground">1 J/s</div>
                </div>
              </>
            )}
            {category === "Speed" && (
              <>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 m/s =</div>
                  <div className="text-muted-foreground">3.6 km/h</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 mph =</div>
                  <div className="text-muted-foreground">1.609 km/h</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 knot =</div>
                  <div className="text-muted-foreground">1.852 km/h</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">Speed of light</div>
                  <div className="text-muted-foreground">299,792,458 m/s</div>
                </div>
              </>
            )}
            {category === "Pressure" && (
              <>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 atm =</div>
                  <div className="text-muted-foreground">101.325 kPa</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 bar =</div>
                  <div className="text-muted-foreground">100 kPa</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 psi =</div>
                  <div className="text-muted-foreground">6.895 kPa</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 mmHg =</div>
                  <div className="text-muted-foreground">133.3 Pa</div>
                </div>
              </>
            )}
            {category === "Frequency" && (
              <>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 kHz =</div>
                  <div className="text-muted-foreground">1000 Hz</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 MHz =</div>
                  <div className="text-muted-foreground">1000 kHz</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 GHz =</div>
                  <div className="text-muted-foreground">1000 MHz</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">AM Radio</div>
                  <div className="text-muted-foreground">535-1705 kHz</div>
                </div>
              </>
            )}
            {category === "Area" && (
              <>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 hectare =</div>
                  <div className="text-muted-foreground">10,000 m²</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 acre =</div>
                  <div className="text-muted-foreground">4047 m²</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 ft² =</div>
                  <div className="text-muted-foreground">0.093 m²</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 mi² =</div>
                  <div className="text-muted-foreground">2.59 km²</div>
                </div>
              </>
            )}
            {category === "Data" && (
              <>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 Byte =</div>
                  <div className="text-muted-foreground">8 bits</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 KB =</div>
                  <div className="text-muted-foreground">1024 Bytes</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 MB =</div>
                  <div className="text-muted-foreground">1024 KB</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 GB =</div>
                  <div className="text-muted-foreground">1024 MB</div>
                </div>
              </>
            )}
            {category === "Angle" && (
              <>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 revolution =</div>
                  <div className="text-muted-foreground">360°</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1 radian =</div>
                  <div className="text-muted-foreground">57.3°</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">1° =</div>
                  <div className="text-muted-foreground">60 arcmin</div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="font-medium">π radians =</div>
                  <div className="text-muted-foreground">180°</div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};