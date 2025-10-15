import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftRight, Copy, ChevronDown, ChevronUp, Info } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface Unit {
  value: string;
  label: string;
  symbol: string;
  factor: number;
}

const lengthUnits: Unit[] = [
  { value: 'meter', label: 'Meter', symbol: 'm', factor: 1 },
  { value: 'kilometer', label: 'Kilometer', symbol: 'km', factor: 1000 },
  { value: 'centimeter', label: 'Centimeter', symbol: 'cm', factor: 0.01 },
  { value: 'millimeter', label: 'Millimeter', symbol: 'mm', factor: 0.001 },
  { value: 'micrometer', label: 'Micrometer', symbol: 'µm', factor: 0.000001 },
  { value: 'nanometer', label: 'Nanometer', symbol: 'nm', factor: 0.000000001 },
  { value: 'mile', label: 'Mile', symbol: 'mi', factor: 1609.34 },
  { value: 'yard', label: 'Yard', symbol: 'yd', factor: 0.9144 },
  { value: 'foot', label: 'Foot', symbol: 'ft', factor: 0.3048 },
  { value: 'inch', label: 'Inch', symbol: 'in', factor: 0.0254 },
  { value: 'nautical-mile', label: 'Nautical Mile', symbol: 'nmi', factor: 1852 },
];

const quickConversions = [
  { from: 'meter', to: 'foot', label: 'm → ft' },
  { from: 'kilometer', to: 'mile', label: 'km → mi' },
  { from: 'inch', to: 'centimeter', label: 'in → cm' },
  { from: 'foot', to: 'meter', label: 'ft → m' },
];

export const LengthConverter = () => {
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('foot');
  const [result, setResult] = useState('');
  const [precision, setPrecision] = useState(2);
  const [useSignificantFigures, setUseSignificantFigures] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    convert();
  }, [inputValue, fromUnit, toUnit, precision, useSignificantFigures]);

  const convert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult('');
      return;
    }

    const from = lengthUnits.find(u => u.value === fromUnit);
    const to = lengthUnits.find(u => u.value === toUnit);

    if (from && to) {
      const convertedValue = (value * from.factor) / to.factor;
      let formatted: string;
      
      if (useSignificantFigures) {
        formatted = convertedValue.toPrecision(precision);
      } else {
        formatted = convertedValue.toFixed(precision);
      }
      
      setResult(formatted);
    }
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setInputValue(result || '0');
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast({
        title: "Copied!",
        description: "Result copied to clipboard",
      });
    }
  };

  const applyQuickConversion = (from: string, to: string) => {
    setFromUnit(from);
    setToUnit(to);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Length Converter</CardTitle>
        <CardDescription>Convert between units quickly — supports SI and imperial units</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Primary Input */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Enter value or expression (e.g., "5 ft, 3 m + 20 cm")</Label>
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter value"
            className="text-lg h-12"
          />
        </div>

        {/* From and To Units */}
        <div className="flex gap-3 items-end">
          <div className="flex-1 space-y-2">
            <Label className="text-sm font-medium">From</Label>
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
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={handleSwap}
            className="shrink-0"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>

          <div className="flex-1 space-y-2">
            <Label className="text-sm font-medium">To</Label>
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
          </div>
        </div>

        {/* Quick Conversions */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Quick conversions:</Label>
          <div className="flex flex-wrap gap-2">
            {quickConversions.map((qc) => (
              <Button
                key={qc.label}
                variant="outline"
                size="sm"
                onClick={() => applyQuickConversion(qc.from, qc.to)}
                className="text-xs"
              >
                {qc.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Advanced Options */}
        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between">
              <span className="text-sm font-medium">Advanced Options</span>
              {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4 p-4 border rounded-lg">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Precision: {precision}</Label>
                <span className="text-sm text-muted-foreground">{useSignificantFigures ? 'sig figs' : 'decimals'}</span>
              </div>
              <Slider
                value={[precision]}
                onValueChange={(vals) => setPrecision(vals[0])}
                min={0}
                max={10}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="sig-figs" className="text-sm">Use Significant Figures</Label>
              <Switch
                id="sig-figs"
                checked={useSignificantFigures}
                onCheckedChange={setUseSignificantFigures}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Result Display */}
        {result && (
          <div className="space-y-3">
            <div className="p-4 bg-muted/50 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Result</Label>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={copyResult}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowSteps(!showSteps)}
                  >
                    <Info className="h-4 w-4 mr-2" />
                    {showSteps ? 'Hide' : 'Show'} steps
                  </Button>
                </div>
              </div>
              <div className="text-2xl font-bold text-primary break-all">
                {result}
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                {inputValue} {lengthUnits.find(u => u.value === fromUnit)?.symbol} = {result} {lengthUnits.find(u => u.value === toUnit)?.symbol}
              </p>
              
              {showSteps && (
                <div className="mt-4 p-3 bg-muted/30 rounded text-xs space-y-1">
                  <p className="font-medium">Conversion formula:</p>
                  <p>1. Convert {inputValue} {lengthUnits.find(u => u.value === fromUnit)?.label} to meters</p>
                  <p className="ml-3">= {inputValue} × {lengthUnits.find(u => u.value === fromUnit)?.factor} = {(parseFloat(inputValue) * (lengthUnits.find(u => u.value === fromUnit)?.factor || 1)).toFixed(6)} m</p>
                  <p>2. Convert meters to {lengthUnits.find(u => u.value === toUnit)?.label}</p>
                  <p className="ml-3">= {(parseFloat(inputValue) * (lengthUnits.find(u => u.value === fromUnit)?.factor || 1)).toFixed(6)} ÷ {lengthUnits.find(u => u.value === toUnit)?.factor} = {result} {lengthUnits.find(u => u.value === toUnit)?.symbol}</p>
                </div>
              )}
            </div>
            
            {/* Also see conversions */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Also see:</Label>
              <div className="flex flex-wrap gap-2">
                {lengthUnits
                  .filter(u => u.value !== toUnit)
                  .slice(0, 4)
                  .map(unit => {
                    const value = parseFloat(inputValue);
                    if (isNaN(value)) return null;
                    const from = lengthUnits.find(u => u.value === fromUnit);
                    if (!from) return null;
                    const converted = ((value * from.factor) / unit.factor).toFixed(2);
                    return (
                      <Badge key={unit.value} variant="outline" className="text-xs">
                        {converted} {unit.symbol}
                      </Badge>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
