import { Either, left, right } from "@/core/either"
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error"
import { Injectable } from "@nestjs/common"
import { Customize } from "../../enterprise/entities/customize"
import { CustomizationsRepository } from "../repositories/customizations-repository"
import { AlreadyExistsError } from "./errors/already-exists-error"

interface CreateCustomizeUseCaseRequest {
  name: string
  extraPrice: number
  extraTime: number
}

type CreateCustomizeUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    customize: Customize
  }
>

@Injectable()
export class CreateCustomizeUseCase {
  constructor(
    private customizationsRepository: CustomizationsRepository,
  ) { }

  async execute({
    name,
    extraPrice,
    extraTime
  }: CreateCustomizeUseCaseRequest): Promise<CreateCustomizeUseCaseResponse> {
    const customizeAlreadyExists = await this.customizationsRepository.findByName(name)

    if (customizeAlreadyExists) {
      return left(new AlreadyExistsError("Customize", name))
    }

    const customize = Customize.create({
      name,
      extraPrice,
      extraTime
    })

    await this.customizationsRepository.create(customize)

    return right({ customize })
  }
}