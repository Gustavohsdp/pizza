import { Pizza } from '../../enterprise/entities/pizza';

export abstract class PizzasRepository {
  abstract create(pizza: Pizza): Promise<Pizza | null>
}
