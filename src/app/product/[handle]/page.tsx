import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { getActiveProductHandles, getProductByHandle, getRelatedProducts } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/seo/base-url";
import { buildProductJsonLd } from "@/lib/seo/product-json-ld";
import { ProductClient } from "./product-client";

export async function generateStaticParams() {
  const handles = await getActiveProductHandles();
  return handles.map((handle) => ({ handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: "Producto no encontrado" };

  const image = product.images[0];
  const indexable = product.active;

  return {
    title: product.name,
    description: product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
      locale: "es_GT",
      ...(image
        ? {
            images: [
              {
                url: absoluteUrl(image),
                alt: product.name,
              },
            ],
          }
        : {}),
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product || !product.active) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id, product.categoryIds);
  const productJsonLd = buildProductJsonLd(product);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductClient product={product} relatedProducts={relatedProducts} />
      <Footer />
    </>
  );
}
