import { SizesRepository } from '@/domain/pizzeria/application/repositories/sizes-repository'
import { Size } from '@/domain/pizzeria/enterprise/entities/size'

export class InMemorySizesRepository implements SizesRepository {
  public items: Size[] = []

  async create(size: Size) {
    this.items.push(size)
  }

  async findById(sizeId: string) {
    const size = this.items.find((item) => item.id.toString() === sizeId)

    if (!size) {
      return null
    }

    return size
  }

  async findByName(name: string) {
    const size = this.items.find((item) => item.name === name)

    if (!size) {
      return null
    }

    return size
  }

  async fetch() {
    const sizes = this.items.sort((a, b) => a.name.localeCompare(b.name))

    return sizes
  }
}
