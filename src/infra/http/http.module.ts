import { Module } from "@nestjs/common";

import { CreateOrderUseCase } from "@/domain/pizzeria/application/use-cases/create-order";
import { FetchCustomizationsUseCase } from "@/domain/pizzeria/application/use-cases/fetch-customizations";
import { FetchFlavorsUseCase } from "@/domain/pizzeria/application/use-cases/fetch-flavors";
import { FetchSizesUseCase } from "@/domain/pizzeria/application/use-cases/fetch-sizes";
import { DatabaseModule } from "../database/database.module";
import { OrderController } from "./controllers/create-order.controller";
import { FetchCustomizationsController } from "./controllers/fetch-customizations.controller";
import { FetchFlavorsController } from "./controllers/fetch-flavors.controller";
import { FetchSizesController } from "./controllers/fetch-sizes.controller";
import { HealthCheckController } from "./controllers/health-check.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [
    HealthCheckController,
    OrderController,
    FetchFlavorsController,
    FetchCustomizationsController,
    FetchSizesController
  ],
  providers: [
    CreateOrderUseCase,
    FetchFlavorsUseCase,
    FetchCustomizationsUseCase,
    FetchSizesUseCase
  ],
})

export class HttpModule { }