import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Flavor } from '@/domain/pizzeria/enterprise/entities/flavor'
import { } from '@/domain/pizzeria/enterprise/entities/size'
import { Prisma, Flavor as PrismaFlavor } from '@prisma/client'

export class PrismaFlavorsMapper {
  static toDomain(raw: PrismaFlavor): Flavor {
    return Flavor.create(
      {
        extraTime: raw.extraTime,
        name: raw.name,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(flavor: Flavor): Prisma.FlavorUncheckedCreateInput {
    return {
      id: flavor.id.toString(),
      name: flavor.name,
      extraTime: flavor.extraTime,
      createdAt: flavor.createdAt,
    }
  }
}