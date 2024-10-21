import { makeCustomize } from 'test/factories/make-customize'
import { InMemoryCustomizationsRepository } from 'test/repositories/in-memory-customize-repository'
import { FetchCustomizationsUseCase } from './fetch-customizations'

let inMemoryCustomizationsRepository: InMemoryCustomizationsRepository
let sut: FetchCustomizationsUseCase

describe('Fetch Customizations', () => {
  beforeEach(() => {
    inMemoryCustomizationsRepository =
      new InMemoryCustomizationsRepository()

    sut = new FetchCustomizationsUseCase(inMemoryCustomizationsRepository)
  })

  it('should be able to fetch customizations', async () => {
    await inMemoryCustomizationsRepository.create(
      makeCustomize({ name: "extra bacon" }),
    )

    await inMemoryCustomizationsRepository.create(
      makeCustomize({ name: "borda recheada" }),
    )

    const result = await sut.execute()

    expect(result.value?.customizations).toHaveLength(2);
  })
})
