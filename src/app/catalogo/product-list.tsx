"use client";

import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { Heart, ShoppingCart, Sparkles } from "lucide-react";
import type { Product } from "@/lib/domain/entities/product";
import { useFavorites } from "@/lib/hooks/useFavorites";
import { addItem, toggleCart } from "@/store/slice/cartSlice";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
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
                {/* Badges de condición y calificación */}
                <div className="flex flex-wrap gap-mac-xs mb-mac-xs">
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
                <h3 className="mac-text-headline mac-text-primary mb-mac-sm line-clamp-2">
                  {product.name}
                </h3>

                {/* Descripción */}
                <p className="mac-text-subhead mac-text-secondary line-clamp-2 mb-mac-sm">
                  {product.description}
                </p>
              </div>

              {/* Precio y botones de acción */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="mac-product-card-price">
                    {formatPrice(product.price)}
                  </p>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-mac-sm">
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
          </div>
        </Link>
      ))}
    </div>
  );
}

