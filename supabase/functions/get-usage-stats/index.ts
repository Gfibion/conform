
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Get the current user
    let user = null
    try {
      const authHeader = req.headers.get('Authorization')
      if (authHeader && !authHeader.includes('anon')) {
        const { data } = await supabaseClient.auth.getUser(authHeader.replace('Bearer ', ''))
        user = data.user
      }
    } catch {
      console.log('No authentication provided')
    }

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { 
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const url = new URL(req.url)
    const days = parseInt(url.searchParams.get('days') || '30')

    const { data: stats, error } = await supabaseClient
      .from('conversion_usage_stats')
      .select('*')
      .eq('user_id', user.id)
      .gte('date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching usage stats:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch usage statistics' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Calculate totals
    const totals = stats?.reduce((acc, stat) => {
      acc.total_conversions += stat.count || 0
      acc.total_processing_time += stat.total_processing_time_ms || 0
      acc.total_input_size += stat.total_input_size || 0
      acc.total_output_size += stat.total_output_size || 0
      return acc
    }, {
      total_conversions: 0,
      total_processing_time: 0,
      total_input_size: 0,
      total_output_size: 0
    })

    return new Response(
      JSON.stringify({ 
        stats,
        totals
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

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
