import { categories } from "@/lib/data/categories";
import { defaultSort, sorting } from "@/lib/constants";
import type { Product } from "@/lib/domain/entities/product";
import { fetchProducts, fetchProductsSync } from "./fetch-products";

const normalizeText = (text: string) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const categorySearchSynonyms: Record<string, string[]> = {
  woman: ["mujer", "femenino", "femenina", "dama", "damas"],
  men: ["hombre", "masculino", "masculina", "caballero", "caballeros"],
  kids: ["niño", "niña", "niños", "niñas", "infantil"],
};

export function getCategoryIdFromHandle(handle: string): string | undefined {
  return categories.find((c) => c.handle === handle)?.id;
}

function applyFilters(
  products: Product[],
  {
    q = "",
    categoryId,
    sortSlug,
  }: {
    q?: string;
    categoryId?: string;
    sortSlug?: string | null;
  },
): Product[] {
  let list = products.filter((p) => p.active);

  if (categoryId && categories.some((c) => c.id === categoryId)) {
    list = list.filter((p) => p.categoryIds.includes(categoryId));
  }

  if (q) {
    const nq = normalizeText(q);
    list = list.filter((product) => {
      if (normalizeText(product.name).includes(nq)) return true;
      if (normalizeText(product.description).includes(nq)) return true;
      const catMatch = product.categoryIds.some((catId) => {
        if (normalizeText(catId).includes(nq)) return true;
        return (categorySearchSynonyms[catId] ?? []).some((t) => normalizeText(t).includes(nq));
      });
      if (catMatch) return true;
      return Object.values(product.attrs).some((v) => normalizeText(v).includes(nq));
    });
  }

  const sortConfig = sorting.find((s) => s.slug === sortSlug) ?? defaultSort;

  return [...list].sort((a, b) => {
    switch (sortConfig.sortKey) {
      case "PRICE":
        return sortConfig.reverse ? b.price - a.price : a.price - b.price;
      case "CREATED_AT":
        return sortConfig.reverse ? b.createdAt - a.createdAt : a.createdAt - b.createdAt;
      case "BEST_SELLING":
        return b.updatedAt - a.updatedAt;
      case "RELEVANCE":
      default:
        return b.updatedAt - a.updatedAt;
    }
  });
}

export function filterProducts({
  q = "",
  categoryId,
  sortSlug,
}: {
  q?: string;
  categoryId?: string;
  sortSlug?: string | null;
}): Product[] {
  return applyFilters(fetchProductsSync(), { q, categoryId, sortSlug });
}

export async function filterProductsAsync({
  q = "",
  categoryId,
  sortSlug,
}: {
  q?: string;
  categoryId?: string;
  sortSlug?: string | null;
}): Promise<Product[]> {
  return applyFilters(await fetchProducts(), { q, categoryId, sortSlug });
}
