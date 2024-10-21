import { OrdersRepository } from '@/domain/pizzeria/application/repositories/orders-repository'
import { Order } from '@/domain/pizzeria/enterprise/entities/order'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  async create(order: Order): Promise<Order | null> {
    this.items.push(order)

    const orderCreated = this.items.find((item) => item.id.toString() === order.id.toString())

    if (!orderCreated) {
      return null
    }


    return orderCreated
  }
} 
