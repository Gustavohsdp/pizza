import { Customize } from '../../enterprise/entities/customize';

export abstract class CustomizationsRepository {
  abstract create(customize: Customize): Promise<Customize | null>
  abstract findByName(name: string): Promise<Customize | null>
  abstract fetch(): Promise<Customize[]>
}
