import { FlavorsRepository } from '@/domain/pizzeria/application/repositories/flavors-repository'
import { Flavor } from '@/domain/pizzeria/enterprise/entities/flavor'

export class InMemoryFlavorsRepository implements FlavorsRepository {
  public items: Flavor[] = []

  async create(flavor: Flavor): Promise<void> {
    this.items.push(flavor)
  }

  async findById(flavorId: string): Promise<Flavor | null> {
    const flavor = this.items.find((item) => item.id.toString() === flavorId)

    if (!flavor) {
      return null
    }

    return flavor
  }

  async findByName(name: string): Promise<Flavor | null> {
    const flavor = this.items.find((item) => item.name === name)

    if (!flavor) {
      return null
    }

    return flavor
  }

  async fetch() {
    const sizes = this.items.sort((a, b) => a.name.localeCompare(b.name))

    return sizes
  }
}
