import { CustomizationsRepository } from "@/domain/pizzeria/application/repositories/customizations-repository";
import { FlavorsRepository } from "@/domain/pizzeria/application/repositories/flavors-repository";
import { OrdersRepository } from "@/domain/pizzeria/application/repositories/orders-repository";
import { PizzasRepository } from "@/domain/pizzeria/application/repositories/pizzas-repository";
import { SizesRepository } from "@/domain/pizzeria/application/repositories/sizes-repository";
import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaCustomizationsRepository } from "./prisma/repositories/prisma-customizations-repository";
import { PrismaFlavorsRepository } from "./prisma/repositories/prisma-flavors-repository";
import { PrismaOrdersRepository } from "./prisma/repositories/prisma-orders-repository";
import { PrismaPizzasRepository } from "./prisma/repositories/prisma-pizzas-repository";
import { PrismaSizesRepository } from "./prisma/repositories/prisma-sizes-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: PizzasRepository,
      useClass: PrismaPizzasRepository,
    },
    {
      provide: SizesRepository,
      useClass: PrismaSizesRepository,
    },
    {
      provide: FlavorsRepository,
      useClass: PrismaFlavorsRepository,
    },
    {
      provide: CustomizationsRepository,
      useClass: PrismaCustomizationsRepository,
    },
    {
      provide: OrdersRepository,
      useClass: PrismaOrdersRepository,
    },
  ],
  exports: [
    PrismaService,
    PizzasRepository,
    SizesRepository,
    FlavorsRepository,
    CustomizationsRepository,
    OrdersRepository
  ],
})

export class DatabaseModule { }