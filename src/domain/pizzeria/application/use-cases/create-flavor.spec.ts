import { makeFlavor } from 'test/factories/make-flavor'
import { InMemoryFlavorsRepository } from 'test/repositories/in-memory-flavor-repository'
import { CreateFlavorUseCase } from './create-flavor'
import { AlreadyExistsError } from './errors/already-exists-error'

let inMemoryFlavorsRepository: InMemoryFlavorsRepository
let sut: CreateFlavorUseCase

describe('Create Flavor', () => {
  beforeEach(() => {
    inMemoryFlavorsRepository =
      new InMemoryFlavorsRepository()

    sut = new CreateFlavorUseCase(inMemoryFlavorsRepository)
  })

  it('should be able to create new flavor', async () => {
    const result = await sut.execute({
      name: "margherita",
      extraTime: 5
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      flavor: inMemoryFlavorsRepository.items[0]
    })
  })

  it('should be able to create a flavor with the same name', async () => {
    const flavor = makeFlavor({
      name: "margherita",
    })

    inMemoryFlavorsRepository.create(flavor)

    const result = await sut.execute({
      name: "margherita",
      extraTime: 5,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
  })
})
