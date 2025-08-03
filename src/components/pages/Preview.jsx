import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import portfolioService from "@/services/api/portfolioService"
import pageService from "@/services/api/pageService"

const Preview = () => {
  const { portfolioId } = useParams()
  const navigate = useNavigate()
  const [portfolio, setPortfolio] = useState(null)
  const [currentPage, setCurrentPage] = useState(null)
  const [blocks, setBlocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [deviceView, setDeviceView] = useState("desktop")
  const [publishing, setPublishing] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      setError("")
      
      const portfolioData = await portfolioService.getById(parseInt(portfolioId))
      setPortfolio(portfolioData)
      
      const pages = await pageService.getByPortfolio(parseInt(portfolioId))
      if (pages.length > 0) {
        const mainPage = pages[0]
        setCurrentPage(mainPage)
        setBlocks(mainPage.blocks || [])
      }
    } catch (error) {
      setError("Failed to load preview data. Please try again.")
      console.error("Error loading preview data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [portfolioId])

  const handlePublish = async () => {
    try {
      setPublishing(true)
      const updatedPortfolio = {
        ...portfolio,
        published: true,
        updatedAt: new Date().toISOString()
      }
      await portfolioService.update(portfolio.Id, updatedPortfolio)
      setPortfolio(updatedPortfolio)
      toast.success("Portfolio published successfully!")
    } catch (error) {
      toast.error("Failed to publish portfolio")
      console.error("Error publishing portfolio:", error)
    } finally {
      setPublishing(false)
    }
  }

  const renderBlock = (block) => {
    switch (block.type) {
      case "text":
        return (
          <div key={block.id} className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {block.content?.title || "Your Heading Here"}
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {block.content?.text || "Add your content here. Click to edit this text block and customize it to tell your story."}
            </p>
          </div>
        )
      
      case "image":
        return (
          <div key={block.id} className="mb-8">
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
              {block.content?.src ? (
                <img
                  src={block.content.src}
                  alt={block.content.alt || ""}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <ApperIcon name="Image" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Image placeholder</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      
      case "gallery":
        return (
          <div key={block.id} className="mb-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Image" className="w-8 h-8 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        )
      
      case "social":
        return (
          <div key={block.id} className="mb-8">
            <div className="flex justify-center space-x-6">
              {["Instagram", "Twitter", "Linkedin", "Mail"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <ApperIcon name={platform} className="w-6 h-6 text-white" />
                </a>
              ))}
            </div>
          </div>
        )
      
      default:
        return (
          <div key={block.id} className="mb-8 p-6 bg-gray-50 rounded-lg text-center">
            <ApperIcon name="Box" className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">{block.type} block</p>
          </div>
        )
    }
  }

  const getDeviceClass = () => {
    switch (deviceView) {
      case "mobile":
        return "max-w-sm mx-auto"
      case "tablet":
        return "max-w-2xl mx-auto"
      default:
        return "max-w-6xl mx-auto"
    }
  }

  if (loading) {
    return <Loading message="Loading preview..." />
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Preview Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/builder/${portfolioId}`)}
              >
                <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
                Back to Editor
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h2 className="font-semibold text-gray-900">
                {portfolio?.name} Preview
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setDeviceView("desktop")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    deviceView === "desktop"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <ApperIcon name="Monitor" className="w-4 h-4 mr-1" />
                  Desktop
                </button>
                <button
                  onClick={() => setDeviceView("tablet")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    deviceView === "tablet"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <ApperIcon name="Tablet" className="w-4 h-4 mr-1" />
                  Tablet
                </button>
                <button
                  onClick={() => setDeviceView("mobile")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    deviceView === "mobile"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <ApperIcon name="Smartphone" className="w-4 h-4 mr-1" />
                  Mobile
                </button>
              </div>
              
              <Button
                onClick={handlePublish}
                disabled={publishing}
                size="sm"
              >
                {publishing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Publishing...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Globe" className="w-4 h-4 mr-2" />
                    {portfolio?.published ? "Update" : "Publish"}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="py-8">
        <div className={getDeviceClass()}>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-8">
              {blocks.length === 0 ? (
                <div className="text-center py-16">
                  <ApperIcon name="Layout" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No content yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Go back to the builder to add content blocks
                  </p>
                  <Button
                    onClick={() => navigate(`/builder/${portfolioId}`)}
                    variant="outline"
                  >
                    <ApperIcon name="Edit" className="w-4 h-4 mr-2" />
                    Edit Portfolio
                  </Button>
                </div>
              ) : (
                <div className="space-y-8">
                  {blocks.map(renderBlock)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Publication Status */}
      {portfolio?.published && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
          <ApperIcon name="Globe" className="w-4 h-4" />
          <span className="text-sm font-medium">
            Live at {portfolio.subdomain}.folioforge.com
          </span>
        </div>
      )}
    </div>
  )
}

export default Preview