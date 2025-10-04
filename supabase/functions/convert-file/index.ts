import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ConversionRequest {
  conversion_type: string
  input_data?: any
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Try to get user for tracking (optional)
    let user = null
    try {
      const authHeader = req.headers.get('Authorization')
      if (authHeader && !authHeader.includes('anon')) {
        const { data } = await supabaseClient.auth.getUser(authHeader.replace('Bearer ', ''))
        user = data.user
      }
    } catch {
      console.log('Processing without authentication')
    }

    const { conversion_type, input_data }: ConversionRequest = await req.json()
    console.log(`Starting conversion: ${conversion_type}`)

    // Create job record if user is authenticated
    let jobId = null
    if (user) {
      const { data: job } = await supabaseClient
        .from('conversion_jobs')
        .insert({
          user_id: user.id,
          conversion_type,
          status: 'processing',
          input_data,
        })
        .select()
        .single()
      
      jobId = job?.id
    }

    const startTime = Date.now()
    let result: any = {}

    try {
      // Handle conversions
      switch (conversion_type) {
        case 'currency_convert':
          result = await handleCurrencyConversion(input_data)
          break
        
        case 'unit_convert':
          result = handleUnitConversion(input_data)
          break
        
        default:
          throw new Error(`Conversion type ${conversion_type} not supported`)
      }

      const processingTime = Date.now() - startTime

      // Update job if authenticated
      if (user && jobId) {
        await supabaseClient
          .from('conversion_jobs')
          .update({
            status: 'completed',
            output_data: result,
            processing_time_ms: processingTime,
            completed_at: new Date().toISOString(),
          })
          .eq('id', jobId)
      }

      return new Response(
        JSON.stringify({
          success: true,
          job_id: jobId,
          result,
          processing_time_ms: processingTime
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )

    } catch (conversionError) {
      console.error('Conversion error:', conversionError)
      
      if (user && jobId) {
        await supabaseClient
          .from('conversion_jobs')
          .update({
            status: 'failed',
            error_message: conversionError.message,
          })
          .eq('id', jobId)
      }

      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Conversion failed', 
          details: conversionError.message 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

  } catch (error) {
    console.error('General error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

async function handleCurrencyConversion(inputData: any) {
  const exchangeRatesApiKey = Deno.env.get('EXCHANGE_RATES_API_KEY')
  
  if (!exchangeRatesApiKey) {
    throw new Error('Exchange Rates API key not configured')
  }

  const { amount, from_currency, to_currency } = inputData
  
  try {
    const response = await fetch(
      `https://api.exchangeratesapi.io/v1/convert?access_key=${exchangeRatesApiKey}&from=${from_currency}&to=${to_currency}&amount=${amount}`
    )
    const data = await response.json()
    
    if (data.success) {
      return {
        original_amount: amount,
        from_currency,
        to_currency,
        converted_amount: data.result,
        exchange_rate: data.info?.rate,
        date: data.date
      }
    } else {
      throw new Error(data.error?.info || 'Currency conversion failed')
    }
  } catch (error) {
    console.error('Exchange Rates API error:', error)
    throw new Error('Currency conversion failed')
  }
}

function handleUnitConversion(inputData: any) {
  const { value, from_unit, to_unit, category } = inputData
  
  const conversions = {
    length: {
      meter: 1,
      kilometer: 0.001,
      centimeter: 100,
      millimeter: 1000,
      inch: 39.3701,
      foot: 3.28084,
      yard: 1.09361,
      mile: 0.000621371
    },
    weight: {
      kilogram: 1,
      gram: 1000,
      pound: 2.20462,
      ounce: 35.274,
      ton: 0.001,
      stone: 0.157473
    },
    temperature: {
      celsius: (c: number, to: string) => {
        if (to === 'fahrenheit') return c * 9/5 + 32
        if (to === 'kelvin') return c + 273.15
        if (to === 'rankine') return (c + 273.15) * 9/5
        return c
      },
      fahrenheit: (f: number, to: string) => {
        if (to === 'celsius') return (f - 32) * 5/9
        if (to === 'kelvin') return (f - 32) * 5/9 + 273.15
        if (to === 'rankine') return f + 459.67
        return f
      },
      kelvin: (k: number, to: string) => {
        if (to === 'celsius') return k - 273.15
        if (to === 'fahrenheit') return (k - 273.15) * 9/5 + 32
        if (to === 'rankine') return k * 9/5
        return k
      }
    },
    volume: {
      liter: 1,
      milliliter: 1000,
      gallon: 0.264172,
      quart: 1.05669,
      pint: 2.11338,
      cup: 4.22675,
      fluid_ounce: 33.814
    },
    time: {
      second: 1,
      minute: 1/60,
      hour: 1/3600,
      day: 1/86400,
      week: 1/604800,
      month: 1/2592000,
      year: 1/31536000
    }
  }
  
  let result = value
  
  if (category === 'temperature') {
    const tempConversions = conversions.temperature as any
    if (tempConversions[from_unit]) {
      result = tempConversions[from_unit](value, to_unit)
    }
  } else if (conversions[category as keyof typeof conversions]) {
    const categoryConversions = conversions[category as keyof typeof conversions] as any
    if (categoryConversions[from_unit] && categoryConversions[to_unit]) {
      result = (value / categoryConversions[from_unit]) * categoryConversions[to_unit]
    }
  }
  
  return {
    original_value: value,
    from_unit,
    to_unit,
    converted_value: result,
    category
  }
}
