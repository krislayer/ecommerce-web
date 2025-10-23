import type { Discount } from "../entities/order";

export interface IDiscountStrategy {
  calculate(subtotal: number, discount: Discount): number;
}

export class PercentDiscountStrategy implements IDiscountStrategy {
  calculate(subtotal: number, discount: Discount): number {
    return (subtotal * discount.value) / 100;
  }
}

export class AmountDiscountStrategy implements IDiscountStrategy {
  calculate(subtotal: number, discount: Discount): number {
    return Math.min(discount.value, subtotal);
  }
}

