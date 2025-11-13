import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Flame } from 'lucide-react'
import { convertUnit, formatNumber } from '@/lib/mathUtils'

const energyUnits = [
  { name: "Joule", symbol: "J", factor: 1 },
  { name: "Kilojoule", symbol: "kJ", factor: 1000 },
  { name: "Gram Calorie", symbol: "cal", factor: 4.184 },
  { name: "Kilocalorie", symbol: "kcal", factor: 4184 },
  { name: "Watt Hour", symbol: "Wh", factor: 3600 },
  { name: "Kilowatt Hour", symbol: "kWh", factor: 3600000 },
  { name: "Electron Volt", symbol: "eV", factor: 1.60218e-19 },
  { name: "British Thermal Unit", symbol: "BTU", factor: 1055.06 },
  { name: "US Therm", symbol: "thm", factor: 105505600 },
  { name: "Foot-Pound", symbol: "ft⋅lb", factor: 1.35582 }
]

export const EnergyConverter = () => {
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")
  const [fromUnit, setFromUnit] = useState("kJ")
  const [toUnit, setToUnit] = useState("kcal")

  const convert = () => {
    const value = parseFloat(fromValue)
    if (isNaN(value)) {
      setToValue("")
      return
    }

    const fromFactor = energyUnits.find(unit => unit.symbol === fromUnit)?.factor || 1
    const toFactor = energyUnits.find(unit => unit.symbol === toUnit)?.factor || 1

    const result = convertUnit(value, fromFactor, toFactor)
    setToValue(formatNumber(result, 6))
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
          <Flame className="w-5 h-5" />
          Energy Converter
        </CardTitle>
        <CardDescription>
          Convert between different energy units
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
                {energyUnits.map((unit) => (
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
                {energyUnits.map((unit) => (
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
            <p>• 1 kWh = 3,600 kJ = 3.6 MJ</p>
            <p>• 1 kcal = 4.184 kJ = 1000 cal</p>
            <p>• 1 BTU = 1.055 kJ</p>
            <p>• Food energy: typically measured in kcal</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
