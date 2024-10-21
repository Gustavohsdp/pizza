import { Either, left, right } from "@/core/either"
import { Injectable } from "@nestjs/common"
import { Flavor } from "../../enterprise/entities/flavor"
import { FlavorsRepository } from "../repositories/flavors-repository"
import { AlreadyExistsError } from "./errors/already-exists-error"

interface CreateFlavorUseCaseRequest {
  name: string
  extraTime: number
}

type CreateFlavorUseCaseResponse = Either<
  AlreadyExistsError,
  {
    flavor: Flavor
  }
>

@Injectable()
export class CreateFlavorUseCase {
  constructor(
    private flavorsRepository: FlavorsRepository,
  ) { }

  async execute({
    extraTime,
    name
  }: CreateFlavorUseCaseRequest): Promise<CreateFlavorUseCaseResponse> {
    const flavorAlreadyExists = await this.flavorsRepository.findByName(name)

    if (flavorAlreadyExists) {
      return left(new AlreadyExistsError("Flavor", name))
    }

    const flavor = Flavor.create({
      extraTime,
      name
    })

    await this.flavorsRepository.create(flavor)

    return right({ flavor })
  }
}