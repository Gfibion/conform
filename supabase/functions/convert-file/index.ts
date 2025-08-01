
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

    // Start processing (this is where you'd integrate with actual conversion APIs)
    const startTime = Date.now()
    let result: any = {}
    let outputFileUrl: string | null = null

    try {
      // Handle different conversion types
      switch (conversion_type) {
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
          result = handleHashGenerate(input_data)
          break
        case 'qr_generate':
          result = await handleQRGenerate(input_data)
          break
        case 'color_convert':
          result = handleColorConvert(input_data)
          break
        default:
          // For file-based conversions, we'd integrate with external APIs
          result = { message: `${conversion_type} conversion will be implemented with external API integration` }
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

// Helper functions for different conversion types
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
    case 'md5':
      // Note: Web Crypto API doesn't support MD5, would need external library
      throw new Error('MD5 not supported in this environment')
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
  
  // For QR code generation, we'd typically use a service like qr-server.com
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`
  
  return {
    qr_code_url: qrUrl,
    text: text,
    size: size
  }
}

function handleColorConvert(data: any) {
  const { color, from_format, to_format } = data
  
  // Basic color conversion logic
  // This is a simplified version - you'd want more robust color conversion
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
