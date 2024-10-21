import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { CreateOrderUseCase } from "@/domain/pizzeria/application/use-cases/create-order";
import { MissingPizzaInOrderError } from "@/domain/pizzeria/application/use-cases/errors/missing-pizza-in-order-error";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { z } from "zod";


const orderBodySchema = z.object({
  pizzas: z.array(z.object({
    size: z.union([z.literal('pequena'), z.literal('média'), z.literal('grande')]),
    flavor: z.union([z.literal('calabresa'), z.literal('marguerita'), z.literal('portuguesa')]),
    additional: z.array(z.union([z.literal('extra bacon'), z.literal('sem cebola'), z.literal('borda recheada')])).optional(),
  }))
});

type OrderBodySchema = z.infer<typeof orderBodySchema>;

@Controller("/order")
export class OrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) { }
  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(orderBodySchema))
  async handle(@Body() body: OrderBodySchema) {
    const result = await this.createOrderUseCase.execute(body)

    if (result.isLeft()) {
      const error = result.value


      switch (error.constructor) {
        case MissingPizzaInOrderError:
        case ResourceNotFoundError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }

    const order = result.value.order

    return {
      status: 201,
      data: order
    }
  }
}