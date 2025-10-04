
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
        
        // Handle specific error cases
        if (error.message?.includes('Rate limit')) {
          toast({
            title: "Rate Limit Exceeded",
            description: "Too many requests. Please wait a moment and try again.",
            variant: "destructive"
          })
        } else if (error.message?.includes('credits')) {
          toast({
            title: "AI Credits Depleted",
            description: "Please add credits to continue using AI features.",
            variant: "destructive"
          })
        } else {
          toast({
            title: "AI Conversion Failed",
            description: error.message || "An error occurred during AI processing",
            variant: "destructive"
          })
        }
        return null
      }

      if (data.success) {
        toast({
          title: "AI Conversion Successful",
          description: `Content processed successfully with Google Gemini`
        })
        return data.result
      } else {
        // Handle error responses
        if (data.error?.includes('Rate limit')) {
          toast({
            title: "Rate Limit Exceeded",
            description: "Too many requests. Please wait a moment and try again.",
            variant: "destructive"
          })
        } else if (data.error?.includes('credits')) {
          toast({
            title: "AI Credits Depleted",
            description: "Please add credits to continue using AI features.",
            variant: "destructive"
          })
        } else {
          toast({
            title: "AI Conversion Failed",
            description: data.error || "Unknown error occurred",
            variant: "destructive"
          })
        }
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
