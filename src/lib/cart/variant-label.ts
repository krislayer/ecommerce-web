import { createUrl } from "@/lib/utils";
import { productPath } from "@/lib/paths";

/**
 * Opciones de variante mostradas en carrito (vercel/commerce usa selectedOptions,
 * p. ej. talla y color — no atributos extra del catálogo como material).
 */
const VARIANT_OPTION_KEYS = ["size", "color"] as const;

/** Etiqueta de variante en carrito — equivalente a merchandise.title en vercel/commerce. */
export function formatVariantLabel(attributes: Record<string, string>): string | null {
  const values = VARIANT_OPTION_KEYS.map((key) => attributes[key]?.trim()).filter(Boolean);
  if (!values.length) return null;
  return values.join(" / ");
}

export function buildCartItemProductUrl(
  productId: string,
  attributes: Record<string, string>,
): string {
  const params = new URLSearchParams();
  for (const key of VARIANT_OPTION_KEYS) {
    const value = attributes[key]?.trim();
    if (value) params.set(key, value);
  }
  return createUrl(productPath(productId), params);
}
