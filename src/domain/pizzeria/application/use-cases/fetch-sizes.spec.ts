import { makeSize } from 'test/factories/make-size'
import { InMemorySizesRepository } from 'test/repositories/in-memory-sizes-repository'
import { FetchSizesUseCase } from './fetch-sizes'

let inMemorySizesRepository: InMemorySizesRepository
let sut: FetchSizesUseCase

describe('Fetch Sizes', () => {
  beforeEach(() => {
    inMemorySizesRepository =
      new InMemorySizesRepository()

    sut = new FetchSizesUseCase(inMemorySizesRepository)
  })

  it('should be able to fetch sizes', async () => {
    await inMemorySizesRepository.create(
      makeSize({ name: "pequena" }),
    )

    await inMemorySizesRepository.create(
      makeSize({ name: "grande" }),
    )

    const result = await sut.execute()

    expect(result.value?.sizes).toHaveLength(2);
  })
})
