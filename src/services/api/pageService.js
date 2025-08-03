import pagesData from "@/services/mockData/pages.json"

class PageService {
  constructor() {
    this.pages = [...pagesData]
  }

  async getAll() {
    await this.delay()
    return [...this.pages]
  }

  async getById(id) {
    await this.delay()
    const page = this.pages.find(p => p.Id === id)
    if (!page) {
      throw new Error("Page not found")
    }
    return { ...page }
  }

  async getByPortfolio(portfolioId) {
    await this.delay()
    return this.pages.filter(p => p.portfolioId === portfolioId)
  }

  async create(pageData) {
    await this.delay()
    const newId = Math.max(...this.pages.map(p => p.Id), 0) + 1
    const newPage = {
      Id: newId,
      ...pageData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.pages.push(newPage)
    return { ...newPage }
  }

  async update(id, updateData) {
    await this.delay()
    const index = this.pages.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error("Page not found")
    }
    
    this.pages[index] = {
      ...this.pages[index],
      ...updateData,
      Id: id,
      updatedAt: new Date().toISOString()
    }
    
    return { ...this.pages[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.pages.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error("Page not found")
    }
    
    this.pages.splice(index, 1)
    return true
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300))
  }
}

export default new PageService()