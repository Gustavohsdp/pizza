import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Flavor, FlavorProps } from '@/domain/pizzeria/enterprise/entities/flavor'
import { PrismaFlavorsMapper } from '@/infra/database/prisma/mappers/prisma-flavors-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'


export function makeFlavor(
  override: Partial<FlavorProps> = {},
  id?: UniqueEntityID,
) {
  const flavor = Flavor.create(
    {
      name: faker.string.uuid(),
      extraTime: faker.number.int({ min: 1, max: 30 }),
      ...override,
    },
    id,
  )

  return flavor
}

@Injectable()
export class FlavorFactory {
  constructor(private prisma: PrismaService) { }

  async makePrismaFlavor(data: Partial<FlavorProps> = {}): Promise<Flavor> {
    const flavor = makeFlavor(data)

    await this.prisma.flavor.create({
      data: PrismaFlavorsMapper.toPrisma(flavor)
    })

    return flavor
  }
}