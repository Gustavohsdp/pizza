import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Size, SizeProps } from '@/domain/pizzeria/enterprise/entities/size'
import { PrismaSizesMapper } from '@/infra/database/prisma/mappers/prisma-sizes-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'


export function makeSize(
  override: Partial<SizeProps> = {},
  id?: UniqueEntityID,
) {
  const size = Size.create(
    {
      name: faker.string.uuid(),
      price: faker.number.int({ min: 1, max: 100 }),
      time: faker.number.int({ min: 1, max: 30 }),
      ...override,
    },
    id,
  )

  return size
}

@Injectable()
export class SizeFactory {
  constructor(private prisma: PrismaService) { }

  async makePrismaSize(data: Partial<SizeProps> = {}): Promise<Size> {
    const size = makeSize(data)

    await this.prisma.size.create({
      data: PrismaSizesMapper.toPrisma(size)
    })

    return size
  }
}