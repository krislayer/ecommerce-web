"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/domain/entities/product";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <Link key={product.id} href={`/${product.id}`} className="hover-lift">
          <div className="glass-secondary overflow-hidden">
            <div className="aspect-square relative overflow-hidden bg-gray-200">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2 line-clamp-2 text-sm sm:text-base text-adaptive-primary">
                {product.name}
              </h3>
              <p className="font-bold text-lg text-adaptive-primary">
                Q{product.price.toFixed(2)}
              </p>
              <p className="text-xs mt-1 line-clamp-2 text-adaptive-tertiary">
                {product.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
