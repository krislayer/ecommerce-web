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
      <div className="text-center py-12">
        <p className="text-adaptive-primary">
          No hay productos disponibles en este momento
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Link key={product.id} href={`/${product.id}`} className="block group">
          <div className="glass-secondary overflow-hidden hover-lift flex gap-4 sm:gap-6 p-4">
            {/* Imagen */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 relative overflow-hidden bg-gray-100 shrink-0 rounded-lg">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 640px) 96px, 128px"
              />
            </div>

            {/* Contenido */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* Título */}
                <h3 className="font-semibold text-base sm:text-lg mb-2 text-adaptive-primary line-clamp-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-yellow-400 text-sm">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                </div>

                {/* Descripción */}
                <p className="text-sm text-adaptive-secondary line-clamp-2 mb-3">
                  {product.description}
                </p>
              </div>

              {/* Precio y badges */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-xl text-adaptive-primary">
                    {formatPrice(product.price)}
                  </p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {product.price < 200 && (
                    <span className="text-xs bg-green-500/20 text-green-700 dark:text-green-400 px-2 py-1 rounded font-medium">
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

