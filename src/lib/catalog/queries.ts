import type { Product } from "@/lib/domain/entities/product";
import { fetchProducts, fetchProductsSync } from "./fetch-products";

export async function getProducts(): Promise<Product[]> {
  return fetchProducts();
}

export async function getActiveProducts(): Promise<Product[]> {
  const products = await fetchProducts();
  return products.filter((p) => p.active);
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const products = await fetchProducts();
  return products.find((p) => p.id === handle) ?? null;
}

export function getProductByHandleSync(handle: string): Product | null {
  return fetchProductsSync().find((p) => p.id === handle) ?? null;
}

export async function getActiveProductHandles(): Promise<string[]> {
  const products = await getActiveProducts();
  return products.map((p) => p.id);
}

export function getActiveProductHandlesSync(): string[] {
  return fetchProductsSync()
    .filter((p) => p.active)
    .map((p) => p.id);
}

export async function getRelatedProducts(
  productId: string,
  categoryIds: string[],
  limit = 8,
): Promise<Product[]> {
  const products = await fetchProducts();
  return products
    .filter(
      (p) =>
        p.id !== productId &&
        p.active &&
        p.categoryIds.some((id) => categoryIds.includes(id)),
    )
    .slice(0, limit);
}
