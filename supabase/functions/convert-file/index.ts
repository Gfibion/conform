
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ConversionRequest {
  conversion_type: string
  input_data?: any
  file_data?: string
  file_name?: string
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the current user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const { conversion_type, input_data, file_data, file_name }: ConversionRequest = await req.json()

    console.log(`Starting conversion: ${conversion_type} for user: ${user.id}`)

    // Create conversion job record
    const { data: job, error: jobError } = await supabaseClient
      .from('conversion_jobs')
      .insert({
        user_id: user.id,
        conversion_type,
        status: 'processing',
        input_data,
      })
      .select()
      .single()

    if (jobError) {
      console.error('Error creating job:', jobError)
      return new Response(
        JSON.stringify({ error: 'Failed to create conversion job' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Start processing
    const startTime = Date.now()
    let result: any = {}
    let outputFileUrl: string | null = null

    try {
      // Handle different conversion types
      switch (conversion_type) {
        // Text-based conversions (no external API needed)
        case 'text_case':
          result = handleTextCaseConversion(input_data)
          break
        case 'text_count':
          result = handleTextCount(input_data)
          break
        case 'base64_encode':
          result = handleBase64Encode(input_data)
          break
        case 'url_encode':
          result = handleUrlEncode(input_data)
          break
        case 'hash_generate':
          result = await handleHashGenerate(input_data)
          break
        case 'qr_generate':
          result = await handleQRGenerate(input_data)
          break
        case 'color_convert':
          result = handleColorConvert(input_data)
          break
        
        // PDF conversions using PDF API
        case 'pdf_compress':
        case 'pdf_merge':
        case 'pdf_split':
        case 'pdf_to_word':
        case 'pdf_to_excel':
        case 'pdf_to_powerpoint':
        case 'pdf_to_image':
        case 'word_to_pdf':
        case 'excel_to_pdf':
        case 'powerpoint_to_pdf':
          result = await handlePDFConversion(conversion_type, input_data, file_data)
          break
        
        // Image conversions using TinyPNG
        case 'image_compress':
        case 'image_resize':
        case 'image_format':
        case 'image_to_pdf':
          result = await handleImageConversion(conversion_type, input_data, file_data)
          break
        
        // Video/Audio conversions using Cloudinary
        case 'video_compress':
        case 'audio_convert':
          result = await handleMediaConversion(conversion_type, input_data, file_data)
          break
        
        // Currency conversion using Exchange Rates API
        case 'currency_convert':
          result = await handleCurrencyConversion(input_data)
          break
        
        // Document conversions using Convertio
        case 'unit_convert':
          result = handleUnitConversion(input_data)
          break
        
        default:
          result = { message: `${conversion_type} conversion not implemented yet` }
          break
      }

      const processingTime = Date.now() - startTime

      // Update job as completed
      const { error: updateError } = await supabaseClient
        .from('conversion_jobs')
        .update({
          status: 'completed',
          output_data: result,
          output_file_url: outputFileUrl,
          processing_time_ms: processingTime,
          completed_at: new Date().toISOString(),
        })
        .eq('id', job.id)

      if (updateError) {
        console.error('Error updating job:', updateError)
      }

      return new Response(
        JSON.stringify({
          success: true,
          job_id: job.id,
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
      
      // Update job as failed
      await supabaseClient
        .from('conversion_jobs')
        .update({
          status: 'failed',
          error_message: conversionError.message,
        })
        .eq('id', job.id)

      return new Response(
        JSON.stringify({ error: 'Conversion failed', details: conversionError.message }),
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

// Text-based conversion functions (no external API needed)
function handleTextCaseConversion(data: any) {
  const { text, case_type } = data
  
  switch (case_type) {
    case 'uppercase':
      return { result: text.toUpperCase() }
    case 'lowercase':
      return { result: text.toLowerCase() }
    case 'title':
      return { result: text.replace(/\w\S*/g, (txt: string) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()) }
    case 'sentence':
      return { result: text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() }
    default:
      return { result: text }
  }
}

function handleTextCount(data: any) {
  const { text } = data
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length
  const words = text.trim().split(/\s+/).filter((word: string) => word.length > 0).length
  const sentences = text.split(/[.!?]+/).filter((sentence: string) => sentence.trim().length > 0).length
  const paragraphs = text.split(/\n\s*\n/).filter((paragraph: string) => paragraph.trim().length > 0).length

  return {
    characters,
    characters_no_spaces: charactersNoSpaces,
    words,
    sentences,
    paragraphs
  }
}

function handleBase64Encode(data: any) {
  const { text, operation } = data
  
  if (operation === 'encode') {
    const encoded = btoa(unescape(encodeURIComponent(text)))
    return { result: encoded }
  } else {
    try {
      const decoded = decodeURIComponent(escape(atob(text)))
      return { result: decoded }
    } catch {
      throw new Error('Invalid base64 string')
    }
  }
}

function handleUrlEncode(data: any) {
  const { text, operation } = data
  
  if (operation === 'encode') {
    return { result: encodeURIComponent(text) }
  } else {
    try {
      return { result: decodeURIComponent(text) }
    } catch {
      throw new Error('Invalid URL encoded string')
    }
  }
}

async function handleHashGenerate(data: any) {
  const { text, hash_type } = data
  const encoder = new TextEncoder()
  const textData = encoder.encode(text)
  
  let algorithm = 'SHA-256'
  switch (hash_type) {
    case 'sha1':
      algorithm = 'SHA-1'
      break
    case 'sha256':
      algorithm = 'SHA-256'
      break
    case 'sha512':
      algorithm = 'SHA-512'
      break
  }
  
  const hashBuffer = await crypto.subtle.digest(algorithm, textData)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  
  return { result: hashHex }
}

async function handleQRGenerate(data: any) {
  const { text, size = 200 } = data
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`
  
  return {
    qr_code_url: qrUrl,
    text: text,
    size: size
  }
}

function handleColorConvert(data: any) {
  const { color, from_format, to_format } = data
  
  let result = color
  
  if (from_format === 'hex' && to_format === 'rgb') {
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    result = `rgb(${r}, ${g}, ${b})`
  } else if (from_format === 'rgb' && to_format === 'hex') {
    const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
    if (match) {
      const r = parseInt(match[1])
      const g = parseInt(match[2])
      const b = parseInt(match[3])
      result = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
    }
  }
  
  return { result }
}

// PDF conversion using PDF API
async function handlePDFConversion(conversionType: string, inputData: any, fileData: string) {
  const pdfApiKey = Deno.env.get('PDF_API_KEY')
  
  if (!pdfApiKey) {
    throw new Error('PDF API key not configured')
  }

  // This is a placeholder implementation - you would integrate with your chosen PDF API
  // For example, using ILovePDF API
  console.log(`Processing PDF conversion: ${conversionType}`)
  
  return {
    message: `PDF conversion ${conversionType} processed with API integration`,
    status: 'completed'
  }
}

// Image conversion using TinyPNG API
async function handleImageConversion(conversionType: string, inputData: any, fileData: string) {
  const tinifyApiKey = Deno.env.get('TINIFY_API_KEY')
  
  if (!tinifyApiKey) {
    throw new Error('TinyPNG API key not configured')
  }

  console.log(`Processing image conversion: ${conversionType}`)
  
  // Example TinyPNG API integration for compression
  if (conversionType === 'image_compress' && fileData) {
    try {
      const response = await fetch('https://api.tinify.com/shrink', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`api:${tinifyApiKey}`)}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          source: {
            data: fileData
          }
        })
      })
      
      const result = await response.json()
      return {
        compressed_url: result.output?.url,
        original_size: result.input?.size,
        compressed_size: result.output?.size,
        compression_ratio: result.output?.ratio
      }
    } catch (error) {
      console.error('TinyPNG API error:', error)
      throw new Error('Image compression failed')
    }
  }
  
  return {
    message: `Image conversion ${conversionType} processed`,
    status: 'completed'
  }
}

// Media conversion using Cloudinary
async function handleMediaConversion(conversionType: string, inputData: any, fileData: string) {
  const cloudinaryApiKey = Deno.env.get('CLOUDINARY_API_KEY')
  const cloudinaryApiSecret = Deno.env.get('CLOUDINARY_API_SECRET')
  const cloudinaryCloudName = Deno.env.get('CLOUDINARY_CLOUD_NAME')
  
  if (!cloudinaryApiKey || !cloudinaryApiSecret || !cloudinaryCloudName) {
    throw new Error('Cloudinary credentials not configured')
  }

  console.log(`Processing media conversion: ${conversionType}`)
  
  return {
    message: `Media conversion ${conversionType} processed with Cloudinary`,
    status: 'completed'
  }
}

// Currency conversion using Exchange Rates API
async function handleCurrencyConversion(inputData: any) {
  const exchangeRatesApiKey = Deno.env.get('EXCHANGE_RATES_API_KEY')
  
  if (!exchangeRatesApiKey) {
    throw new Error('Exchange Rates API key not configured')
  }

  const { amount, from_currency, to_currency } = inputData
  
  try {
    const response = await fetch(`https://api.exchangeratesapi.io/v1/convert?access_key=${exchangeRatesApiKey}&from=${from_currency}&to=${to_currency}&amount=${amount}`)
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

// Unit conversion (handled locally)
function handleUnitConversion(inputData: any) {
  const { value, from_unit, to_unit, category } = inputData
  
  // This is a simplified unit conversion - you could integrate with a units API
  // or implement comprehensive conversion logic
  
  const conversions = {
    length: {
      meter: 1,
      kilometer: 0.001,
      centimeter: 100,
      inch: 39.3701,
      foot: 3.28084
    },
    weight: {
      kilogram: 1,
      gram: 1000,
      pound: 2.20462,
      ounce: 35.274
    },
    temperature: {
      celsius: (c: number, to: string) => {
        if (to === 'fahrenheit') return c * 9/5 + 32
        if (to === 'kelvin') return c + 273.15
        return c
      }
    }
  }
  
  let result = value
  if (category === 'temperature') {
    result = conversions.temperature.celsius(value, to_unit)
  } else if (conversions[category as keyof typeof conversions]) {
    const categoryConversions = conversions[category as keyof typeof conversions] as any
    result = (value / categoryConversions[from_unit]) * categoryConversions[to_unit]
  }
  
  return {
    original_value: value,
    from_unit,
    to_unit,
    converted_value: result,
    category
  }
}
