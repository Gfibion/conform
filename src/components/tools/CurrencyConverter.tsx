import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowRightLeft, TrendingUp, TrendingDown } from "lucide-react";

const currencies = {
  USD: { name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  EUR: { name: "Euro", symbol: "€", flag: "🇪🇺" },
  GBP: { name: "British Pound", symbol: "£", flag: "🇬🇧" },
  JPY: { name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  KES: { name: "Kenyan Shilling", symbol: "KSh", flag: "🇰🇪" },
  CAD: { name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  AUD: { name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
  CHF: { name: "Swiss Franc", symbol: "CHF", flag: "🇨🇭" },
  CNY: { name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
  INR: { name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  NGN: { name: "Nigerian Naira", symbol: "₦", flag: "🇳🇬" },
  ZAR: { name: "South African Rand", symbol: "R", flag: "🇿🇦" }
};

// Mock exchange rates (in a real app, you'd fetch from an API)
const mockRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110,
  KES: 150,
  CAD: 1.25,
  AUD: 1.35,
  CHF: 0.92,
  CNY: 6.45,
  INR: 75,
  NGN: 411,
  ZAR: 15.5
};

export const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [fromValue, setFromValue] = useState("1");
  const [toValue, setToValue] = useState("");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const rate = mockRates[toCurrency as keyof typeof mockRates] / mockRates[fromCurrency as keyof typeof mockRates];
    setExchangeRate(rate);
    
    if (fromValue) {
      const result = (Number(fromValue) * rate).toFixed(2);
      setToValue(result);
    }
  }, [fromCurrency, toCurrency, fromValue]);

  const handleFromValueChange = (value: string) => {
    setFromValue(value);
    if (value && !isNaN(Number(value))) {
      const result = (Number(value) * exchangeRate).toFixed(2);
      setToValue(result);
    } else {
      setToValue("");
    }
  };

  const handleToValueChange = (value: string) => {
    setToValue(value);
    if (value && !isNaN(Number(value))) {
      const result = (Number(value) / exchangeRate).toFixed(2);
      setFromValue(result);
    } else {
      setFromValue("");
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  const formatCurrency = (amount: string, currency: string) => {
    if (!amount) return "";
    const num = Number(amount);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Currency Converter
            <Badge variant="secondary">Live Rates</Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Conversion Interface */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* From */}
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(currencies).map(([code, currency]) => (
                    <SelectItem key={code} value={code}>
                      <div className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span>{code} - {currency.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input 
                type="number"
                value={fromValue}
                onChange={(e) => handleFromValueChange(e.target.value)}
                placeholder="Enter amount"
              />
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                onClick={swapCurrencies}
                className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* To */}
            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(currencies).map(([code, currency]) => (
                    <SelectItem key={code} value={code}>
                      <div className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span>{code} - {currency.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input 
                type="number"
                value={toValue}
                onChange={(e) => handleToValueChange(e.target.value)}
                placeholder="Converted amount"
              />
            </div>
          </div>

          {/* Exchange Rate Info */}
          {fromValue && toValue && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">{formatCurrency(fromValue, fromCurrency)}</span>
                {" = "}
                <span className="font-medium">{formatCurrency(toValue, toCurrency)}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Popular Conversions */}
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="text-lg">Popular Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { from: "USD", to: "EUR", trend: "down" },
              { from: "USD", to: "GBP", trend: "up" },
              { from: "EUR", to: "GBP", trend: "up" },
              { from: "USD", to: "JPY", trend: "down" },
              { from: "USD", to: "KES", trend: "up" },
              { from: "EUR", to: "USD", trend: "up" }
            ].map((conversion, index) => {
              const rate = mockRates[conversion.to as keyof typeof mockRates] / mockRates[conversion.from as keyof typeof mockRates];
              return (
                <div key={index} className="bg-muted/30 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">
                      {conversion.from}/{conversion.to}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {rate.toFixed(4)}
                    </div>
                  </div>
                  <div className={`flex items-center ${conversion.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {conversion.trend === 'up' ? 
                      <TrendingUp className="w-4 h-4" /> : 
                      <TrendingDown className="w-4 h-4" />
                    }
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground text-center">
            Exchange rates are for demonstration purposes only. For real-time rates and actual transactions, 
            please consult your bank or financial institution.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};