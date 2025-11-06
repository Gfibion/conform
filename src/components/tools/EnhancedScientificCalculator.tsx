import React, { useState, useEffect, useRef } from "react";
import { create, all } from "mathjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Calculator, History, X, Copy, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const math = create(all);

interface HistoryEntry {
  expression: string;
  result: string;
  timestamp: Date;
}

export const EnhancedScientificCalculator = () => {
  const [mode, setMode] = useState<"basic" | "scientific" | "programmer">("scientific");
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [angleUnit, setAngleUnit] = useState<"deg" | "rad">("deg");
  const [memory, setMemory] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Evaluate expression
  const evaluate = () => {
    if (!expression.trim()) return;
    
    try {
      // Convert angle units if needed
      let processedExpression = expression;
      if (angleUnit === "deg") {
        // Convert trig functions to use degrees
        processedExpression = processedExpression
          .replace(/sin\(/g, "sin((pi/180)*")
          .replace(/cos\(/g, "cos((pi/180)*")
          .replace(/tan\(/g, "tan((pi/180)*");
      }
      
      const res = math.evaluate(processedExpression);
      const resultStr = typeof res === "number" ? res.toString() : String(res);
      setResult(resultStr);
      
      // Add to history
      setHistory(prev => [{
        expression,
        result: resultStr,
        timestamp: new Date()
      }, ...prev].slice(0, 50)); // Keep last 50 entries
    } catch (error) {
      setResult("Error");
      toast({
        title: "Calculation Error",
        description: error instanceof Error ? error.message : "Invalid expression",
        variant: "destructive"
      });
    }
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        evaluate();
      } else if (e.key === "Escape") {
        setExpression("");
        setResult("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expression]);

  // Insert value at cursor position
  const insertValue = (value: string) => {
    if (inputRef.current) {
      const start = inputRef.current.selectionStart || 0;
      const end = inputRef.current.selectionEnd || 0;
      const newExpression = expression.substring(0, start) + value + expression.substring(end);
      setExpression(newExpression);
      
      // Set cursor position after inserted text
      setTimeout(() => {
        inputRef.current?.setSelectionRange(start + value.length, start + value.length);
        inputRef.current?.focus();
      }, 0);
    } else {
      setExpression(prev => prev + value);
    }
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast({
        title: "Copied!",
        description: "Result copied to clipboard"
      });
    }
  };

  const clearHistory = () => {
    setHistory([]);
    toast({
      title: "History Cleared",
      description: "All calculation history has been removed"
    });
  };

  const basicButtons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"]
  ];

  const scientificButtons = [
    ["sin(", "cos(", "tan(", "^"],
    ["log(", "ln(", "sqrt(", "pi"],
    ["(", ")", "e", "!"],
    ["abs(", "exp(", "^2", "1/x"]
  ];

  const constants = [
    { label: "π", value: "pi" },
    { label: "e", value: "e" },
    { label: "φ", value: "(1+sqrt(5))/2" }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Scientific Calculator
          </CardTitle>
          <CardDescription>
            Advanced calculator with scientific functions, history, and multiple modes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={mode} onValueChange={(v) => setMode(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="scientific">Scientific</TabsTrigger>
              <TabsTrigger value="programmer">Programmer</TabsTrigger>
            </TabsList>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Calculator Area */}
              <div className="lg:col-span-2 space-y-4">
                {/* Expression Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Expression</label>
                  <Input
                    ref={inputRef}
                    type="text"
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                    placeholder="Enter expression, e.g., sin(30 deg) + 2^3"
                    className="text-lg h-14 font-mono"
                  />
                </div>

                {/* Result Display */}
                {result && (
                  <div className="bg-muted/50 rounded-lg p-4 border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Result</span>
                      <Button variant="ghost" size="sm" onClick={copyResult}>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    <div className="text-3xl font-bold text-primary break-all">
                      {result}
                    </div>
                  </div>
                )}

                {/* Controls */}
                <div className="flex items-center gap-2 flex-wrap">
                  <Button onClick={evaluate} className="flex-1 min-w-[120px]">
                    Evaluate (Enter)
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => { setExpression(""); setResult(""); }}
                  >
                    Clear (Esc)
                  </Button>
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-sm">Angle:</span>
                    <Button
                      variant={angleUnit === "deg" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAngleUnit("deg")}
                    >
                      Deg
                    </Button>
                    <Button
                      variant={angleUnit === "rad" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAngleUnit("rad")}
                    >
                      Rad
                    </Button>
                  </div>
                </div>

                {/* Constants */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quick Insert</label>
                  <div className="flex gap-2 flex-wrap">
                    {constants.map((c) => (
                      <Button
                        key={c.label}
                        variant="outline"
                        size="sm"
                        onClick={() => insertValue(c.value)}
                      >
                        {c.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Function Buttons */}
                <TabsContent value="basic" className="mt-4">
                  <div className="grid grid-cols-4 gap-2">
                    {basicButtons.flat().map((btn) => (
                      <Button
                        key={btn}
                        variant={btn === "=" ? "default" : "outline"}
                        onClick={() => btn === "=" ? evaluate() : insertValue(btn)}
                        className="h-14 text-lg"
                      >
                        {btn}
                      </Button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="scientific" className="mt-4">
                  <div className="grid grid-cols-4 gap-2">
                    {scientificButtons.flat().map((btn, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        onClick={() => insertValue(btn)}
                        className="h-12 text-sm font-mono"
                      >
                        {btn}
                      </Button>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="programmer" className="mt-4">
                  <div className="text-center text-muted-foreground py-8">
                    Programmer mode coming soon
                  </div>
                </TabsContent>
              </div>

              {/* History Panel */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4" />
                    <h3 className="font-medium">History</h3>
                  </div>
                  {history.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearHistory}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <ScrollArea className="h-[500px] rounded-lg border p-4">
                  {history.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      No calculation history yet
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {history.map((entry, idx) => (
                        <div
                          key={idx}
                          className="bg-muted/30 rounded-lg p-3 space-y-2 cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => {
                            setExpression(entry.expression);
                            setResult(entry.result);
                          }}
                        >
                          <div className="text-xs text-muted-foreground">
                            {entry.timestamp.toLocaleTimeString()}
                          </div>
                          <div className="font-mono text-sm break-all">
                            {entry.expression}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">=</span>
                            <Badge variant="outline" className="font-mono">
                              {entry.result}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};