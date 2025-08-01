
import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface ConversionRequest {
  conversion_type: string
  input_data?: any
  file_data?: string
  file_name?: string
}

interface ConversionJob {
  id: string
  conversion_type: string
  status: string
  input_data: any
  output_data: any
  error_message?: string
  processing_time_ms?: number
  created_at: string
  completed_at?: string
}

export const useConversions = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const convertFile = async (request: ConversionRequest) => {
    setIsLoading(true)
    
    try {
      const { data, error } = await supabase.functions.invoke('convert-file', {
        body: request
      })

      if (error) {
        console.error('Conversion error:', error)
        toast({
          title: "Conversion Failed",
          description: error.message || "An error occurred during conversion",
          variant: "destructive"
        })
        return null
      }

      if (data.success) {
        toast({
          title: "Conversion Successful",
          description: `Conversion completed in ${data.processing_time_ms}ms`
        })
        return data
      } else {
        toast({
          title: "Conversion Failed",
          description: data.error || "Unknown error occurred",
          variant: "destructive"
        })
        return null
      }

    } catch (error) {
      console.error('Network error:', error)
      toast({
        title: "Network Error",
        description: "Failed to connect to conversion service",
        variant: "destructive"
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const getConversionJobs = async (limit = 10, status?: string): Promise<ConversionJob[]> => {
    try {
      const params = new URLSearchParams()
      params.append('limit', limit.toString())
      if (status) params.append('status', status)

      const { data, error } = await supabase.functions.invoke('get-conversion-jobs', {
        body: { params: params.toString() }
      })

      if (error) {
        console.error('Error fetching jobs:', error)
        return []
      }

      return data.jobs || []
    } catch (error) {
      console.error('Network error:', error)
      return []
    }
  }

  const getUsageStats = async (days = 30) => {
    try {
      const { data, error } = await supabase.functions.invoke('get-usage-stats', {
        body: { days }
      })

      if (error) {
        console.error('Error fetching usage stats:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Network error:', error)
      return null
    }
  }

  return {
    convertFile,
    getConversionJobs,
    getUsageStats,
    isLoading
  }
}
