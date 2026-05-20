export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryIds: string[];
  images: string[];
  attrs: Record<string, string>;
  facets: string[];
  active: boolean;
  createdAt: number;
  updatedAt: number;
  // Condición del producto: nuevo o seminuevo
  condition: "new" | "used";
  // Calificación del estado (solo para productos seminuevos): 0-10 (ej: 9, 9.5, 8)
  conditionRating?: number; // Opcional, solo presente si condition === "used"
}

export interface ProductVariant {
  id: string;
  productId: string;
  attributes: Record<string, string>;
  price: number;
  stock: number;
  sku: string;
  image?: string;
  /** Etiqueta visible en carrito (nombre del producto). */
  name?: string;
}

export interface ProductSummary {
  id: string;
  name: string;
  price: number;
  image: string;
  categoryIds: string[];
}

export interface FacetDefinition {
  key: string;
  type: "enum" | "range";
  values?: string[];
  widget?: "swatch" | "select" | "range";
}

export interface Category {
  id: string;
  name: string;
  /** URL pública en inglés, p. ej. /woman, /man */
  handle: string;
  slug: string;
  facetDefs: FacetDefinition[];
  description?: string;
  image?: string;
}

