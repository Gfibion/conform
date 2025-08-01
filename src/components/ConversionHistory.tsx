
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useConversions } from '@/hooks/useConversions'
import { Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react'

interface ConversionJob {
  id: string
  conversion_type: string
  status: string
  created_at: string
  processing_time_ms?: number
  error_message?: string
}

export const ConversionHistory = () => {
  const { getConversionJobs } = useConversions()
  const [jobs, setJobs] = useState<ConversionJob[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    setLoading(true)
    const jobsData = await getConversionJobs(20)
    setJobs(jobsData)
    setLoading(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'processing':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variant = status === 'completed' ? 'default' : 
                   status === 'failed' ? 'destructive' : 'secondary'
    return (
      <Badge variant={variant} className="capitalize">
        {status}
      </Badge>
    )
  }

  const formatConversionType = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Conversion History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Conversion History</CardTitle>
          <CardDescription>
            Your recent conversions and their status
          </CardDescription>
        </div>
        <Button variant="outline" onClick={loadJobs}>
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {jobs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No conversions found. Start using our tools to see your history here.
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
              >
                <div className="flex items-center space-x-3">
                  {getStatusIcon(job.status)}
                  <div>
                    <div className="font-medium">
                      {formatConversionType(job.conversion_type)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(job.created_at).toLocaleString()}
                      {job.processing_time_ms && (
                        <span className="ml-2">
                          ({job.processing_time_ms}ms)
                        </span>
                      )}
                    </div>
                    {job.error_message && (
                      <div className="text-sm text-red-500 mt-1">
                        {job.error_message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(job.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
