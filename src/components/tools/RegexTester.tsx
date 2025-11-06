import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Braces, ChevronRight, ChevronLeft } from 'lucide-react';

export const RegexTester = () => {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [flavor, setFlavor] = useState<'js' | 'pcre' | 'python'>('js');
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [currentMatch, setCurrentMatch] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!pattern || !testString) {
      setMatches([]);
      setError('');
      return;
    }

    try {
      const flagStr = Object.entries(flags)
        .filter(([_, enabled]) => enabled)
        .map(([flag]) => flag)
        .join('');
      
      const regex = new RegExp(pattern, flagStr);
      const foundMatches: RegExpMatchArray[] = [];

      if (flags.g) {
        // Global flag - find all matches
        let match;
        const globalRegex = new RegExp(pattern, flagStr);
        while ((match = globalRegex.exec(testString)) !== null) {
          foundMatches.push(match);
          if (match.index === globalRegex.lastIndex) {
            globalRegex.lastIndex++;
          }
        }
      } else {
        // No global flag - find first match only
        const match = testString.match(regex);
        if (match) {
          foundMatches.push(match);
        }
      }

      setMatches(foundMatches);
      setCurrentMatch(0);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid regex pattern');
      setMatches([]);
    }
  }, [pattern, testString, flags]);

  const highlightMatches = () => {
    if (!testString || matches.length === 0) {
      return testString;
    }

    const parts: JSX.Element[] = [];
    let lastIndex = 0;

    matches.forEach((match, idx) => {
      if (match.index !== undefined) {
        // Add text before match
        if (match.index > lastIndex) {
          parts.push(
            <span key={`text-${idx}`}>
              {testString.substring(lastIndex, match.index)}
            </span>
          );
        }

        // Add highlighted match
        parts.push(
          <span
            key={`match-${idx}`}
            className={`${
              idx === currentMatch
                ? 'bg-primary text-primary-foreground'
                : 'bg-primary/30'
            } px-0.5 rounded`}
          >
            {match[0]}
          </span>
        );

        lastIndex = match.index + match[0].length;
      }
    });

    // Add remaining text
    if (lastIndex < testString.length) {
      parts.push(
        <span key="text-end">
          {testString.substring(lastIndex)}
        </span>
      );
    }

    return <>{parts}</>;
  };

  const commonPatterns = [
    { label: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
    { label: 'URL', pattern: 'https?:\\/\\/[^\\s]+' },
    { label: 'Phone', pattern: '\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}' },
    { label: 'IP Address', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b' },
    { label: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}' },
    { label: 'Hex Color', pattern: '#[0-9A-Fa-f]{6}' }
  ];

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Braces className="w-5 h-5" />
          Regular Expression Tester
        </CardTitle>
        <CardDescription>
          Test and debug regular expressions with live matching and explanations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pattern Input */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Regular Expression Pattern</Label>
              <Select value={flavor} onValueChange={(v) => setFlavor(v as any)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="js">JavaScript</SelectItem>
                  <SelectItem value="pcre">PCRE</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">/</span>
              <Input
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern..."
                className="flex-1 font-mono"
              />
              <span className="text-muted-foreground">/</span>
              <div className="flex gap-1">
                {Object.entries(flags).map(([flag, enabled]) => (
                  <Button
                    key={flag}
                    variant={enabled ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFlags({ ...flags, [flag]: !enabled })}
                    className="w-8 h-8 p-0"
                  >
                    {flag}
                  </Button>
                ))}
              </div>
            </div>
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">
                {error}
              </div>
            )}
          </div>

          {/* Common Patterns */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Quick patterns:</Label>
            <div className="flex flex-wrap gap-2">
              {commonPatterns.map((p) => (
                <Button
                  key={p.label}
                  variant="outline"
                  size="sm"
                  onClick={() => setPattern(p.pattern)}
                  className="text-xs"
                >
                  {p.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Test String */}
        <div className="space-y-2">
          <Label>Test String</Label>
          <Textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against..."
            className="font-mono min-h-[200px]"
          />
        </div>

        {/* Highlighted Output */}
        {testString && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Matches: {matches.length}</Label>
              {matches.length > 0 && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentMatch(Math.max(0, currentMatch - 1))}
                    disabled={currentMatch === 0}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm">
                    {currentMatch + 1} / {matches.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentMatch(Math.min(matches.length - 1, currentMatch + 1))}
                    disabled={currentMatch === matches.length - 1}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            <div className="bg-muted/30 rounded-lg p-4 border font-mono text-sm whitespace-pre-wrap break-all">
              {highlightMatches()}
            </div>
          </div>
        )}

        {/* Match Details */}
        {matches.length > 0 && matches[currentMatch] && (
          <div className="space-y-4">
            <h3 className="font-medium">Match Details</h3>
            <div className="bg-muted/30 rounded-lg p-4 border space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Full Match:</span>
                  <div className="font-mono font-medium mt-1">
                    {matches[currentMatch][0]}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Position:</span>
                  <div className="font-mono font-medium mt-1">
                    {matches[currentMatch].index} - {matches[currentMatch].index! + matches[currentMatch][0].length}
                  </div>
                </div>
              </div>

              {matches[currentMatch].length > 1 && (
                <div>
                  <span className="text-muted-foreground text-sm">Capture Groups:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {matches[currentMatch].slice(1).map((group, idx) => (
                      <Badge key={idx} variant="outline" className="font-mono">
                        ${idx + 1}: {group || '(empty)'}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};