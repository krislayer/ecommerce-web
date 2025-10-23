import type { IOrderRepository } from "../domain/repositories/order.repository";
import type { Order, OrderItem, ShippingMethod, Discount } from "../domain/entities/order";
import type { IShippingStrategy } from "../domain/services/shipping-strategy";
import type { IDiscountStrategy } from "../domain/services/discount-strategy";
import type { IWhatsAppMessageFactory } from "../domain/services/whatsapp-factory";

export class OrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private shippingStrategy: IShippingStrategy,
    private discountStrategy: IDiscountStrategy,
    private whatsappFactory: IWhatsAppMessageFactory
  ) {}

  async createOrder(
    items: OrderItem[],
    shippingMethod: ShippingMethod,
    guestInfo: Order["guestInfo"],
    userId?: string,
    discount?: Discount
  ): Promise<Order> {
    // Calculate subtotal
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Apply discount
    const discountAmount = discount
      ? this.discountStrategy.calculate(subtotal, discount)
      : 0;

    // Calculate shipping
    const shippingCost = this.shippingStrategy.calculate(
      items.reduce((sum, item) => sum + item.quantity, 0)
    );

    // Calculate total
    const total = subtotal - discountAmount + shippingCost;

    // Create order
    const order: Omit<Order, "id" | "createdAt" | "updatedAt"> = {
      userId,
      guestInfo,
      items,
      subtotal,
      discount: discountAmount,
      shipping: shippingCost,
      total,
      shippingMethod,
      status: "pending",
      whatsappSent: false,
    };

    return await this.orderRepository.create(order);
  }

  getWhatsAppMessage(order: Order): string {
    return this.whatsappFactory.createOrderMessage(order);
  }

  async updateOrderStatus(orderId: string, status: Order["status"]): Promise<void> {
    await this.orderRepository.updateStatus(orderId, status);
  }
}

