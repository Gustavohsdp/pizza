import { Flavor } from '../../enterprise/entities/flavor';

export abstract class FlavorsRepository {
  abstract create(flavor: Flavor): Promise<void>
  abstract findById(flavorId: string): Promise<Flavor | null>
  abstract findByName(name: string): Promise<Flavor | null>
  abstract fetch(): Promise<Flavor[]>
}
