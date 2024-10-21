import { Size } from "@/domain/pizzeria/enterprise/entities/size";

export class SizePresenter {
  static toHTTP(size: Size) {
    return {
      id: size.id.toString(),
      name: size.name,
      price: size.price,
      time: size.time,
      createdAt: size.createdAt,
    }
  }
}