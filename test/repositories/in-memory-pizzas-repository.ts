import { PizzasRepository } from '@/domain/pizzeria/application/repositories/pizzas-repository'
import { Pizza } from '@/domain/pizzeria/enterprise/entities/pizza'

export class InMemoryPizzasRepository implements PizzasRepository {
  public items: Pizza[] = []

  async create(pizza: Pizza): Promise<Pizza | null> {
    this.items.push(pizza)

    const pizzaCreated = this.items.find((item) => item.id.toString() === pizza.id.toString())

    if (!pizzaCreated) {
      return null
    }


    return pizzaCreated
  }
} 
