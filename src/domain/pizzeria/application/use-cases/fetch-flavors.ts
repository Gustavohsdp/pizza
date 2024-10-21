import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Flavor } from '../../enterprise/entities/flavor'
import { FlavorsRepository } from '../repositories/flavors-repository'

type FetchFlavorsUseCaseResponse = Either<
  null,
  {
    flavors: Flavor[]
  }
>

@Injectable()
export class FetchFlavorsUseCase {
  constructor(private flavorsRepository: FlavorsRepository) { }

  async execute(): Promise<FetchFlavorsUseCaseResponse> {
    const flavors = await this.flavorsRepository.fetch()

    return right({
      flavors,
    })
  }
}
