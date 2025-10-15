import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Gauge } from 'lucide-react'

const pressureUnits = [
  { name: "Pascal", symbol: "Pa", factor: 1 },
  { name: "Kilopascal", symbol: "kPa", factor: 1000 },
  { name: "Bar", symbol: "bar", factor: 100000 },
  { name: "Pound per Square Inch", symbol: "psi", factor: 6894.76 },
  { name: "Standard Atmosphere", symbol: "atm", factor: 101325 },
  { name: "Torr", symbol: "Torr", factor: 133.322 },
  { name: "Millibar", symbol: "mbar", factor: 100 }
]

export const PressureConverter = () => {
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")
  const [fromUnit, setFromUnit] = useState("Pa")
  const [toUnit, setToUnit] = useState("bar")

  const convert = () => {
    const value = parseFloat(fromValue)
    if (isNaN(value)) {
      setToValue("")
      return
    }

    const fromFactor = pressureUnits.find(unit => unit.symbol === fromUnit)?.factor || 1
    const toFactor = pressureUnits.find(unit => unit.symbol === toUnit)?.factor || 1

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
          Pressure Converter
        </CardTitle>
        <CardDescription>
          Convert between different pressure units
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
                {pressureUnits.map((unit) => (
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
                {pressureUnits.map((unit) => (
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
            <p>• Sea level: 1 atm = 101.325 kPa = 1013.25 mbar</p>
            <p>• Car tire: ~32 psi = 2.2 bar</p>
            <p>• 1 bar = 100 kPa = 14.5 psi</p>
            <p>• 1 Torr = 1 mmHg</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
