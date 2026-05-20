import { formatStorePrice } from "@/lib/store/format-price";

export class ShippingService {
  private static readonly STANDARD_SHIPPING_COST = 10;

  static getStandardShippingCost(): number {
    return this.STANDARD_SHIPPING_COST;
  }

  static formatPrice(price: number): string {
    return formatStorePrice(price);
  }
}
