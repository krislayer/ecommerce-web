import { formatVariantLabel } from "@/lib/cart/variant-label";
import { ShippingService } from "@/lib/services/shipping.service";
import { buildAbsoluteProductUrl } from "@/lib/whatsapp/product-order-url";

/** Margen bajo el límite práctico del parámetro ?text= en wa.me / WhatsApp Web. */
const WHATSAPP_ENCODED_TEXT_MAX = 1200;

type OrderMessageItem = {
  productId: string;
  name: string;
  attributes: Record<string, string>;
  quantity: number;
  unitPrice: number;
};

type OrderMessageInput = {
  orderId: string;
  customerName: string;
  shippingMethod: "pickup" | "local";
  address?: string;
  items: OrderMessageItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
};

function formatVariantShort(attributes: Record<string, string>): string | null {
  const label = formatVariantLabel(attributes);
  return label ? label.replace(/ \/ /g, "/") : null;
}

function formatItemTitle(item: OrderMessageItem): string {
  const variant = formatVariantShort(item.attributes);
  return variant ? `${item.name} (${variant})` : item.name;
}

function formatLineTotal(quantity: number, unitPrice: number): string {
  return ShippingService.formatPrice(quantity * unitPrice);
}

/** Línea estándar: cantidad × producto (talla/color) — precio. */
function formatItemLine(item: OrderMessageItem): string {
  const title = formatItemTitle(item);
  const unit = ShippingService.formatPrice(item.unitPrice);
  const lineTotal = formatLineTotal(item.quantity, item.unitPrice);

  if (item.quantity > 1) {
    return `${item.quantity}× ${title} — ${unit} c/u = ${lineTotal}`;
  }

  return `${item.quantity}× ${title} — ${lineTotal}`;
}

function formatEntregaValue(shippingMethod: "pickup" | "local", address?: string): string {
  if (shippingMethod === "pickup") return "Coordinada";
  return address?.trim() ?? "";
}

function formatShippingCostLabel(shippingCost: number): string {
  return shippingCost === 0 ? "Gratis" : ShippingService.formatPrice(shippingCost);
}

function buildOrderSummaryLines(
  subtotal: number,
  shippingCost: number,
  total: number,
): string[] {
  return [
    `Subtotal: ${ShippingService.formatPrice(subtotal)}`,
    `Envío: ${formatShippingCostLabel(shippingCost)}`,
    `*TOTAL: ${ShippingService.formatPrice(total)}*`,
  ];
}

function buildHeaderLines(input: OrderMessageInput): string[] {
  const { orderId, customerName, shippingMethod, address } = input;
  const lines = [
    "Hola, te envío mi pedido 👋",
    "",
    `*PEDIDO #${orderId}*`,
    "",
    `Cliente: ${customerName.trim()}`,
    `Entrega: ${formatEntregaValue(shippingMethod, address)}`,
  ];

  return lines;
}

function buildClosingLine(shippingMethod: "pickup" | "local"): string {
  return shippingMethod === "pickup"
    ? "Gracias. Coordinemos la entrega por este chat."
    : "Gracias. Quedo atento a la entrega.";
}

function buildProductBlock(
  item: OrderMessageItem,
  index: number,
  includeLinks: boolean,
): string[] {
  const lines = [`${index + 1}. ${formatItemLine(item)}`];

  if (includeLinks) {
    lines.push(buildAbsoluteProductUrl(item.productId, item.attributes));
  }

  lines.push("");
  return lines;
}

function buildCompactProductBlock(
  item: OrderMessageItem,
  index: number,
  includeLinks: boolean,
): string[] {
  const lines = [`${index + 1}. ${formatItemTitle(item)} — ${item.quantity}× ${formatLineTotal(item.quantity, item.unitPrice)}`];

  if (includeLinks) {
    lines.push(buildAbsoluteProductUrl(item.productId, item.attributes));
  }

  lines.push("");
  return lines;
}

function buildProductLines(
  items: OrderMessageItem[],
  includeLinks: boolean,
  mode: "full" | "compact",
): string[] {
  const buildBlock = mode === "full" ? buildProductBlock : buildCompactProductBlock;
  const lines = items.flatMap((item, index) => buildBlock(item, index, includeLinks));
  if (lines.at(-1) === "") lines.pop();
  return lines;
}

function assembleOrderMessage(
  input: OrderMessageInput,
  mode: "full" | "compact",
  includeLinks: boolean,
): string {
  const { items, subtotal, shippingCost, total, shippingMethod } = input;

  return [
    ...buildHeaderLines(input),
    "",
    ...buildProductLines(items, includeLinks, mode),
    "",
    ...buildOrderSummaryLines(subtotal, shippingCost, total),
    "",
    buildClosingLine(shippingMethod),
  ].join("\n");
}

function buildOrderMessage(input: OrderMessageInput): string {
  const candidates = [
    assembleOrderMessage(input, "full", true),
    assembleOrderMessage(input, "full", false),
    assembleOrderMessage(input, "compact", true),
    assembleOrderMessage(input, "compact", false),
  ];

  for (const message of candidates) {
    if (encodeURIComponent(message).length <= WHATSAPP_ENCODED_TEXT_MAX) {
      return message;
    }
  }

  return candidates[candidates.length - 1]!;
}

export function buildEncodedWhatsAppOrderText(input: OrderMessageInput): string {
  return encodeURIComponent(buildOrderMessage(input));
}
