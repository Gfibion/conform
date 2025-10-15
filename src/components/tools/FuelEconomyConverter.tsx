import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Fuel } from 'lucide-react'

const fuelEconomyUnits = [
  { name: "Kilometers per Liter", symbol: "km/L", factor: 1, inverse: false },
  { name: "Miles per US Gallon", symbol: "mpg (US)", factor: 2.35215, inverse: false },
  { name: "Miles per Imperial Gallon", symbol: "mpg (UK)", factor: 2.82481, inverse: false },
  { name: "Liters per 100 km", symbol: "L/100km", factor: 100, inverse: true }
]

export const FuelEconomyConverter = () => {
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")
  const [fromUnit, setFromUnit] = useState("km/L")
  const [toUnit, setToUnit] = useState("mpg (US)")

  const convert = () => {
    const value = parseFloat(fromValue)
    if (isNaN(value) || value === 0) {
      setToValue("")
      return
    }

    const fromUnitData = fuelEconomyUnits.find(unit => unit.symbol === fromUnit)
    const toUnitData = fuelEconomyUnits.find(unit => unit.symbol === toUnit)

    if (fromUnitData && toUnitData) {
      let result: number

      if (fromUnitData.inverse === toUnitData.inverse) {
        result = (value * fromUnitData.factor) / toUnitData.factor
      } else {
        if (fromUnitData.inverse) {
          const kmPerL = fromUnitData.factor / value
          result = (kmPerL * toUnitData.factor)
        } else {
          const kmPerL = (value / fromUnitData.factor)
          result = toUnitData.factor / kmPerL
        }
      }

      setToValue(result.toString())
    }
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
          <Fuel className="w-5 h-5" />
          Fuel Economy Converter
        </CardTitle>
        <CardDescription>
          Convert between different fuel economy units
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
                {fuelEconomyUnits.map((unit) => (
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
                {fuelEconomyUnits.map((unit) => (
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
            <p>• 30 mpg (US) = 12.75 km/L = 7.84 L/100km</p>
            <p>• Good fuel economy: 40+ mpg (US)</p>
            <p>• Excellent: 50+ mpg (US) or 5 L/100km</p>
            <p>• Imperial gallon is 20% larger than US gallon</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
