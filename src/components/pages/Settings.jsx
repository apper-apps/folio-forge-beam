import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import portfolioService from "@/services/api/portfolioService"

const Settings = () => {
  const navigate = useNavigate()
  const [portfolios, setPortfolios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  const [settings, setSettings] = useState({
    name: "John Doe",
    email: "john@example.com",
    company: "Freelance Studio",
    notifications: true,
    analytics: true,
    customDomain: ""
  })

  const loadData = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await portfolioService.getAll()
      setPortfolios(data)
    } catch (error) {
      setError("Failed to load settings. Please try again.")
      console.error("Error loading settings:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleSaveSettings = async () => {
    try {
      setSaving(true)
      // Simulate saving settings
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Settings saved successfully!")
    } catch (error) {
      toast.error("Failed to save settings")
      console.error("Error saving settings:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (loading) {
    return <Loading message="Loading settings..." />
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Settings
            </h1>
            <p className="text-gray-600">
              Manage your account and portfolio preferences
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <ApperIcon name="User" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
              <p className="text-gray-600">Update your personal information</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              value={settings.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            <Input
              label="Email Address"
              type="email"
              value={settings.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <Input
              label="Company/Studio Name"
              value={settings.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
            />
            <Input
              label="Custom Domain"
              value={settings.customDomain}
              onChange={(e) => handleInputChange("customDomain", e.target.value)}
              placeholder="www.yourname.com"
            />
          </div>
        </Card>

        {/* Portfolio Analytics */}
        <Card className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <ApperIcon name="BarChart3" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Analytics Overview</h2>
              <p className="text-gray-600">Track your portfolio performance</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-lg">
              <div className="text-2xl font-bold text-primary-600 mb-1">
                {portfolios.length}
              </div>
              <div className="text-sm text-gray-600">Total Portfolios</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {portfolios.filter(p => p.published).length}
              </div>
              <div className="text-sm text-gray-600">Published</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {portfolios.reduce((total, p) => total + (p.views || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Total Views</div>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <ApperIcon name="Bell" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
              <p className="text-gray-600">Manage your notification preferences</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Email Notifications</h4>
                <p className="text-sm text-gray-600">Receive updates about your portfolios</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => handleInputChange("notifications", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Analytics Tracking</h4>
                <p className="text-sm text-gray-600">Track portfolio views and engagement</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.analytics}
                  onChange={(e) => handleInputChange("analytics", e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveSettings}
            disabled={saving}
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <ApperIcon name="Save" className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Settings