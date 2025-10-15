import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, Network } from 'lucide-react'

const dataTransferUnits = [
  { name: "Bit per second", symbol: "bit/s", factor: 1 },
  { name: "Kilobit per second", symbol: "kbit/s", factor: 1000 },
  { name: "Kibibit per second", symbol: "Kibit/s", factor: 1024 },
  { name: "Kilobyte per second", symbol: "kB/s", factor: 8000 },
  { name: "Megabit per second", symbol: "Mbit/s", factor: 1000000 },
  { name: "Mebibit per second", symbol: "Mibit/s", factor: 1048576 },
  { name: "Megabyte per second", symbol: "MB/s", factor: 8000000 },
  { name: "Gigabit per second", symbol: "Gbit/s", factor: 1000000000 },
  { name: "Gibibit per second", symbol: "Gibit/s", factor: 1073741824 },
  { name: "Gigabyte per second", symbol: "GB/s", factor: 8000000000 },
  { name: "Terabit per second", symbol: "Tbit/s", factor: 1000000000000 },
  { name: "Tebibit per second", symbol: "Tibit/s", factor: 1099511627776 },
  { name: "Terabyte per second", symbol: "TB/s", factor: 8000000000000 }
]

export const DataTransferRateConverter = () => {
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")
  const [fromUnit, setFromUnit] = useState("Mbit/s")
  const [toUnit, setToUnit] = useState("MB/s")

  const convert = () => {
    const value = parseFloat(fromValue)
    if (isNaN(value)) {
      setToValue("")
      return
    }

    const fromFactor = dataTransferUnits.find(unit => unit.symbol === fromUnit)?.factor || 1
    const toFactor = dataTransferUnits.find(unit => unit.symbol === toUnit)?.factor || 1

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
          <Network className="w-5 h-5" />
          Data Transfer Rate Converter
        </CardTitle>
        <CardDescription>
          Convert between data transfer and network speed units
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
                {dataTransferUnits.map((unit) => (
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
                {dataTransferUnits.map((unit) => (
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
            <p>• 100 Mbit/s = 12.5 MB/s</p>
            <p>• 1 Gbit/s = 1000 Mbit/s = 125 MB/s</p>
            <p>• 8 bits = 1 byte</p>
            <p>• Fast home internet: 100-1000 Mbit/s</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
