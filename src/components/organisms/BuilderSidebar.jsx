import React from "react"
import DraggableBlock from "@/components/molecules/DraggableBlock"
import ApperIcon from "@/components/ApperIcon"

const BuilderSidebar = () => {
  const blockTypes = [
    {
      type: "text",
      icon: "Type",
      title: "Text Block",
      description: "Add headings and paragraphs"
    },
    {
      type: "image",
      icon: "Image",
      title: "Image",
      description: "Upload and display images"
    },
    {
      type: "gallery",
      icon: "Images",
      title: "Image Gallery",
      description: "Showcase multiple images"
    },
    {
      type: "video",
      icon: "Video",
      title: "Video",
      description: "Embed videos or upload files"
    },
    {
      type: "social",
      icon: "Share2",
      title: "Social Links",
      description: "Add social media links"
    },
    {
      type: "contact",
      icon: "Mail",
      title: "Contact Form",
      description: "Let clients get in touch"
    },
    {
      type: "testimonial",
      icon: "Quote",
      title: "Testimonial",
      description: "Display client reviews"
    },
    {
      type: "spacer",
      icon: "Minus",
      title: "Spacer",
      description: "Add spacing between blocks"
    }
  ]

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <ApperIcon name="Blocks" className="w-5 h-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-gray-900">Content Blocks</h2>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Drag blocks to your canvas to build your portfolio
        </p>
      </div>
      
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {blockTypes.map((block) => (
          <DraggableBlock
            key={block.type}
            type={block.type}
            icon={block.icon}
            title={block.title}
            description={block.description}
          />
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500 text-center">
          <ApperIcon name="Info" className="w-4 h-4 inline mr-1" />
          Drag and drop blocks to get started
        </div>
      </div>
    </div>
  )
}

export default BuilderSidebar