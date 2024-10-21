import { Size } from '../../enterprise/entities/size';

export abstract class SizesRepository {
  abstract create(size: Size): Promise<void>
  abstract findById(sizeId: string): Promise<Size | null>
  abstract findByName(name: string): Promise<Size | null>
  abstract fetch(): Promise<Size[]>
}
