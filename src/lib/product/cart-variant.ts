import type { Product, ProductVariant } from "@/lib/domain/entities/product";

const VARIANT_ATTR_KEYS = ["size", "color"] as const;

function pickVariantAttributes(attrs: Record<string, string>): Record<string, string> {
  const picked: Record<string, string> = {};
  for (const key of VARIANT_ATTR_KEYS) {
    const value = attrs[key]?.trim();
    if (value) picked[key] = value;
  }
  return picked;
}

export function productToCartVariant(product: Product): ProductVariant {
  return {
    id: `${product.id}-default`,
    productId: product.id,
    sku: product.id,
    name: product.name,
    price: product.price,
    stock: 10,
    attributes: pickVariantAttributes(product.attrs),
    image: product.images[0],
  };
}
