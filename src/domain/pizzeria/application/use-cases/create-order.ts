import { Either, left, right } from "@/core/either"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { Injectable } from "@nestjs/common"
import { Customize } from "../../enterprise/entities/customize"
import { Order } from "../../enterprise/entities/order"
import { Pizza } from "../../enterprise/entities/pizza"
import { CustomizationsRepository } from "../repositories/customizations-repository"
import { FlavorsRepository } from "../repositories/flavors-repository"
import { OrdersRepository } from "../repositories/orders-repository"
import { PizzasRepository } from "../repositories/pizzas-repository"
import { SizesRepository } from "../repositories/sizes-repository"
import { MissingPizzaInOrderError } from "./errors/missing-pizza-in-order-error"

interface SummaryPizzaProps {
  flavor: string,
  size: string,
  additionals: {
    name: string,
    price: number
  }[],
  price: number,
  totalvalue: number
}

interface CreateOrderUseCaseRequest {
  pizzas: {
    size: string
    flavor: string
    additional?: string[]
  }[]
}

type CreateOrderUseCaseResponse = Either<
  ResourceNotFoundError | MissingPizzaInOrderError,
  {
    order: {
      orderId: string;
      totalValue: number;
      timePreparation: number;
      createdAt: Date;
      pizzas: SummaryPizzaProps[]
    }
  }
>

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private pizzasRepository: PizzasRepository,
    private sizesRepository: SizesRepository,
    private flavorsRepository: FlavorsRepository,
    private customizationsRepository: CustomizationsRepository,
    private ordersRepository: OrdersRepository,
  ) { }

  async execute({
    pizzas
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    let createdPizzas: Pizza[] = []
    let summaryPizzas: SummaryPizzaProps[] = []

    if (pizzas && pizzas.length <= 0) {
      return left(new MissingPizzaInOrderError())
    }

    for await (const pizza of pizzas) {
      let additionals: Customize[] = []

      const [foundSize, foundFlavor] = await Promise.all([
        this.sizesRepository.findByName(pizza.size),
        this.flavorsRepository.findByName(pizza.flavor)
      ])

      if (!foundSize || !foundFlavor) {
        return left(new ResourceNotFoundError())
      }

      let timePreparation = foundSize.time
      let totalvalue = foundSize.price

      if (foundFlavor.extraTime) {
        timePreparation += foundFlavor.extraTime
      }

      if (pizza.additional && pizza.additional.length > 0) {
        for await (const additional of pizza.additional) {
          const foundAdditional = await this.customizationsRepository.findByName(additional)

          if (!foundAdditional) {
            return left(new ResourceNotFoundError())
          }

          totalvalue += foundAdditional.extraPrice
          timePreparation += foundAdditional.extraTime

          additionals.push(foundAdditional)
        }
      }

      const newPizza = Pizza.create({
        flavorId: new UniqueEntityID(foundFlavor.id.toString()),
        sizeId: new UniqueEntityID(foundSize.id.toString()),
        timePreparation,
        totalvalue,
        additionals: additionals.map((additional) => additional.id),
      })

      await this.pizzasRepository.create(newPizza)

      createdPizzas.push(newPizza)

      summaryPizzas.push({
        flavor: foundFlavor.name,
        size: foundSize.name,
        additionals: additionals.map((additional) => ({
          name: additional.name,
          price: additional.extraPrice,
        })),
        price: foundSize.price,
        totalvalue: foundSize.price + additionals.reduce((sum, additional) => sum + additional.extraPrice, 0),
      })
    }

    if (createdPizzas.length === 0) {
      return left(new ResourceNotFoundError())
    }

    const order = Order.create({
      timePreparation: createdPizzas.reduce((sum, pizza) => sum + pizza.timePreparation, 0),
      totalValue: createdPizzas.reduce((sum, pizza) => sum + pizza.totalvalue, 0),
      pizzas: createdPizzas.map((pizza) => pizza.id),
    })

    await this.ordersRepository.create(order)

    const resumeOrder = {
      pizzas: summaryPizzas,
      orderId: order.id.toString(),
      totalValue: order.totalValue,
      timePreparation: order.timePreparation,
      createdAt: order.createdAt
    }

    return right({ order: resumeOrder })
  }
}