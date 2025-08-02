
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Wand2, Copy, Download } from "lucide-react";
import { useAIConverter } from "@/hooks/useAIConverter";

export const AITextTools = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedTool, setSelectedTool] = useState("text_enhance");
  const [targetLanguage, setTargetLanguage] = useState("Spanish");
  const { convertWithAI, isLoading } = useAIConverter();

  const textTools = [
    { value: "text_enhance", label: "Enhance Text", description: "Improve grammar and clarity" },
    { value: "text_summarize", label: "Summarize", description: "Create concise summary" },
    { value: "text_paraphrase", label: "Paraphrase", description: "Rewrite with different words" },
    { value: "text_translate", label: "Translate", description: "Translate to another language" },
  ];

  const languages = [
    "Spanish", "French", "German", "Italian", "Portuguese", "Chinese", "Japanese", "Korean", "Russian", "Arabic"
  ];

  const handleConvert = async () => {
    if (!inputText.trim()) return;
    
    const options = selectedTool === "text_translate" ? { targetLanguage } : {};
    const result = await convertWithAI(selectedTool, inputText, options);
    
    if (result) {
      setOutputText(result);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText);
  };

  const downloadText = () => {
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-converted-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5" />
            AI Text Tools
            <Badge variant="secondary">Powered by OpenAI</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tool Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select AI Tool</label>
            <Select value={selectedTool} onValueChange={setSelectedTool}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {textTools.map((tool) => (
                  <SelectItem key={tool.value} value={tool.value}>
                    <div>
                      <div className="font-medium">{tool.label}</div>
                      <div className="text-xs text-muted-foreground">{tool.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Language Selection for Translation */}
          {selectedTool === "text_translate" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Language</label>
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Input Text */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Input Text</label>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your text here..."
              className="min-h-32"
            />
          </div>

          {/* Convert Button */}
          <Button 
            onClick={handleConvert} 
            disabled={!inputText.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? "Processing..." : `Apply ${textTools.find(t => t.value === selectedTool)?.label}`}
          </Button>

          {/* Output */}
          {outputText && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Result</label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadText}>
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
              <Textarea
                value={outputText}
                readOnly
                className="min-h-32 bg-muted/50"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
