"use client";

import { Suspense } from "react";
import Link from "next/link";
import { GridTileImage } from "@/components/grid/tile";
import Price from "@/components/price";
import Prose from "@/components/prose";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { Gallery } from "@/components/product/gallery";
import { VariantSelector } from "@/components/product/variant-selector";
import { productPath } from "@/lib/paths";
import type { Product } from "@/lib/domain/entities/product";

function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price amount={product.price} currencyCode="GTQ" />
        </div>
      </div>
      <VariantSelector product={product} />
      {product.description ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.description}
        />
      ) : null}
      <AddToCartButton product={product} />
    </>
  );
}

function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Productos relacionados</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {products.map((product) => (
          <li
            key={product.id}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link href={productPath(product.id)} className="relative h-full w-full" prefetch={true}>
              <GridTileImage
                alt={product.name}
                label={{ title: product.name, amount: String(product.price), currencyCode: "GTQ" }}
                src={product.images[0]}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProductClient({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const images = product.images.length ? product.images : [];

  return (
    <div className="mx-auto max-w-(--breakpoint-2xl) px-4">
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
        <div className="h-full w-full basis-full lg:basis-4/6">
          <Suspense
            fallback={
              <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
            }
          >
            <Gallery
              images={images.slice(0, 5).map((src) => ({
                src,
                altText: product.name,
              }))}
            />
          </Suspense>
        </div>
        <div className="basis-full lg:basis-2/6">
          <Suspense fallback={null}>
            <ProductDescription product={product} />
          </Suspense>
        </div>
      </div>
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}
