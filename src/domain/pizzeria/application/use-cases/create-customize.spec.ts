import { makeCustomize } from 'test/factories/make-customize'
import { InMemoryCustomizationsRepository } from 'test/repositories/in-memory-customize-repository'
import { CreateCustomizeUseCase } from './create-customize'
import { AlreadyExistsError } from './errors/already-exists-error'

let inMemoryCustomizationsRepository: InMemoryCustomizationsRepository
let sut: CreateCustomizeUseCase

describe('Create Customize', () => {
  beforeEach(() => {
    inMemoryCustomizationsRepository =
      new InMemoryCustomizationsRepository()

    sut = new CreateCustomizeUseCase(inMemoryCustomizationsRepository)
  })

  it('should be able to create new customize', async () => {
    const result = await sut.execute({
      name: "bacon extra",
      extraPrice: 5,
      extraTime: 5,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      customize: inMemoryCustomizationsRepository.items[0]
    })
  })

  it('should be able to create a customize with the same name', async () => {
    const customize = makeCustomize({
      name: "bacon extra",
    })

    inMemoryCustomizationsRepository.create(customize)

    const result = await sut.execute({
      name: "bacon extra",
      extraPrice: 5,
      extraTime: 5,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
  })
})
