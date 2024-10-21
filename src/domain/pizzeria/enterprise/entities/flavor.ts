import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface FlavorProps {
  name: string
  extraTime: number
  createdAt: Date
  updatedAt?: Date | null
}

export class Flavor extends Entity<FlavorProps> {
  get name() {
    return this.props.name
  }

  get extraTime() {
    return this.props.extraTime
  }


  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<FlavorProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const flavor = new Flavor(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return flavor
  }
}
