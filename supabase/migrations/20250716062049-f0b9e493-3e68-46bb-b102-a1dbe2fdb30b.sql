-- Create enum for unit categories
CREATE TYPE public.unit_category AS ENUM (
  'temperature',
  'length', 
  'mass',
  'time',
  'volume',
  'energy',
  'power',
  'speed',
  'pressure',
  'frequency',
  'area',
  'data',
  'angle'
);

-- Create units table
CREATE TABLE public.units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  symbol TEXT NOT NULL,
  category unit_category NOT NULL,
  base_factor DECIMAL NOT NULL, -- conversion factor to base unit
  is_base_unit BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create conversion history table
CREATE TABLE public.conversion_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  from_unit_id UUID REFERENCES public.units(id) NOT NULL,
  to_unit_id UUID REFERENCES public.units(id) NOT NULL,
  from_value DECIMAL NOT NULL,
  to_value DECIMAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user favorites table
CREATE TABLE public.user_favorite_conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  from_unit_id UUID REFERENCES public.units(id) NOT NULL,
  to_unit_id UUID REFERENCES public.units(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, from_unit_id, to_unit_id)
);

-- Enable RLS
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversion_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorite_conversions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for units (public read access)
CREATE POLICY "Units are publicly readable"
ON public.units FOR SELECT
USING (true);

-- RLS Policies for conversion history (user-specific)
CREATE POLICY "Users can view their own conversion history"
ON public.conversion_history FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own conversion history"
ON public.conversion_history FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user favorites (user-specific)
CREATE POLICY "Users can view their own favorites"
ON public.user_favorite_conversions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own favorites"
ON public.user_favorite_conversions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own favorites"
ON public.user_favorite_conversions FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
ON public.user_favorite_conversions FOR DELETE
USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for units table
CREATE TRIGGER update_units_updated_at
  BEFORE UPDATE ON public.units
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert all units data
INSERT INTO public.units (name, symbol, category, base_factor, is_base_unit) VALUES
-- Temperature (base: Celsius)
('Celsius', '°C', 'temperature', 1, TRUE),
('Fahrenheit', '°F', 'temperature', 1, FALSE), -- special conversion
('Kelvin', 'K', 'temperature', 1, FALSE), -- special conversion
('Rankine', '°R', 'temperature', 1, FALSE), -- special conversion
('Réaumur', '°Ré', 'temperature', 1, FALSE), -- special conversion

-- Length (base: meter)
('Nanometer', 'nm', 'length', 1e-9, FALSE),
('Micrometer', 'µm', 'length', 1e-6, FALSE),
('Millimeter', 'mm', 'length', 0.001, FALSE),
('Centimeter', 'cm', 'length', 0.01, FALSE),
('Decimeter', 'dm', 'length', 0.1, FALSE),
('Meter', 'm', 'length', 1, TRUE),
('Kilometer', 'km', 'length', 1000, FALSE),
('Inch', 'in', 'length', 0.0254, FALSE),
('Foot', 'ft', 'length', 0.3048, FALSE),
('Yard', 'yd', 'length', 0.9144, FALSE),
('Mile', 'mi', 'length', 1609.344, FALSE),
('Angstrom', 'Å', 'length', 1e-10, FALSE),
('Fathom', 'fth', 'length', 1.8288, FALSE),
('Nautical Mile', 'nmi', 'length', 1852, FALSE),
('Astronomical Unit', 'AU', 'length', 149597870700, FALSE),
('Light Year', 'ly', 'length', 9.461e15, FALSE),
('Parsec', 'pc', 'length', 3.086e16, FALSE),

-- Mass (base: kilogram)
('Milligram', 'mg', 'mass', 1e-6, FALSE),
('Gram', 'g', 'mass', 0.001, FALSE),
('Kilogram', 'kg', 'mass', 1, TRUE),
('Tonne', 't', 'mass', 1000, FALSE),
('Grain', 'gr', 'mass', 6.479891e-5, FALSE),
('Ounce', 'oz', 'mass', 0.0283495, FALSE),
('Pound', 'lb', 'mass', 0.453592, FALSE),
('Stone', 'st', 'mass', 6.35029, FALSE),
('Short Ton', 'ton (US)', 'mass', 907.185, FALSE),
('Long Ton', 'ton (UK)', 'mass', 1016.05, FALSE),
('Carat', 'ct', 'mass', 0.0002, FALSE),
('Tola', 'tola', 'mass', 0.01166, FALSE),

-- Time (base: second)
('Nanosecond', 'ns', 'time', 1e-9, FALSE),
('Microsecond', 'µs', 'time', 1e-6, FALSE),
('Millisecond', 'ms', 'time', 0.001, FALSE),
('Second', 's', 'time', 1, TRUE),
('Minute', 'min', 'time', 60, FALSE),
('Hour', 'hr', 'time', 3600, FALSE),
('Day', 'day', 'time', 86400, FALSE),
('Week', 'wk', 'time', 604800, FALSE),
('Fortnight', 'fn', 'time', 1209600, FALSE),
('Year', 'yr', 'time', 31557600, FALSE),
('Decade', 'decade', 'time', 315576000, FALSE),
('Century', 'century', 'time', 3155760000, FALSE),
('Millennium', 'millennium', 'time', 31557600000, FALSE),
('Shake', 'shake', 'time', 1e-8, FALSE),

