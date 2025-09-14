import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Settings, Copy, RefreshCw } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export const PasswordGenerator = () => {
  const [length, setLength] = useState([12])
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [excludeSimilar, setExcludeSimilar] = useState(false)
  const [password, setPassword] = useState("")
  const [strength, setStrength] = useState("")
  const { toast } = useToast()

  const generatePassword = () => {
    let charset = ""
    let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let lowercase = "abcdefghijklmnopqrstuvwxyz"
    let numbers = "0123456789"
    let symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    
    if (excludeSimilar) {
      uppercase = uppercase.replace(/[O]/g, "")
      lowercase = lowercase.replace(/[ol]/g, "")
      numbers = numbers.replace(/[01]/g, "")
      symbols = symbols.replace(/[|]/g, "")
    }

    if (includeUppercase) charset += uppercase
    if (includeLowercase) charset += lowercase
    if (includeNumbers) charset += numbers
    if (includeSymbols) charset += symbols

    if (!charset) {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive"
      })
      return
    }

    let result = ""
    for (let i = 0; i < length[0]; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }

    setPassword(result)
    calculateStrength(result)
  }

  const calculateStrength = (pwd: string) => {
    let score = 0
    if (pwd.length >= 8) score += 25
    if (pwd.length >= 12) score += 25
    if (/[a-z]/.test(pwd)) score += 10
    if (/[A-Z]/.test(pwd)) score += 10
    if (/[0-9]/.test(pwd)) score += 10
    if (/[^A-Za-z0-9]/.test(pwd)) score += 20

    if (score < 50) setStrength("Weak")
    else if (score < 75) setStrength("Medium")
    else setStrength("Strong")
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    toast({
      title: "Copied!",
      description: "Password copied to clipboard"
    })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Settings className="w-5 h-5" />
          Password Generator
        </CardTitle>
        <CardDescription>
          Generate secure passwords with custom criteria
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Password Length: {length[0]}</Label>
          <Slider
            value={length}
            onValueChange={setLength}
            min={4}
            max={128}
            step={1}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={includeUppercase}
              onCheckedChange={(checked) => setIncludeUppercase(!!checked)}
            />
            <Label>Uppercase (A-Z)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={includeLowercase}
              onCheckedChange={(checked) => setIncludeLowercase(!!checked)}
            />
            <Label>Lowercase (a-z)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={includeNumbers}
              onCheckedChange={(checked) => setIncludeNumbers(!!checked)}
            />
            <Label>Numbers (0-9)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={includeSymbols}
              onCheckedChange={(checked) => setIncludeSymbols(!!checked)}
            />
            <Label>Symbols (!@#$)</Label>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            checked={excludeSimilar}
            onCheckedChange={(checked) => setExcludeSimilar(!!checked)}
          />
          <Label>Exclude similar characters (0, O, l, 1, |)</Label>
        </div>

        <Button onClick={generatePassword} className="w-full gap-2">
          <RefreshCw className="w-4 h-4" />
          Generate Password
        </Button>

        {password && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Input
                value={password}
                readOnly
                className="font-mono"
              />
              <Button onClick={copyToClipboard} size="icon" variant="outline">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Strength:</span>
              <Badge variant={
                strength === "Strong" ? "default" : 
                strength === "Medium" ? "secondary" : "destructive"
              }>
                {strength}
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}