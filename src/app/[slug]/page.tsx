import { notFound } from "next/navigation";
import { ProductClient } from "./product-client";
import { sampleProducts } from "@/lib/data/products";

async function getProduct(slug: string) {
  return sampleProducts.find((p) => p.id === slug) || null;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductClient product={product} />;
}

