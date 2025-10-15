import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Zap } from 'lucide-react'

const electricityUnits = [
  { name: "Watt", symbol: "W", factor: 1 },
  { name: "Kilowatt", symbol: "kW", factor: 1000 },
  { name: "Megawatt", symbol: "MW", factor: 1000000 },
  { name: "Gigawatt", symbol: "GW", factor: 1000000000 },
  { name: "Horsepower (Metric)", symbol: "hp", factor: 735.499 },
  { name: "Horsepower (Imperial)", symbol: "hp (UK)", factor: 745.7 },
  { name: "BTU/hour", symbol: "BTU/h", factor: 0.293071 },
  { name: "Calorie/second", symbol: "cal/s", factor: 4.184 },
  { name: "Volt-Ampere", symbol: "VA", factor: 1 }
]

export const ElectricityConverter = () => {
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")
  const [fromUnit, setFromUnit] = useState("W")
  const [toUnit, setToUnit] = useState("kW")

  const convert = () => {
    const value = parseFloat(fromValue)
    if (isNaN(value)) {
      setToValue("")
      return
    }

    const fromFactor = electricityUnits.find(unit => unit.symbol === fromUnit)?.factor || 1
    const toFactor = electricityUnits.find(unit => unit.symbol === toUnit)?.factor || 1

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
          <Zap className="w-5 h-5" />
          Electricity Converter
        </CardTitle>
        <CardDescription>
          Convert between different power and electricity units
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
                {electricityUnits.map((unit) => (
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
                {electricityUnits.map((unit) => (
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
            <p>• 1 kW = 1000 W = 1.34 hp</p>
            <p>• 1 hp = 745.7 W = 0.746 kW</p>
            <p>• 1 MW = 1000 kW = 1,341 hp</p>
            <p>• Typical home usage: 1-5 kW</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
