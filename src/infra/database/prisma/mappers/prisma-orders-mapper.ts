import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Order } from '@/domain/pizzeria/enterprise/entities/order';
import { Prisma, Order as PrismaOrder } from '@prisma/client';

export class PrismaOrdersMapper {
  static toDomain(raw: PrismaOrder & { pizzas: { id: string }[] }): Order {
    return Order.create(
      {
        timePreparation: raw.timePreparation,
        totalValue: raw.totalValue,
        pizzas: (raw.pizzas || []).map(pizza => new UniqueEntityID(pizza.id)),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(order: Order): Prisma.OrderUncheckedCreateInput {
    return {
      id: order.id.toString(),
      totalValue: order.totalValue,
      timePreparation: order.timePreparation,
      pizzas: {
        connect: (order.pizzas || []).map(additional => ({ id: additional.toValue().toString() })),
      },
    };
  }
}
