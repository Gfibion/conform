import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, HardDrive } from 'lucide-react'

const storageUnits = [
  { name: "Bit", symbol: "bit", factor: 1 },
  { name: "Kilobit", symbol: "kbit", factor: 1000 },
  { name: "Kibibit", symbol: "Kibit", factor: 1024 },
  { name: "Megabit", symbol: "Mbit", factor: 1000000 },
  { name: "Mebibit", symbol: "Mibit", factor: 1048576 },
  { name: "Gigabit", symbol: "Gbit", factor: 1000000000 },
  { name: "Gibibit", symbol: "Gibit", factor: 1073741824 },
  { name: "Terabit", symbol: "Tbit", factor: 1000000000000 },
  { name: "Tebibit", symbol: "Tibit", factor: 1099511627776 },
  { name: "Petabit", symbol: "Pbit", factor: 1000000000000000 },
  { name: "Pebibit", symbol: "Pibit", factor: 1125899906842624 },
  { name: "Byte", symbol: "B", factor: 8 },
  { name: "Kilobyte", symbol: "kB", factor: 8000 },
  { name: "Kibibyte", symbol: "KiB", factor: 8192 },
  { name: "Megabyte", symbol: "MB", factor: 8000000 },
  { name: "Mebibyte", symbol: "MiB", factor: 8388608 },
  { name: "Gigabyte", symbol: "GB", factor: 8000000000 },
  { name: "Gibibyte", symbol: "GiB", factor: 8589934592 },
  { name: "Terabyte", symbol: "TB", factor: 8000000000000 },
  { name: "Tebibyte", symbol: "TiB", factor: 8796093022208 }
]

export const DigitalStorageConverter = () => {
  const [fromValue, setFromValue] = useState("")
  const [toValue, setToValue] = useState("")
  const [fromUnit, setFromUnit] = useState("GB")
  const [toUnit, setToUnit] = useState("MB")

  const convert = () => {
    const value = parseFloat(fromValue)
    if (isNaN(value)) {
      setToValue("")
      return
    }

    const fromFactor = storageUnits.find(unit => unit.symbol === fromUnit)?.factor || 1
    const toFactor = storageUnits.find(unit => unit.symbol === toUnit)?.factor || 1

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
          <HardDrive className="w-5 h-5" />
          Digital Storage Converter
        </CardTitle>
        <CardDescription>
          Convert between different digital storage units
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
                {storageUnits.map((unit) => (
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
                {storageUnits.map((unit) => (
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
            <p>• 1 GB = 1000 MB (decimal) or 1024 MiB (binary)</p>
            <p>• 1 TB = 1000 GB = 1,000,000 MB</p>
            <p>• 8 bits = 1 byte</p>
            <p>• 1 GiB = 1.074 GB</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
