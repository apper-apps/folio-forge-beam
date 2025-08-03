import React, { useState } from "react"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"
import { cn } from "@/utils/cn"

const BuilderCanvas = ({ blocks = [], onAddBlock, onSelectBlock, selectedBlockId }) => {
  const [dragOver, setDragOver] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const blockType = e.dataTransfer.getData("text/plain")
    if (blockType && onAddBlock) {
      onAddBlock(blockType)
    }
  }

  const renderBlock = (block) => {
    const isSelected = selectedBlockId === block.id

    switch (block.type) {
      case "text":
        return (
          <div
            key={block.id}
            onClick={() => onSelectBlock(block.id)}
            className={cn(
              "p-6 cursor-pointer transition-all duration-200",
              "draggable-block",
              isSelected && "selected"
            )}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {block.content?.title || "Your Heading Here"}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {block.content?.text || "Add your content here. Click to edit this text block and customize it to tell your story."}
            </p>
          </div>
        )
      
      case "image":
        return (
          <div
            key={block.id}
            onClick={() => onSelectBlock(block.id)}
            className={cn(
              "cursor-pointer transition-all duration-200",
              "draggable-block",
              isSelected && "selected"
            )}
          >
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
              {block.content?.src ? (
                <img
                  src={block.content.src}
                  alt={block.content.alt || ""}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <ApperIcon name="Image" className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Click to add image</p>
                </div>
              )}
            </div>
          </div>
        )
      
      case "gallery":
        return (
          <div
            key={block.id}
            onClick={() => onSelectBlock(block.id)}
            className={cn(
              "cursor-pointer transition-all duration-200",
              "draggable-block",
              isSelected && "selected"
            )}
          >
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Image" className="w-6 h-6 text-gray-400" />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">Click to manage gallery images</p>
          </div>
        )
      
      case "social":
        return (
          <div
            key={block.id}
            onClick={() => onSelectBlock(block.id)}
            className={cn(
              "p-6 cursor-pointer transition-all duration-200",
              "draggable-block",
              isSelected && "selected"
            )}
          >
            <div className="flex justify-center space-x-4">
              {["Instagram", "Twitter", "Linkedin", "Mail"].map((platform) => (
                <div
                  key={platform}
                  className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <ApperIcon name={platform} className="w-6 h-6 text-white" />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">Click to edit social links</p>
          </div>
        )
      
      default:
        return (
          <div
            key={block.id}
            onClick={() => onSelectBlock(block.id)}
            className={cn(
              "p-6 cursor-pointer transition-all duration-200",
              "draggable-block",
              isSelected && "selected"
            )}
          >
            <div className="text-center">
              <ApperIcon name="Box" className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">{block.type} block</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-900">Canvas</h2>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <ApperIcon name="Monitor" className="w-4 h-4 mr-2" />
              Desktop
            </Button>
            <Button variant="ghost" size="sm">
              <ApperIcon name="Tablet" className="w-4 h-4 mr-2" />
              Tablet
            </Button>
            <Button variant="ghost" size="sm">
              <ApperIcon name="Smartphone" className="w-4 h-4 mr-2" />
              Mobile
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <ApperIcon name="Undo" className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <ApperIcon name="Redo" className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div
            className={cn(
              "min-h-[600px] bg-white rounded-lg shadow-sm border-2 border-dashed transition-all duration-200 canvas-grid",
              dragOver ? "border-primary-400 bg-primary-50/30" : "border-gray-300"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {blocks.length === 0 ? (
              <div className="h-full flex items-center justify-center p-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="MousePointer" className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Start Building Your Portfolio
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md">
                    Drag content blocks from the sidebar to create your perfect portfolio page.
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center justify-center">
                      <ApperIcon name="MousePointer" className="w-4 h-4 mr-2" />
                      Drag blocks from the left sidebar
                    </div>
                    <div className="flex items-center justify-center">
                      <ApperIcon name="Edit" className="w-4 h-4 mr-2" />
                      Click on blocks to edit content
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 p-6">
                {blocks.map(renderBlock)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuilderCanvas