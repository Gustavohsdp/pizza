import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Customize } from '@/domain/pizzeria/enterprise/entities/customize'
import { } from '@/domain/pizzeria/enterprise/entities/size'
import { Prisma, Customize as PrismaCustomize } from '@prisma/client'

export class PrismaCustomizationsMapper {
  static toDomain(raw: PrismaCustomize): Customize {
    return Customize.create(
      {
        extraPrice: raw.extraPrice,
        extraTime: raw.extraTime,
        name: raw.name,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(customize: Customize): Prisma.CustomizeUncheckedCreateInput {
    return {
      id: customize.id.toString(),
      extraPrice: customize.extraPrice,
      extraTime: customize.extraTime,
      name: customize.name,
      createdAt: customize.createdAt,
    }
  }
}