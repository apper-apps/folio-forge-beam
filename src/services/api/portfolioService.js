import portfoliosData from "@/services/mockData/portfolios.json"

class PortfolioService {
  constructor() {
    this.portfolios = [...portfoliosData]
  }

  async getAll() {
    await this.delay()
    return [...this.portfolios]
  }

  async getById(id) {
    await this.delay()
    const portfolio = this.portfolios.find(p => p.Id === id)
    if (!portfolio) {
      throw new Error("Portfolio not found")
    }
    return { ...portfolio }
  }

  async create(portfolioData) {
    await this.delay()
    const newId = Math.max(...this.portfolios.map(p => p.Id), 0) + 1
    const newPortfolio = {
      Id: newId,
      ...portfolioData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.portfolios.push(newPortfolio)
    return { ...newPortfolio }
  }

  async update(id, updateData) {
    await this.delay()
    const index = this.portfolios.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error("Portfolio not found")
    }
    
    this.portfolios[index] = {
      ...this.portfolios[index],
      ...updateData,
      Id: id,
      updatedAt: new Date().toISOString()
    }
    
    return { ...this.portfolios[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.portfolios.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error("Portfolio not found")
    }
    
    this.portfolios.splice(index, 1)
    return true
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300))
  }
}

export default new PortfolioService()