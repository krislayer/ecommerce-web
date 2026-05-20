import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import type { Product } from "@/lib/domain/entities/product";

export function ProductGrid({
  products,
  q,
  categoryId,
}: {
  products: Product[];
  q?: string;
  categoryId?: string;
}) {
  const resultsText = products.length > 1 ? "resultados" : "resultado";

  return (
    <>
      {q ? (
        <p className="mb-4">
          {products.length === 0
            ? "No hay productos que coincidan con "
            : `Mostrando ${products.length} ${resultsText} para `}
          <span className="font-bold">&quot;{q}&quot;</span>
        </p>
      ) : null}

      {products.length > 0 ? (
        <Grid className="grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : categoryId ? (
        <p className="py-3 text-lg">No hay productos en esta colección.</p>
      ) : q ? null : (
        <p className="py-3 text-lg text-neutral-500">No se encontraron productos.</p>
      )}
    </>
  );
}
