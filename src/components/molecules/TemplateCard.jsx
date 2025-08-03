import React from "react"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const TemplateCard = ({ template, onSelect }) => {
  return (
    <Card hover className="group overflow-hidden">
      <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        <img
          src={template.preview}
          alt={template.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={() => onSelect(template)}
            size="sm"
            className="w-full"
          >
            <ApperIcon name="Eye" className="w-4 h-4 mr-2" />
            Use Template
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {template.name}
          </h3>
          <Badge variant="primary" size="sm">
            {template.category}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          {template.description}
        </p>
        <div className="flex items-center text-xs text-gray-500">
          <ApperIcon name="Layout" className="w-4 h-4 mr-1" />
          {template.blocks} blocks
        </div>
      </div>
    </Card>
  )
}

export default TemplateCard