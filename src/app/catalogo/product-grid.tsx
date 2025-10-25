"use client";

import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { Heart, ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/lib/domain/entities/product";
import type { RootState } from "@/store";
import { toggleFavorite } from "@/store/slice/favoritesSlice";
import { addItem, toggleCart } from "@/store/slice/cartSlice";
import { LiquidGlassCard } from "@/components/liquid-glass-card";
import { AdvancedLiquidGlassCard } from "@/components/advanced-liquid-glass-card";

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
      <div className="text-center py-12">
        <p className="text-adaptive-primary">
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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {products.map((product) => (
        <Link key={product.id} href={`/${product.id}`} className="h-full group">
          <AdvancedLiquidGlassCard variant="hero" className="overflow-hidden h-full flex flex-col hover-lift">
            {/* Imagen - Aspecto cuadrado como en ecommerce */}
            <div className="aspect-square relative overflow-hidden bg-gray-100 shrink-0">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                unoptimized
              />
              
              {/* Badge de nuevo (opcional - se puede mostrar solo en productos nuevos) */}
              {false && (
                <div className="absolute top-2 left-2 glass-secondary text-adaptive-primary text-xs font-semibold px-2 py-1 rounded">
                  Nuevo
                </div>
              )}
            </div>
            
            {/* Contenido */}
            <div className="p-3 sm:p-4 flex flex-col grow">
              {/* Título - Máximo 2 líneas */}
              <h3 className="font-medium mb-2 line-clamp-2 text-sm text-adaptive-primary min-h-10 leading-tight">
                {product.name}
              </h3>
              
              {/* Rating (placeholder - sin datos reales aún) */}
              <div className="flex items-center gap-1 mb-2">
                <div className="flex text-yellow-400 text-xs">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-adaptive-tertiary">
                  {/* Sin reseñas aún */}
                </span>
              </div>
              
              {/* Precio - Más prominente */}
              <div className="mb-2">
                <p className="font-bold text-lg text-adaptive-primary">
                  {formatPrice(product.price)}
                </p>
                {/* Precio anterior con descuento (placeholder) */}
                {false && (
                  <p className="text-xs text-adaptive-tertiary line-through">
                    Q{(product.price * 1.5).toFixed(0)}
                  </p>
                )}
              </div>
              
              {/* Badges de beneficio - Solo mostrar si hay badges específicos del producto */}
              <div className="flex flex-wrap gap-1 mb-3">
                {/* Los badges de envío gratis se calcularán dinámicamente en el carrito */}
                {/* Badge adicional se puede agregar aquí */}
              </div>

              {/* Botones de acción */}
              <div className="flex gap-2 mt-auto justify-end">
                {/* Botón Favoritos */}
                <button
                  onClick={(e) => handleToggleFavorite(product.id, e)}
                  className={`glass-button-round ${
                    favorites.includes(product.id)
                      ? "bg-white/20"
                      : ""
                  }`}
                  aria-label={favorites.includes(product.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                  <Heart 
                    className="w-4 h-4 text-adaptive-primary relative z-10" 
                    fill={favorites.includes(product.id) ? "currentColor" : "none"} 
                    stroke="currentColor" 
                  />
                </button>

                {/* Botón Agregar al Carrito */}
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="glass-button-round"
                  aria-label="Agregar al carrito"
                >
                  <ShoppingCart className="w-4 h-4 text-adaptive-primary relative z-10" />
                </button>
              </div>
            </div>
          </AdvancedLiquidGlassCard>
        </Link>
      ))}
    </div>
  );
}
