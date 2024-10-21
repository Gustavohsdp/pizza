import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Customize } from '@/domain/pizzeria/enterprise/entities/customize';
import { Pizza } from '@/domain/pizzeria/enterprise/entities/pizza';
import { Prisma, Pizza as PrismaPizza } from '@prisma/client';

export class PrismaPizzasMapper {
  static toDomain(raw: PrismaPizza & { additionals: { id: string; name: string; extraPrice: number; extraTime: number }[] }): Pizza {
    const additionals = raw.additionals.map(additional =>
      Customize.create({
        name: additional.name,
        extraPrice: additional.extraPrice,
        extraTime: additional.extraTime,
        createdAt: new Date(),
      })
    );

    return Pizza.create(
      {
        totalvalue: raw.totalvalue,
        timePreparation: raw.timePreparation,
        flavorId: new UniqueEntityID(raw.flavorId),
        sizeId: new UniqueEntityID(raw.sizeId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        additionals: additionals.map((additional) => additional.id),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(pizza: Pizza): Prisma.PizzaUncheckedCreateInput {
    return {
      id: pizza.id.toString(),
      timePreparation: pizza.timePreparation,
      totalvalue: pizza.totalvalue,
      flavorId: pizza.flavorId.toString(),
      sizeId: pizza.sizeId.toString(),
      additionals: {
        connect: (pizza.additionals || []).map(additional => ({ id: additional.toValue().toString() })),
      },
    }
  }
}
