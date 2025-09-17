import React, { useState } from "react";
import { create, all } from "mathjs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Calculator } from "lucide-react";

// Initialize math.js
const math = create(all);

interface ScientificCalculatorProps {
  onClose?: () => void;
}

export const ScientificCalculator: React.FC<ScientificCalculatorProps> = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [memory, setMemory] = useState(0);

  // Append value to input
  const handleClick = (value: string) => {
    setInput((prev) => prev + value);
  };

  // Clear everything
  const handleClear = () => {
    setInput("");
    setResult("");
  };

  // All Clear (including memory)
  const handleAllClear = () => {
    setInput("");
    setResult("");
    setMemory(0);
  };

  // Backspace one character
  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  // Evaluate expression
  const handleCalculate = () => {
    try {
      const res = math.evaluate(input);
      setResult(res.toString());
    } catch {
      setResult("Error");
    }
  };

  // Memory functions
  const handleMemoryStore = () => {
    const currentValue = result || input;
    try {
      const value = math.evaluate(currentValue);
      setMemory(Number(value));
    } catch {
      // Handle error silently
    }
  };

  const handleMemoryRecall = () => {
    setInput((prev) => prev + memory.toString());
  };

  const handleMemoryAdd = () => {
    const currentValue = result || input;
    try {
      const value = math.evaluate(currentValue);
      setMemory((prev) => prev + Number(value));
    } catch {
      // Handle error silently
    }
  };

  const handleMemoryClear = () => {
    setMemory(0);
  };

  // Insert parentheses intelligently
  const handleParentheses = () => {
    const openCount = (input.match(/\(/g) || []).length;
    const closeCount = (input.match(/\)/g) || []).length;
    
    if (openCount === closeCount) {
      handleClick("(");
    } else {
      handleClick(")");
    }
  };

  const numberButtons = [
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "0", label: "0" },
    { value: ".", label: "." },
    { value: "00", label: "00" }
  ];

  const operatorButtons = [
    { value: "/", label: "÷", className: "bg-orange-600 hover:bg-orange-700" },
    { value: "*", label: "×", className: "bg-orange-600 hover:bg-orange-700" },
    { value: "-", label: "−", className: "bg-orange-600 hover:bg-orange-700" },
    { value: "+", label: "+", className: "bg-orange-600 hover:bg-orange-700" },
  ];

  const scientificButtons = [
    { value: "pi", label: "π", className: "bg-primary hover:bg-primary/90" },
    { value: "e", label: "e", className: "bg-primary hover:bg-primary/90" },
    { value: "sqrt(", label: "√", className: "bg-primary hover:bg-primary/90" },
    { value: "^", label: "x^y", className: "bg-primary hover:bg-primary/90" },
    { value: "sin(", label: "sin", className: "bg-primary hover:bg-primary/90" },
    { value: "cos(", label: "cos", className: "bg-primary hover:bg-primary/90" },
    { value: "tan(", label: "tan", className: "bg-primary hover:bg-primary/90" },
    { value: "log(", label: "log", className: "bg-primary hover:bg-primary/90" },
    { value: "ln(", label: "ln", className: "bg-primary hover:bg-primary/90" },
    { value: "exp(", label: "exp", className: "bg-primary hover:bg-primary/90" },
    { value: "abs(", label: "|x|", className: "bg-primary hover:bg-primary/90" },
    { value: "!", label: "x!", className: "bg-primary hover:bg-primary/90" },
  ];

  return (
    <Card className="p-3 sm:p-4 lg:p-6 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto bg-background border-border shadow-elegant">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          <h3 className="text-sm sm:text-lg font-semibold text-foreground">Scientific Calculator</h3>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-6 w-6 sm:h-8 sm:w-8"
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        )}
      </div>

      {/* Display */}
      <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-muted/50 rounded-lg border">
        <div className="text-right">
          <div className="text-xs sm:text-sm text-muted-foreground break-all min-h-[16px] sm:min-h-[20px] mb-1">
            {input || "0"}
          </div>
          <div className="text-lg sm:text-2xl font-bold text-foreground min-h-[24px] sm:min-h-[32px]">
            {result}
          </div>
        </div>
        {memory !== 0 && (
          <div className="text-xs text-primary mt-1">M: {memory}</div>
        )}
      </div>

      {/* Memory and Function buttons */}
      <div className="grid grid-cols-6 gap-1 sm:gap-2 mb-3 sm:mb-4">
        <Button
          onClick={handleMemoryStore}
          size="sm"
          variant="outline"
          className="text-xs h-8 sm:h-9 px-1 sm:px-2"
        >
          MS
        </Button>
        <Button
          onClick={handleMemoryRecall}
          size="sm"
          variant="outline"
          className="text-xs h-8 sm:h-9 px-1 sm:px-2"
        >
          MR
        </Button>
        <Button
          onClick={handleMemoryAdd}
          size="sm"
          variant="outline"
          className="text-xs h-8 sm:h-9 px-1 sm:px-2"
        >
          M+
        </Button>
        <Button
          onClick={handleMemoryClear}
          size="sm"
          variant="outline"
          className="text-xs h-8 sm:h-9 px-1 sm:px-2"
        >
          MC
        </Button>
        <Button
          onClick={handleParentheses}
          size="sm"
          variant="outline"
          className="text-xs h-8 sm:h-9 px-1 sm:px-2"
        >
          ( )
        </Button>
        <Button
          onClick={handleAllClear}
          size="sm"
          className="text-xs h-8 sm:h-9 px-1 sm:px-2 bg-red-600 hover:bg-red-700 text-white"
        >
          AC
        </Button>
      </div>

      {/* Scientific functions */}
      <div className="grid grid-cols-4 gap-1 sm:gap-2 mb-3 sm:mb-4">
        {scientificButtons.map((btn) => (
          <Button
            key={btn.value}
            onClick={() => handleClick(btn.value)}
            size="sm"
            className={`text-xs h-8 sm:h-9 px-1 sm:px-2 ${btn.className} text-white`}
          >
            {btn.label}
          </Button>
        ))}
      </div>

      {/* Main calculator grid */}
      <div className="grid grid-cols-4 gap-1 sm:gap-2">
        {/* Clear and Backspace */}
        <Button
          onClick={handleClear}
          size="sm"
          className="bg-yellow-600 hover:bg-yellow-700 text-white h-10 sm:h-11 text-xs sm:text-sm"
        >
          C
        </Button>
        <Button
          onClick={handleBackspace}
          size="sm"
          className="bg-yellow-600 hover:bg-yellow-700 text-white h-10 sm:h-11 text-xs sm:text-sm"
        >
          ⌫
        </Button>
        <Button
          onClick={() => handleClick("%")}
          size="sm"
          variant="outline"
          className="h-10 sm:h-11 text-xs sm:text-sm"
        >
          %
        </Button>
        <Button
          onClick={() => handleClick("/")}
          size="sm"
          className="bg-orange-600 hover:bg-orange-700 text-white h-10 sm:h-11 text-xs sm:text-sm"
        >
          ÷
        </Button>

        {/* Numbers and operators */}
        {[0, 1, 2].map((row) => [
          ...numberButtons.slice(row * 3, (row + 1) * 3).map((btn) => (
            <Button
              key={btn.value}
              onClick={() => handleClick(btn.value)}
              size="sm"
              variant="outline"
              className="hover:bg-accent h-10 sm:h-11 text-xs sm:text-sm"
            >
              {btn.label}
            </Button>
          )),
          <Button
            key={`operator-${row}`}
            onClick={() => handleClick(operatorButtons[row].value)}
            size="sm"
            className={operatorButtons[row].className + " text-white h-10 sm:h-11 text-xs sm:text-sm"}
          >
            {operatorButtons[row].label}
          </Button>
        ]).flat()}

        {/* Bottom row */}
        <Button
          onClick={() => handleClick("0")}
          size="sm"
          variant="outline"
          className="col-span-2 hover:bg-accent h-10 sm:h-11 text-xs sm:text-sm"
        >
          0
        </Button>
        <Button
          onClick={() => handleClick(".")}
          size="sm"
          variant="outline"
          className="hover:bg-accent h-10 sm:h-11 text-xs sm:text-sm"
        >
          .
        </Button>
        <Button
          onClick={handleCalculate}
          size="sm"
          className="bg-green-600 hover:bg-green-700 text-white h-10 sm:h-11 text-xs sm:text-sm"
        >
          =
        </Button>
      </div>
    </Card>
  );
};