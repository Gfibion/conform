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

    console.log(`Fetching usage stats for user: ${user.id}`);

    const url = new URL(req.url);
    const daysParam = url.searchParams.get("days");
    const days = daysParam ? parseInt(daysParam, 10) : 30;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data: stats, error: statsError } = await supabaseClient
      .from("usage_stats")
      .select("*")
      .eq("user_id", user.id)
      .gte("date", startDate.toISOString().split('T')[0])
      .order("date", { ascending: false });

    if (statsError) {
      console.error("Error fetching stats:", statsError);
      await supabaseClient.from("system_logs").insert({
        log_level: "error",
        source: "get-usage-stats",
        message: "Failed to fetch usage stats",
        metadata: { error: statsError, user_id: user.id },
        user_id: user.id,
      });

      return new Response(
        JSON.stringify({ error: "Failed to fetch usage statistics" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const totalConversions = stats.reduce((sum, stat) => sum + stat.total_conversions, 0);
    const successfulConversions = stats.reduce((sum, stat) => sum + stat.successful_conversions, 0);
    const failedConversions = stats.reduce((sum, stat) => sum + stat.failed_conversions, 0);
    const totalProcessingTime = stats.reduce((sum, stat) => sum + stat.total_processing_time_ms, 0);
    const avgProcessingTime = totalConversions > 0 ? totalProcessingTime / totalConversions : 0;

    const conversionTypeBreakdown: { [key: string]: number } = {};
    stats.forEach(stat => {
      const types = stat.conversion_types as { [key: string]: number };
      Object.entries(types).forEach(([type, count]) => {
        conversionTypeBreakdown[type] = (conversionTypeBreakdown[type] || 0) + count;
      });
    });

    const summary = {
      total_conversions: totalConversions,
      successful_conversions: successfulConversions,
      failed_conversions: failedConversions,
      success_rate: totalConversions > 0 ? (successfulConversions / totalConversions) * 100 : 0,
      avg_processing_time_ms: avgProcessingTime,
      total_processing_time_ms: totalProcessingTime,
      conversion_type_breakdown: conversionTypeBreakdown,
      days_analyzed: days,
    };

    console.log(`Successfully fetched stats for ${totalConversions} conversions`);

    return new Response(
      JSON.stringify({
        success: true,
        summary,
        daily_stats: stats,
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
        source: "get-usage-stats",
        message: "Unhandled error in usage stats",
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