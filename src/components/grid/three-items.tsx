import { productPath } from "@/lib/paths";
import Link from "next/link";
import { GridTileImage } from "@/components/grid/tile";
import { getActiveProducts, buildFeaturedGrid } from "@/lib/store/home-catalog";
import { fetchProductsSync } from "@/lib/catalog";
import type { Product } from "@/lib/domain/entities/product";

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: Product;
  size: "full" | "half";
  priority?: boolean;
}) {
  return (
    <div className={size === "full" ? "md:col-span-4 md:row-span-2" : "md:col-span-2 md:row-span-1"}>
      <Link
        className="relative block aspect-square h-full w-full"
        href={productPath(item.id)}
        prefetch
      >
        <GridTileImage
          src={item.images[0]}
          fill
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={item.name}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item.name,
            amount: String(item.price),
            currencyCode: "GTQ",
          }}
        />
      </Link>
    </div>
  );
}

export function ThreeItemGrid() {
  const active = getActiveProducts(fetchProductsSync());
  const homepageItems = buildFeaturedGrid(active);

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto grid max-w-(--breakpoint-2xl) gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
      <ThreeItemGridItem size="full" item={firstProduct} priority />
      <ThreeItemGridItem size="half" item={secondProduct} priority />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}
