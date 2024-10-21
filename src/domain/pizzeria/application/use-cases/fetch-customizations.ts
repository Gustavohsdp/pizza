import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Customize } from '../../enterprise/entities/customize'
import { CustomizationsRepository } from '../repositories/customizations-repository'

type FetchCustomizationsUseCaseResponse = Either<
  null,
  {
    customizations: Customize[]
  }
>

@Injectable()
export class FetchCustomizationsUseCase {
  constructor(private customizationsRepository: CustomizationsRepository) { }

  async execute(): Promise<FetchCustomizationsUseCaseResponse> {
    const customizations = await this.customizationsRepository.fetch()

    return right({
      customizations,
    })
  }
}
