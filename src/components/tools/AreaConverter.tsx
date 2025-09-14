import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, MapPin } from 'lucide-react'

const areaUnits = [
  { name: "Square Meter", symbol: "m²", factor: 1 },
  { name: "Square Kilometer", symbol: "km²", factor: 1000000 },
  { name: "Square Centimeter", symbol: "cm²", factor: 0.0001 },
  { name: "Square Millimeter", symbol: "mm²", factor: 0.000001 },
  { name: "Square Inch", symbol: "in²", factor: 0.00064516 },
  { name: "Square Foot", symbol: "ft²", factor: 0.092903 },
  { name: "Square Yard", symbol: "yd²", factor: 0.836127 },
  { name: "Square Mile", symbol: "mi²", factor: 2589988.11 },
  { name: "Acre", symbol: "ac", factor: 4046.86 },
  { name: "Hectare", symbol: "ha", factor: 10000 }
]

export const AreaConverter = () => {
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")
  const [fromUnit, setFromUnit] = useState("m²")
  const [toUnit, setToUnit] = useState("ft²")

  const convert = () => {
    const value = parseFloat(fromValue)
    if (isNaN(value)) {
      setToValue("")
      return
    }

    const fromFactor = areaUnits.find(unit => unit.symbol === fromUnit)?.factor || 1
    const toFactor = areaUnits.find(unit => unit.symbol === toUnit)?.factor || 1
    
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
          <MapPin className="w-5 h-5" />
          Area Converter
        </CardTitle>
        <CardDescription>
          Convert between different area units like square meters, acres, hectares
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
                {areaUnits.map((unit) => (
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
                {areaUnits.map((unit) => (
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
            <p>• 1 hectare = 10,000 m² = 2.47 acres</p>
            <p>• 1 acre = 4,047 m² = 43,560 ft²</p>
            <p>• 1 km² = 100 hectares = 247 acres</p>
            <p>• 1 ft² = 144 in² = 0.093 m²</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}