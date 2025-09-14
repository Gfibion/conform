import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Droplet } from 'lucide-react'

const volumeUnits = [
  { name: "Liter", symbol: "L", factor: 1 },
  { name: "Milliliter", symbol: "mL", factor: 0.001 },
  { name: "Cubic Meter", symbol: "m³", factor: 1000 },
  { name: "Cubic Centimeter", symbol: "cm³", factor: 0.001 },
  { name: "Gallon (US)", symbol: "gal", factor: 3.78541 },
  { name: "Quart (US)", symbol: "qt", factor: 0.946353 },
  { name: "Pint (US)", symbol: "pt", factor: 0.473176 },
  { name: "Cup (US)", symbol: "cup", factor: 0.236588 },
  { name: "Fluid Ounce (US)", symbol: "fl oz", factor: 0.0295735 },
  { name: "Tablespoon", symbol: "tbsp", factor: 0.0147868 },
  { name: "Teaspoon", symbol: "tsp", factor: 0.00492892 },
  { name: "Gallon (UK)", symbol: "gal UK", factor: 4.54609 },
  { name: "Pint (UK)", symbol: "pt UK", factor: 0.568261 }
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
    
    const result = (value * fromFactor) / toFactor
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