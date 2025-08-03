import templatesData from "@/services/mockData/templates.json"

class TemplateService {
  constructor() {
    this.templates = [...templatesData]
  }

  async getAll() {
    await this.delay()
    return [...this.templates]
  }

  async getById(id) {
    await this.delay()
    const template = this.templates.find(t => t.Id === id)
    if (!template) {
      throw new Error("Template not found")
    }
    return { ...template }
  }

  async getByCategory(category) {
    await this.delay()
    return this.templates.filter(t => t.category === category)
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200))
  }
}

export default new TemplateService()