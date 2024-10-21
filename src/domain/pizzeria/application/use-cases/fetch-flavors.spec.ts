import { makeFlavor } from 'test/factories/make-flavor'
import { InMemoryFlavorsRepository } from 'test/repositories/in-memory-flavor-repository'
import { FetchFlavorsUseCase } from './fetch-flavors'

let inMemoryFlavorsRepository: InMemoryFlavorsRepository
let sut: FetchFlavorsUseCase

describe('Fetch Flavors', () => {
  beforeEach(() => {
    inMemoryFlavorsRepository =
      new InMemoryFlavorsRepository()

    sut = new FetchFlavorsUseCase(inMemoryFlavorsRepository)
  })

  it('should be able to fetch flavors', async () => {
    await inMemoryFlavorsRepository.create(
      makeFlavor({ name: "portuguesa" }),
    )

    await inMemoryFlavorsRepository.create(
      makeFlavor({ name: "marguerita" }),
    )

    const result = await sut.execute()

    expect(result.value?.flavors).toHaveLength(2);
  })
})
