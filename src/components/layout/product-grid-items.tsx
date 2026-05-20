import Link from "next/link";
import Grid from "@/components/grid";
import { GridTileImage } from "@/components/grid/tile";
import type { Product } from "@/lib/domain/entities/product";
import { productPath } from "@/lib/paths";

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.id} className="animate-fadeIn">
          <Link
            className="relative inline-block h-full w-full"
            href={productPath(product.id)}
            prefetch
          >
            <GridTileImage
              alt={product.name}
              label={{
                title: product.name,
                amount: String(product.price),
                currencyCode: "GTQ",
                condition: product.condition,
              }}
              src={product.images[0]}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
