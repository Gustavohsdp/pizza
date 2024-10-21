import { CustomizationsRepository } from '@/domain/pizzeria/application/repositories/customizations-repository'
import { Customize } from '@/domain/pizzeria/enterprise/entities/customize'

export class InMemoryCustomizationsRepository implements CustomizationsRepository {
  public items: Customize[] = []

  async create(customize: Customize): Promise<Customize | null> {
    this.items.push(customize)

    const customizeCreated = this.items.find((item) => item.id.toString() === customize.id.toString())

    if (!customizeCreated) {
      return null
    }


    return customizeCreated
  }
  async findByName(name: string): Promise<Customize | null> {
    const customize = this.items.find((item) => item.name === name)

    if (!customize) {
      return null
    }

    return customize
  }

  async fetch() {
    const sizes = this.items.sort((a, b) => a.name.localeCompare(b.name))

    return sizes
  }
}
