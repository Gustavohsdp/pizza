import { makeCustomize } from 'test/factories/make-customize'
import { makeFlavor } from 'test/factories/make-flavor'
import { makeSize } from 'test/factories/make-size'
import { InMemoryCustomizationsRepository } from 'test/repositories/in-memory-customize-repository'
import { InMemoryFlavorsRepository } from 'test/repositories/in-memory-flavor-repository'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository'
import { InMemoryPizzasRepository } from 'test/repositories/in-memory-pizzas-repository'
import { InMemorySizesRepository } from 'test/repositories/in-memory-sizes-repository'
import { CreateOrderUseCase } from './create-order'
import { MissingPizzaInOrderError } from './errors/missing-pizza-in-order-error'

let inMemoryFlavorsRepository: InMemoryFlavorsRepository
let inMemoryCustomizationsRepository: InMemoryCustomizationsRepository
let inMemorySizesRepository: InMemorySizesRepository
let inMemoryPizzasRepository: InMemoryPizzasRepository
let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: CreateOrderUseCase

describe('Create Order', () => {
  beforeEach(() => {
    inMemoryFlavorsRepository =
      new InMemoryFlavorsRepository()
    inMemoryCustomizationsRepository = new InMemoryCustomizationsRepository()
    inMemorySizesRepository = new InMemorySizesRepository()
    inMemoryPizzasRepository = new InMemoryPizzasRepository()
    inMemoryOrdersRepository = new InMemoryOrdersRepository()

    sut = new CreateOrderUseCase(
      inMemoryPizzasRepository,
      inMemorySizesRepository,
      inMemoryFlavorsRepository,
      inMemoryCustomizationsRepository,
      inMemoryOrdersRepository)
  })

  it('should be able to create new order', async () => {
    const flavor = makeFlavor({
      name: "margherita",
    })

    const size = makeSize({
      name: "small",
    })

    const customize = makeCustomize({
      name: "extra bacon",
    })

    inMemoryFlavorsRepository.create(flavor)
    inMemorySizesRepository.create(size)
    inMemoryCustomizationsRepository.create(customize)

    const result = await sut.execute({
      pizzas: [
        {
          size: "small",
          flavor: "margherita",
          additional: ["extra bacon"]
        }
      ]
    })

    expect(result.isRight()).toBe(true)
  })

  it('should not be able to create an order without pizza', async () => {
    const flavor = makeFlavor({
      name: "margherita",
    })

    const size = makeSize({
      name: "small",
    })

    const customize = makeCustomize({
      name: "extra bacon",
    })

    inMemoryFlavorsRepository.create(flavor)
    inMemorySizesRepository.create(size)
    inMemoryCustomizationsRepository.create(customize)

    const result = await sut.execute({
      pizzas: [
      ]
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(MissingPizzaInOrderError)
  })
})
