import { UseCaseError } from "@/core/errors/use-case-error";

export class MissingPizzaInOrderError extends Error implements UseCaseError {
  constructor() {
    super(`It is not possible to create an order without entering at least one pizza`);
  }
}