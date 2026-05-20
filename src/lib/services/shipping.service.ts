import { formatStorePrice } from "@/lib/store/format-price";

export interface ShippingCalculation {
  subtotal: number;
  shippingCost: number;
  total: number;
  isFreeShipping: boolean;
  freeShippingThreshold: number;
  remainingForFreeShipping?: number;
}

export class ShippingService {
  private static readonly FREE_SHIPPING_THRESHOLD = 300; // Q300
  private static readonly STANDARD_SHIPPING_COST = 20; // Q20 costo estándar de envío

  /**
   * Calcula el costo de envío basado en el subtotal del carrito
   */
  static calculateShipping(subtotal: number): ShippingCalculation {
    const isFreeShipping = subtotal >= this.FREE_SHIPPING_THRESHOLD;
    const shippingCost = isFreeShipping ? 0 : this.STANDARD_SHIPPING_COST;
    const total = subtotal + shippingCost;
    
    let remainingForFreeShipping: number | undefined;
    if (!isFreeShipping) {
      remainingForFreeShipping = this.FREE_SHIPPING_THRESHOLD - subtotal;
    }

    return {
      subtotal,
      shippingCost,
      total,
      isFreeShipping,
      freeShippingThreshold: this.FREE_SHIPPING_THRESHOLD,
      remainingForFreeShipping,
    };
  }

  /**
   * Obtiene el umbral para envío gratis
   */
  static getFreeShippingThreshold(): number {
    return this.FREE_SHIPPING_THRESHOLD;
  }

  /**
   * Obtiene el costo estándar de envío
   */
  static getStandardShippingCost(): number {
    return this.STANDARD_SHIPPING_COST;
  }

  /**
   * Formatea el precio para mostrar
   */
  static formatPrice(price: number): string {
    return formatStorePrice(price);
  }
}
