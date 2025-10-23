import type { Order } from "../entities/order";

export interface IOrderRepository {
  create(order: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  findByUserId(userId: string): Promise<Order[]>;
  findByGuestPhone(phone: string): Promise<Order[]>;
  updateStatus(id: string, status: Order["status"]): Promise<void>;
}

