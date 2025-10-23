import type { Product, ProductVariant, ProductSummary, Category } from "../entities/product";

export interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  findByCategory(categoryId: string): Promise<Product[]>;
  search(query: string): Promise<Product[]>;
  getSummariesByCategory(categoryId: string): Promise<ProductSummary[]>;
  getVariants(productId: string): Promise<ProductVariant[]>;
}

export interface ICategoryRepository {
  findAll(): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  findBySlug(slug: string): Promise<Category | null>;
}

