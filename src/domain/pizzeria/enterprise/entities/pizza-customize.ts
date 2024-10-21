import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface PizzaCustomizeProps {
  pizzaId: UniqueEntityID
  customizeId: UniqueEntityID
  createdAt: Date
  updatedAt?: Date | null
}

export class PizzaCustomize extends Entity<PizzaCustomizeProps> {
  get pizzaId() {
    return this.props.pizzaId
  }

  get customizeId() {
    return this.props.customizeId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<PizzaCustomizeProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const pizzaCustomize = new PizzaCustomize(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return pizzaCustomize
  }
}
