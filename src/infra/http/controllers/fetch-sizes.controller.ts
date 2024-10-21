import { FetchSizesUseCase } from '@/domain/pizzeria/application/use-cases/fetch-sizes'
import { BadRequestException, Controller, Get } from '@nestjs/common'
import { SizePresenter } from '../presenters/size-presenter'


@Controller('/sizes')
export class FetchSizesController {
  constructor(private FetchSizesUseCase: FetchSizesUseCase) { }

  @Get()
  async handle() {
    const result = await this.FetchSizesUseCase.execute()

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const sizes = result.value.sizes

    return {
      status: 200,
      data: {
        sizes: sizes.map(SizePresenter.toHTTP)
      }
    }
  }
}
