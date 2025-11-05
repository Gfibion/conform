import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Star, History, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Unit {
  id: string;
  name: string;
  symbol: string;
  category: string;
  base_factor: number;
  is_base_unit: boolean;
}

interface ConversionHistory {
  id: string;
  from_unit_id: string;
  to_unit_id: string;
  from_value: number;
  to_value: number;
  from_unit: Unit;
  to_unit: Unit;
  created_at: string;
}

export const EnhancedUnitConverter = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fromUnit, setFromUnit] = useState<Unit | null>(null);
  const [toUnit, setToUnit] = useState<Unit | null>(null);
  const [fromValue, setFromValue] = useState("1");
  const [toValue, setToValue] = useState("");
  const [history, setHistory] = useState<ConversionHistory[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load units and categories from database
  useEffect(() => {
    loadUnits();
  }, []);

  const loadUnits = async () => {
    try {
      const { data: unitsData, error } = await supabase
        .from('units')
        .select('*')
        .order('category', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;

      if (unitsData) {
        setUnits(unitsData);
        const uniqueCategories = [...new Set(unitsData.map(unit => unit.category))];
        setCategories(uniqueCategories);
        if (uniqueCategories.length > 0) {
          setSelectedCategory(uniqueCategories[0]);
        }
      }
    } catch (error) {
      console.error('Error loading units:', error);
      toast({
        title: "Error",
        description: "Failed to load units from database",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Load conversion history
  const loadHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('conversion_history')
        .select(`
          *,
          from_unit:units!conversion_history_from_unit_id_fkey(*),
          to_unit:units!conversion_history_to_unit_id_fkey(*)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      if (data) setHistory(data);
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  // Load user favorites
  const loadFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from('user_favorite_conversions')
        .select(`
          *,
          from_unit:units!user_favorite_conversions_from_unit_id_fkey(*),
          to_unit:units!user_favorite_conversions_to_unit_id_fkey(*)
        `);

      if (error) throw error;
      if (data) setFavorites(data);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  // Initialize units when category changes
  useEffect(() => {
    if (selectedCategory && units.length > 0) {
      const categoryUnits = units.filter(unit => unit.category === selectedCategory);
      if (categoryUnits.length > 0) {
        setFromUnit(categoryUnits[0]);
        setToUnit(categoryUnits[1] || categoryUnits[0]);
      }
    }
  }, [selectedCategory, units]);

  // Update conversion when units change
  useEffect(() => {
    if (fromUnit && toUnit && fromValue) {
      const result = performConversion(fromValue, fromUnit, toUnit);
      setToValue(result);
    }
  }, [fromUnit, toUnit]);

  // Conversion logic
  const performConversion = (value: string, from: Unit, to: Unit): string => {
    if (!value || isNaN(Number(value)) || !from || !to) return "";
    
    const num = Number(value);
    
    if (from.category === "temperature") {
      const tempResult = convertTemperature(num, from.name, to.name);
      return tempResult.toFixed(4).replace(/\.?0+$/, "");
    }
    
    // Standard conversion using base factors
    const result = (num * from.base_factor) / to.base_factor;
    // Format with up to 6 decimal places, remove trailing zeros
    return result.toFixed(6).replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '');
  };

  const convertTemperature = (value: number, fromName: string, toName: string): number => {
    if (fromName === toName) return value;
    
    // Convert everything to Celsius first
    let celsius = value;
    switch (fromName) {
      case "Fahrenheit":
        celsius = (value - 32) * 5/9;
        break;
      case "Kelvin":
        celsius = value - 273.15;
        break;
      case "Rankine":
        celsius = (value - 491.67) * 5/9;
        break;
      case "Réaumur":
        celsius = value * 1.25;
        break;
      default:
        celsius = value; // assume celsius
    }
    
    // Convert from Celsius to target
    switch (toName) {
      case "Fahrenheit":
        return celsius * 9/5 + 32;
      case "Kelvin":
        return celsius + 273.15;
      case "Rankine":
        return (celsius + 273.15) * 9/5;
      case "Réaumur":
        return celsius * 0.8;
      default:
        return celsius; // assume celsius
    }
  };

  // Save conversion to history
  const saveConversionHistory = async (fromVal: string, toVal: string) => {
    if (!fromUnit || !toUnit || !fromVal || !toVal) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Only save to history if user is authenticated
      if (!user) return;

      const { error } = await supabase
        .from('conversion_history')
        .insert([{
          user_id: user.id,
          from_unit_id: fromUnit.id,
          to_unit_id: toUnit.id,
          from_value: Number(fromVal),
          to_value: Number(toVal)
        }]);

      if (error) throw error;
    } catch (error) {
      console.error('Error saving conversion history:', error);
    }
  };

  // Handle input changes
  const handleFromValueChange = (value: string) => {
    setFromValue(value);
    if (fromUnit && toUnit) {
      const result = performConversion(value, fromUnit, toUnit);
      setToValue(result);
      if (value && result) {
        saveConversionHistory(value, result);
      }
    }
  };

  const handleToValueChange = (value: string) => {
    setToValue(value);
    if (fromUnit && toUnit) {
      const result = performConversion(value, toUnit, fromUnit);
      setFromValue(result);
      if (value && result) {
        saveConversionHistory(result, value);
      }
    }
  };

  // Swap units
  const swapUnits = () => {
    if (fromUnit && toUnit) {
      setFromUnit(toUnit);
      setToUnit(fromUnit);
      setFromValue(toValue);
      setToValue(fromValue);
    }
  };

  // Add to favorites
  const addToFavorites = async () => {
    if (!fromUnit || !toUnit) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to save favorites",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('user_favorite_conversions')
        .insert([{
          user_id: user.id,
          from_unit_id: fromUnit.id,
          to_unit_id: toUnit.id
        }]);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Conversion added to favorites"
      });
      
      loadFavorites();
    } catch (error) {
      console.error('Error adding to favorites:', error);
      toast({
        title: "Error",
        description: "Failed to add to favorites",
        variant: "destructive"
      });
    }
  };

  const categoryUnits = units.filter(unit => unit.category === selectedCategory);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-10 bg-muted rounded"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-20 bg-muted rounded"></div>
                <div className="h-20 bg-muted rounded"></div>
                <div className="h-20 bg-muted rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Enhanced Unit Converter
            <Badge variant="secondary">Database Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Conversion Interface */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* From */}
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <Select 
                value={fromUnit?.id || ""} 
                onValueChange={(value) => {
                  const unit = categoryUnits.find(u => u.id === value);
                  setFromUnit(unit || null);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {categoryUnits.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.name} ({unit.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input 
                type="number"
                value={fromValue}
                onChange={(e) => handleFromValueChange(e.target.value)}
                placeholder="Enter value"
              />
            </div>

            {/* Swap Button */}
            <div className="flex justify-center space-x-2">
              <button
                onClick={swapUnits}
                className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
              <Button
                onClick={addToFavorites}
                variant="outline"
                size="sm"
                className="p-2"
              >
                <Heart className="w-4 h-4" />
              </Button>
            </div>

            {/* To */}
            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <Select 
                value={toUnit?.id || ""} 
                onValueChange={(value) => {
                  const unit = categoryUnits.find(u => u.id === value);
                  setToUnit(unit || null);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {categoryUnits.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.name} ({unit.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input 
                type="number"
                value={toValue}
                onChange={(e) => handleToValueChange(e.target.value)}
                placeholder="Result"
              />
            </div>
          </div>

          {/* Result Display */}
          {fromValue && toValue && fromUnit && toUnit && (
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">{fromValue} {fromUnit.symbol}</span>
                {" = "}
                <span className="font-medium">{toValue} {toUnit.symbol}</span>
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={loadHistory} variant="outline" size="sm">
              <History className="w-4 h-4 mr-2" />
              Load History
            </Button>
            <Button onClick={loadFavorites} variant="outline" size="sm">
              <Star className="w-4 h-4 mr-2" />
              Load Favorites
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* History and Favorites */}
      {(history.length > 0 || favorites.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Conversions */}
          {history.length > 0 && (
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Recent Conversions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {history.slice(0, 5).map((item) => (
                    <div key={item.id} className="bg-muted/30 rounded-lg p-3 text-sm">
                      <div className="font-medium">
                        {item.from_value} {item.from_unit.symbol} → {item.to_value} {item.to_unit.symbol}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {new Date(item.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Favorite Conversions */}
          {favorites.length > 0 && (
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Favorite Conversions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {favorites.slice(0, 5).map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-muted/30 rounded-lg p-3 text-sm cursor-pointer hover:bg-muted/50"
                      onClick={() => {
                        setFromUnit(item.from_unit);
                        setToUnit(item.to_unit);
                        setSelectedCategory(item.from_unit.category);
                      }}
                    >
                      <div className="font-medium">
                        {item.from_unit.name} → {item.to_unit.name}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {item.from_unit.symbol} to {item.to_unit.symbol}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};