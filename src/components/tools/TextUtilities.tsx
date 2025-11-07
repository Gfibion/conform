import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, ArrowLeftRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const TextUtilities = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  // Case Converter Functions
  const toUpperCase = () => setOutput(input.toUpperCase());
  const toLowerCase = () => setOutput(input.toLowerCase());
  const toTitleCase = () => {
    setOutput(
      input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
    );
  };
  const toSentenceCase = () => {
    setOutput(
      input.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
    );
  };
  const toCamelCase = () => {
    setOutput(
      input
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
          index === 0 ? word.toLowerCase() : word.toUpperCase()
        )
        .replace(/\s+/g, "")
    );
  };
  const toSnakeCase = () => {
    setOutput(
      input
        .replace(/\W+/g, " ")
        .split(/ |\B(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join("_")
    );
  };

  // Base64 Functions
  const encodeBase64 = () => {
    try {
      setOutput(btoa(input));
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid input for Base64 encoding",
        variant: "destructive",
      });
    }
  };
  const decodeBase64 = () => {
    try {
      setOutput(atob(input));
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid Base64 string",
        variant: "destructive",
      });
    }
  };

  // URL Encode/Decode Functions
  const encodeURL = () => setOutput(encodeURIComponent(input));
  const decodeURL = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid URL encoded string",
        variant: "destructive",
      });
    }
  };

  // Hash Functions
  const generateHash = async (algorithm: string) => {
    try {
      if (algorithm === "MD5") {
        // MD5 using simple implementation
        const md5 = await import("crypto-js/md5");
        setOutput(md5.default(input).toString());
      } else {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        const hashBuffer = await crypto.subtle.digest(algorithm, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
        setOutput(hashHex);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to generate ${algorithm} hash`,
        variant: "destructive",
      });
    }
  };

  // Markdown to HTML (basic implementation)
  const markdownToHTML = () => {
    let html = input
      // Headers
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      // Bold
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      // Italic
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
      // Line breaks
      .replace(/\n$/gim, "<br />");
    setOutput(html);
  };

  // Utility Functions
  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Output copied to clipboard",
    });
  };

  const downloadOutput = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const swapInputOutput = () => {
    const temp = input;
    setInput(output);
    setOutput(temp);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Text Utilities</CardTitle>
        <CardDescription>
          Transform and manipulate text with various encoding and formatting tools
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="case" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="case">Case</TabsTrigger>
            <TabsTrigger value="base64">Base64</TabsTrigger>
            <TabsTrigger value="url">URL</TabsTrigger>
            <TabsTrigger value="hash">Hash</TabsTrigger>
            <TabsTrigger value="markdown">Markdown</TabsTrigger>
          </TabsList>

          {/* Case Converter */}
          <TabsContent value="case" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="case-input">Input Text</Label>
              <Textarea
                id="case-input"
                placeholder="Enter text to convert..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button onClick={toUpperCase} variant="outline" size="sm">
                UPPERCASE
              </Button>
              <Button onClick={toLowerCase} variant="outline" size="sm">
                lowercase
              </Button>
              <Button onClick={toTitleCase} variant="outline" size="sm">
                Title Case
              </Button>
              <Button onClick={toSentenceCase} variant="outline" size="sm">
                Sentence case
              </Button>
              <Button onClick={toCamelCase} variant="outline" size="sm">
                camelCase
              </Button>
              <Button onClick={toSnakeCase} variant="outline" size="sm">
                snake_case
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="case-output">Output</Label>
              <Textarea
                id="case-output"
                value={output}
                readOnly
                className="min-h-[120px] bg-muted"
              />
            </div>
          </TabsContent>

          {/* Base64 Encoder/Decoder */}
          <TabsContent value="base64" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="base64-input">Input</Label>
              <Textarea
                id="base64-input"
                placeholder="Enter text to encode/decode..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={encodeBase64} className="flex-1">
                Encode to Base64
              </Button>
              <Button onClick={swapInputOutput} variant="outline" size="icon">
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
              <Button onClick={decodeBase64} className="flex-1">
                Decode from Base64
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="base64-output">Output</Label>
              <Textarea
                id="base64-output"
                value={output}
                readOnly
                className="min-h-[120px] bg-muted"
              />
            </div>
          </TabsContent>

          {/* URL Encoder/Decoder */}
          <TabsContent value="url" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url-input">Input</Label>
              <Textarea
                id="url-input"
                placeholder="Enter text or URL to encode/decode..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={encodeURL} className="flex-1">
                URL Encode
              </Button>
              <Button onClick={swapInputOutput} variant="outline" size="icon">
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
              <Button onClick={decodeURL} className="flex-1">
                URL Decode
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="url-output">Output</Label>
              <Textarea
                id="url-output"
                value={output}
                readOnly
                className="min-h-[120px] bg-muted"
              />
            </div>
          </TabsContent>

          {/* Hash Generator */}
          <TabsContent value="hash" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hash-input">Input Text</Label>
              <Textarea
                id="hash-input"
                placeholder="Enter text to hash..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={() => generateHash("MD5")} variant="outline">
                MD5
              </Button>
              <Button onClick={() => generateHash("SHA-1")} variant="outline">
                SHA-1
              </Button>
              <Button onClick={() => generateHash("SHA-256")} variant="outline">
                SHA-256
              </Button>
              <Button onClick={() => generateHash("SHA-512")} variant="outline">
                SHA-512
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hash-output">Hash Output</Label>
              <Textarea
                id="hash-output"
                value={output}
                readOnly
                className="min-h-[120px] bg-muted font-mono text-sm"
              />
            </div>
          </TabsContent>

          {/* Markdown to HTML */}
          <TabsContent value="markdown" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="markdown-input">Markdown Input</Label>
              <Textarea
                id="markdown-input"
                placeholder="# Enter markdown here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[200px] font-mono"
              />
            </div>
            <Button onClick={markdownToHTML} className="w-full">
              Convert to HTML
            </Button>
            <div className="space-y-2">
              <Label htmlFor="markdown-output">HTML Output</Label>
              <Textarea
                id="markdown-output"
                value={output}
                readOnly
                className="min-h-[200px] bg-muted font-mono text-sm"
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6">
          <Button onClick={copyToClipboard} variant="outline" disabled={!output}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Output
          </Button>
          <Button onClick={downloadOutput} variant="outline" disabled={!output}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button onClick={clearAll} variant="outline">
            Clear All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
