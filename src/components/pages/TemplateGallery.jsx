import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import TemplateCard from "@/components/molecules/TemplateCard"
import SearchBar from "@/components/molecules/SearchBar"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import templateService from "@/services/api/templateService"
import portfolioService from "@/services/api/portfolioService"

const TemplateGallery = () => {
  const navigate = useNavigate()
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", label: "All Templates", count: 0 },
    { id: "photography", label: "Photography", count: 0 },
    { id: "videography", label: "Videography", count: 0 },
    { id: "fitness", label: "Fitness", count: 0 },
    { id: "creative", label: "Creative", count: 0 },
    { id: "business", label: "Business", count: 0 }
  ]

  const loadTemplates = async () => {
    try {
      setLoading(true)
      setError("")
      await new Promise(resolve => setTimeout(resolve, 400))
      const data = await templateService.getAll()
      setTemplates(data)
    } catch (error) {
      setError("Failed to load templates. Please try again.")
      console.error("Error loading templates:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTemplates()
  }, [])

  const handleSelectTemplate = async (template) => {
    try {
      const newPortfolio = {
        name: `${template.name} Portfolio`,
        template: template.Id,
        subdomain: `portfolio-${Date.now()}`,
        published: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      const portfolio = await portfolioService.create(newPortfolio)
      toast.success("Template selected! Redirecting to builder...")
      setTimeout(() => {
        navigate(`/builder/${portfolio.Id}`)
      }, 1000)
    } catch (error) {
      toast.error("Failed to create portfolio from template")
      console.error("Error creating portfolio:", error)
    }
  }

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryCount = (categoryId) => {
    if (categoryId === "all") return templates.length
    return templates.filter(t => t.category === categoryId).length
  }

  if (loading) {
    return <Loading message="Loading templates..." />
  }

  if (error) {
    return <Error message={error} onRetry={loadTemplates} />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Choose Your Template
            </h1>
            <p className="text-gray-600">
              Start with a professional template designed for your profession
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="sm:w-64"
            />
            <Button
              variant="outline"
              onClick={() => navigate("/")}
            >
              <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 shrink-0">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-primary-50 text-primary-700 border border-primary-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span>{category.label}</span>
                  <Badge variant="default" size="sm">
                    {getCategoryCount(category.id)}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6 border border-primary-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <ApperIcon name="Sparkles" className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Custom Design</h4>
                <p className="text-sm text-gray-600">Need something unique?</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Start from Scratch
            </Button>
          </div>
        </div>

        <div className="flex-1">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <ApperIcon name="Search" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No templates found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search terms or category filter
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.Id}
                  template={template}
                  onSelect={handleSelectTemplate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TemplateGallery