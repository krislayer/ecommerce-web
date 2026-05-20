import { sampleProducts } from "@/lib/data/products";
import type { Product } from "@/lib/domain/entities/product";

/**
 * Punto único de lectura del catálogo.
 * Sustituir por Google Sheets API (o caché) cuando esté conectado en producción.
 */
export async function fetchProducts(): Promise<Product[]> {
  return sampleProducts;
}

/** Acceso síncrono para client components hasta migrar search a server/API. */
export function fetchProductsSync(): Product[] {
  return sampleProducts;
}
