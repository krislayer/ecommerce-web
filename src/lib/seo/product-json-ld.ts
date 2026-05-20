import type { Product } from "@/lib/domain/entities/product";
import { absoluteUrl } from "./base-url";

export function buildProductJsonLd(product: Product) {
  const image = product.images[0];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    ...(image ? { image: absoluteUrl(image) } : {}),
    offers: {
      "@type": "Offer",
      availability: product.active
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: "GTQ",
      price: product.price.toFixed(2),
      url: absoluteUrl(`/product/${product.id}`),
    },
  };
}
