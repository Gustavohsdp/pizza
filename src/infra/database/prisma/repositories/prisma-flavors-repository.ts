import { FlavorsRepository } from "@/domain/pizzeria/application/repositories/flavors-repository";
import { Flavor } from "@/domain/pizzeria/enterprise/entities/flavor";
import { Injectable } from "@nestjs/common";
import { PrismaFlavorsMapper } from "../mappers/prisma-flavors-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaFlavorsRepository implements FlavorsRepository {
  constructor(private prisma: PrismaService) { }

  async create(flavor: Flavor): Promise<void> {
    const data = PrismaFlavorsMapper.toPrisma(flavor)

    await this.prisma.flavor.create({
      data
    })
  }

  async findById(flavorId: string): Promise<Flavor | null> {
    const flavor = await this.prisma.flavor.findUnique({
      where: {
        id: flavorId,
      },
    })

    if (!flavor) {
      return null
    }

    return PrismaFlavorsMapper.toDomain(flavor)
  }
  async findByName(name: string): Promise<Flavor | null> {
    const flavor = await this.prisma.flavor.findUnique({
      where: {
        name
      },
    })

    if (!flavor) {
      return null
    }

    return PrismaFlavorsMapper.toDomain(flavor)
  }

  async fetch(): Promise<Flavor[]> {
    const flavors = await this.prisma.flavor.findMany({
      orderBy: {
        name: "asc",
      },
    })

    return flavors.map(PrismaFlavorsMapper.toDomain)
  }
}