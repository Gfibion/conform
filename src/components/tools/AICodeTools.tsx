
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Code2, Copy, Download } from "lucide-react";
import { useAIConverter } from "@/hooks/useAIConverter";

export const AICodeTools = () => {
  const [inputCode, setInputCode] = useState("");
  const [outputResult, setOutputResult] = useState("");
  const [selectedTool, setSelectedTool] = useState("code_explain");
  const { convertWithAI, isLoading } = useAIConverter();

  const codeTools = [
    { value: "code_explain", label: "Explain Code", description: "Get detailed explanation of code" },
    { value: "code_optimize", label: "Optimize Code", description: "Improve performance and readability" },
  ];

  const handleConvert = async () => {
    if (!inputCode.trim()) return;
    
    const result = await convertWithAI(selectedTool, inputCode);
    
    if (result) {
      setOutputResult(result);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputResult);
  };

  const downloadResult = () => {
    const blob = new Blob([outputResult], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-code-analysis.txt';
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
            <Code2 className="w-5 h-5" />
            AI Code Tools
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
                {codeTools.map((tool) => (
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

          {/* Input Code */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Input Code</label>
            <Textarea
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Paste your code here..."
              className="min-h-40 font-mono text-sm"
            />
          </div>

          {/* Convert Button */}
          <Button 
            onClick={handleConvert} 
            disabled={!inputCode.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? "Processing..." : `${codeTools.find(t => t.value === selectedTool)?.label}`}
          </Button>

          {/* Output */}
          {outputResult && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Result</label>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadResult}>
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
              <Textarea
                value={outputResult}
                readOnly
                className="min-h-40 bg-muted/50"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
