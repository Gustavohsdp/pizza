import { OrdersRepository } from "@/domain/pizzeria/application/repositories/orders-repository";
import { Order } from "@/domain/pizzeria/enterprise/entities/order";
import { Injectable } from "@nestjs/common";
import { PrismaOrdersMapper } from "../mappers/prisma-orders-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaOrdersRepository implements OrdersRepository {
  constructor(private prisma: PrismaService) { }

  async create(order: Order): Promise<Order | null> {
    const data = PrismaOrdersMapper.toPrisma(order)


    const orderCreated = await this.prisma.order.create({
      data,
      include: {
        pizzas: {
          include: {
            additionals: true,
            size: true,
            flavor: true
          }
        }
      }
    })

    return PrismaOrdersMapper.toDomain(orderCreated)
  }
}