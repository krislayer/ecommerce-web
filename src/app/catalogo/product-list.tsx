"use client";

import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import type { Product } from "@/lib/domain/entities/product";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  const formatPrice = (price: number) => {
    if (price % 1 === 0) {
      return `Q${price}`;
    }
    return `Q${price.toFixed(2)}`;
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-mac-2xl">
        <p className="mac-text-body mac-text-secondary">
          No hay productos disponibles en este momento
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-mac-md">
      {products.map((product) => (
        <Link key={product.id} href={`/${product.id}`} className="block group">
          <div className="mac-card overflow-hidden hover:shadow-mac-md mac-transition-shadow flex gap-mac-md sm:gap-mac-lg">
            {/* Imagen */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 relative overflow-hidden bg-mac-gray-2 shrink-0 rounded-mac-md">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-[1.02] mac-transition-transform"
                sizes="(max-width: 640px) 96px, 128px"
              />
            </div>

            {/* Contenido */}
            <div className="flex-1 flex flex-col justify-between py-mac-sm">
              <div>
                {/* Título */}
                <h3 className="mac-text-headline mac-text-primary mb-mac-sm line-clamp-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-mac-xs mb-mac-sm">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} className="mac-icon-small fill-current" />
                    ))}
                  </div>
                </div>

                {/* Descripción */}
                <p className="mac-text-subhead mac-text-secondary line-clamp-2 mb-mac-sm">
                  {product.description}
                </p>
              </div>

              {/* Precio y badges */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="mac-product-card-price">
                    {formatPrice(product.price)}
                  </p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-mac-sm">
                  {product.price < 200 && (
                    <span className="mac-chip" style={{ backgroundColor: 'var(--mac-green)', color: '#FFFFFF', borderColor: 'var(--mac-green)' }}>
                      Envío gratis
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

