import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Size } from '../../enterprise/entities/size'
import { SizesRepository } from '../repositories/sizes-repository'

type FetchSizesUseCaseResponse = Either<
  null,
  {
    sizes: Size[]
  }
>

@Injectable()
export class FetchSizesUseCase {
  constructor(private sizesRepository: SizesRepository) { }

  async execute(): Promise<FetchSizesUseCaseResponse> {
    const sizes = await this.sizesRepository.fetch()

    return right({
      sizes,
    })
  }
}
