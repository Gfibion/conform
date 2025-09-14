import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Gauge } from 'lucide-react'

const speedUnits = [
  { name: "Meters per Second", symbol: "m/s", factor: 1 },
  { name: "Kilometers per Hour", symbol: "km/h", factor: 0.277778 },
  { name: "Miles per Hour", symbol: "mph", factor: 0.44704 },
  { name: "Feet per Second", symbol: "ft/s", factor: 0.3048 },
  { name: "Knots", symbol: "kn", factor: 0.514444 },
  { name: "Mach", symbol: "Ma", factor: 343 },
  { name: "Speed of Light", symbol: "c", factor: 299792458 }
]

export const SpeedConverter = () => {
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")
  const [fromUnit, setFromUnit] = useState("km/h")
  const [toUnit, setToUnit] = useState("mph")

  const convert = () => {
    const value = parseFloat(fromValue)
    if (isNaN(value)) {
      setToValue("")
      return
    }

    const fromFactor = speedUnits.find(unit => unit.symbol === fromUnit)?.factor || 1
    const toFactor = speedUnits.find(unit => unit.symbol === toUnit)?.factor || 1
    
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
          <Gauge className="w-5 h-5" />
          Speed Converter
        </CardTitle>
        <CardDescription>
          Convert between different speed units like km/h, mph, m/s
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
                {speedUnits.map((unit) => (
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
                {speedUnits.map((unit) => (
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
            <p>• 100 km/h = 62.1 mph = 27.8 m/s</p>
            <p>• Speed of sound = 343 m/s = Mach 1</p>
            <p>• 1 knot = 1.85 km/h = 1.15 mph</p>
            <p>• Highway speed limit: ~65 mph = 105 km/h</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}