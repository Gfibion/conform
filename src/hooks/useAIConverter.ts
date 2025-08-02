
import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface AIConversionOptions {
  targetLanguage?: string
  contentType?: string
  topic?: string
}

export const useAIConverter = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const convertWithAI = async (
    type: string,
    content: string,
    options: AIConversionOptions = {}
  ) => {
    setIsLoading(true)
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-convert', {
        body: { type, content, options }
      })

      if (error) {
        console.error('AI conversion error:', error)
        toast({
          title: "AI Conversion Failed",
          description: error.message || "An error occurred during AI processing",
          variant: "destructive"
        })
        return null
      }

      if (data.success) {
        toast({
          title: "AI Conversion Successful",
          description: `Content processed successfully`
        })
        return data.result
      } else {
        toast({
          title: "AI Conversion Failed",
          description: data.error || "Unknown error occurred",
          variant: "destructive"
        })
        return null
      }

    } catch (error) {
      console.error('Network error:', error)
      toast({
        title: "Network Error",
        description: "Failed to connect to AI service",
        variant: "destructive"
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    convertWithAI,
    isLoading
  }
}
