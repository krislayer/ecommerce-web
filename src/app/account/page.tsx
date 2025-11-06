"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, User, LogOut } from "lucide-react";
import { useFavorites } from "@/lib/hooks/useFavorites";
import { sampleProducts } from "@/lib/data/products";
import type { Product } from "@/lib/domain/entities/product";
import type { RootState } from "@/store";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slice/authSlice";

export default function AccountPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const { favorites, isFavorite, handleToggleFavorite, isAuthenticated } = useFavorites();

  // Obtener productos favoritos
  const favoriteProducts = sampleProducts.filter((product) =>
    favorites.includes(product.id)
  );

  const formatPrice = (price: number) => {
    if (price % 1 === 0) {
      return `Q${price}`;
    }
    return `Q${price.toFixed(2)}`;
  };

  const handleSignOut = async () => {
    if (!auth) return;
    
    try {
      await signOut(auth);
      dispatch(setUser(null));
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Redirigir a login si no está autenticado
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen mac-bg-grouped flex items-center justify-center">
        <div className="mac-card">
          <p className="mac-text-body mac-text-secondary">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // El useEffect redirigirá
  }

  return (
    <div className="min-h-screen mac-bg-grouped">
      <div className="max-w-7xl mx-auto px-mac-md py-mac-xl mac-fade-in">
        {/* Header */}
        <div className="mac-card mb-mac-lg">
          <div className="flex items-start justify-between gap-mac-md">
            <div className="flex-1">
              <h1 className="mac-text-large-title mac-text-primary mb-mac-sm">
                Mi Cuenta
              </h1>
              {user.displayName && (
                <p className="mac-text-subhead mac-text-secondary">
                  {user.displayName}
                </p>
              )}
              {user.email && (
                <p className="mac-text-footnote mac-text-secondary mt-mac-xs">
                  {user.email}
                </p>
              )}
            </div>
            <button
              onClick={handleSignOut}
              className="mac-touch-target rounded-full flex items-center justify-center hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6 mac-transition-colors"
              aria-label="Cerrar sesión"
            >
              <LogOut className="mac-icon-large mac-text-secondary" />
            </button>
          </div>
        </div>

        {/* Favoritos */}
        <div className="mb-mac-lg">
          <h2 className="mac-text-title-2 mac-text-primary mb-mac-lg">
            Mis Favoritos
          </h2>

          {favoriteProducts.length === 0 ? (
            <div className="mac-card text-center py-mac-2xl">
              <Heart className="mac-icon-xlarge mac-text-secondary mx-auto mb-mac-md opacity-50" />
              <p className="mac-text-body mac-text-secondary mb-mac-sm">
                No tienes productos favoritos aún
              </p>
              <Link href="/catalogo" className="mac-button-primary inline-block">
                Explorar Catálogo
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-mac-md">
              {favoriteProducts.map((product) => (
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
                      />
                    </div>
                    
                    {/* Contenido */}
                    <div className="p-mac-md flex flex-col grow">
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

                      {/* Botón Favoritos */}
                      <div className="flex justify-end mt-auto">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleToggleFavorite(product.id);
                          }}
                          className={`mac-touch-target rounded-full flex items-center justify-center mac-transition-colors ${
                            isFavorite(product.id)
                              ? "bg-mac-red/10"
                              : "hover:bg-mac-gray-2 dark:hover:bg-mac-gray-6"
                          }`}
                          aria-label={isFavorite(product.id) ? "Quitar de favoritos" : "Agregar a favoritos"}
                        >
                          <Heart 
                            className="mac-icon-medium mac-text-secondary" 
                            fill={isFavorite(product.id) ? "var(--mac-red)" : "none"} 
                            stroke={isFavorite(product.id) ? "var(--mac-red)" : "currentColor"}
                            style={isFavorite(product.id) ? { color: 'var(--mac-red)' } : {}}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

