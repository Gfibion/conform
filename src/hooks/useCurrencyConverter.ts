
import { useState } from 'react'
import { useConversions } from '@/hooks/useConversions'
import { useToast } from '@/hooks/use-toast'

interface CurrencyConversion {
  amount: number
  from_currency: string
  to_currency: string
  converted_amount?: number
  exchange_rate?: number
  date?: string
}

export const useCurrencyConverter = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [lastConversion, setLastConversion] = useState<CurrencyConversion | null>(null)
  const { convertFile } = useConversions()
  const { toast } = useToast()

  const convertCurrency = async (amount: number, fromCurrency: string, toCurrency: string) => {
    if (amount <= 0 || !fromCurrency || !toCurrency) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid amount and select currencies",
        variant: "destructive"
      })
      return null
    }

    setIsLoading(true)
    
    try {
      const response = await convertFile({
        conversion_type: 'currency_convert',
        input_data: {
          amount,
          from_currency: fromCurrency,
          to_currency: toCurrency
        }
      })

      if (response?.result) {
        const conversion = {
          amount,
          from_currency: fromCurrency,
          to_currency: toCurrency,
          ...response.result
        }
        setLastConversion(conversion)
        return conversion
      }

      return null
    } catch (error) {
      console.error('Currency conversion error:', error)
      toast({
        title: "Conversion Error",
        description: "Failed to convert currency. Please try again.",
        variant: "destructive"
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    convertCurrency,
    isLoading,
    lastConversion
  }
}
