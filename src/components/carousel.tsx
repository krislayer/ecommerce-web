import { productPath } from "@/lib/paths";
import Link from "next/link";
import { GridTileImage } from "@/components/grid/tile";
import { getActiveProducts, buildCarouselRail } from "@/lib/store/home-catalog";
import { fetchProductsSync } from "@/lib/catalog";

export function Carousel() {
  const active = getActiveProducts(fetchProductsSync());
  const products = buildCarouselRail(active);

  if (!products.length) return null;

  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.id}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link href={productPath(product.id)} className="relative h-full w-full">
              <GridTileImage
                alt={product.name}
                label={{
                  title: product.name,
                  amount: String(product.price),
                  currencyCode: "GTQ",
                }}
                src={product.images[0]}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
