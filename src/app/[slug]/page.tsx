import { notFound } from "next/navigation";
import { ProductClient } from "./product-client";
import { sampleProducts } from "@/lib/data/products";
import { Suspense } from "react";

async function getProduct(slug: string) {
  // Simular un pequeño delay para evitar problemas de timing
  await new Promise(resolve => setTimeout(resolve, 0));
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

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductClient product={product} />
    </Suspense>
  );
}

