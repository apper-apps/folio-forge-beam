import React from "react"
import { useNavigate } from "react-router-dom"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import { formatDistanceToNow } from "date-fns"

const PortfolioCard = ({ portfolio, onEdit, onDelete, onPreview }) => {
  const navigate = useNavigate()

  return (
    <Card hover className="group overflow-hidden">
      <div className="aspect-[4/3] bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
        {portfolio.thumbnail ? (
          <img
            src={portfolio.thumbnail}
            alt={portfolio.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ApperIcon name="Layout" className="w-16 h-16 text-gray-400" />
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Badge variant={portfolio.published ? "success" : "default"}>
            {portfolio.published ? "Published" : "Draft"}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            <Button
              onClick={() => onPreview(portfolio)}
              size="sm"
              variant="secondary"
              className="flex-1"
            >
              <ApperIcon name="Eye" className="w-4 h-4 mr-1" />
              Preview
            </Button>
            <Button
              onClick={() => onEdit(portfolio)}
              size="sm"
              className="flex-1"
            >
              <ApperIcon name="Edit" className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
            {portfolio.name}
          </h3>
          <button
            onClick={() => onDelete(portfolio)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-50 rounded"
          >
            <ApperIcon name="Trash2" className="w-4 h-4 text-red-500" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-3">
          {portfolio.subdomain}.folioforge.com
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Updated {formatDistanceToNow(new Date(portfolio.updatedAt))} ago</span>
          <div className="flex items-center">
            <ApperIcon name="Eye" className="w-3 h-3 mr-1" />
            {portfolio.views || 0} views
          </div>
        </div>
      </div>
    </Card>
  )
}

export default PortfolioCard