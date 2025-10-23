import type { Order, OrderItem } from "../entities/order";

export interface IWhatsAppMessageFactory {
  createOrderMessage(order: Order): string;
}

export class WhatsAppMessageFactory implements IWhatsAppMessageFactory {
  createOrderMessage(order: Order): string {
    const itemsText = order.items
      .map(
        (item) =>
          `• ${item.name} (${item.sku})\n  Cantidad: ${item.quantity}\n  Precio: Q${item.price.toFixed(2)}`
      )
      .join("\n\n");

    const clientInfo = order.userId
      ? `Cliente registrado`
      : `Cliente:\n${order.guestInfo.name}\n${order.guestInfo.phone}${order.guestInfo.email ? `\n${order.guestInfo.email}` : ""}`;

    return `🛍️ *Nuevo Pedido #${order.id.slice(-6)}*

${clientInfo}

*Productos:*
${itemsText}

*Resumen:*
Subtotal: Q${order.subtotal.toFixed(2)}
Descuento: Q${order.discount.toFixed(2)}
Envío: Q${order.shipping.toFixed(2)}
*Total: Q${order.total.toFixed(2)}*

*Método de envío:* ${order.shippingMethod.type === "pickup" ? "Recoger en tienda" : `Envío local${order.shippingMethod.address ? ` - ${order.shippingMethod.address}` : ""}`}

Gracias por tu compra en ¡Qué Chulito! 💖`;
  }
}

