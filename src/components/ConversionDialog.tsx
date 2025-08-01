
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useConversions } from '@/hooks/useConversions'
import { Loader2 } from 'lucide-react'

interface ConversionDialogProps {
  isOpen: boolean
  onClose: () => void
  tool: {
    title: string
    category: string
  }
}

export const ConversionDialog = ({ isOpen, onClose, tool }: ConversionDialogProps) => {
  const { convertFile, isLoading } = useConversions()
  const [inputData, setInputData] = useState<any>({})
  const [result, setResult] = useState<any>(null)

  const getConversionType = (title: string): string => {
    const typeMap: { [key: string]: string } = {
      'Text Case Converter': 'text_case',
      'Word Counter': 'text_count',
      'Base64 Encoder/Decoder': 'base64_encode',
      'URL Encoder/Decoder': 'url_encode',
      'Hash Generator': 'hash_generate',
      'QR Code Generator': 'qr_generate',
      'Color Converter': 'color_convert',
      // Add more mappings as needed
    }
    return typeMap[title] || 'generic_conversion'
  }

  const handleConvert = async () => {
    const conversionType = getConversionType(tool.title)
    const response = await convertFile({
      conversion_type: conversionType,
      input_data: inputData
    })

    if (response?.result) {
      setResult(response.result)
    }
  }

  const renderInputFields = () => {
    const conversionType = getConversionType(tool.title)

    switch (conversionType) {
      case 'text_case':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Text to convert</Label>
              <Textarea
                id="text"
                placeholder="Enter text here..."
                value={inputData.text || ''}
                onChange={(e) => setInputData({ ...inputData, text: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="case_type">Case Type</Label>
              <Select value={inputData.case_type || ''} onValueChange={(value) => setInputData({ ...inputData, case_type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select case type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uppercase">UPPERCASE</SelectItem>
                  <SelectItem value="lowercase">lowercase</SelectItem>
                  <SelectItem value="title">Title Case</SelectItem>
                  <SelectItem value="sentence">Sentence case</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 'text_count':
        return (
          <div>
            <Label htmlFor="text">Text to analyze</Label>
            <Textarea
              id="text"
              placeholder="Enter text to count words, characters, etc..."
              value={inputData.text || ''}
              onChange={(e) => setInputData({ ...inputData, text: e.target.value })}
            />
          </div>
        )

      case 'base64_encode':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Text to encode/decode</Label>
              <Textarea
                id="text"
                placeholder="Enter text here..."
                value={inputData.text || ''}
                onChange={(e) => setInputData({ ...inputData, text: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="operation">Operation</Label>
              <Select value={inputData.operation || 'encode'} onValueChange={(value) => setInputData({ ...inputData, operation: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select operation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="encode">Encode</SelectItem>
                  <SelectItem value="decode">Decode</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 'hash_generate':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Text to hash</Label>
              <Textarea
                id="text"
                placeholder="Enter text to generate hash..."
                value={inputData.text || ''}
                onChange={(e) => setInputData({ ...inputData, text: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="hash_type">Hash Type</Label>
              <Select value={inputData.hash_type || 'sha256'} onValueChange={(value) => setInputData({ ...inputData, hash_type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select hash type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sha1">SHA-1</SelectItem>
                  <SelectItem value="sha256">SHA-256</SelectItem>
                  <SelectItem value="sha512">SHA-512</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 'qr_generate':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Text/URL for QR Code</Label>
              <Input
                id="text"
                placeholder="Enter text or URL..."
                value={inputData.text || ''}
                onChange={(e) => setInputData({ ...inputData, text: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="size">Size (pixels)</Label>
              <Input
                id="size"
                type="number"
                placeholder="200"
                value={inputData.size || 200}
                onChange={(e) => setInputData({ ...inputData, size: parseInt(e.target.value) })}
              />
            </div>
          </div>
        )

      default:
        return (
          <div>
            <Label htmlFor="input">Input</Label>
            <Textarea
              id="input"
              placeholder="Enter your input..."
              value={inputData.input || ''}
              onChange={(e) => setInputData({ ...inputData, input: e.target.value })}
            />
          </div>
        )
    }
  }

  const renderResult = () => {
    if (!result) return null

    const conversionType = getConversionType(tool.title)

    switch (conversionType) {
      case 'text_count':
        return (
          <div className="space-y-2 bg-muted p-4 rounded-lg">
            <h4 className="font-medium">Text Statistics:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Characters: {result.characters}</div>
              <div>Characters (no spaces): {result.characters_no_spaces}</div>
              <div>Words: {result.words}</div>
              <div>Sentences: {result.sentences}</div>
              <div>Paragraphs: {result.paragraphs}</div>
            </div>
          </div>
        )

      case 'qr_generate':
        return (
          <div className="space-y-2 bg-muted p-4 rounded-lg">
            <h4 className="font-medium">Generated QR Code:</h4>
            <img src={result.qr_code_url} alt="Generated QR Code" className="mx-auto" />
            <p className="text-sm text-center">Text: {result.text}</p>
          </div>
        )

      default:
        return (
          <div className="bg-muted p-4 rounded-lg">
            <Label>Result:</Label>
            <Textarea
              value={typeof result.result === 'string' ? result.result : JSON.stringify(result, null, 2)}
              readOnly
              className="mt-2"
            />
          </div>
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{tool.title}</DialogTitle>
          <DialogDescription>
            {tool.category} - Enter your input and click convert to process
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {renderInputFields()}

          <div className="flex gap-2">
            <Button 
              onClick={handleConvert} 
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Convert
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>

          {renderResult()}
        </div>
      </DialogContent>
    </Dialog>
  )
}
