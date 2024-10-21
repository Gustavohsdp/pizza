import { Customize } from "@/domain/pizzeria/enterprise/entities/customize";

export class CustomizePresenter {
  static toHTTP(customize: Customize) {
    return {
      id: customize.id.toString(),
      name: customize.name,
      extraPrice: customize.extraPrice,
      extraTime: customize.extraTime,
      createdAt: customize.createdAt,
    }
  }
}