-- Volume (base: liter)
('Milliliter', 'mL', 'volume', 0.001, FALSE),
('Centiliter', 'cL', 'volume', 0.01, FALSE),
('Liter', 'L', 'volume', 1, TRUE),
('Cubic Meter', 'm³', 'volume', 1000, FALSE),
('Fluid Ounce', 'fl oz', 'volume', 0.0295735, FALSE),
('Cup', 'cup', 'volume', 0.236588, FALSE),
('Pint', 'pt', 'volume', 0.473176, FALSE),
('Quart', 'qt', 'volume', 0.946353, FALSE),
('Gallon (US)', 'gal', 'volume', 3.78541, FALSE),
('Cubic Inch', 'in³', 'volume', 0.0163871, FALSE),
('Cubic Foot', 'ft³', 'volume', 28.3168, FALSE),

-- Energy (base: joule)
('Joule', 'J', 'energy', 1, TRUE),
('Kilojoule', 'kJ', 'energy', 1000, FALSE),
('Calorie', 'cal', 'energy', 4.184, FALSE),
('Kilocalorie', 'kcal', 'energy', 4184, FALSE),
('Watt Hour', 'Wh', 'energy', 3600, FALSE),
('Kilowatt Hour', 'kWh', 'energy', 3600000, FALSE),
('Electron Volt', 'eV', 'energy', 1.602e-19, FALSE),
('British Thermal Unit', 'BTU', 'energy', 1055.06, FALSE),
('Foot-Pound', 'ft·lbf', 'energy', 1.3558, FALSE),

-- Power (base: watt)
('Watt', 'W', 'power', 1, TRUE),
('Kilowatt', 'kW', 'power', 1000, FALSE),
('Megawatt', 'MW', 'power', 1000000, FALSE),
('Horsepower', 'hp', 'power', 745.7, FALSE),

-- Speed (base: meter per second)
('Meter per Second', 'm/s', 'speed', 1, TRUE),
('Kilometer per Hour', 'km/h', 'speed', 0.277778, FALSE),
('Mile per Hour', 'mph', 'speed', 0.44704, FALSE),
('Knot', 'kn', 'speed', 0.514444, FALSE),
('Foot per Second', 'ft/s', 'speed', 0.3048, FALSE),

-- Pressure (base: pascal)
('Pascal', 'Pa', 'pressure', 1, TRUE),
('Kilopascal', 'kPa', 'pressure', 1000, FALSE),
('Atmosphere', 'atm', 'pressure', 101325, FALSE),
('Bar', 'bar', 'pressure', 100000, FALSE),
('Millimeter of Mercury', 'mmHg', 'pressure', 133.322, FALSE),
('Pounds per Square Inch', 'psi', 'pressure', 6894.76, FALSE),
('Torr', 'Torr', 'pressure', 133.322, FALSE),

-- Frequency (base: hertz)
('Hertz', 'Hz', 'frequency', 1, TRUE),
('Kilohertz', 'kHz', 'frequency', 1000, FALSE),
('Megahertz', 'MHz', 'frequency', 1000000, FALSE),
('Gigahertz', 'GHz', 'frequency', 1000000000, FALSE),

-- Area (base: square meter)
('Square Meter', 'm²', 'area', 1, TRUE),
('Square Kilometer', 'km²', 'area', 1000000, FALSE),
('Square Centimeter', 'cm²', 'area', 0.0001, FALSE),
('Hectare', 'ha', 'area', 10000, FALSE),
('Square Foot', 'ft²', 'area', 0.092903, FALSE),
('Square Inch', 'in²', 'area', 0.00064516, FALSE),
('Acre', 'ac', 'area', 4046.86, FALSE),
('Square Mile', 'mi²', 'area', 2589988.11, FALSE),
('Barn', 'b', 'area', 1e-28, FALSE),

-- Data (base: byte)
('Bit', 'bit', 'data', 0.125, FALSE),
('Nibble', 'nibble', 'data', 0.5, FALSE),
('Byte', 'B', 'data', 1, TRUE),
('Kilobyte', 'KB', 'data', 1024, FALSE),
('Megabyte', 'MB', 'data', 1048576, FALSE),
('Gigabyte', 'GB', 'data', 1073741824, FALSE),
('Terabyte', 'TB', 'data', 1099511627776, FALSE),

-- Angle (base: degree)
('Degree', '°', 'angle', 1, TRUE),
('Radian', 'rad', 'angle', 57.2958, FALSE),
('Gradian', 'grad', 'angle', 0.9, FALSE),
('Revolution', 'rev', 'angle', 360, FALSE),
('Arcminute', 'arcmin', 'angle', 0.0166667, FALSE),
('Arcsecond', 'arcsec', 'angle', 0.000277778, FALSE);