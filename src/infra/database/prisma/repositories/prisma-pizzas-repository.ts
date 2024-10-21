import { PizzasRepository } from "@/domain/pizzeria/application/repositories/pizzas-repository";
import { Pizza } from "@/domain/pizzeria/enterprise/entities/pizza";
import { Injectable } from "@nestjs/common";
import { PrismaPizzasMapper } from "../mappers/prisma-pizzas-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaPizzasRepository implements PizzasRepository {
  constructor(private prisma: PrismaService) { }

  async create(pizza: Pizza): Promise<Pizza | null> {
    const data = PrismaPizzasMapper.toPrisma(pizza)


    const pizzaCreated = await this.prisma.pizza.create({
      data,
      include: {
        additionals: true,
        flavor: true,
        size: true,
      }
    })

    return PrismaPizzasMapper.toDomain(pizzaCreated)
  }
}