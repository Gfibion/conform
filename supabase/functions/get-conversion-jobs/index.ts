import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

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

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Authorization header required" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);

    if (authError || !user) {
      console.error("Auth error:", authError);
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`Fetching conversion jobs for user: ${user.id}`);

    const url = new URL(req.url);
    const limitParam = url.searchParams.get("limit");
    const statusParam = url.searchParams.get("status");
    const typeParam = url.searchParams.get("type");
    
    const limit = limitParam ? parseInt(limitParam, 10) : 50;

    let query = supabaseClient
      .from("conversion_jobs")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (statusParam) {
      query = query.eq("status", statusParam);
    }

    if (typeParam) {
      query = query.eq("conversion_type", typeParam);
    }

    const { data: jobs, error: jobsError } = await query;

    if (jobsError) {
      console.error("Error fetching jobs:", jobsError);
      await supabaseClient.from("system_logs").insert({
        log_level: "error",
        source: "get-conversion-jobs",
        message: "Failed to fetch conversion jobs",
        metadata: { error: jobsError, user_id: user.id },
        user_id: user.id,
      });

      return new Response(
        JSON.stringify({ error: "Failed to fetch conversion jobs" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`Successfully fetched ${jobs.length} conversion jobs`);

    return new Response(
      JSON.stringify({
        success: true,
        jobs,
        count: jobs.length,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error: any) {
    console.error("Unhandled error:", error);

    try {
      const supabaseClient = createClient(
        Deno.env.get("SUPABASE_URL") ?? "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
      );

      await supabaseClient.from("system_logs").insert({
        log_level: "critical",
        source: "get-conversion-jobs",
        message: "Unhandled error in get conversion jobs",
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