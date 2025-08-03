import React from "react"
import ApperIcon from "@/components/ApperIcon"

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <ApperIcon name="Zap" className="w-6 h-6 text-primary-500" />
        </div>
      </div>
      <p className="mt-4 text-lg font-medium text-gray-900">{message}</p>
      <div className="mt-8 space-y-4 w-full max-w-md">
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-pulse"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-pulse w-3/4"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-pulse w-1/2"></div>
      </div>
    </div>
  )
}

export default Loading