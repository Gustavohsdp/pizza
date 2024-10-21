import { SizesRepository } from "@/domain/pizzeria/application/repositories/sizes-repository";
import { Size } from "@/domain/pizzeria/enterprise/entities/size";
import { Injectable } from "@nestjs/common";
import { PrismaSizesMapper } from "../mappers/prisma-sizes-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaSizesRepository implements SizesRepository {
  constructor(private prisma: PrismaService) { }
  async create(size: Size): Promise<void> {
    const data = PrismaSizesMapper.toPrisma(size)

    await this.prisma.size.create({
      data,
    })
  }

  async findById(sizeId: string): Promise<Size | null> {
    const size = await this.prisma.size.findUnique({
      where: {
        id: sizeId,
      },
    })

    if (!size) {
      return null
    }

    return PrismaSizesMapper.toDomain(size)
  }

  async findByName(name: string): Promise<Size | null> {
    const size = await this.prisma.size.findUnique({
      where: {
        name,
      },
    })

    if (!size) {
      return null
    }

    return PrismaSizesMapper.toDomain(size)
  }

  async fetch(): Promise<Size[]> {
    const sizes = await this.prisma.size.findMany({
      orderBy: {
        name: "asc",
      },
    })

    return sizes.map(PrismaSizesMapper.toDomain)
  }
}