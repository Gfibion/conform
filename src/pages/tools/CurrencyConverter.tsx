import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { EnhancedCurrencyConverter } from "@/components/tools/EnhancedCurrencyConverter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const CurrencyConverterPage = () => {
  const tickerContainerRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check theme
    const theme = localStorage.getItem("theme") || "light";
    setIsDark(theme === "dark");
  }, []);

  useEffect(() => {
    // Load TradingView Ticker Tape Widget
    if (tickerContainerRef.current) {
      // Clear existing widget
      tickerContainerRef.current.innerHTML = '';
      
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbols": [
          {
            "proName": "FOREXCOM:SPXUSD",
            "title": "S&P 500"
          },
          {
            "proName": "FOREXCOM:NSXUSD",
            "title": "US 100"
          },
          {
            "proName": "FX_IDC:EURUSD",
            "title": "EUR to USD"
          },
          {
            "proName": "FX_IDC:USDJPY",
            "title": "USD to JPY"
          },
          {
            "proName": "FX_IDC:GBPUSD",
            "title": "GBP to USD"
          },
          {
            "proName": "FX_IDC:USDCHF",
            "title": "USD to CHF"
          },
          {
            "proName": "FX_IDC:AUDUSD",
            "title": "AUD to USD"
          },
          {
            "proName": "FX_IDC:USDCAD",
            "title": "USD to CAD"
          },
          {
            "description": "Bitcoin",
            "proName": "COINBASE:BTCUSD"
          },
          {
            "description": "Ethereum",
            "proName": "COINBASE:ETHUSD"
          },
          {
            "description": "Ripple",
            "proName": "BINANCE:XRPUSDT"
          },
          {
            "description": "Litecoin",
            "proName": "COINBASE:LTCUSD"
          },
          {
            "description": "Cardano",
            "proName": "BINANCE:ADAUSDT"
          },
          {
            "description": "Solana",
            "proName": "BINANCE:SOLUSDT"
          }
        ],
        "showSymbolLogo": true,
        "colorTheme": isDark ? "dark" : "light",
        "isTransparent": false,
        "displayMode": "adaptive",
        "locale": "en"
      });

      tickerContainerRef.current.appendChild(script);
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="p-2 h-auto hover:bg-accent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-4">
            <DollarSign className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground/80">Real-Time Exchange Rates</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Currency Converter</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert between different currencies with real-time exchange rates. Track live market prices for forex and cryptocurrencies.
          </p>
        </div>

        {/* TradingView Ticker Tape */}
        <Card className="mb-8 overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Live Market Prices</h2>
              </div>
              <div 
                ref={tickerContainerRef}
                className="tradingview-widget-container"
                style={{ height: "62px" }}
              >
                <div className="tradingview-widget-container__widget"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Currency Converter */}
        <EnhancedCurrencyConverter />

        {/* Additional Information */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">180+ Currencies</h3>
              <p className="text-sm text-muted-foreground">
                Support for all major world currencies and cryptocurrencies
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Real-Time Rates</h3>
              <p className="text-sm text-muted-foreground">
                Live exchange rates updated continuously from global markets
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold mb-2">Market Insights</h3>
              <p className="text-sm text-muted-foreground">
                Track forex, stocks, and cryptocurrency prices in one place
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CurrencyConverterPage;
