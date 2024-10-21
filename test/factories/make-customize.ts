import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Customize, CustomizeProps } from '@/domain/pizzeria/enterprise/entities/customize'
import { PrismaCustomizationsMapper } from '@/infra/database/prisma/mappers/prisma-customizations-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'


export function makeCustomize(
  override: Partial<CustomizeProps> = {},
  id?: UniqueEntityID,
) {
  const customize = Customize.create(
    {
      name: faker.string.uuid(),
      extraPrice: faker.number.int({ min: 1, max: 100 }),
      extraTime: faker.number.int({ min: 1, max: 30 }),
      ...override,
    },
    id,
  )

  return customize
}

@Injectable()
export class CustomizeFactory {
  constructor(private prisma: PrismaService) { }

  async makePrismaCustomize(data: Partial<CustomizeProps> = {}): Promise<Customize> {
    const customize = makeCustomize(data)

    await this.prisma.customize.create({
      data: PrismaCustomizationsMapper.toPrisma(customize)
    })

    return customize
  }
}