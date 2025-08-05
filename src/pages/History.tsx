
import { ConversionHistory } from "@/components/ConversionHistory"
import { UsageStats } from "@/components/UsageStats"
import { AuthButton } from "@/components/AuthButton"
import { useAuth } from "@/contexts/AuthContext"
import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function History() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Conversion History</h1>
              <p className="text-muted-foreground mt-2">
                Track your conversion activity and usage statistics
              </p>
            </div>
          </div>
          <AuthButton />
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Usage Overview</h2>
            <UsageStats />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <ConversionHistory />
          </div>
        </div>
      </div>
    </div>
  )
}
