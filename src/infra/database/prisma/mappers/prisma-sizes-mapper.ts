import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Size } from '@/domain/pizzeria/enterprise/entities/size'
import { Prisma, Size as PrismaSize } from '@prisma/client'

export class PrismaSizesMapper {
  static toDomain(raw: PrismaSize): Size {
    return Size.create(
      {
        name: raw.name,
        price: raw.price,
        time: raw.time,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(size: Size): Prisma.SizeUncheckedCreateInput {
    return {
      id: size.id.toString(),
      name: size.name,
      price: size.price,
      time: size.time,
      createdAt: size.createdAt,
    }
  }
}