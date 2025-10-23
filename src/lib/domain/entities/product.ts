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
}

export interface ProductVariant {
  id: string;
  productId: string;
  attributes: Record<string, string>;
  price: number;
  stock: number;
  sku: string;
  image?: string;
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
  slug: string;
  facetDefs: FacetDefinition[];
  description?: string;
  image?: string;
}

