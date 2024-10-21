import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface SizeProps {
  name: string
  price: number
  time: number
  createdAt: Date
  updatedAt?: Date | null
}

export class Size extends Entity<SizeProps> {
  get name() {
    return this.props.name
  }

  get price() {
    return this.props.price
  }

  get time() {
    return this.props.time
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<SizeProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const size = new Size(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return size
  }
}
