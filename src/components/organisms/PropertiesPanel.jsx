import React from "react"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"

const PropertiesPanel = ({ selectedBlock, onUpdateBlock, onDeleteBlock }) => {
  if (!selectedBlock) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
          <p className="text-sm text-gray-600 mt-1">
            Select a block to edit its properties
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <ApperIcon name="MousePointer" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No block selected</p>
          </div>
        </div>
      </div>
    )
  }

  const handleContentChange = (field, value) => {
    const updatedBlock = {
      ...selectedBlock,
      content: {
        ...selectedBlock.content,
        [field]: value
      }
    }
    onUpdateBlock(updatedBlock)
  }

  const renderProperties = () => {
    switch (selectedBlock.type) {
      case "text":
        return (
          <div className="space-y-4">
            <Input
              label="Heading"
              value={selectedBlock.content?.title || ""}
              onChange={(e) => handleContentChange("title", e.target.value)}
              placeholder="Enter heading text"
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <textarea
                value={selectedBlock.content?.text || ""}
                onChange={(e) => handleContentChange("text", e.target.value)}
                placeholder="Enter your content here..."
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 resize-none"
              />
            </div>
          </div>
        )
      
      case "image":
        return (
          <div className="space-y-4">
            <Input
              label="Image URL"
              value={selectedBlock.content?.src || ""}
              onChange={(e) => handleContentChange("src", e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <Input
              label="Alt Text"
              value={selectedBlock.content?.alt || ""}
              onChange={(e) => handleContentChange("alt", e.target.value)}
              placeholder="Describe the image"
            />
            <div className="pt-4 border-t border-gray-200">
              <Button variant="outline" size="sm" className="w-full">
                <ApperIcon name="Upload" className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
            </div>
          </div>
        )
      
      case "social":
        return (
          <div className="space-y-4">
            <Input
              label="Instagram URL"
              value={selectedBlock.content?.instagram || ""}
              onChange={(e) => handleContentChange("instagram", e.target.value)}
              placeholder="https://instagram.com/username"
            />
            <Input
              label="Twitter URL"
              value={selectedBlock.content?.twitter || ""}
              onChange={(e) => handleContentChange("twitter", e.target.value)}
              placeholder="https://twitter.com/username"
            />
            <Input
              label="LinkedIn URL"
              value={selectedBlock.content?.linkedin || ""}
              onChange={(e) => handleContentChange("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
            <Input
              label="Email"
              value={selectedBlock.content?.email || ""}
              onChange={(e) => handleContentChange("email", e.target.value)}
              placeholder="your@email.com"
            />
          </div>
        )
      
      default:
        return (
          <div className="text-center py-8">
            <ApperIcon name="Settings" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Properties for {selectedBlock.type} block</p>
          </div>
        )
    }
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
            <p className="text-sm text-gray-600 capitalize">
              {selectedBlock.type} Block
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteBlock(selectedBlock.id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        {renderProperties()}
      </div>
      
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Button variant="outline" size="sm" className="w-full">
          <ApperIcon name="Copy" className="w-4 h-4 mr-2" />
          Duplicate Block
        </Button>
        <Button variant="outline" size="sm" className="w-full">
          <ApperIcon name="Move" className="w-4 h-4 mr-2" />
          Move Block
        </Button>
      </div>
    </div>
  )
}

export default PropertiesPanel