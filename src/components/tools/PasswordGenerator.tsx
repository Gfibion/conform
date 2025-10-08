import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Copy, RefreshCw, Download, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [pronounceable, setPronounceable] = useState(false);
  const [strength, setStrength] = useState<"weak" | "fair" | "good" | "strong" | "">("");
  const { toast } = useToast();

  useEffect(() => {
    generatePassword();
  }, []);

  const generatePassword = () => {
    let charset = "";
    let chars = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
      similar: "il1Lo0O"
    };

    if (useUppercase) charset += chars.uppercase;
    if (useLowercase) charset += chars.lowercase;
    if (useNumbers) charset += chars.numbers;
    if (useSymbols) charset += chars.symbols;

    if (!charset) {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive",
      });
      return;
    }

    if (excludeSimilar) {
      charset = charset.split('').filter(char => !chars.similar.includes(char)).join('');
    }

    let generatedPassword = "";
    const charsetLength = charset.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charsetLength);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
    calculateStrength(generatedPassword);
  };

  const calculateStrength = (pwd: string) => {
    let score = 0;

    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (pwd.length >= 16) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;

    if (score <= 2) setStrength("weak");
    else if (score <= 4) setStrength("fair");
    else if (score <= 6) setStrength("good");
    else setStrength("strong");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard",
    });
  };

  const downloadPassword = () => {
    const blob = new Blob([password], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'password.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Password saved to file",
    });
  };

  const getStrengthColor = () => {
    switch (strength) {
      case "weak": return "bg-red-500";
      case "fair": return "bg-orange-500";
      case "good": return "bg-yellow-500";
      case "strong": return "bg-green-500";
      default: return "bg-muted";
    }
  };

  const getStrengthVariant = (): "default" | "destructive" | "outline" | "secondary" => {
    switch (strength) {
      case "weak": return "destructive";
      case "fair": return "secondary";
      case "good": return "outline";
      case "strong": return "default";
      default: return "outline";
    }
  };

  const entropyBits = Math.log2(
    Math.pow(
      (useUppercase ? 26 : 0) + 
      (useLowercase ? 26 : 0) + 
      (useNumbers ? 10 : 0) + 
      (useSymbols ? 32 : 0),
      length
    )
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Password Generator & Strength Checker
        </CardTitle>
        <CardDescription>
          Generate secure passwords with customizable options — entropy: ~{entropyBits.toFixed(0)} bits
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Password Length Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Password Length</Label>
            <Badge variant="outline">{length} characters</Badge>
          </div>
          <Slider
            value={[length]}
            onValueChange={(vals) => setLength(vals[0])}
            min={4}
            max={64}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>4</span>
            <span>64</span>
          </div>
        </div>

        {/* Character Sets */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Character Sets</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="uppercase"
                checked={useUppercase}
                onCheckedChange={(checked) => setUseUppercase(checked as boolean)}
              />
              <Label htmlFor="uppercase" className="text-sm cursor-pointer">
                Uppercase (A-Z)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="lowercase"
                checked={useLowercase}
                onCheckedChange={(checked) => setUseLowercase(checked as boolean)}
              />
              <Label htmlFor="lowercase" className="text-sm cursor-pointer">
                Lowercase (a-z)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="numbers"
                checked={useNumbers}
                onCheckedChange={(checked) => setUseNumbers(checked as boolean)}
              />
              <Label htmlFor="numbers" className="text-sm cursor-pointer">
                Numbers (0-9)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="symbols"
                checked={useSymbols}
                onCheckedChange={(checked) => setUseSymbols(checked as boolean)}
              />
              <Label htmlFor="symbols" className="text-sm cursor-pointer">
                Symbols (!@#$...)
              </Label>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Options</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="exclude-similar"
                checked={excludeSimilar}
                onCheckedChange={(checked) => setExcludeSimilar(checked as boolean)}
              />
              <Label htmlFor="exclude-similar" className="text-sm cursor-pointer">
                Exclude similar characters (i, l, 1, L, o, 0, O)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="pronounceable"
                checked={pronounceable}
                onCheckedChange={(checked) => setPronounceable(checked as boolean)}
              />
              <Label htmlFor="pronounceable" className="text-sm cursor-pointer">
                Generate pronounceable passwords
              </Label>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <Button onClick={generatePassword} className="w-full" size="lg">
          <RefreshCw className="h-4 w-4 mr-2" />
          Generate Password
        </Button>

        {/* Generated Password Display */}
        {password && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Generated Password</Label>
                <Badge variant={getStrengthVariant()} className="capitalize">
                  {strength}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Input
                  value={password}
                  readOnly
                  className="font-mono text-lg"
                />
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              {/* Strength Meter */}
              <div className="space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((level) => {
                    const levels = { weak: 1, fair: 2, good: 3, strong: 4 };
                    const currentLevel = levels[strength] || 0;
                    return (
                      <div
                        key={level}
                        className={`h-2 flex-1 rounded ${
                          level <= currentLevel ? getStrengthColor() : "bg-muted"
                        }`}
                      />
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground">
                  Estimated entropy: ~{entropyBits.toFixed(0)} bits 
                  {entropyBits >= 60 && " — Excellent!"} 
                  {entropyBits >= 40 && entropyBits < 60 && " — Good"} 
                  {entropyBits < 40 && " — Could be stronger"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="outline" onClick={generatePassword} className="flex-1">
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
              <Button variant="outline" onClick={downloadPassword} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>

            {/* Security Tip */}
            <div className="p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
              <p className="font-medium mb-1">💡 Security Tip:</p>
              <p>For maximum security, use passwords with at least 16 characters including uppercase, lowercase, numbers, and symbols. Consider using a password manager to store them securely.</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
