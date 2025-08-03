import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import PortfolioCard from "@/components/molecules/PortfolioCard"
import SearchBar from "@/components/molecules/SearchBar"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import portfolioService from "@/services/api/portfolioService"

const Dashboard = () => {
  const navigate = useNavigate()
  const [portfolios, setPortfolios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const loadPortfolios = async () => {
    try {
      setLoading(true)
      setError("")
      await new Promise(resolve => setTimeout(resolve, 300))
      const data = await portfolioService.getAll()
      setPortfolios(data)
    } catch (error) {
      setError("Failed to load portfolios. Please try again.")
      console.error("Error loading portfolios:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPortfolios()
  }, [])

  const handleEdit = (portfolio) => {
    navigate(`/builder/${portfolio.Id}`)
  }

  const handlePreview = (portfolio) => {
    navigate(`/preview/${portfolio.Id}`)
  }

  const handleDelete = async (portfolio) => {
    if (window.confirm(`Are you sure you want to delete "${portfolio.name}"?`)) {
      try {
        await portfolioService.delete(portfolio.Id)
        setPortfolios(portfolios.filter(p => p.Id !== portfolio.Id))
        toast.success("Portfolio deleted successfully")
      } catch (error) {
        toast.error("Failed to delete portfolio")
        console.error("Error deleting portfolio:", error)
      }
    }
  }

  const filteredPortfolios = portfolios.filter(portfolio =>
    portfolio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    portfolio.subdomain.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <Loading message="Loading your portfolios..." />
  }

  if (error) {
    return <Error message={error} onRetry={loadPortfolios} />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Your Portfolios
            </h1>
            <p className="text-gray-600">
              Create and manage your professional portfolios
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar
              placeholder="Search portfolios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="sm:w-64"
            />
            <Button
              onClick={() => navigate("/templates")}
              size="lg"
            >
              <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
              Create Portfolio
            </Button>
          </div>
        </div>
      </div>

      {portfolios.length === 0 ? (
        <Empty
          title="No portfolios yet"
          message="Create your first portfolio to showcase your work and attract clients"
          action={() => navigate("/templates")}
          actionLabel="Create Your First Portfolio"
          icon="Briefcase"
        />
      ) : filteredPortfolios.length === 0 ? (
        <Empty
          title="No portfolios found"
          message={`No portfolios match "${searchTerm}". Try adjusting your search terms.`}
          icon="Search"
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPortfolios.map((portfolio) => (
              <PortfolioCard
                key={portfolio.Id}
                portfolio={portfolio}
                onEdit={handleEdit}
                onPreview={handlePreview}
                onDelete={handleDelete}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-4 px-6 py-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-100">
              <ApperIcon name="Zap" className="w-6 h-6 text-primary-600" />
              <div className="text-left">
                <p className="font-medium text-gray-900">Ready to create another portfolio?</p>
                <p className="text-sm text-gray-600">Choose from our professional templates</p>
              </div>
              <Button
                onClick={() => navigate("/templates")}
                variant="outline"
                size="sm"
              >
                Browse Templates
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard