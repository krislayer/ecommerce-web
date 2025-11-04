"use client";

import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { Heart, ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/lib/domain/entities/product";
import type { RootState } from "@/store";
import { toggleFavorite } from "@/store/slice/favoritesSlice";
import { addItem, toggleCart } from "@/store/slice/cartSlice";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.productIds);

  const handleToggleFavorite = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(productId));
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Crear un ProductVariant básico para el carrito
    const variant = {
      id: `${product.id}-default`,
      productId: product.id,
      sku: product.id,
      name: product.name,
      price: product.price,
      stock: 10, // Stock por defecto
      attributes: product.attrs,
      image: product.images[0],
    };

    dispatch(addItem({
      variant,
      quantity: 1,
    }));
    
    // Abrir el carrito después de agregar
    dispatch(toggleCart());
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

  const formatPrice = (price: number) => {
    // Formatear sin decimales innecesarios
    if (price % 1 === 0) {
      return `Q${price}`;
    }
    return `Q${price.toFixed(2)}`;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-mac-md">
      {products.map((product) => (
        <Link key={product.id} href={`/${product.id}`} className="h-full group">
          <div className="mac-product-card h-full flex flex-col">
            {/* Imagen */}
            <div className="aspect-square relative overflow-hidden bg-mac-gray-2 shrink-0">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-[1.02] mac-transition-transform"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                unoptimized
              />
            </div>
            
            {/* Contenido */}
            <div className="p-mac-md flex flex-col grow">
              {/* Título */}
              <h3 className="mac-product-card-title line-clamp-2 mb-mac-sm">
                {product.name}
              </h3>
              
              {/* Rating */}
              <div className="flex items-center gap-mac-xs mb-mac-sm">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
              
              {/* Precio */}
              <div className="mb-mac-sm">
                <p className="mac-product-card-price">
                  {formatPrice(product.price)}
                </p>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-mac-sm mt-auto justify-end">
                {/* Botón Favoritos */}
                <button
                  onClick={(e) => handleToggleFavorite(product.id, e)}
                  className={`mac-touch-target rounded-full flex items-center justify-center mac-transition-colors ${
                    favorites.includes(product.id)
                      ? "bg-mac-red/10"
                      : "hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6"
                  }`}
                  aria-label={favorites.includes(product.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                  <Heart 
                    className="w-5 h-5 mac-text-secondary" 
                    fill={favorites.includes(product.id) ? "var(--mac-red)" : "none"} 
                    stroke={favorites.includes(product.id) ? "var(--mac-red)" : "currentColor"}
                    style={favorites.includes(product.id) ? { color: 'var(--mac-red)' } : {}}
                  />
                </button>

                {/* Botón Agregar al Carrito */}
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="mac-touch-target rounded-full flex items-center justify-center hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6 mac-transition-colors"
                  aria-label="Agregar al carrito"
                >
                  <ShoppingCart className="w-5 h-5 mac-text-secondary" />
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
