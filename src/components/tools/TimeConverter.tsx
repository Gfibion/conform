
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Clock } from "lucide-react";

const timeUnits = [
  { value: "nanosecond", label: "Nanosecond", symbol: "ns", factor: 0.000000001 },
  { value: "microsecond", label: "Microsecond", symbol: "µs", factor: 0.000001 },
  { value: "millisecond", label: "Millisecond", symbol: "ms", factor: 0.001 },
  { value: "second", label: "Second", symbol: "s", factor: 1 },
  { value: "minute", label: "Minute", symbol: "min", factor: 60 },
  { value: "hour", label: "Hour", symbol: "h", factor: 3600 },
  { value: "day", label: "Day", symbol: "d", factor: 86400 },
  { value: "week", label: "Week", symbol: "wk", factor: 604800 },
  { value: "month", label: "Month", symbol: "mo", factor: 2629746 },
  { value: "year", label: "Year", symbol: "yr", factor: 31556952 },
  { value: "decade", label: "Decade", symbol: "dec", factor: 315569520 },
  { value: "century", label: "Century", symbol: "c", factor: 3155695200 }
];

export const TimeConverter = () => {
  const [fromValue, setFromValue] = useState("1");
  const [toValue, setToValue] = useState("");
  const [fromUnit, setFromUnit] = useState("hour");
  const [toUnit, setToUnit] = useState("minute");

  const convert = () => {
    const inputValue = parseFloat(fromValue);
    if (isNaN(inputValue)) return;

    const fromUnitData = timeUnits.find(u => u.value === fromUnit);
    const toUnitData = timeUnits.find(u => u.value === toUnit);
    
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
          <Clock className="w-5 h-5" />
          Time Converter
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
                {timeUnits.map((unit) => (
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
              placeholder="Enter time"
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
                {timeUnits.map((unit) => (
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
              {fromValue} {timeUnits.find(u => u.value === fromUnit)?.symbol} = {toValue} {timeUnits.find(u => u.value === toUnit)?.symbol}
            </p>
          </div>
        )}

        {/* Common Conversions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            ["hour", "minute"], ["day", "hour"], ["week", "day"], ["minute", "second"]
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

        {/* Reference Times */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="font-medium mb-2">Common Time References</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>1 minute = 60 seconds</div>
            <div>1 hour = 60 minutes</div>
            <div>1 day = 24 hours</div>
            <div>1 week = 7 days</div>
            <div>1 year ≈ 365.25 days</div>
            <div>1 month ≈ 30.44 days</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
