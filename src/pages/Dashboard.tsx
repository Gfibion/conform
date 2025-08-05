
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AuthButton } from "@/components/AuthButton"
import { QuickConverter } from "@/components/QuickConverter"
import { useAuth } from "@/contexts/AuthContext"
import { Search, FileText, Globe, Calculator, Zap, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const toolCategories = [
  { name: "Popular", active: true },
  { name: "All Tools", active: false },
  { name: "AI Tools", active: false },
  { name: "PDF Tools", active: false },
  { name: "Unit Convert", active: false }
]

const mainTools = [
  {
    title: "File Conversion",
    description: "Transform files between formats",
    icon: FileText,
    href: "/file-conversion",
    popular: true
  },
  {
    title: "Language Translation",
    description: "Translate text and documents",
    icon: Globe,
    href: "/language-translation",
    popular: true
  },
  {
    title: "Unit Conversion",
    description: "Convert units and measurements",
    icon: Calculator,
    href: "/unit-conversion",
    popular: true
  },
  {
    title: "AI-Powered Tools",
    description: "Intelligent conversion tools",
    icon: Zap,
    href: "/ai-powered-tools",
    popular: true
  }
]

const popularTools = [
  {
    title: "AI Chatbot",
    description: "Engage in conversations with intelligent AI assistant",
    popular: true
  },
  {
    title: "PDF Compress",
    description: "Reduce PDF file size while maintaining quality",
    popular: true
  },
  {
    title: "PDF Merge",
    description: "Combine multiple PDF files into one document",
    popular: true
  },
  {
    title: "PDF to Word",
    description: "Convert PDF documents to editable Word format",
    popular: true
  },
  {
    title: "Image Resize",
    description: "Resize images to your desired dimensions",
    popular: true
  },
  {
    title: "Text to Speech",
    description: "Convert written text to natural speech",
    popular: true
  }
]

export default function Dashboard() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Popular")

  const filteredTools = popularTools.filter(tool =>
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">All-in-One Conversion Tools</h1>
            <p className="text-muted-foreground mt-1">
              Transform, convert, and optimize your files with our comprehensive suite of tools
            </p>
          </div>
          <AuthButton />
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg bg-card border-border"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {toolCategories.map((category) => (
              <Button
                key={category.name}
                variant={activeCategory === category.name ? "default" : "outline"}
                onClick={() => setActiveCategory(category.name)}
                className="h-10"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Tool Categories - Large Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mainTools.map((tool) => (
            <Link key={tool.title} to={tool.href}>
              <Card className="relative h-40 bg-gradient-card hover:shadow-lg transition-all duration-300 cursor-pointer border-border">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <tool.icon className="w-6 h-6 text-primary" />
                    </div>
                    {tool.popular && (
                      <Badge variant="secondary" className="text-xs">
                        Popular
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <h3 className="font-semibold text-lg mb-2">{tool.title}</h3>
                  <p className="text-muted-foreground text-sm">{tool.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Popular Tools Grid */}
        <div className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Card key={tool.title} className="bg-gradient-card hover:shadow-lg transition-all duration-300 cursor-pointer border-border">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    {tool.popular && (
                      <Badge variant="secondary" className="text-xs">
                        Popular
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <h3 className="font-semibold mb-2">{tool.title}</h3>
                  <p className="text-muted-foreground text-sm">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Converter Section */}
        <div className="mb-12">
          <Card className="bg-gradient-card border-border">
            <CardHeader>
              <CardTitle className="text-center text-xl">Quick Converter</CardTitle>
            </CardHeader>
            <CardContent>
              <QuickConverter />
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="h-14 px-8 text-lg">
            Start Converting Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg" className="h-14 px-8 text-lg" asChild>
            <Link to="/formulas">View Formulas</Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="text-center text-muted-foreground mb-8">
          <p className="mb-4">Welcome back, {user?.email}!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
            <Link to="/history" className="hover:text-primary">
              History
            </Link>
            <Link to="/formulas" className="hover:text-primary">
              Formulas
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
