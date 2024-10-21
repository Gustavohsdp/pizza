import { Flavor } from "@/domain/pizzeria/enterprise/entities/flavor";

export class FlavorPresenter {
  static toHTTP(flavor: Flavor) {
    return {
      id: flavor.id.toString(),
      name: flavor.name,
      extraTime: flavor.extraTime,
      createdAt: flavor.createdAt,
    }
  }
}