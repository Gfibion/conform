import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Circle } from 'lucide-react'

const angleUnits = [
  { name: "Degree", symbol: "°", factor: 1 },
  { name: "Radian", symbol: "rad", factor: 180 / Math.PI },
  { name: "Gradian", symbol: "grad", factor: 0.9 },
  { name: "Milliradian", symbol: "mrad", factor: 0.0572958 },
  { name: "Minute of Arc", symbol: "'", factor: 1 / 60 },
  { name: "Arcsecond", symbol: '"', factor: 1 / 3600 }
]

export const PlaneAngleConverter = () => {
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")
  const [fromUnit, setFromUnit] = useState("°")
  const [toUnit, setToUnit] = useState("rad")

  const convert = () => {
    const value = parseFloat(fromValue)
    if (isNaN(value)) {
      setToValue("")
      return
    }

    const fromFactor = angleUnits.find(unit => unit.symbol === fromUnit)?.factor || 1
    const toFactor = angleUnits.find(unit => unit.symbol === toUnit)?.factor || 1

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
          <Circle className="w-5 h-5" />
          Plane Angle Converter
        </CardTitle>
        <CardDescription>
          Convert between different angle measurement units
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
                {angleUnits.map((unit) => (
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
                {angleUnits.map((unit) => (
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
            <p>• Full circle: 360° = 2π rad = 400 grad</p>
            <p>• Right angle: 90° = π/2 rad</p>
            <p>• 1° = 60' = 3600"</p>
            <p>• π rad ≈ 3.14159 rad = 180°</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
