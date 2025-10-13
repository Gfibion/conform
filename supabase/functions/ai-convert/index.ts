import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");

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

    const startTime = Date.now();
    const { type, content, options = {} } = await req.json();
    
    // Input validation
    const validTypes = [
      'text_enhance', 'text_summarize', 'text_paraphrase', 'text_translate',
      'code_explain', 'code_optimize', 'code_document', 'code_review',
      'content_generate', 'grammar_check', 'sentiment_analysis', 'image_describe'
    ];
    
    if (!type || !validTypes.includes(type)) {
      return new Response(
        JSON.stringify({ error: 'Invalid or missing conversion type' }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    if (typeof content !== 'string' || content.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid input: content must be a non-empty string' }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    if (content.length > 50000) {
      return new Response(
        JSON.stringify({ error: 'Content too large. Maximum 50,000 characters allowed' }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    console.log(`AI Conversion Request - Type: ${type}, User: ${user?.id || 'anonymous'}, Content length: ${content.length}`);

    if (!lovableApiKey) {
      await supabaseClient.from("system_logs").insert({
        log_level: "error",
        source: "ai-convert",
        message: "Lovable API key not configured",
        user_id: user?.id,
      });

      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { 
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let systemPrompt = "";
    let userPrompt = "";

    switch (type) {
      case "text_enhance":
        systemPrompt = "You are a professional text editor. Enhance the given text by improving grammar, clarity, and readability while maintaining the original meaning and tone.";
        userPrompt = `Please enhance this text: ${content}`;
        break;
      
      case "text_summarize":
        systemPrompt = "You are an expert at creating concise summaries. Summarize the given text while preserving key information and main points.";
        userPrompt = `Please summarize this text: ${content}`;
        break;
      
      case "text_paraphrase":
        systemPrompt = "You are a skilled writer. Rewrite the given text using different words and sentence structures while maintaining the same meaning.";
        userPrompt = `Please paraphrase this text: ${content}`;
        break;
      
      case "text_translate":
        const targetLanguage = options.targetLanguage || "Spanish";
        systemPrompt = `You are a professional translator. Translate the given text to ${targetLanguage} accurately while maintaining context and tone.`;
        userPrompt = `Please translate this text to ${targetLanguage}: ${content}`;
        break;
      
      case "code_explain":
        systemPrompt = "You are a senior software developer. Explain the given code in simple terms, describing what it does, how it works, and any important concepts.";
        userPrompt = `Please explain this code: ${content}`;
        break;
      
      case "code_optimize":
        systemPrompt = "You are an expert programmer. Analyze the given code and suggest optimizations for performance, readability, and best practices.";
        userPrompt = `Please optimize this code: ${content}`;
        break;
      
      case "content_generate":
        const contentType = options.contentType || "blog post";
        const topic = options.topic || content;
        systemPrompt = `You are a creative content writer. Generate high-quality ${contentType} content that is engaging, informative, and well-structured.`;
        userPrompt = `Please create a ${contentType} about: ${topic}`;
        break;
      
      case "image_describe":
        systemPrompt = "You are an AI that can analyze images. Describe what you see in the image in detail, including objects, people, colors, composition, and any text present.";
        userPrompt = "Please describe this image in detail.";
        break;
      
      case "ai_query":
        systemPrompt = "You are a helpful AI assistant specializing in conversions, calculations, and analysis. Provide clear, accurate, and helpful responses. When dealing with conversions, always show the calculation steps and provide the exact result.";
        userPrompt = content;
        break;
      
      default:
        await supabaseClient.from("system_logs").insert({
          log_level: "warning",
          source: "ai-convert",
          message: `Unsupported AI conversion type: ${type}`,
          user_id: user?.id,
        });

        return new Response(
          JSON.stringify({ error: "Unsupported AI conversion type" }),
          { 
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
    }

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ];

    if (type === "image_describe" && content.startsWith("data:image")) {
      messages[1] = {
        role: "user",
        content: [
          { type: "text", text: userPrompt },
          { 
            type: "image_url",
            image_url: {
              url: content,
              detail: "high",
            },
          },
        ],
      };
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("AI Gateway error:", response.status, errorData);
      
      await supabaseClient.from("system_logs").insert({
        log_level: "error",
        source: "ai-convert",
        message: `AI Gateway error: ${response.status}`,
        metadata: { errorData, type, user_id: user?.id },
        user_id: user?.id,
      });

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { 
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add credits to your workspace." }),
          { 
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "AI processing failed", details: errorData }),
        { 
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    const result = data.choices[0].message.content;
    const processingTime = Date.now() - startTime;

    if (user) {
      const { error: logError } = await supabaseClient
        .from("conversion_jobs")
        .insert({
          user_id: user.id,
          conversion_type: `ai_${type}`,
          status: "completed",
          input_data: { content, options },
          output_data: { result },
          processing_time_ms: processingTime,
          completed_at: new Date().toISOString(),
        });

      if (logError) {
        console.error("Error logging conversion:", logError);
        await supabaseClient.from("system_logs").insert({
          log_level: "error",
          source: "ai-convert",
          message: "Failed to log conversion job",
          metadata: { error: logError, user_id: user.id },
          user_id: user.id,
        });
      }
    }

    console.log(`AI Conversion completed in ${processingTime}ms`);

    return new Response(
      JSON.stringify({
        success: true,
        result,
        type,
        processing_time_ms: processingTime,
        usage: data.usage,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("AI conversion error:", error);
    
    try {
      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );
      
      await supabaseClient.from("system_logs").insert({
        log_level: "critical",
        source: "ai-convert",
        message: "Unhandled error in AI conversion",
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