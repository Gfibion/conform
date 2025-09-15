
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
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

    const { type, content, options = {} } = await req.json()

    if (!openAIApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    let systemPrompt = '';
    let userPrompt = '';

    // Handle different AI conversion types
    switch (type) {
      case 'text_enhance':
        systemPrompt = 'You are a professional text editor. Enhance the given text by improving grammar, clarity, and readability while maintaining the original meaning and tone.';
        userPrompt = `Please enhance this text: ${content}`;
        break;
      
      case 'text_summarize':
        systemPrompt = 'You are an expert at creating concise summaries. Summarize the given text while preserving key information and main points.';
        userPrompt = `Please summarize this text: ${content}`;
        break;
      
      case 'text_paraphrase':
        systemPrompt = 'You are a skilled writer. Rewrite the given text using different words and sentence structures while maintaining the same meaning.';
        userPrompt = `Please paraphrase this text: ${content}`;
        break;
      
      case 'text_translate':
        const targetLanguage = options.targetLanguage || 'Spanish';
        systemPrompt = `You are a professional translator. Translate the given text to ${targetLanguage} accurately while maintaining context and tone.`;
        userPrompt = `Please translate this text to ${targetLanguage}: ${content}`;
        break;
      
      case 'code_explain':
        systemPrompt = 'You are a senior software developer. Explain the given code in simple terms, describing what it does, how it works, and any important concepts.';
        userPrompt = `Please explain this code: ${content}`;
        break;
      
      case 'code_optimize':
        systemPrompt = 'You are an expert programmer. Analyze the given code and suggest optimizations for performance, readability, and best practices.';
        userPrompt = `Please optimize this code: ${content}`;
        break;
      
      case 'content_generate':
        const contentType = options.contentType || 'blog post';
        const topic = options.topic || content;
        systemPrompt = `You are a creative content writer. Generate high-quality ${contentType} content that is engaging, informative, and well-structured.`;
        userPrompt = `Please create a ${contentType} about: ${topic}`;
        break;
      
      case 'image_describe':
        systemPrompt = 'You are an AI that can analyze images. Describe what you see in the image in detail, including objects, people, colors, composition, and any text present.';
        userPrompt = 'Please describe this image in detail.';
        break;
      
      case 'ai_query':
        systemPrompt = 'You are a helpful AI assistant specializing in conversions, calculations, and analysis. You can help with unit conversions, currency calculations, file analysis, mathematical computations, and general queries. Provide clear, accurate, and helpful responses. When dealing with conversions, always show the calculation steps and provide the exact result.';
        userPrompt = content;
        break;
      
      default:
        return new Response(
          JSON.stringify({ error: 'Unsupported AI conversion type' }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
    }

    // Create the messages array based on content type
    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ];

    // If it's an image description, we need to handle it differently
    if (type === 'image_describe' && content.startsWith('data:image')) {
      messages[1] = {
        role: 'user',
        content: [
          { type: 'text', text: userPrompt },
          { 
            type: 'image_url',
            image_url: {
              url: content,
              detail: 'high'
            }
          }
        ]
      };
    }

    console.log(`Processing AI conversion: ${type} for user: ${user.id}`);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return new Response(
        JSON.stringify({ error: 'AI processing failed', details: errorData }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const data = await response.json();
    const result = data.choices[0].message.content;

    // Log the conversion in database
    const { error: logError } = await supabaseClient
      .from('conversion_jobs')
      .insert({
        user_id: user.id,
        conversion_type: `ai_${type}`,
        status: 'completed',
        input_data: { content, options },
        output_data: { result },
        processing_time_ms: Date.now() - Date.now(),
        completed_at: new Date().toISOString(),
      });

    if (logError) {
      console.error('Error logging conversion:', logError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        result,
        type,
        usage: data.usage
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('AI conversion error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
