import type { Product, Category } from "@/lib/domain/entities/product";

export function getActiveProducts(products: Product[]): Product[] {
  return products.filter((p) => p.active && Boolean(p.images[0]));
}

export function productsInCategory(active: Product[], categoryId: string): Product[] {
  return active.filter((p) => p.categoryIds.includes(categoryId));
}

export function minPriceForCategory(active: Product[], categoryId: string): number | undefined {
  const list = productsInCategory(active, categoryId);
  if (!list.length) return undefined;
  return Math.min(...list.map((p) => p.price));
}

export function heroImageForCategory(active: Product[], categoryId: string): string | undefined {
  return productsInCategory(active, categoryId).find((p) => p.images[0])?.images[0];
}

export function departmentsInStock(active: Product[], allCategories: Category[]): Category[] {
  return allCategories.filter((c) => productsInCategory(active, c.id).length > 0);
}

export type HeroCategoryItem = {
  id: string;
  name: string;
  imageUrl: string;
};

export function buildHeroCategories(active: Product[], allCategories: Category[]): HeroCategoryItem[] {
  return departmentsInStock(active, allCategories).flatMap((cat) => {
    const imageUrl = heroImageForCategory(active, cat.id);
    return imageUrl ? [{ id: cat.id, name: cat.name, imageUrl }] : [];
  });
}

export function buildLatestRail(active: Product[], limit = 10): Product[] {
  return [...active].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, limit);
}

export function buildCategoryRail(active: Product[], categoryId: string, limit = 10): Product[] {
  return [...productsInCategory(active, categoryId)]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, limit);
}

export function buildAffordableRail(active: Product[], maxPrice: number, limit = 10): Product[] {
  return [...active]
    .filter((p) => p.price <= maxPrice)
    .sort((a, b) => a.price - b.price)
    .slice(0, limit);
}

export function buildFeaturedGrid(active: Product[], limit = 3): Product[] {
  return buildLatestRail(active, limit);
}

export function buildCarouselRail(active: Product[], limit = 8): Product[] {
  return buildLatestRail(active, limit);
}

export type DepartmentRailItem = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  floorPrice: number;
};

export function buildDepartmentRail(active: Product[], allCategories: Category[]): DepartmentRailItem[] {
  return departmentsInStock(active, allCategories).flatMap((cat) => {
    const imageUrl = heroImageForCategory(active, cat.id);
    const floorPrice = minPriceForCategory(active, cat.id);
    if (imageUrl === undefined || floorPrice === undefined) return [];
    return [
      {
        id: cat.id,
        name: cat.name,
        description: cat.description ?? "",
        imageUrl,
        floorPrice,
      },
    ];
  });
}
