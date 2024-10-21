import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface PizzaProps {
  sizeId: UniqueEntityID
  flavorId: UniqueEntityID
  timePreparation: number
  totalvalue: number
  additionals?: UniqueEntityID[]
  createdAt: Date
  updatedAt?: Date | null
}

export class Pizza extends Entity<PizzaProps> {
  get sizeId() {
    return this.props.sizeId
  }

  get flavorId() {
    return this.props.flavorId
  }

  get timePreparation() {
    return this.props.timePreparation
  }

  get totalvalue() {
    return this.props.totalvalue
  }

  get additionals() {
    return this.props.additionals
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<PizzaProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const pizza = new Pizza(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return pizza
  }
}
