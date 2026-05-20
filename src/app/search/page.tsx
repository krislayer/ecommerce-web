import { filterProductsAsync } from "@/lib/catalog";
import { ProductGrid } from "@/components/search/product-grid";

export const metadata = {
  title: "Buscar",
  description: "Busca productos en la tienda.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = typeof params?.q === "string" ? params.q.trim() : "";
  const sortSlug = typeof params?.sort === "string" ? params.sort : null;
  const products = await filterProductsAsync({ q, sortSlug });

  return <ProductGrid products={products} q={q} />;
}
