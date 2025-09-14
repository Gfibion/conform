import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useConversions } from '@/hooks/useConversions'
import { Loader2, Upload, FileText } from 'lucide-react'

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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const getConversionType = (title: string): string => {
    const typeMap: { [key: string]: string } = {
      // Text Tools
      'Text Case Converter': 'text_case',
      'Word Counter': 'text_count',
      'Text Difference Checker': 'text_diff',
      'Lorem Ipsum Generator': 'lorem_generate',
      'Markdown to HTML': 'markdown_to_html',
      
      // Developer Tools
      'Base64 Encoder/Decoder': 'base64_encode',
      'URL Encoder/Decoder': 'url_encode',
      'Hash Generator': 'hash_generate',
      'QR Code Generator': 'qr_generate',
      'JSON Formatter': 'json_format',
      'Password Generator': 'password_generate',
      'Regular Expression Tester': 'regex_test',
      'CSS Minifier': 'css_minify',
      'JavaScript Minifier': 'js_minify',
      'HTML Encoder/Decoder': 'html_encode',
      
      // Color Tools
      'Color Converter': 'color_convert',
      'Color Palette Generator': 'color_palette',
      'Gradient Generator': 'gradient_generate',
      
      // PDF Tools
      'PDF Compress': 'pdf_compress',
      'PDF Merge': 'pdf_merge',
      'PDF Split': 'pdf_split',
      'PDF to Word': 'pdf_to_word',
      'PDF to Excel': 'pdf_to_excel',
      'PDF to PowerPoint': 'pdf_to_powerpoint',
      'PDF to Image': 'pdf_to_image',
      'Word to PDF': 'word_to_pdf',
      'Excel to PDF': 'excel_to_pdf',
      'PowerPoint to PDF': 'powerpoint_to_pdf',
      
      // Image Tools
      'Image Compressor': 'image_compress',
      'Image Resizer': 'image_resize',
      'Image Format Converter': 'image_format_convert',
      'Image Cropper': 'image_crop',
      'Image Rotator': 'image_rotate',
      'Image Flipper': 'image_flip',
      'Watermark Adder': 'watermark_add',
      'Background Remover': 'background_remove',
      
      // Unit Converters
      'Length Converter': 'length_convert',
      'Weight Converter': 'weight_convert',
      'Temperature Converter': 'temperature_convert',
      'Currency Converter': 'currency_convert',
      'Time Zone Converter': 'timezone_convert',
      'Area Converter': 'area_convert',
      'Volume Converter': 'volume_convert',
      'Speed Converter': 'speed_convert',
      
      // AI Tools
      'AI Text Summarizer': 'ai_summarize',
      'AI Code Generator': 'ai_code_generate',
      'AI Paraphraser': 'ai_paraphrase',
      'AI Grammar Checker': 'ai_grammar_check',
    }
    return typeMap[title] || 'generic_conversion'
  }

  const handleConvert = async () => {
    const conversionType = getConversionType(tool.title)
    let fileData = null
    
    if (uploadedFile) {
      const reader = new FileReader()
      fileData = await new Promise((resolve) => {
        reader.onload = (e) => resolve(e.target?.result as string)
        reader.readAsDataURL(uploadedFile)
      })
    }

    const response = await convertFile({
      conversion_type: conversionType,
      input_data: inputData,
      file_data: fileData,
      file_name: uploadedFile?.name
    })

    if (response?.result) {
      setResult(response.result)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const renderInputFields = () => {
    const conversionType = getConversionType(tool.title)

    switch (conversionType) {
      case 'text_case':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Text to convert case</Label>
              <Textarea
                id="text"
                placeholder="Type or paste your text here to change its case..."
                value={inputData.text || ''}
                onChange={(e) => setInputData({ ...inputData, text: e.target.value })}
                className="min-h-32"
              />
            </div>
            <div>
              <Label htmlFor="case_type">Convert to</Label>
              <Select value={inputData.case_type || ''} onValueChange={(value) => setInputData({ ...inputData, case_type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose case style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uppercase">UPPERCASE (ALL CAPS)</SelectItem>
                  <SelectItem value="lowercase">lowercase (all small)</SelectItem>
                  <SelectItem value="title">Title Case (First Letter Capital)</SelectItem>
                  <SelectItem value="sentence">Sentence case (First word capital)</SelectItem>
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
              placeholder="Paste your text here to get detailed statistics including word count, character count, sentences, and paragraphs..."
              value={inputData.text || ''}
              onChange={(e) => setInputData({ ...inputData, text: e.target.value })}
              className="min-h-40"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Real-time analysis will show: characters, words, sentences, and paragraphs
            </p>
          </div>
        )

      case 'base64_encode':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="operation">Operation</Label>
              <Select value={inputData.operation || 'encode'} onValueChange={(value) => setInputData({ ...inputData, operation: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose operation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="encode">Encode to Base64</SelectItem>
                  <SelectItem value="decode">Decode from Base64</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="text">
                {inputData.operation === 'decode' ? 'Base64 encoded text to decode' : 'Text to encode'}
              </Label>
              <Textarea
                id="text"
                placeholder={inputData.operation === 'decode' 
                  ? "Paste your Base64 encoded string here (e.g., SGVsbG8gV29ybGQ=)" 
                  : "Enter plain text to convert to Base64 encoding..."
                }
                value={inputData.text || ''}
                onChange={(e) => setInputData({ ...inputData, text: e.target.value })}
                className="min-h-32 font-mono text-sm"
              />
            </div>
          </div>
        )

      case 'url_encode':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="operation">Operation</Label>
              <Select value={inputData.operation || 'encode'} onValueChange={(value) => setInputData({ ...inputData, operation: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose operation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="encode">URL Encode</SelectItem>
                  <SelectItem value="decode">URL Decode</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="text">
                {inputData.operation === 'decode' ? 'URL encoded text to decode' : 'Text to URL encode'}
              </Label>
              <Textarea
                id="text"
                placeholder={inputData.operation === 'decode' 
                  ? "Paste URL encoded string (e.g., Hello%20World%21)" 
                  : "Enter text with special characters to URL encode..."
                }
                value={inputData.text || ''}
                onChange={(e) => setInputData({ ...inputData, text: e.target.value })}
                className="min-h-32"
              />
            </div>
          </div>
        )

      case 'hash_generate':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Text to generate hash</Label>
              <Textarea
                id="text"
                placeholder="Enter text or password to generate cryptographic hash..."
                value={inputData.text || ''}
                onChange={(e) => setInputData({ ...inputData, text: e.target.value })}
                className="min-h-32"
              />
            </div>
            <div>
              <Label htmlFor="hash_type">Hash Algorithm</Label>
              <Select value={inputData.hash_type || 'sha256'} onValueChange={(value) => setInputData({ ...inputData, hash_type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select hash type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sha1">SHA-1 (160-bit)</SelectItem>
                  <SelectItem value="sha256">SHA-256 (256-bit) - Recommended</SelectItem>
                  <SelectItem value="sha512">SHA-512 (512-bit) - Most Secure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 'qr_generate':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Content for QR Code</Label>
              <Input
                id="text"
                placeholder="Enter URL, text, or contact info for QR code..."
                value={inputData.text || ''}
                onChange={(e) => setInputData({ ...inputData, text: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="size">QR Code Size</Label>
              <Select value={inputData.size?.toString() || '200'} onValueChange={(value) => setInputData({ ...inputData, size: parseInt(value) })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="150">Small (150x150)</SelectItem>
                  <SelectItem value="200">Medium (200x200)</SelectItem>
                  <SelectItem value="300">Large (300x300)</SelectItem>
                  <SelectItem value="500">Extra Large (500x500)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 'text_diff':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="text1">First Text</Label>
              <Textarea
                id="text1"
                placeholder="Enter the first text to compare..."
                value={inputData.text1 || ''}
                onChange={(e) => setInputData({ ...inputData, text1: e.target.value })}
                className="min-h-32"
              />
            </div>
            <div>
              <Label htmlFor="text2">Second Text</Label>
              <Textarea
                id="text2"
                placeholder="Enter the second text to compare..."
                value={inputData.text2 || ''}
                onChange={(e) => setInputData({ ...inputData, text2: e.target.value })}
                className="min-h-32"
              />
            </div>
          </div>
        )

      case 'lorem_generate':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="paragraphs">Number of Paragraphs</Label>
                <Input
                  id="paragraphs"
                  type="number"
                  placeholder="5"
                  value={inputData.paragraphs || ''}
                  onChange={(e) => setInputData({ ...inputData, paragraphs: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="words_per_paragraph">Words per Paragraph</Label>
                <Input
                  id="words_per_paragraph"
                  type="number"
                  placeholder="50"
                  value={inputData.words_per_paragraph || ''}
                  onChange={(e) => setInputData({ ...inputData, words_per_paragraph: parseInt(e.target.value) })}
                />
              </div>
            </div>
          </div>
        )

      case 'markdown_to_html':
        return (
          <div>
            <Label htmlFor="markdown">Markdown Text</Label>
            <Textarea
              id="markdown"
              placeholder="Enter your Markdown text here..."
              value={inputData.markdown || ''}
              onChange={(e) => setInputData({ ...inputData, markdown: e.target.value })}
              className="min-h-40"
            />
          </div>
        )

      case 'json_format':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="json">JSON to Format/Validate</Label>
              <Textarea
                id="json"
                placeholder="Paste your JSON here..."
                value={inputData.json || ''}
                onChange={(e) => setInputData({ ...inputData, json: e.target.value })}
                className="min-h-40 font-mono text-sm"
              />
            </div>
            <div>
              <Label htmlFor="operation">Operation</Label>
              <Select value={inputData.operation || 'format'} onValueChange={(value) => setInputData({ ...inputData, operation: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose operation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="format">Format JSON</SelectItem>
                  <SelectItem value="minify">Minify JSON</SelectItem>
                  <SelectItem value="validate">Validate Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 'regex_test':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="pattern">Regular Expression Pattern</Label>
              <Input
                id="pattern"
                placeholder="Enter regex pattern (e.g., /[a-zA-Z]+/g)"
                value={inputData.pattern || ''}
                onChange={(e) => setInputData({ ...inputData, pattern: e.target.value })}
                className="font-mono"
              />
            </div>
            <div>
              <Label htmlFor="test_string">Test String</Label>
              <Textarea
                id="test_string"
                placeholder="Enter text to test against the regex..."
                value={inputData.test_string || ''}
                onChange={(e) => setInputData({ ...inputData, test_string: e.target.value })}
                className="min-h-32"
              />
            </div>
          </div>
        )

      case 'css_minify':
        return (
          <div>
            <Label htmlFor="css">CSS Code to Minify</Label>
            <Textarea
              id="css"
              placeholder="Paste your CSS code here..."
              value={inputData.css || ''}
              onChange={(e) => setInputData({ ...inputData, css: e.target.value })}
              className="min-h-40 font-mono text-sm"
            />
          </div>
        )

      case 'js_minify':
        return (
          <div>
            <Label htmlFor="javascript">JavaScript Code to Minify</Label>
            <Textarea
              id="javascript"
              placeholder="Paste your JavaScript code here..."
              value={inputData.javascript || ''}
              onChange={(e) => setInputData({ ...inputData, javascript: e.target.value })}
              className="min-h-40 font-mono text-sm"
            />
          </div>
        )

      case 'html_encode':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="operation">Operation</Label>
              <Select value={inputData.operation || 'encode'} onValueChange={(value) => setInputData({ ...inputData, operation: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose operation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="encode">Encode HTML Entities</SelectItem>
                  <SelectItem value="decode">Decode HTML Entities</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="html">HTML Content</Label>
              <Textarea
                id="html"
                placeholder={inputData.operation === 'decode' 
                  ? "Enter HTML with encoded entities (&lt;, &gt;, &amp;)" 
                  : "Enter HTML content to encode..."
                }
                value={inputData.html || ''}
                onChange={(e) => setInputData({ ...inputData, html: e.target.value })}
                className="min-h-32"
              />
            </div>
          </div>
        )

      case 'color_convert':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="color">Color Value</Label>
              <Input
                id="color"
                placeholder="Enter color (e.g., #FF0000, rgb(255,0,0))"
                value={inputData.color || ''}
                onChange={(e) => setInputData({ ...inputData, color: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="from_format">From Format</Label>
                <Select value={inputData.from_format || ''} onValueChange={(value) => setInputData({ ...inputData, from_format: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Source format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hex">HEX (#FF0000)</SelectItem>
                    <SelectItem value="rgb">RGB (255,0,0)</SelectItem>
                    <SelectItem value="hsl">HSL (0,100%,50%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="to_format">To Format</Label>
                <Select value={inputData.to_format || ''} onValueChange={(value) => setInputData({ ...inputData, to_format: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Target format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hex">HEX (#FF0000)</SelectItem>
                    <SelectItem value="rgb">RGB (255,0,0)</SelectItem>
                    <SelectItem value="hsl">HSL (0,100%,50%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      // File-based tools - PDF
      case 'pdf_compress':
      case 'pdf_merge':
      case 'pdf_split':
      case 'pdf_to_word':
      case 'pdf_to_excel':
      case 'pdf_to_powerpoint':
      case 'pdf_to_image':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="file">Upload PDF File{conversionType === 'pdf_merge' ? '(s)' : ''}</Label>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileText className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload PDF</span> or drag and drop
                    </p>
                  </div>
                  <input 
                    id="file" 
                    type="file" 
                    className="hidden" 
                    accept=".pdf" 
                    multiple={conversionType === 'pdf_merge'}
                    onChange={handleFileUpload} 
                  />
                </label>
              </div>
              {uploadedFile && (
                <p className="text-sm text-muted-foreground">Selected: {uploadedFile.name}</p>
              )}
            </div>
          </div>
        )

      // File-based tools - Document to PDF
      case 'word_to_pdf':
      case 'excel_to_pdf':
      case 'powerpoint_to_pdf':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="file">Upload Document File</Label>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileText className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload document</span>
                    </p>
                  </div>
                  <input 
                    id="file" 
                    type="file" 
                    className="hidden" 
                    accept={
                      conversionType === 'word_to_pdf' ? '.doc,.docx' :
                      conversionType === 'excel_to_pdf' ? '.xls,.xlsx' :
                      '.ppt,.pptx'
                    }
                    onChange={handleFileUpload} 
                  />
                </label>
              </div>
              {uploadedFile && (
                <p className="text-sm text-muted-foreground">Selected: {uploadedFile.name}</p>
              )}
            </div>
          </div>
        )

      // Image Tools
      case 'image_compress':
      case 'image_resize':
      case 'image_format_convert':
      case 'image_crop':
      case 'image_rotate':
      case 'image_flip':
      case 'watermark_add':
      case 'background_remove':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="file">Upload Image File</Label>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload image</span>
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, JPEG, GIF up to 10MB</p>
                  </div>
                  <input id="file" type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                </label>
              </div>
              {uploadedFile && (
                <p className="text-sm text-muted-foreground">Selected: {uploadedFile.name}</p>
              )}
            </div>
            
            {conversionType === 'image_resize' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="width">Width (pixels)</Label>
                  <Input
                    id="width"
                    type="number"
                    placeholder="800"
                    value={inputData.width || ''}
                    onChange={(e) => setInputData({ ...inputData, width: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (pixels)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="600"
                    value={inputData.height || ''}
                    onChange={(e) => setInputData({ ...inputData, height: parseInt(e.target.value) })}
                  />
                </div>
              </div>
            )}

            {conversionType === 'image_format_convert' && (
              <div>
                <Label htmlFor="format">Convert to Format</Label>
                <Select value={inputData.format || ''} onValueChange={(value) => setInputData({ ...inputData, format: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jpg">JPEG (.jpg)</SelectItem>
                    <SelectItem value="png">PNG (.png)</SelectItem>
                    <SelectItem value="webp">WebP (.webp)</SelectItem>
                    <SelectItem value="gif">GIF (.gif)</SelectItem>
                    <SelectItem value="bmp">BMP (.bmp)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {conversionType === 'image_rotate' && (
              <div>
                <Label htmlFor="angle">Rotation Angle (degrees)</Label>
                <Input
                  id="angle"
                  type="number"
                  placeholder="90"
                  value={inputData.angle || ''}
                  onChange={(e) => setInputData({ ...inputData, angle: parseInt(e.target.value) })}
                />
              </div>
            )}

            {conversionType === 'watermark_add' && (
              <div>
                <Label htmlFor="watermark_text">Watermark Text</Label>
                <Input
                  id="watermark_text"
                  placeholder="Enter watermark text..."
                  value={inputData.watermark_text || ''}
                  onChange={(e) => setInputData({ ...inputData, watermark_text: e.target.value })}
                />
              </div>
            )}
          </div>
        )

      default:
        return (
          <div>
            <Label htmlFor="input">Input Data</Label>
            <Textarea
              id="input"
              placeholder="Enter your input for conversion..."
              value={inputData.input || ''}
              onChange={(e) => setInputData({ ...inputData, input: e.target.value })}
              className="min-h-32"
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
            {tool.category} - Configure your conversion settings below
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {renderInputFields()}

          <div className="flex gap-2">
            <Button 
              onClick={handleConvert} 
              disabled={isLoading || (!inputData.text && !uploadedFile)}
              className="flex-1"
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isLoading ? 'Processing...' : 'Convert'}
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
