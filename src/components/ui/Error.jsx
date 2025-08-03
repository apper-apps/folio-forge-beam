import React from "react"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="AlertTriangle" className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        {message}
      </p>
      <div className="flex space-x-4">
        <Button
          onClick={onRetry}
          size="lg"
        >
          <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
          Try Again
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => window.location.reload()}
        >
          <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
          Refresh Page
        </Button>
      </div>
    </div>
  )
}

export default Error