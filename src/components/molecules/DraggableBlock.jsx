import React from "react"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const DraggableBlock = ({ type, icon, title, description, onDragStart }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", type)
    if (onDragStart) onDragStart(type)
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={cn(
        "p-3 bg-white border-2 border-gray-200 rounded-lg cursor-grab active:cursor-grabbing",
        "hover:border-primary-300 hover:bg-primary-50/50 transition-all duration-200",
        "group"
      )}
    >
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg group-hover:scale-110 transition-transform duration-200">
          <ApperIcon name={icon} className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary-700 transition-colors">
            {title}
          </h4>
          <p className="text-xs text-gray-500 truncate">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default DraggableBlock