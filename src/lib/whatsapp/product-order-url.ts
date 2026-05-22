import { buildCartItemProductUrl } from "@/lib/cart/variant-label";

/** Origen público del sitio para enlaces en WhatsApp (SEO / producción). */
function getSiteOrigin(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  return "";
}

export function buildAbsoluteProductUrl(
  productId: string,
  attributes: Record<string, string>,
): string {
  const path = buildCartItemProductUrl(productId, attributes);
  const origin = getSiteOrigin();
  return origin ? `${origin}${path}` : path;
}
