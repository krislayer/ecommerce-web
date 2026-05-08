import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Headphones, Package, Search, Truck } from "lucide-react";
import { sampleProducts } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import type { Product } from "@/lib/domain/entities/product";

function formatPrice(price: number) {
  if (price % 1 === 0) return `Q${price}`;
  return `Q${price.toFixed(2)}`;
}

function productsInCategory(active: Product[], categoryId: string) {
  return active.filter((p) => p.categoryIds.includes(categoryId));
}

function minPriceForCategory(active: Product[], categoryId: string): number | undefined {
  const list = productsInCategory(active, categoryId);
  if (!list.length) return undefined;
  return Math.min(...list.map((p) => p.price));
}

function heroImageCategory(active: Product[], categoryId: string): string | undefined {
  return productsInCategory(active, categoryId).find((p) => p.images[0])?.images[0];
}

function productByIds(ids: string[]): Product[] {
  return ids
    .map((id) => sampleProducts.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p?.active && p.images[0]));
}

/** Portada de tienda — usa solo el sistema de diseño macOS del proyecto (`mac-*`). */
export default function Home() {
  const active = sampleProducts.filter((p) => p.active && Boolean(p.images[0]));
  const departmentsInStock = categories.filter((c) => productsInCategory(active, c.id).length > 0);

  const heroProduct =
    active.find((p) => p.id === "vestido-festonero") ??
    [...active].sort((a, b) => b.updatedAt - a.updatedAt)[0];

  const [spotlightLeft, spotlightRight] = productByIds([
    "sweater-cardigan",
    "pantalon-jeans-hombre",
  ]);

  const newest = [...active].sort((a, b) => b.updatedAt - a.updatedAt);
  const showcased = newest.slice(0, 8);

  const focusClasses =
    "outline-none ring-offset-2 ring-offset-[var(--mac-grouped-background)] focus-visible:ring-2 focus-visible:ring-mac-blue dark:ring-offset-[var(--mac-grouped-background)]";

  return (
    <div className="min-h-screen mac-bg-grouped">
      <div className="mx-auto max-w-[1200px] px-mac-md py-mac-xl sm:py-mac-2xl md:px-mac-xl">
        {/* Hero: bienvenida + producto protagonista */}
        <section aria-label="Bienvenida" className="grid gap-mac-2xl lg:grid-cols-12 lg:items-center lg:gap-mac-3xl">
          <div className="lg:col-span-5">
            <p className="mac-text-caption-1 font-semibold uppercase tracking-[0.1em] mac-text-secondary">
              Tienda en línea Guatemala
            </p>
            <h1 className="mt-mac-sm mac-text-large-title mac-text-primary">¡Qué Chulito!</h1>
            <p className="mt-mac-lg mac-text-callout mac-text-secondary">
              Ropa y accesorios para mujer, hombre, niños y hogar. Nuevo y seminuevo — precios claros y
              entrega en 24‑48&nbsp;h donde aplica.
            </p>
            <p className="mt-mac-md mac-text-footnote mac-text-tertiary">
              <span className="font-medium mac-text-secondary">{active.length} artículos</span>
              {" · "}
              {departmentsInStock.length} categorías con stock actual
            </p>
            <form
              action="/catalogo"
              method="get"
              role="search"
              aria-label="Buscar en el catálogo"
              className="mt-mac-lg max-w-xl"
            >
              <label htmlFor="home-catalog-search" className="sr-only">
                Buscar en el catálogo
              </label>
              <div className="mac-search-field">
                <div className="mac-search-field-icon" aria-hidden>
                  <Search className="mac-icon-medium" />
                </div>
                <input
                  id="home-catalog-search"
                  type="search"
                  name="q"
                  placeholder="¿Qué buscas hoy?"
                  autoComplete="off"
                  className="mac-search-field-input min-h-[44px]"
                  enterKeyHint="search"
                />
              </div>
            </form>
            <div className="mt-mac-xl flex flex-wrap gap-mac-md">
              <Link href="/catalogo" className={`mac-button-primary px-mac-xl ${focusClasses}`}>
                Ver todo el catálogo
              </Link>
              <Link href="/contact" className={`mac-button-secondary px-mac-xl ${focusClasses}`}>
                Ayuda y contacto
              </Link>
            </div>
          </div>

          {heroProduct ? (
            <div className="lg:col-span-7">
              <Link href={`/${heroProduct.id}`} className={`mac-card group block overflow-hidden p-0 ${focusClasses}`}>
                <div className="grid md:grid-cols-5">
                  <div className="flex flex-col justify-center p-mac-xl md:col-span-2 md:p-mac-2xl">
                    <p className="mac-text-caption-1 font-medium uppercase tracking-[0.1em] mac-text-tertiary">
                      Destacado
                    </p>
                    <h2 className="mt-mac-sm mac-text-title-2 mac-text-primary">{heroProduct.name}</h2>
                    <p className="mt-mac-md mac-text-subhead mac-text-secondary line-clamp-3">
                      {heroProduct.description}
                    </p>
                    <p className="mt-mac-lg mac-text-title-3 font-semibold mac-text-primary">
                      {formatPrice(heroProduct.price)}
                    </p>
                    <span className="mt-mac-md mac-button-tertiary inline-flex items-center gap-1 self-start px-0 min-h-[44px] mac-text-callout font-semibold">
                      Comprar ahora
                      <ChevronRight className="mac-icon-small shrink-0" aria-hidden />
                    </span>
                  </div>
                  <div className="relative aspect-[5/4] min-h-[220px] bg-mac-gray-2 md:col-span-3 md:aspect-auto md:min-h-[320px] dark:bg-mac-gray-6/30">
                    <Image
                      src={heroProduct.images[0]}
                      alt={heroProduct.name}
                      fill
                      className="object-cover object-center mac-transition-transform group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      priority
                    />
                  </div>
                </div>
              </Link>
            </div>
          ) : null}
        </section>

        <div className="my-mac-2xl md:my-mac-3xl mac-separator" aria-hidden />

        {/* Categorías con imagen — razón principal de estar en la portada */}
        <section aria-labelledby="cat-heading">
          <div className="mb-mac-lg flex flex-col gap-mac-sm md:flex-row md:items-end md:justify-between">
            <div>
              <h2 id="cat-heading" className="mac-text-title-2 mac-text-primary">
                Explora por categoría
              </h2>
              <p className="mt-mac-xs mac-text-subhead mac-text-secondary">
                Cada foto te lleva al catálogo ya filtrado.
              </p>
            </div>
            <Link href="/catalogo" className={`mac-button-tertiary min-h-[44px] self-start md:self-auto ${focusClasses}`}>
              Ir al catálogo completo
            </Link>
          </div>

          <ul className="-mx-mac-md flex snap-x snap-mandatory gap-mac-lg overflow-x-auto overscroll-x-contain px-mac-md pb-mac-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-mac-lg md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
            {departmentsInStock.map((cat) => {
              const img = heroImageCategory(active, cat.id);
              const floor = minPriceForCategory(active, cat.id);
              if (!img || floor === undefined) return null;
              return (
                <li key={cat.id} className="list-none min-w-0 w-[min(88vw,22rem)] shrink-0 snap-center md:w-auto md:shrink md:snap-none">
                  <Link
                    href={`/catalogo?category=${cat.id}`}
                    className={`mac-card group flex h-full flex-col overflow-hidden p-0 hover:shadow-mac-md mac-transition-all ${focusClasses}`}
                  >
                    <div className="relative aspect-[16/11] shrink-0 bg-mac-gray-2 dark:bg-mac-gray-6/25">
                      <Image
                        src={img}
                        alt={`Categoría ${cat.name}`}
                        fill
                        className="object-cover mac-transition-transform group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 360px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-mac-lg pt-mac-xl">
                      <h3 className="mac-text-title-3 mac-text-primary">{cat.name}</h3>
                      <p className="mt-mac-sm mac-text-subhead mac-text-secondary line-clamp-2">
                        {cat.description}
                      </p>
                      <p className="mt-mac-md mac-text-callout font-semibold mac-text-primary">
                        Desde {formatPrice(floor)}
                      </p>
                      <span className="mac-button-tertiary mt-mac-md inline-flex min-h-[44px] items-center gap-1 self-start px-0 mac-text-body-small font-semibold">
                        Ver productos
                        <ChevronRight className="mac-icon-small shrink-0" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Dos vitrinas secundarias */}
        {spotlightLeft && spotlightRight ? (
          <>
            <div className="my-mac-2xl md:my-mac-3xl mac-separator" aria-hidden />
            <section aria-labelledby="spotlights-heading">
              <h2 id="spotlights-heading" className="mac-text-headline mac-text-primary">
                Más ideas para tu guardarropa
              </h2>
              <div className="mt-mac-lg grid gap-mac-lg lg:grid-cols-2">
                {[spotlightLeft, spotlightRight].map((p) => (
                  <Link
                    key={p.id}
                    href={`/${p.id}`}
                    className={`mac-card group flex overflow-hidden p-0 hover:shadow-mac-md mac-transition-all sm:min-h-[220px] sm:flex-row ${focusClasses}`}
                  >
                    <div className="relative aspect-square w-full shrink-0 bg-mac-gray-2 sm:aspect-auto sm:h-auto sm:w-[44%] sm:max-w-[240px] dark:bg-mac-gray-6/25">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover mac-transition-transform group-hover:scale-[1.02]"
                        sizes="240px"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center p-mac-xl">
                      <h3 className="mac-text-headline mac-text-primary line-clamp-2">{p.name}</h3>
                      <p className="mt-mac-md mac-text-title-3 font-semibold">{formatPrice(p.price)}</p>
                      <span className="mt-mac-lg mac-button-tertiary inline-flex min-h-[44px] items-center gap-1 self-start px-0 mac-text-body-small font-semibold">
                        Detalle del producto
                        <ChevronRight className="mac-icon-small" aria-hidden />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </>
        ) : null}

        <div className="my-mac-2xl md:my-mac-3xl mac-separator" aria-hidden />

        {/* Carril densé de nuevos */}
        <section aria-labelledby="new-heading">
          <div className="mb-mac-lg flex flex-col gap-mac-sm md:flex-row md:items-center md:justify-between">
            <h2 id="new-heading" className="mac-text-title-2 mac-text-primary">
              Recién destacados en la tienda
            </h2>
            <Link href="/catalogo" className={`mac-button-tertiary min-h-[44px] self-start md:self-auto ${focusClasses}`}>
              Ver todas las fichas
            </Link>
          </div>

          <ul className="grid grid-cols-2 gap-mac-md lg:grid-cols-4">
            {showcased.map((product) => (
              <li key={product.id} className="list-none min-w-0">
                <Link
                  href={`/${product.id}`}
                  className={`group block h-full rounded-mac-lg ${focusClasses}`}
                >
                  <article className="mac-product-card flex h-full flex-col">
                    <div className="relative aspect-square shrink-0 overflow-hidden bg-mac-gray-2 dark:bg-mac-gray-6/25">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover mac-transition-transform group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 46vw, 260px"
                      />
                    </div>
                    <div className="mac-product-card-content flex flex-1 flex-col">
                      <h3 className="mac-product-card-title line-clamp-2">{product.name}</h3>
                      <p className="mt-mac-xs mac-text-caption-1 mac-text-secondary">
                        {product.condition === "new" ? "Nuevo" : "Seminuevo"}
                      </p>
                      <p className="mac-product-card-price mt-auto">{formatPrice(product.price)}</p>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="my-mac-2xl md:my-mac-3xl mac-separator" aria-hidden />

        {/* Confianza de compra — sigue patrones HIG sin ser marketing vacío */}
        <section aria-label="Ventajas de comprar aquí">
          <div className="mac-card flex flex-col gap-mac-xl p-mac-xl md:flex-row md:items-start md:justify-between md:gap-mac-2xl">
            <div className="flex gap-mac-md md:max-w-[280px]">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mac-blue/15">
                <Truck className="mac-icon-large text-mac-blue" aria-hidden />
              </span>
              <div>
                <h3 className="mac-text-headline mac-text-primary">Entrega rápida</h3>
                <p className="mt-mac-xs mac-text-subhead mac-text-secondary">
                  24‑48&nbsp;h en la mayor parte del país. Coordinamos por WhatsApp cuando haga falta.
                </p>
              </div>
            </div>
            <div className="flex gap-mac-md md:max-w-[280px]">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mac-green/18">
                <Package className="mac-icon-large text-mac-green" aria-hidden />
              </span>
              <div>
                <h3 className="mac-text-headline mac-text-primary">Piezas revisadas</h3>
                <p className="mt-mac-xs mac-text-subhead mac-text-secondary">
                  Seminuevos con calificación cuando aplica — sin sorpresas al recibir tu pedido.
                </p>
              </div>
            </div>
            <div className="flex gap-mac-md md:max-w-[280px]">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mac-purple/15">
                <Headphones className="mac-icon-large text-mac-purple" aria-hidden />
              </span>
              <div>
                <h3 className="mac-text-headline mac-text-primary">Soporte real</h3>
                <p className="mt-mac-xs mac-text-subhead mac-text-secondary">
                  Dudas antes o después de pagar — te ayudamos por los canales habituales.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer de portada */}
        <div className="mt-mac-2xl flex flex-wrap items-center justify-center gap-x-mac-xl gap-y-mac-sm pb-mac-xl text-center md:mt-mac-3xl md:justify-between md:text-left">
          <nav className="flex flex-wrap items-center justify-center gap-x-mac-xl gap-y-mac-md mac-text-footnote md:justify-start" aria-label="Enlaces finales">
            <Link href="/contact#devoluciones" className={`mac-text-secondary mac-transition-colors hover:mac-text-primary ${focusClasses} rounded-mac-sm px-mac-xs py-mac-xs`}>
              Devoluciones
            </Link>
            <Link href="/about" className={`mac-text-secondary mac-transition-colors hover:mac-text-primary ${focusClasses} rounded-mac-sm px-mac-xs py-mac-xs`}>
              Sobre nosotros
            </Link>
            <Link href="/checkout" className={`mac-text-secondary mac-transition-colors hover:mac-text-primary ${focusClasses} rounded-mac-sm px-mac-xs py-mac-xs`}>
              Ir a checkout
            </Link>
          </nav>
          <p className="mac-text-caption-1 mac-text-tertiary w-full md:w-auto md:text-right">
            Gracias por comprar local.
          </p>
        </div>
      </div>
    </div>
  );
}
