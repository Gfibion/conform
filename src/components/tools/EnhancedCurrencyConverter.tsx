
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightLeft, TrendingUp, Clock, Star } from "lucide-react";
import { useCurrencyConverter } from "@/hooks/useCurrencyConverter";

const popularCurrencies = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'KRW', name: 'South Korean Won', flag: '🇰🇷' },
  { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
  { code: 'HKD', name: 'Hong Kong Dollar', flag: '🇭🇰' },
];

const popularPairs = [
  ['USD', 'EUR'], ['USD', 'GBP'], ['USD', 'JPY'], ['USD', 'CAD'],
  ['EUR', 'GBP'], ['EUR', 'CHF'], ['GBP', 'JPY'], ['AUD', 'USD']
];

export const EnhancedCurrencyConverter = () => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRates, setExchangeRates] = useState<any[]>([]);
  const { convertCurrency, isLoading, lastConversion } = useCurrencyConverter();

  const handleConvert = async () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;
    
    await convertCurrency(numAmount, fromCurrency, toCurrency);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Load popular exchange rates
  const loadExchangeRates = async () => {
    const rates = [];
    for (const [from, to] of popularPairs.slice(0, 6)) {
      const conversion = await convertCurrency(1, from, to);
      if (conversion) {
        rates.push({
          from,
          to,
          rate: conversion.exchange_rate,
          fromFlag: popularCurrencies.find(c => c.code === from)?.flag,
          toFlag: popularCurrencies.find(c => c.code === to)?.flag
        });
      }
    }
    setExchangeRates(rates);
  };

  // Auto-convert when amount or currencies change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (amount && fromCurrency && toCurrency && fromCurrency !== toCurrency) {
        handleConvert();
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [amount, fromCurrency, toCurrency]);

  // Load exchange rates on mount
  useEffect(() => {
    loadExchangeRates();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Live Exchange Rates Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Live Exchange Rates
              <Badge variant="secondary" className="text-xs">Updated Live</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {exchangeRates.map((rate, index) => (
                <div key={index} className="bg-muted/30 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">
                      {rate.fromFlag} {rate.from} / {rate.toFlag} {rate.to}
                    </span>
                  </div>
                  <div className="text-lg font-bold">
                    {rate.rate?.toFixed(4)}
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={loadExchangeRates}
              className="mt-4 w-full"
              disabled={isLoading}
            >
              Refresh Rates
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFromCurrency("USD");
                setToCurrency("EUR");
                setAmount("100");
              }}
              className="w-full justify-start text-sm"
            >
              🇺🇸 $100 → 🇪🇺 EUR
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFromCurrency("GBP");
                setToCurrency("USD");
                setAmount("50");
              }}
              className="w-full justify-start text-sm"
            >
              🇬🇧 £50 → 🇺🇸 USD
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFromCurrency("EUR");
                setToCurrency("JPY");
                setAmount("1000");
              }}
              className="w-full justify-start text-sm"
            >
              🇪🇺 €1000 → 🇯🇵 JPY
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Converter */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Currency Converter
            <Badge variant="secondary">Real-time Rates</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Conversion Interface */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* From Currency */}
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {popularCurrencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <span className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span>{currency.code}</span>
                        <span className="text-muted-foreground text-xs">{currency.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                min="0"
                step="0.01"
                className="text-lg font-medium"
              />
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleSwap}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </Button>
            </div>

            {/* To Currency */}
            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {popularCurrencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <span className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span>{currency.code}</span>
                        <span className="text-muted-foreground text-xs">{currency.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="bg-muted rounded-lg p-3 min-h-[48px] flex items-center">
                {isLoading ? (
                  <div className="animate-pulse text-muted-foreground">Converting...</div>
                ) : lastConversion ? (
                  <div className="font-medium text-lg">
                    {lastConversion.converted_amount?.toFixed(2)} {toCurrency}
                  </div>
                ) : (
                  <div className="text-muted-foreground">Result will appear here</div>
                )}
              </div>
            </div>
          </div>

          {/* Conversion Result Details */}
          {lastConversion && !isLoading && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xl font-semibold">
                  {lastConversion.amount} {lastConversion.from_currency} = {lastConversion.converted_amount?.toFixed(2)} {lastConversion.to_currency}
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Live Rate
                </Badge>
              </div>
              
              {lastConversion.exchange_rate && (
                <div className="text-sm text-muted-foreground">
                  Exchange Rate: 1 {lastConversion.from_currency} = {lastConversion.exchange_rate.toFixed(6)} {lastConversion.to_currency}
                </div>
              )}
              
              {lastConversion.date && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  Last updated: {new Date(lastConversion.date).toLocaleString()}
                </div>
              )}
            </div>
          )}

          {/* Quick Amount Buttons */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">Quick amounts:</span>
            <div className="flex gap-2 flex-wrap">
              {[1, 10, 50, 100, 500, 1000, 5000, 10000].map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount.toString())}
                  className="text-xs"
                >
                  {quickAmount.toLocaleString()}
                </Button>
              ))}
            </div>
          </div>

          {/* Popular Currency Pairs */}
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">Popular pairs:</span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {popularPairs.map(([from, to]) => (
                <Button
                  key={`${from}-${to}`}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFromCurrency(from);
                    setToCurrency(to);
                  }}
                  className="justify-start text-xs"
                >
                  {from}/{to}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
