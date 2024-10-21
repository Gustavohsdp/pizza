import { FetchFlavorsUseCase } from '@/domain/pizzeria/application/use-cases/fetch-flavors'
import { BadRequestException, Controller, Get } from '@nestjs/common'
import { FlavorPresenter } from '../presenters/flavor-presenter'


@Controller('/flavors')
export class FetchFlavorsController {
  constructor(private fetchFlavorsUseCase: FetchFlavorsUseCase) { }

  @Get()
  async handle() {
    const result = await this.fetchFlavorsUseCase.execute()

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const flavors = result.value.flavors

    return {
      status: 200,
      data: {
        flavors: flavors.map(FlavorPresenter.toHTTP)
      }
    }
  }
}
