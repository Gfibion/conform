
import { ConversionHistory } from "@/components/ConversionHistory"
import { UsageStats } from "@/components/UsageStats"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthButton } from "@/components/AuthButton"
import { ToolsGrid } from "@/components/ToolsGrid"
import { QuickConverter } from "@/components/QuickConverter"
import { useAuth } from "@/contexts/AuthContext"

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-8 mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome back to ConvertKit
            </h1>
            <p className="text-xl text-muted-foreground">
              Your all-in-one conversion toolkit - {user?.email}
            </p>
          </div>
          <AuthButton />
        </div>

        {/* Quick Converter */}
        <div className="mb-12">
          <QuickConverter />
        </div>

        {/* Usage Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Your Usage Overview</h2>
          <UsageStats />
        </div>

        {/* All Tools */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">All Conversion Tools</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access all your favorite conversion tools in one place
            </p>
          </div>
          <ToolsGrid />
        </div>

        {/* Recent Activity */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <ConversionHistory />
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Jump back into your most used tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <h3 className="font-medium">PDF Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Compress, merge, and convert PDFs
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <h3 className="font-medium">Image Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Resize, compress, and format images
                </p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <h3 className="font-medium">Unit Converters</h3>
                <p className="text-sm text-muted-foreground">
                  Temperature, weight, length, and more
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
