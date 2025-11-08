import type { ShippingMethod } from "../entities/order";

export interface IShippingStrategy {
  calculate(weight: number, distance?: number): number;
  getName(): string;
}

export class PickupStrategy implements IShippingStrategy {
  calculate(): number {
    return 0;
  }

  getName(): string {
    return "Entrega coordinada";
  }
}

export class LocalDeliveryStrategy implements IShippingStrategy {
  private readonly baseRate = 20; // GTQ

  calculate(weight: number, distance?: number): number {
    let cost = this.baseRate;
    
    if (weight > 2) {
      cost += (weight - 2) * 10;
    }
    
    if (distance && distance > 5) {
      cost += (distance - 5) * 5;
    }
    
    return cost;
  }

  getName(): string {
    return "Entrega a domicilio";
  }
}

