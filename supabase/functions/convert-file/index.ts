import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ConversionRequest {
  conversion_type: string;
  input_data?: any;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    let user = null;
    try {
      const authHeader = req.headers.get("Authorization");
      if (authHeader && !authHeader.includes("anon")) {
        const token = authHeader.replace("Bearer ", "");
        const { data } = await supabaseClient.auth.getUser(token);
        user = data.user;
      }
    } catch (error) {
      console.log("Processing without authentication:", error.message);
    }

    const { conversion_type, input_data }: ConversionRequest = await req.json();
    
    // Input validation
    const validConversionTypes = ['currency_convert', 'unit_convert'];
    if (!conversion_type || !validConversionTypes.includes(conversion_type)) {
      return new Response(
        JSON.stringify({ error: 'Invalid conversion type' }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    if (!input_data || typeof input_data !== 'object') {
      return new Response(
        JSON.stringify({ error: 'Invalid input data' }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    console.log(`Starting conversion: ${conversion_type}, User: ${user?.id || 'anonymous'}`);

    let jobId = null;
    if (user) {
      const { data: job } = await supabaseClient
        .from("conversion_jobs")
        .insert({
          user_id: user.id,
          conversion_type,
          status: "processing",
          input_data,
        })
        .select()
        .maybeSingle();
      
      jobId = job?.id;
    }

    const startTime = Date.now();
    let result: any = {};

    try {
      switch (conversion_type) {
        case "currency_convert":
          result = await handleCurrencyConversion(input_data, supabaseClient);
          break;
        
        case "unit_convert":
          result = handleUnitConversion(input_data);
          break;
        
        default:
          throw new Error(`Conversion type ${conversion_type} not supported`);
      }

      const processingTime = Date.now() - startTime;

      if (user && jobId) {
        await supabaseClient
          .from("conversion_jobs")
          .update({
            status: "completed",
            output_data: result,
            processing_time_ms: processingTime,
            completed_at: new Date().toISOString(),
          })
          .eq("id", jobId);
      }

      console.log(`Conversion completed in ${processingTime}ms`);

      return new Response(
        JSON.stringify({
          success: true,
          job_id: jobId,
          result,
          processing_time_ms: processingTime,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );

    } catch (conversionError: any) {
      console.error("Conversion error:", conversionError);
      
      if (user && jobId) {
        await supabaseClient
          .from("conversion_jobs")
          .update({
            status: "failed",
            error_message: conversionError.message,
          })
          .eq("id", jobId);
      }

      await supabaseClient.from("system_logs").insert({
        log_level: "error",
        source: "convert-file",
        message: `Conversion failed: ${conversion_type}`,
        metadata: { error: conversionError.message, input_data },
        user_id: user?.id,
      });

      return new Response(
        JSON.stringify({ 
          success: false,
          error: "Conversion failed", 
          details: conversionError.message,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

  } catch (error: any) {
    console.error("General error:", error);
    
    try {
      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );
      
      await supabaseClient.from("system_logs").insert({
        log_level: "critical",
        source: "convert-file",
        message: "Unhandled error in file conversion",
        metadata: { error: error.message, stack: error.stack },
      });
    } catch (logError) {
      console.error("Failed to log error:", logError);
    }

    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

async function handleCurrencyConversion(inputData: any, supabaseClient: any) {
  const exchangeRatesApiKey = Deno.env.get("EXCHANGE_RATES_API_KEY");
  
  const { amount, from_currency, to_currency } = inputData;
  
  // Validate currency conversion inputs
  if (typeof amount !== 'number' || amount <= 0 || amount > 1e15 || !isFinite(amount)) {
    throw new Error('Invalid amount: must be a positive number less than 1e15');
  }
  
  const validCurrencies = [
    'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD',
    'INR', 'BRL', 'ZAR', 'RUB', 'KRW', 'SGD', 'HKD', 'NOK', 'MXN', 'TRY'
  ];
  
  if (!from_currency || !validCurrencies.includes(from_currency)) {
    throw new Error('Invalid source currency code');
  }
  
  if (!to_currency || !validCurrencies.includes(to_currency)) {
    throw new Error('Invalid target currency code');
  }
  
  if (!exchangeRatesApiKey) {
    console.log("Exchange Rates API key not configured, using fallback rates");
    
    const fallbackRates: { [key: string]: number } = {
      USD: 1.0,
      EUR: 0.92,
      GBP: 0.79,
      JPY: 149.50,
      AUD: 1.53,
      CAD: 1.36,
      CHF: 0.88,
      CNY: 7.24,
      INR: 83.12,
      MXN: 17.06,
    };
    
    const fromRate = fallbackRates[from_currency] || 1;
    const toRate = fallbackRates[to_currency] || 1;
    const rate = toRate / fromRate;
    const convertedAmount = amount * rate;
    
    await supabaseClient.from("system_logs").insert({
      log_level: "warning",
      source: "convert-file",
      message: "Using fallback exchange rates",
      metadata: { from_currency, to_currency, amount },
    });
    
    return {
      original_amount: amount,
      from_currency,
      to_currency,
      converted_amount: convertedAmount,
      exchange_rate: rate,
      date: new Date().toISOString().split('T')[0],
      using_fallback: true,
    };
  }
  
  try {
    const response = await fetch(
      `https://api.exchangeratesapi.io/v1/latest?access_key=${exchangeRatesApiKey}&base=${from_currency}&symbols=${to_currency}`
    );
    
    const data = await response.json();
    
    if (data.success && data.rates && data.rates[to_currency]) {
      const rate = data.rates[to_currency];
      const convertedAmount = amount * rate;
      
      return {
        original_amount: amount,
        from_currency,
        to_currency,
        converted_amount: convertedAmount,
        exchange_rate: rate,
        date: data.date,
        using_fallback: false,
      };
    } else {
      throw new Error(data.error?.info || "Currency conversion failed");
    }
  } catch (error: any) {
    console.error("Exchange Rates API error:", error);
    await supabaseClient.from("system_logs").insert({
      log_level: "error",
      source: "convert-file",
      message: "Exchange Rates API error",
      metadata: { error: error.message, from_currency, to_currency },
    });
    throw new Error("Currency conversion failed: " + error.message);
  }
}

function handleUnitConversion(inputData: any) {
  const { value, from_unit, to_unit, category } = inputData;
  
  const conversions: { [key: string]: any } = {
    length: {
      meter: 1,
      kilometer: 0.001,
      centimeter: 100,
      millimeter: 1000,
      inch: 39.3701,
      foot: 3.28084,
      yard: 1.09361,
      mile: 0.000621371,
    },
    weight: {
      kilogram: 1,
      gram: 1000,
      milligram: 1000000,
      pound: 2.20462,
      ounce: 35.274,
      ton: 0.001,
      stone: 0.157473,
    },
    temperature: {
      celsius: (c: number, to: string) => {
        if (to === "fahrenheit") return c * 9/5 + 32;
        if (to === "kelvin") return c + 273.15;
        if (to === "rankine") return (c + 273.15) * 9/5;
        return c;
      },
      fahrenheit: (f: number, to: string) => {
        if (to === "celsius") return (f - 32) * 5/9;
        if (to === "kelvin") return (f - 32) * 5/9 + 273.15;
        if (to === "rankine") return f + 459.67;
        return f;
      },
      kelvin: (k: number, to: string) => {
        if (to === "celsius") return k - 273.15;
        if (to === "fahrenheit") return (k - 273.15) * 9/5 + 32;
        if (to === "rankine") return k * 9/5;
        return k;
      },
    },
    volume: {
      liter: 1,
      milliliter: 1000,
      gallon: 0.264172,
      quart: 1.05669,
      pint: 2.11338,
      cup: 4.22675,
      fluid_ounce: 33.814,
      cubic_meter: 0.001,
      cubic_foot: 0.0353147,
    },
    time: {
      second: 1,
      minute: 1/60,
      hour: 1/3600,
      day: 1/86400,
      week: 1/604800,
      month: 1/2592000,
      year: 1/31536000,
    },
    speed: {
      meters_per_second: 1,
      kilometers_per_hour: 3.6,
      miles_per_hour: 2.23694,
      feet_per_second: 3.28084,
      knots: 1.94384,
    },
    area: {
      square_meter: 1,
      square_kilometer: 0.000001,
      square_foot: 10.7639,
      square_yard: 1.19599,
      square_mile: 3.861e-7,
      acre: 0.000247105,
      hectare: 0.0001,
    },
  };
  
  let result = value;
  
  if (category === "temperature") {
    const tempConversions = conversions.temperature as any;
    if (tempConversions[from_unit]) {
      result = tempConversions[from_unit](value, to_unit);
    }
  } else if (conversions[category]) {
    const categoryConversions = conversions[category] as any;
    if (categoryConversions[from_unit] && categoryConversions[to_unit]) {
      result = (value / categoryConversions[from_unit]) * categoryConversions[to_unit];
    }
  }
  
  return {
    original_value: value,
    from_unit,
    to_unit,
    converted_value: result,
    category,
  };
}