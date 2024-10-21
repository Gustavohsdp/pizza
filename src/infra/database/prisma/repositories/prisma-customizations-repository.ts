import { CustomizationsRepository } from "@/domain/pizzeria/application/repositories/customizations-repository";
import { Customize } from "@/domain/pizzeria/enterprise/entities/customize";
import { Injectable } from "@nestjs/common";
import { PrismaCustomizationsMapper } from "../mappers/prisma-customizations-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaCustomizationsRepository implements CustomizationsRepository {
  constructor(private prisma: PrismaService) { }

  async create(customize: Customize): Promise<Customize | null> {
    const data = PrismaCustomizationsMapper.toPrisma(customize)

    const customizeCreated = await this.prisma.customize.create({
      data
    })

    return PrismaCustomizationsMapper.toDomain(customizeCreated)
  }

  async findByName(name: string): Promise<Customize | null> {
    const customize = await this.prisma.customize.findUnique({
      where: {
        name
      },
    })

    if (!customize) {
      return null
    }

    return PrismaCustomizationsMapper.toDomain(customize)
  }

  async fetch(): Promise<Customize[]> {
    const customizes = await this.prisma.customize.findMany({
      orderBy: {
        name: "asc",
      },
    })

    return customizes.map(PrismaCustomizationsMapper.toDomain)
  }
}