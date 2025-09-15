import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Upload, Send, Copy, X } from "lucide-react";
import { useAIConverter } from "@/hooks/useAIConverter";
import { useToast } from "@/hooks/use-toast";

export const AIQuickQuery = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { convertWithAI, isLoading } = useAIConverter();
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleQuery = async () => {
    if (!prompt.trim() && uploadedFiles.length === 0) return;
    
    let content = prompt;
    
    // Handle file uploads by adding file descriptions to the prompt
    if (uploadedFiles.length > 0) {
      const fileDescriptions = uploadedFiles.map(file => 
        `[Uploaded file: ${file.name} (${file.type || 'unknown type'})]`
      ).join('\n');
      content = `${content}\n\nFiles uploaded:\n${fileDescriptions}`;
    }
    
    const aiResult = await convertWithAI("ai_query", content, {
      contentType: "general_query",
      topic: "conversion_assistance"
    });
    
    if (aiResult) {
      setResult(aiResult);
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Result copied to clipboard"
    });
  };

  const clearAll = () => {
    setPrompt("");
    setResult("");
    setUploadedFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">AI Quick Query</h2>
          <p className="text-muted-foreground">
            Ask AI anything about conversions, get instant help with calculations, or analyze your files
          </p>
        </div>

        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              AI Assistant
              <Badge variant="secondary">Powered by OpenAI</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* File Upload Area */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Upload Files (Optional)</label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,audio/*,video/*,.pdf,.doc,.docx,.txt"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="mb-2"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
                <p className="text-xs text-muted-foreground">
                  Support for images, audio, video, documents, and text files
                </p>
              </div>
              
              {/* Uploaded Files Display */}
              {uploadedFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md text-sm">
                      <span className="truncate max-w-32">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        className="h-4 w-4 p-0"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Text Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Query</label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask me anything! For example: 'Convert 50 pounds to kilograms', 'What's 32°F in Celsius?', 'Analyze this image', 'Summarize this document'..."
                className="min-h-24"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                onClick={handleQuery} 
                disabled={(!prompt.trim() && uploadedFiles.length === 0) || isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Ask AI
                  </>
                )}
              </Button>
              {(prompt || result || uploadedFiles.length > 0) && (
                <Button variant="outline" onClick={clearAll}>
                  Clear All
                </Button>
              )}
            </div>

            {/* Result Display */}
            {result && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">AI Response</label>
                  <Button variant="outline" size="sm" onClick={copyResult}>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                </div>
                <div className="bg-muted/50 p-4 rounded-md">
                  <p className="whitespace-pre-wrap">{result}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};