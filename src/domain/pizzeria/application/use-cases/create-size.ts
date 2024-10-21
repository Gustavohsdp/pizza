import { Either, left, right } from "@/core/either"
import { Injectable } from "@nestjs/common"
import { Size } from "../../enterprise/entities/size"
import { SizesRepository } from "../repositories/sizes-repository"
import { AlreadyExistsError } from "./errors/already-exists-error"

interface CreateSizeUseCaseRequest {
  name: string
  price: number
  time: number
}

type CreateSizeUseCaseResponse = Either<
  AlreadyExistsError,
  {
    size: Size
  }
>

@Injectable()
export class CreateSizeUseCase {
  constructor(
    private sizesRepository: SizesRepository,
  ) { }

  async execute({
    name,
    price,
    time
  }: CreateSizeUseCaseRequest): Promise<CreateSizeUseCaseResponse> {
    const sizeAlreadyExists = await this.sizesRepository.findByName(name)

    if (sizeAlreadyExists) {
      return left(new AlreadyExistsError("Size", name))
    }

    const size = Size.create({
      name,
      price,
      time
    })

    await this.sizesRepository.create(size)

    return right({ size })
  }
}