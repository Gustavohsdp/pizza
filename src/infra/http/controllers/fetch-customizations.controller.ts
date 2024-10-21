import { FetchCustomizationsUseCase } from '@/domain/pizzeria/application/use-cases/fetch-customizations'
import { BadRequestException, Controller, Get } from '@nestjs/common'
import { CustomizePresenter } from '../presenters/customize-presenter'


@Controller('/customizations')
export class FetchCustomizationsController {
  constructor(private fetchCustomizationsUseCase: FetchCustomizationsUseCase) { }

  @Get()
  async handle() {
    const result = await this.fetchCustomizationsUseCase.execute()

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const customizations = result.value.customizations

    return {
      status: 200,
      data: {
        customizations: customizations.map(CustomizePresenter.toHTTP)
      }
    }
  }
}
