import { makeSize } from 'test/factories/make-size'
import { InMemorySizesRepository } from 'test/repositories/in-memory-sizes-repository'
import { CreateSizeUseCase } from './create-size'
import { AlreadyExistsError } from './errors/already-exists-error'

let inMemorySizesRepository: InMemorySizesRepository
let sut: CreateSizeUseCase

describe('Create Size', () => {
  beforeEach(() => {
    inMemorySizesRepository =
      new InMemorySizesRepository()

    sut = new CreateSizeUseCase(inMemorySizesRepository)
  })

  it('should be able to create new size', async () => {
    const result = await sut.execute({
      name: "small",
      price: 10,
      time: 10,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      size: inMemorySizesRepository.items[0]
    })
  })

  it('should be able to create a size with the same name', async () => {
    const size = makeSize({
      name: "small",
    })

    inMemorySizesRepository.create(size)

    const result = await sut.execute({
      name: "small",
      price: 10,
      time: 10,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(AlreadyExistsError)
  })
})
