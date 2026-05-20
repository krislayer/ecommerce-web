import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/search/product-grid";
import { filterProductsAsync, getCategoryIdFromHandle } from "@/lib/catalog";
import {
  collectionHandles,
  getCategoryByHandle,
} from "@/lib/data/categories";

export async function generateStaticParams() {
  return collectionHandles.map((collection) => ({ collection }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection } = await params;
  const category = getCategoryByHandle(collection);
  if (!category) return notFound();

  return {
    title: category.name,
    description: category.description ?? "Productos de la colección.",
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { collection } = await params;
  const categoryId = getCategoryIdFromHandle(collection);
  if (!categoryId) notFound();

  const queryParams = await searchParams;
  const sortSlug = typeof queryParams?.sort === "string" ? queryParams.sort : null;
  const products = await filterProductsAsync({ categoryId, sortSlug });

  return <ProductGrid products={products} categoryId={categoryId} />;
}
