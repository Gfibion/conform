import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Database, Check, X } from 'lucide-react'

export const JSONFormatter = () => {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [error, setError] = useState("")

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setIsValid(true)
      setError("")
    } catch (err) {
      setIsValid(false)
      setError(err instanceof Error ? err.message : "Invalid JSON")
      setOutput("")
    }
  }

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setIsValid(true)
      setError("")
    } catch (err) {
      setIsValid(false)
      setError(err instanceof Error ? err.message : "Invalid JSON")
      setOutput("")
    }
  }

  const validateJSON = () => {
    try {
      JSON.parse(input)
      setIsValid(true)
      setError("")
    } catch (err) {
      setIsValid(false)
      setError(err instanceof Error ? err.message : "Invalid JSON")
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Database className="w-5 h-5" />
          JSON Formatter & Validator
        </CardTitle>
        <CardDescription>
          Format, validate, and minify JSON data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="json-input">JSON Input</Label>
          <Textarea
            id="json-input"
            placeholder="Paste your JSON here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-40 font-mono text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={formatJSON} disabled={!input}>
            Format JSON
          </Button>
          <Button onClick={minifyJSON} variant="outline" disabled={!input}>
            Minify JSON
          </Button>
          <Button onClick={validateJSON} variant="outline" disabled={!input}>
            Validate Only
          </Button>
        </div>

        {isValid !== null && (
          <div className="flex items-center gap-2">
            {isValid ? (
              <Badge variant="default" className="bg-green-500">
                <Check className="w-3 h-3 mr-1" />
                Valid JSON
              </Badge>
            ) : (
              <Badge variant="destructive">
                <X className="w-3 h-3 mr-1" />
                Invalid JSON
              </Badge>
            )}
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {output && (
          <div className="space-y-2">
            <Label htmlFor="json-output">Formatted Output</Label>
            <Textarea
              id="json-output"
              value={output}
              readOnly
              className="min-h-40 font-mono text-sm bg-muted"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}