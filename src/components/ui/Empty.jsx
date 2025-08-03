import React from "react"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "No items found", 
  message = "Get started by creating your first item",
  action,
  actionLabel = "Get Started",
  icon = "Folder"
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        {message}
      </p>
      {action && (
        <Button
          onClick={action}
          size="lg"
        >
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default Empty