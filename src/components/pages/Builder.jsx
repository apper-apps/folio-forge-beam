import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import BuilderSidebar from "@/components/organisms/BuilderSidebar"
import BuilderCanvas from "@/components/organisms/BuilderCanvas"
import PropertiesPanel from "@/components/organisms/PropertiesPanel"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import portfolioService from "@/services/api/portfolioService"
import pageService from "@/services/api/pageService"

const Builder = () => {
  const { portfolioId } = useParams()
  const [portfolio, setPortfolio] = useState(null)
  const [currentPage, setCurrentPage] = useState(null)
  const [blocks, setBlocks] = useState([])
  const [selectedBlockId, setSelectedBlockId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      setError("")
      
      if (portfolioId) {
        const portfolioData = await portfolioService.getById(parseInt(portfolioId))
        setPortfolio(portfolioData)
        
        // Load the main page for this portfolio
        const pages = await pageService.getByPortfolio(parseInt(portfolioId))
        if (pages.length > 0) {
          const mainPage = pages[0]
          setCurrentPage(mainPage)
          setBlocks(mainPage.blocks || [])
        } else {
          // Create a new page if none exists
          const newPage = await pageService.create({
            portfolioId: parseInt(portfolioId),
            title: "Home",
            slug: "home",
            blocks: [],
            settings: {}
          })
          setCurrentPage(newPage)
          setBlocks([])
        }
      }
    } catch (error) {
      setError("Failed to load builder data. Please try again.")
      console.error("Error loading builder data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [portfolioId])

  const autoSave = async (updatedBlocks) => {
    if (!currentPage) return
    
    try {
      setSaving(true)
      const updatedPage = {
        ...currentPage,
        blocks: updatedBlocks,
        updatedAt: new Date().toISOString()
      }
      await pageService.update(currentPage.Id, updatedPage)
      setCurrentPage(updatedPage)
    } catch (error) {
      console.error("Auto-save failed:", error)
    } finally {
      setSaving(false)
    }
  }

  const generateBlockId = () => {
    return `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const handleAddBlock = (blockType) => {
    const newBlock = {
      id: generateBlockId(),
      type: blockType,
      content: getDefaultContent(blockType),
      style: {},
      position: { x: 0, y: blocks.length * 100 }
    }

    const updatedBlocks = [...blocks, newBlock]
    setBlocks(updatedBlocks)
    setSelectedBlockId(newBlock.id)
    autoSave(updatedBlocks)
    toast.success(`${blockType} block added`)
  }

  const getDefaultContent = (blockType) => {
    switch (blockType) {
      case "text":
        return {
          title: "Your Heading Here",
          text: "Add your content here. Click to edit this text block and customize it to tell your story."
        }
      case "image":
        return {
          src: "",
          alt: "Image description"
        }
      case "social":
        return {
          instagram: "",
          twitter: "",
          linkedin: "",
          email: ""
        }
      default:
        return {}
    }
  }

  const handleSelectBlock = (blockId) => {
    setSelectedBlockId(blockId)
  }

  const handleUpdateBlock = (updatedBlock) => {
    const updatedBlocks = blocks.map(block =>
      block.id === updatedBlock.id ? updatedBlock : block
    )
    setBlocks(updatedBlocks)
    autoSave(updatedBlocks)
  }

  const handleDeleteBlock = (blockId) => {
    const updatedBlocks = blocks.filter(block => block.id !== blockId)
    setBlocks(updatedBlocks)
    setSelectedBlockId(null)
    autoSave(updatedBlocks)
    toast.success("Block deleted")
  }

  const selectedBlock = blocks.find(block => block.id === selectedBlockId)

  if (loading) {
    return <Loading message="Loading builder..." />
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <BuilderSidebar />
      
      <BuilderCanvas
        blocks={blocks}
        onAddBlock={handleAddBlock}
        onSelectBlock={handleSelectBlock}
        selectedBlockId={selectedBlockId}
      />
      
      <PropertiesPanel
        selectedBlock={selectedBlock}
        onUpdateBlock={handleUpdateBlock}
        onDeleteBlock={handleDeleteBlock}
      />

      {saving && (
        <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-lg flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-gray-600">Saving...</span>
        </div>
      )}
    </div>
  )
}

export default Builder