import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Droplet } from 'lucide-react'
import * as math from 'mathjs'

const volumeUnits = [
  { name: "Liter", symbol: "L", factor: 1 },
  { name: "Milliliter", symbol: "mL", factor: 0.001 },
  { name: "Cubic Meter", symbol: "m³", factor: 1000 },
  { name: "Cubic Centimeter", symbol: "cm³", factor: 0.001 },
  { name: "Cubic Foot", symbol: "ft³", factor: 28.3168 },
  { name: "Cubic Inch", symbol: "in³", factor: 0.0163871 },
  { name: "US Liquid Gallon", symbol: "gal (US)", factor: 3.78541 },
  { name: "US Liquid Quart", symbol: "qt (US)", factor: 0.946353 },
  { name: "US Liquid Pint", symbol: "pt (US)", factor: 0.473176 },
  { name: "US Legal Cup", symbol: "cup (US)", factor: 0.236588 },
  { name: "US Fluid Ounce", symbol: "fl oz (US)", factor: 0.0295735 },
  { name: "US Tablespoon", symbol: "tbsp (US)", factor: 0.0147868 },
  { name: "US Teaspoon", symbol: "tsp (US)", factor: 0.00492892 },
  { name: "Imperial Gallon", symbol: "gal (UK)", factor: 4.54609 },
  { name: "Imperial Quart", symbol: "qt (UK)", factor: 1.13652 },
  { name: "Imperial Pint", symbol: "pt (UK)", factor: 0.568261 },
  { name: "Imperial Cup", symbol: "cup (UK)", factor: 0.284131 },
  { name: "Imperial Fluid Ounce", symbol: "fl oz (UK)", factor: 0.0284131 },
  { name: "Imperial Tablespoon", symbol: "tbsp (UK)", factor: 0.0177582 },
  { name: "Imperial Teaspoon", symbol: "tsp (UK)", factor: 0.00591939 }
]

export const VolumeConverter = () => {
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")
  const [fromUnit, setFromUnit] = useState("L")
  const [toUnit, setToUnit] = useState("gal")

  const convert = () => {
    const value = parseFloat(fromValue)
    if (isNaN(value)) {
      setToValue("")
      return
    }

    const fromFactor = volumeUnits.find(unit => unit.symbol === fromUnit)?.factor || 1
    const toFactor = volumeUnits.find(unit => unit.symbol === toUnit)?.factor || 1
    
    const baseValue = math.multiply(math.bignumber(value), math.bignumber(fromFactor))
    const finalResult = math.divide(baseValue, math.bignumber(toFactor))
    const result = Number(finalResult.toString())
    setToValue(result.toString())
  }

  useEffect(() => {
    convert()
  }, [fromValue, fromUnit, toUnit])

  const handleSwap = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setFromValue(toValue)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Droplet className="w-5 h-5" />
          Volume Converter
        </CardTitle>
        <CardDescription>
          Convert between different volume units like liters, gallons, cups
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="from-value">From</Label>
            <Input
              id="from-value"
              type="number"
              placeholder="Enter value"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
            />
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {volumeUnits.map((unit) => (
                  <SelectItem key={unit.symbol} value={unit.symbol}>
                    {unit.name} ({unit.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="to-value">To</Label>
            <Input
              id="to-value"
              type="number"
              placeholder="Result"
              value={toValue}
              readOnly
              className="bg-muted"
            />
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {volumeUnits.map((unit) => (
                  <SelectItem key={unit.symbol} value={unit.symbol}>
                    {unit.name} ({unit.symbol})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="outline" onClick={handleSwap} className="gap-2">
            <ArrowUpDown className="w-4 h-4" />
            Swap Units
          </Button>
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-2">Quick References</h3>
          <div className="text-sm space-y-1">
            <p>• 1 gallon (US) = 3.79 liters = 16 cups</p>
            <p>• 1 liter = 1000 mL = 33.8 fl oz (US)</p>
            <p>• 1 cup = 240 mL = 8 fl oz</p>
            <p>• 1 tablespoon = 15 mL = 3 teaspoons</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}