"use client";

import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { Heart, ShoppingCart, Sparkles } from "lucide-react";
import type { Product } from "@/lib/domain/entities/product";
import { useFavorites } from "@/lib/hooks/useFavorites";
import { addItem, toggleCart } from "@/store/slice/cartSlice";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const dispatch = useDispatch();
  const { isFavorite, handleToggleFavorite, isAuthenticated } = useFavorites();

  const handleFavoriteClick = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    
    handleToggleFavorite(productId);
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
              {/* Badges de condición y calificación */}
              <div className="flex flex-wrap gap-mac-xs mb-mac-sm">
                {product.condition === "new" ? (
                  <span className="badge-new mac-chip inline-flex items-center gap-mac-xs" style={{ padding: '2px 8px', fontSize: '11px' }}>
                    <Sparkles className="mac-icon-small" style={{ width: '10px', height: '10px' }} />
                    <span className="font-medium">Nuevo</span>
                  </span>
                ) : (
                  <>
                    <span className="badge-used mac-chip inline-flex items-center gap-mac-xs" style={{ padding: '2px 8px', fontSize: '11px' }}>
                      <span className="font-medium">Seminuevo</span>
                    </span>
                    {product.conditionRating !== undefined && (
                      <span className="badge-rating mac-chip mac-text-caption-1" style={{ padding: '2px 8px', fontSize: '11px' }}>
                        <span className="font-semibold">{product.conditionRating}</span>
                        <span className="mac-text-tertiary">/10</span>
                      </span>
                    )}
                  </>
                )}
                {!product.active && (
                  <span className="mac-chip mac-text-caption-1" style={{ backgroundColor: 'var(--mac-secondary-background)', color: 'var(--mac-tertiary-label)', borderColor: 'var(--mac-separator)', padding: '2px 8px', fontSize: '11px' }}>
                    No disponible
                  </span>
                )}
              </div>

              {/* Título */}
              <h3 className="mac-product-card-title line-clamp-2 mb-mac-sm">
                {product.name}
              </h3>
              
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
                  onClick={(e) => handleFavoriteClick(product.id, e)}
                  className={`mac-touch-target rounded-full flex items-center justify-center mac-transition-colors ${
                    isFavorite(product.id)
                      ? "bg-mac-red/10"
                      : "hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6"
                  } ${!isAuthenticated ? "opacity-70" : ""}`}
                  aria-label={isFavorite(product.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
                  title={!isAuthenticated ? "Inicia sesión para agregar favoritos" : ""}
                >
                  <Heart 
                    className="mac-icon-medium mac-text-secondary" 
                    fill={isFavorite(product.id) ? "var(--mac-red)" : "none"} 
                    stroke={isFavorite(product.id) ? "var(--mac-red)" : "currentColor"}
                    style={isFavorite(product.id) ? { color: 'var(--mac-red)' } : {}}
                  />
                </button>

                {/* Botón Agregar al Carrito */}
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="mac-touch-target rounded-full flex items-center justify-center hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6 mac-transition-colors"
                  aria-label="Agregar al carrito"
                >
                  <ShoppingCart className="mac-icon-medium mac-text-secondary" />
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
