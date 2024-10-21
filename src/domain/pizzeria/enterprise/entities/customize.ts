import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface CustomizeProps {
  name: string
  extraPrice: number
  extraTime: number
  createdAt: Date
  updatedAt?: Date | null
}

export class Customize extends Entity<CustomizeProps> {
  get name() {
    return this.props.name
  }

  get extraPrice() {
    return this.props.extraPrice
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
    props: Optional<CustomizeProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const customize = new Customize(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return customize
  }
}
