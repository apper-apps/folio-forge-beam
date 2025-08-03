import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { path: "/", label: "Dashboard", icon: "LayoutDashboard" },
    { path: "/templates", label: "Templates", icon: "Layers" },
  ]

  const isBuilder = location.pathname.includes("/builder")
  const isPreview = location.pathname.includes("/preview")

  if (isPreview) {
    return (
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
              Back to Editor
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(window.location.href, "_blank")}
            >
              <ApperIcon name="ExternalLink" className="w-4 h-4 mr-2" />
              Open in New Tab
            </Button>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Folio Forge</span>
            </div>

            {!isBuilder && (
              <nav className="hidden md:flex space-x-6">
                {navItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      location.pathname === item.path
                        ? "bg-primary-50 text-primary-700"
                        : "text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                    }`}
                  >
                    <ApperIcon name={item.icon} className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isBuilder ? (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    const portfolioId = location.pathname.split("/").pop()
                    navigate(`/preview/${portfolioId}`)
                  }}
                >
                  <ApperIcon name="Eye" className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button size="sm">
                  <ApperIcon name="Globe" className="w-4 h-4 mr-2" />
                  Publish
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/settings")}
                >
                  <ApperIcon name="Settings" className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button
                  size="sm"
                  onClick={() => navigate("/templates")}
                >
                  <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                  Create Portfolio
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header