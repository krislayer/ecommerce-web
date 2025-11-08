import type { Order } from "../entities/order";

export interface IOrderRepository {
  create(order: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  findByUserId(userId: string): Promise<Order[]>;
  // NOTA: findByGuestEmail removido - guestInfo ya no incluye email
  // El historial de pedidos para usuarios invitados está disponible en WhatsApp
  updateStatus(id: string, status: Order["status"]): Promise<void>;
}

